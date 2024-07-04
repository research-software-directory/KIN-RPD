import {faker} from '@faker-js/faker';

import {
  generateRelationsForDifferingEntities,
  generateUniqueCaseInsensitiveString,
  generateKeywordsForEntity,
  postToBackend,
  getKeywordIds
} from './utils.js'
import {organisationLogos,getLocalImageIds} from './images.js';

export async function generateCommunities({idsSoftware,amount = 500}){
  const localOrganisationLogoIds = await getLocalImageIds(organisationLogos);
  const idsKeywords = await getKeywordIds()
  // add communities
  const communities = await postToBackend('/community', createCommunities(localOrganisationLogoIds,amount))
  const idsCommunities = communities.map(c=>c.id)
  // add other data
  const comData = await Promise.all([
    postToBackend('/keyword_for_community', generateKeywordsForEntity(idsCommunities, idsKeywords, 'community')),
    postToBackend('/software_for_community', generateSoftwareForCommunity(idsSoftware, idsCommunities)),
    generateCategories(idsCommunities)
  ])

  return idsCommunities
}

export function createCommunities(localOrganisationLogoIds,amount = 500) {
	const result = [];

	for (let index = 0; index < amount; index++) {
		const maxWords = faker.helpers.maybe(() => 5, {probability: 0.8}) ?? 31;
		const name = generateUniqueCaseInsensitiveString(() =>
			('Community ' + faker.word.words(faker.number.int({max: maxWords, min: 1}))).substring(0, 200),
		);

		result.push({
			slug: faker.helpers.slugify(name).toLowerCase().replaceAll(/-{2,}/g, '-').replaceAll(/-+$/g, ''), // removes double dashes and trailing dashes
			name: name,
			short_description: faker.helpers.maybe(() => faker.lorem.paragraphs(1, '\n\n'), {probability: 0.8}) ?? null,
			description: faker.helpers.maybe(() => faker.lorem.paragraphs(1, '\n\n'), {probability: 0.8}) ?? null,
			logo_id:
				faker.helpers.maybe(() => localOrganisationLogoIds[index % localOrganisationLogoIds.length], {probability: 0.8}) ??
				null,
		});
	}

	return result;
}

export async function generateCategories(idsCommunities, maxDepth = 3) {
	const communityPromises = [];
	for (const commId of idsCommunities) {
		communityPromises.push(generateAndSaveCategoriesForCommunity(commId, maxDepth));
	}
	communityPromises.push(generateAndSaveCategoriesForCommunity(null, maxDepth));

	return await Promise.all(communityPromises);
}

export async function generateAndSaveCategoriesForCommunity(idCommunity, maxDepth) {
	return new Promise(async res => {
		let parentIds = [null];
		for (let level = 1; level <= maxDepth; level++) {
			const newParentIds = [];
			for (const parent of parentIds) {
				let toGenerateCount = faker.number.int(4);
				if (idCommunity === null && level === 1) {
					toGenerateCount += 1;
				}
				for (let i = 0; i < toGenerateCount; i++) {
					const name = `Parent ${parent}, level ${level}, item ${i + 1}`;
					const shortName = `Level ${level}, item ${i + 1}`;
					const body = {
						community: idCommunity,
						parent: parent,
						short_name: shortName,
						name: name,
					};
					const categories = await postToBackend('/category', body)
          newParentIds.push(categories[0].id)
				}
			}
			parentIds = newParentIds;
		}
		res();
	});
}

export function generateSoftwareForCommunity(idsSoftware, idsCommunities) {
	const result = generateRelationsForDifferingEntities(idsCommunities, idsSoftware, 'community', 'software');

	const statuses = [
		{weight: 1, value: 'pending'},
		{weight: 8, value: 'approved'},
		{weight: 1, value: 'rejected'},
	];
	result.forEach(entry => {
		entry['status'] = faker.helpers.weightedArrayElement(statuses);
	});

	return result;
}
