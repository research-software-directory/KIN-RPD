import {faker} from '@faker-js/faker';

import {getFromBackend, postToBackend} from './utils.js'
import {dois} from './real-data.js';

export async function generateMentions(){
  try{
    const mentions = await postToBackend('/mention', createMentions())
    const ids = mentions.map(a=>a.id)
    // return list of added ids
    return ids
  }catch(e){
    console.log("failed to generate mentions...getting existing ones")
    // try to get existing ones
    const mentions = await getFromBackend('/mention?select=id')
    const ids = mentions.map(a=>a.id)
    return ids
  }
}

export function createMentions(amountExtra = 100) {
	const mentionTypes = [
		'blogPost',
		'book',
		'bookSection',
		'computerProgram',
		'conferencePaper',
		'dataset',
		'interview',
		'highlight',
		'journalArticle',
		'magazineArticle',
		'newspaperArticle',
		'poster',
		'presentation',
		'report',
		'thesis',
		'videoRecording',
		'webpage',
		'workshop',
		'other',
	];

	const result = [];

	// first use up all the DOIs, then generate random mentions without DOI
	for (const doi of dois) {
		result.push({
			doi: doi,
			url: 'https://doi.org/' + doi,
			title: faker.music.songName(),
			authors: faker.helpers.maybe(() => faker.person.fullName(), 0.8) ?? null,
			publisher: faker.helpers.maybe(() => faker.company.name(), 0.8) ?? null,
			publication_year: faker.number.int({max: 2026, min: 2000}),
			journal: faker.helpers.maybe(() => faker.company.name(), 0.8) ?? null,
			page: faker.helpers.maybe(() => faker.number.int({max: 301, min: 0}), 0.1) ?? null,
			image_url: null,
			mention_type: faker.helpers.arrayElement(mentionTypes),
			source: 'faker',
			version: faker.helpers.maybe(() => faker.system.semver(), 0.8) ?? null,
			note: faker.helpers.maybe(() => faker.company.catchPhrase(), 0.3) ?? null,
		});
	}

	for (let index = 0; index < amountExtra; index++) {
		result.push({
			doi: null,
			url: faker.internet.url(),
			title: faker.music.songName(),
			authors: faker.helpers.maybe(() => faker.person.fullName(), 0.8) ?? null,
			publisher: faker.helpers.maybe(() => faker.company.name(), 0.8) ?? null,
			publication_year: faker.number.int({max: 2026, min: 2000}),
			journal: faker.helpers.maybe(() => faker.company.name(), 0.8) ?? null,
			page: faker.helpers.maybe(() => faker.number.int({max: 301, min: 0}), 0.1) ?? null,
			image_url: null,
			mention_type: faker.helpers.arrayElement(mentionTypes),
			source: 'faker',
			version: faker.helpers.maybe(() => faker.system.semver(), 0.8) ?? null,
			note: faker.helpers.maybe(() => faker.company.catchPhrase(), 0.3) ?? null,
		});
	}

	return result;
}


export function generateMentionsForEntity(idsEntity, idsMention, nameEntity) {
	const result = [];

	for (const idEntity of idsEntity) {
		const nummerOfMentions = faker.number.int({max: 11, min: 0});
		if (nummerOfMentions === 0) continue;

		const mentionIdsToAdd = faker.helpers.arrayElements(idsMention, nummerOfMentions);
		for (const mentionId of mentionIdsToAdd) {
			result.push({
				[nameEntity]: idEntity,
				mention: mentionId,
			});
		}
	}

	return result;
}
