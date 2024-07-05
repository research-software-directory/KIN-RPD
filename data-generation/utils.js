import {faker} from '@faker-js/faker';

import {headers} from './auth.js';

const usedLowerCaseStrings = new Set();

// demo url https://ubuntu2204sudo.demo-nlesc.src.surf-hosted.nl/
const backendUrl = process.env.POSTGREST_URL || 'http://localhost/api/v1';

export async function postToBackend(endpoint, body) {
	const response = await fetch(backendUrl + endpoint, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: headers,
	});

	if (!response.ok) {
		console.warn(
			'Warning: post request to ' +
				endpoint +
				' had status code ' +
				response.status +
				' and body ' +
				(await response.text()),
		);
	}
	const json = await response.json();

	// log posts
	// console.log(`${endpoint}...${json.length}`)
	return json
}

export async function getFromBackend(endpoint) {
	const response = await fetch(backendUrl + endpoint, {headers: headers});
	if (!response.ok) {
		console.warn(
			'Warning: post request to ' +
				endpoint +
				' had status code ' +
				response.status +
				' and body ' +
				(await response.text()),
		);
	}
	const json = await response.json();
	return json
}


export function generateUniqueCaseInsensitiveString(randomStringGenerator) {
	for (let attempt = 0; attempt < 10000; attempt++) {
		const nextString = randomStringGenerator();
		if (usedLowerCaseStrings.has(nextString.toLowerCase())) continue;

		usedLowerCaseStrings.add(nextString.toLowerCase());
		return nextString;
	}
	throw 'Tried to generate a unique (ignoring case) string for 10000 times but failed to do so';
}


export function generateKeywordsForEntity(idsEntity, idsKeyword, nameEntity) {
	const result = [];

	for (const idEntity of idsEntity) {
		const nummerOfKeywords = faker.number.int({max: 3, min: 0});
		if (nummerOfKeywords === 0) continue;

		const keywordIdsToAdd = faker.helpers.arrayElements(idsKeyword, nummerOfKeywords);
		for (const keywordId of keywordIdsToAdd) {
			result.push({
				[nameEntity]: idEntity,
				keyword: keywordId,
			});
		}
	}

	return result;
}

export function generateOrcids(amount = 50) {
	const orcids = new Set();

	while (orcids.size < amount) {
		orcids.add(faker.helpers.replaceSymbolWithNumber('0000-000#-####-####'));
	}

	return [...orcids];
}


export function generatePeopleWithOrcids(orcids, imageIds) {
	const result = [];

	for (const orcid of orcids) {
		result.push({
			email_address: faker.internet.email(),
			family_names: faker.person.lastName(),
			given_names: faker.person.firstName(),
			orcid: orcid,
			avatar_id: faker.helpers.arrayElement(imageIds),
		});
	}

	return result;
}

export function generateRelationsForDifferingEntities(
	idsOrigin,
	idsRelation,
	nameOrigin,
	nameRelation,
	maxRelationsPerOrigin = 11,
) {
	const result = [];

	for (const idOrigin of idsOrigin) {
		const numberOfIdsRelation = faker.number.int({
			max: maxRelationsPerOrigin,
			min: 0,
		});
		const relationsToAdd = faker.helpers.arrayElements(idsRelation, numberOfIdsRelation);
		for (const idRelation of relationsToAdd) {
			result.push({
				[nameOrigin]: idOrigin,
				[nameRelation]: idRelation,
			});
		}
	}

	return result;
}

export function mimeTypeFromFileName(fileName) {
	if (fileName.endsWith('.png')) {
		return 'image/png';
	} else if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
		return 'image/jpg';
	} else if (fileName.endsWith('.svg')) {
		return 'image/svg+xml';
	} else return null;
}

export async function getKeywordIds(){
	const keywords = await getFromBackend('/keyword?select=id')
	const ids = keywords.map(k=>k.id)
	return ids
}

export async function getResearchDomainIds(){
	const domains = await getFromBackend('/research_domain?select=id')
	const ids = domains.map(k=>k.id)
	return ids
}