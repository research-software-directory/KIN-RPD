import {faker} from '@faker-js/faker';

import {
  generateUniqueCaseInsensitiveString,getKeywordIds,
  postToBackend,generatePeopleWithOrcids,generateKeywordsForEntity,
  getResearchDomainIds
} from './utils.js';
import {images,getLocalImageIds} from './images.js';
import {generateMentionsForEntity} from './mentions.js'
import {generateSoftwareForSoftware} from './software.js'

export async function generateProject({orcids,idsMentions,amount = 500}){
  const projectImageIds = await getLocalImageIds(images);
  const peopleWithOrcid = generatePeopleWithOrcids(orcids, projectImageIds);
  const idsKeywords = await getKeywordIds()
  const idsResearchDomains = await getResearchDomainIds()

  const projects = await postToBackend('/project', createProjects(projectImageIds,amount))
  const idsProjects = projects.map(p=>p.id)

  const projectData = await Promise.all([
    postToBackend('/team_member', await generateTeamMembers(idsProjects,peopleWithOrcid,projectImageIds)),
    postToBackend('/url_for_project', generateUrlsForProjects(idsProjects)),
    postToBackend('/keyword_for_project', generateKeywordsForEntity(idsProjects, idsKeywords, 'project')),
    postToBackend('/output_for_project', generateMentionsForEntity(idsProjects, idsMentions, 'project')),
    postToBackend('/impact_for_project', generateMentionsForEntity(idsProjects, idsMentions, 'project')),
    postToBackend(
      '/research_domain_for_project',
      generateResearchDomainsForProjects(idsProjects, idsResearchDomains)
    ),
    postToBackend('/project_for_project', generateSoftwareForSoftware(idsProjects))
  ])

  return idsProjects
}

export function createProjects(projectImageIds,amount = 500) {
	const result = [];

	const projectStatuses = ['finished', 'running', 'starting'];

	for (let index = 0; index < amount; index++) {
		const maxWords = faker.helpers.maybe(() => 5, {probability: 0.8}) ?? 31;
		const title = generateUniqueCaseInsensitiveString(() =>
			('Project: ' + faker.word.words(faker.number.int({max: maxWords, min: 1}))).substring(0, 200),
		);

		const status = faker.helpers.arrayElement(projectStatuses);
		let dateEnd, dateStart;
		switch (status) {
			case 'finished':
				dateEnd = faker.date.past({years: 2});
				dateStart = faker.date.past({years: 2, refDate: dateEnd});
				break;
			case 'running':
				dateEnd = faker.date.future({years: 2});
				dateStart = faker.date.past({years: 2});
				break;
			case 'starting':
				dateStart = faker.date.future({years: 2});
				dateEnd = faker.date.future({years: 2, refDate: dateStart});
				break;
		}

		result.push({
			slug: faker.helpers.slugify(title).toLowerCase().replaceAll(/-{2,}/g, '-').replaceAll(/-+$/g, ''), // removes double dashes and trailing dashes
			title: title,
			subtitle:
				faker.helpers.maybe(() => faker.commerce.productDescription(), {
					probability: 0.9,
				}) ?? null,
			date_end: faker.helpers.maybe(() => dateEnd, {probability: 0.9}) ?? null,
			date_start: faker.helpers.maybe(() => dateStart, {probability: 0.9}) ?? null,
			description: faker.lorem.paragraphs(5, '\n\n'),
			grant_id: faker.helpers.maybe(() => faker.helpers.replaceSymbols('******'), {probability: 0.8}) ?? null,
			image_caption: faker.animal.cat(),
			image_contain: !!faker.helpers.maybe(() => true, {
				probability: 0.5,
			}),
			image_id:
				faker.helpers.maybe(() => projectImageIds[index % projectImageIds.length], {probability: 0.8}) ?? null,
			is_published: !!faker.helpers.maybe(() => true, {probability: 0.8}),
		});
	}

	return result;
}

export async function generateTeamMembers(projectIds, peopleWithOrcids, contributorImageIds=[],minPerProject = 0, maxPerProject = 15) {
  const result = [];

	for (const projectId of projectIds) {
		const amount = faker.number.int({
			max: maxPerProject,
			min: minPerProject,
		});
		const amountWithOrcid = faker.number.int({max: amount, min: 0});
		const amountWithoutOrcid = amount - amountWithOrcid;

		for (let i = 0; i < amountWithoutOrcid; i++) {
			result.push({
				project: projectId,
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
				project: projectId,
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


export function generateUrlsForProjects(ids) {
	const result = [];

	for (const id of ids) {
		// each project will get 0, 1 or 2 URLs
		const numberOfUrls = faker.number.int({max: 3, min: 0});
		for (let index = 0; index < numberOfUrls; index++) {
			result.push({
				project: id,
				title: faker.commerce.product(),
				url: faker.internet.url(),
			});
		}
	}

	return result;
}


export function generateResearchDomainsForProjects(idsProject, idsResearchDomain) {
	const result = [];

	for (const idProject of idsProject) {
		const nummerOfKeywords = faker.number.int({max: 3, min: 0});
		if (nummerOfKeywords === 0) continue;

		const researchDomainIdsToAdd = faker.helpers.arrayElements(idsResearchDomain, nummerOfKeywords);
		for (const researchDomainId of researchDomainIdsToAdd) {
			result.push({
				project: idProject,
				research_domain: researchDomainId,
			});
		}
	}

	return result;
}