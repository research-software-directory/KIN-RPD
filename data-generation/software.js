import {faker} from '@faker-js/faker';

import {
  generateUniqueCaseInsensitiveString,generatePeopleWithOrcids,
  getKeywordIds,generateKeywordsForEntity,postToBackend
} from './utils.js';
import {conceptDois, packageManagerLinks} from './real-data.js';
import {images,softwareLogos,getLocalImageIds} from './images.js';
import {generateMentionsForEntity} from './mentions.js'

export async function generateSoftware({orcids,idsMentions,amount = 500}){
  const contributorImageIds = await getLocalImageIds(images);
  const softwareLogoIds = await getLocalImageIds(softwareLogos);
  const peopleWithOrcid = generatePeopleWithOrcids(orcids, contributorImageIds);
  const idsKeywords = await getKeywordIds()

  // log software as group
  // console.group("software")

  // post to software
  const software = await postToBackend('/software', createSoftware(softwareLogoIds,amount))

  // extract ids
  let idsSoftware=[], idsFakeSoftware=[], idsRealSoftware=[];
  software.forEach(sw=>{
    // all software ids
    idsSoftware.push(sw.id)
    // real/fake software ids
    if (sw['brand_name'].startsWith('Real,')){
      idsRealSoftware.push(sw.id)
    }else{
      idsFakeSoftware.push(sw.id)
    }
  })

  // add all related software data
  const softwareData = await Promise.all([
    postToBackend('/contributor',
      generateContributors(idsSoftware, peopleWithOrcid, contributorImageIds)
    ),
    postToBackend('/testimonial', generateTestimonials(idsSoftware)),
    postToBackend('/repository_url', generateRepositoryUrls(idsSoftware)),
    postToBackend('/package_manager', generatePackageManagers(idsRealSoftware)),
    postToBackend('/license_for_software', generateLicensesForSoftware(idsSoftware)),
    postToBackend('/keyword_for_software', generateKeywordsForEntity(idsSoftware, idsKeywords, 'software')),
    postToBackend('/mention_for_software', generateMentionsForEntity(idsSoftware, idsMentions, 'software')),
    postToBackend('/software_for_software', generateSoftwareForSoftware(idsSoftware)),
    postToBackend('/software_highlight', generateSoftwareHighlights(idsSoftware.slice(0, 10)))
  ])

  // console.groupEnd()
  return idsSoftware
}



export function createSoftware(softwareLogoIds,amount = 500) {

	// real software has a real concept DOI
	const amountRealSoftware = Math.min(conceptDois.length, amount);
	const brandNames = [];
	for (let index = 0; index < amountRealSoftware; index++) {
		const maxWords = faker.helpers.maybe(() => 5, {probability: 0.8}) ?? 31;
		const brandName = generateUniqueCaseInsensitiveString(() =>
			('Real, ' + faker.word.words(faker.number.int({max: maxWords, min: 1}))).substring(0, 200)
		);
		brandNames.push(brandName);
	}

	const amountFakeSoftware = amount - amountRealSoftware;
	for (let index = 0; index < amountFakeSoftware; index++) {
		const maxWords = faker.helpers.maybe(() => 5, {probability: 0.8}) ?? 31;
		const brandName = generateUniqueCaseInsensitiveString(() =>
			('Software ' + faker.word.words(faker.number.int({max: maxWords, min: 1}))).substring(0, 200)
		);
		brandNames.push(brandName);
	}

	const result = [];

	for (let index = 0; index < amount; index++) {
		result.push({
			slug: faker.helpers
				.slugify(brandNames[index])
				.toLowerCase()
				.replaceAll(/-{2,}/g, '-')
				.replaceAll(/-+$/g, ''), // removes double dashes and trailing dashes
			brand_name: brandNames[index],
			concept_doi: index < conceptDois.length ? conceptDois[index] : null,
			description: faker.lorem.paragraphs(4, '\n\n'),
			get_started_url: faker.internet.url(),
			image_id:
				faker.helpers.maybe(() => softwareLogoIds[index % softwareLogoIds.length], {
					probability: 0.8,
				}) ?? null,
			is_published: !!faker.helpers.maybe(() => true, {probability: 0.8}),
			short_statement: faker.commerce.productDescription(),
			closed_source: !!faker.helpers.maybe(() => true, {
				probability: 0.8,
			}),
		});
	}

	return result;
}

export function generateTestimonials(ids) {
	const result = [];

	for (const id of ids) {
		// each software will get 0, 1 or 2 testimonials
		const numberOfTestimonials = faker.number.int({max: 3, min: 0});
		for (let index = 0; index < numberOfTestimonials; index++) {
			result.push({
				software: id,
				message: faker.hacker.phrase(),
				source: faker.person.fullName(),
			});
		}
	}

	return result;
}


export function generateRepositoryUrls(ids) {
	const githubUrls = [
		'https://github.com/research-software-directory/RSD-as-a-service',
		'https://github.com/wadpac/GGIR',
		'https://github.com/ESMValGroup/ESMValTool',
		'https://github.com/ESMValGroup/ESMValCore',
		'https://github.com/benvanwerkhoven/kernel_tuner',
		'https://github.com/NLeSC/pattyvis',
	];

	const gitlabUrls = [
		'https://gitlab.com/dwt1/dotfiles',
		'https://gitlab.com/famedly/fluffychat',
		'https://gitlab.com/gitlab-org/gitlab-shell',
		'https://gitlab.com/cerfacs/batman',
		'https://gitlab.com/cyber5k/mistborn',
	];

	const repoUrls = githubUrls.concat(gitlabUrls);

	const result = [];

	for (let index = 0; index < ids.length; index++) {
		if (!!faker.helpers.maybe(() => true, {probability: 0.25})) continue;

		const repoUrl = faker.helpers.arrayElement(repoUrls);
		const codePlatform = repoUrl.startsWith('https://github.com') ? 'github' : 'gitlab';
		result.push({
			software: ids[index],
			url: repoUrl,
			code_platform: codePlatform,
		});
	}

	return result;
}

export function generatePackageManagers(softwareIds) {
	const result = [];

	for (let index = 0; index < softwareIds.length; index++) {
		// first assign each package manager entry to one software, then randomly assing package manager entries to the remaining ids
		const packageManagerLink =
			index < packageManagerLinks.length
				? packageManagerLinks[index]
				: faker.helpers.arrayElement(packageManagerLinks);

		result.push({
			software: softwareIds[index],
			url: packageManagerLink.url,
			package_manager: packageManagerLink.type,
		});
	}

	return result;
}

export function generateLicensesForSoftware(ids) {
	const licenses = [
		{
			license: 'Apache-2.0',
			name: 'Apache License 2.0',
			reference: 'https://spdx.org/licenses/Apache-2.0.html',
		},
		{
			license: 'MIT',
			name: 'MIT License',
			reference: 'https://spdx.org/licenses/MIT.html',
		},
		{
			license: 'GPL-2.0-or-later',
			name: 'GNU General Public License v2.0 or later',
			reference: 'https://spdx.org/licenses/GPL-2.0-or-later.html',
		},
		{
			license: 'LGPL-2.0-or-later',
			name: 'GNU Library General Public License v2 or later',
			reference: 'https://spdx.org/licenses/LGPL-2.0-or-later.html',
		},
		{
			license: 'CC-BY-4.0',
			name: 'Creative Commons Attribution 4.0 International',
			reference: 'https://spdx.org/licenses/CC-BY-4.0.html',
		},
		{
			license: 'CC-BY-NC-ND-3.0',
			name: 'Creative Commons Attribution Non Commercial No Derivatives 3.0 Unported',
			reference: 'https://spdx.org/licenses/CC-BY-NC-ND-3.0.html',
		},
	];

	const result = [];

	for (const id of ids) {
		const nummerOfLicenses = faker.number.int({max: 3, min: 0});
		if (nummerOfLicenses === 0) continue;

		const licensesToAdd = faker.helpers.arrayElements(licenses, nummerOfLicenses);
		for (const item of licensesToAdd) {
			result.push({
				software: id,
				license: item.license,
				name: item.name,
				reference: item.reference,
			});
		}
	}

	return result;
}

export function generateSoftwareForSoftware(ids) {
	const result = [];

	for (let index = 0; index < ids.length; index++) {
		const numberOfRelatedSoftware = faker.number.int({max: 5, min: 0});
		if (numberOfRelatedSoftware === 0) continue;

		const origin = ids[index];
		const idsWithoutOrigin = ids.filter(id => id !== origin);
		const idsRelation = faker.helpers.arrayElements(idsWithoutOrigin, numberOfRelatedSoftware);
		for (const relation of idsRelation) {
			result.push({
				origin: origin,
				relation: relation,
			});
		}
	}

	return result;
}

export function generateSoftwareHighlights(ids) {
	const result = [];
	for (let index = 0; index < ids.length; index++) {
		const isHighlight = !!faker.helpers.maybe(() => true, {
			probability: 0.3,
		});
		if (isHighlight === true) result.push({software: ids[index]});
	}
	return result;
}


export function generateContributors(softwareIds, peopleWithOrcids, contributorImageIds=[], minPerSoftware = 0, maxPerSoftware = 15) {
	const result = [];

	for (const softwareId of softwareIds) {
		const amount = faker.number.int({
			max: maxPerSoftware,
			min: minPerSoftware,
		});
		const amountWithOrcid = faker.number.int({max: amount, min: 0});
		const amountWithoutOrcid = amount - amountWithOrcid;

		for (let i = 0; i < amountWithoutOrcid; i++) {
			result.push({
				software: softwareId,
				is_contact_person: !!faker.helpers.maybe(() => true, {
					probability: 0.2,
				}),
				email_address: faker.internet.email(),
				family_names: faker.person.lastName(),
				given_names: faker.person.firstName(),
				affiliation: faker.company.name(),
				role: faker.person.jobTitle(),
				orcid: null,
				avatar_id:
					faker.helpers.maybe(() => faker.helpers.arrayElement(contributorImageIds), {probability: 0.8}) ?? null,
			});
		}

		const randomPeopleWithOrcdid = faker.helpers.arrayElements(peopleWithOrcids, amountWithOrcid);

		for (const personWithOrcid of randomPeopleWithOrcdid) {
			result.push({
				...personWithOrcid,
				software: softwareId,
				is_contact_person: !!faker.helpers.maybe(() => true, {
					probability: 0.2,
				}),
				affiliation: faker.company.name(),
				role: faker.person.jobTitle(),
			});
		}
	}

	return result;
}
