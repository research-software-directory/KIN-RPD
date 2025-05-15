import {faker} from '@faker-js/faker';
import {
  postToBackend,
  generateUniqueCaseInsensitiveString,
  generateRelationsForDifferingEntities
} from "./utils.js";
import {organisationLogos,getLocalImageIds} from './images.js';

export async function generateOrganisation({idsSoftware,idsProjects,idsMentions,amount=500}){
  const localOrganisationLogoIds = await getLocalImageIds(organisationLogos);

  const data = createOrganisations(localOrganisationLogoIds)
  const organisations = await postToBackend('/organisation',data)
  const idsOrganisations = organisations.map(o=>o.id)

  const orgData = await Promise.all([
    postToBackend('/software_for_organisation',
      generateRelationsForDifferingEntities(idsSoftware, idsOrganisations, 'software', 'organisation'),
    ),
    postToBackend('/project_for_organisation',
      generateProjectForOrganisation(idsProjects, idsOrganisations)
    ),
    postToBackend('/release', idsSoftware.map(id => ({software: id}))),
    postToBackend('/release_version',
      generateRelationsForDifferingEntities(idsSoftware, idsMentions, 'release_id', 'mention_id', 100)
    )
  ])

  return idsOrganisations
}

export function createOrganisations(localOrganisationLogoIds,amount = 500) {
	const rorIds = [
		'https://ror.org/000k1q888',
		'https://ror.org/006hf6230',
		'https://ror.org/008pnp284',
		'https://ror.org/00f9tz983',
		'https://ror.org/00x7ekv49',
		'https://ror.org/00za53h95',
		'https://ror.org/012p63287',
		'https://ror.org/01460j859',
		'https://ror.org/014w0fd65',
		'https://ror.org/016xsfp80',
		'https://ror.org/018dfmf50',
		'https://ror.org/01bnjb948',
		'https://ror.org/01deh9c76',
		'https://ror.org/01hcx6992',
		'https://ror.org/01k0v6g02',
		'https://ror.org/01ryk1543',
		'https://ror.org/027bh9e22',
		'https://ror.org/02e2c7k09',
		'https://ror.org/02e7b5302',
		'https://ror.org/02en5vm52',
		'https://ror.org/02jx3x895',
		'https://ror.org/02jz4aj89',
		'https://ror.org/02w4jbg70',
		'https://ror.org/030a5r161',
		'https://ror.org/031m0hs53',
		'https://ror.org/041kmwe10',
		'https://ror.org/04bdffz58',
		'https://ror.org/04dkp9463',
		'https://ror.org/04njjy449',
		'https://ror.org/04qw24q55',
		'https://ror.org/04s2z4291',
		'https://ror.org/04x6kq749',
		'https://ror.org/052578691',
		'https://ror.org/054hq4w78',
		'https://ror.org/055d8gs64',
		'https://ror.org/05dfgh554',
		'https://ror.org/05jxfge78',
		'https://ror.org/05kaxyq51',
		'https://ror.org/05v6zeb66',
		'https://ror.org/05xvt9f17',
	];

	const names = [];
	for (let index = 0; index < amount; index++) {
		const maxWords = faker.helpers.maybe(() => 5, {probability: 0.8}) ?? 31;
		const name = generateUniqueCaseInsensitiveString(() =>
			('Organisation ' + faker.word.words(faker.number.int({max: maxWords, min: 1}))).substring(0, 200),
		);
		names.push(name);
	}

	const result = [];

	for (let index = 0; index < amount; index++) {
		result.push({
			parent: null,
			primary_maintainer: null,
			slug: faker.helpers.slugify(names[index]).toLowerCase().replaceAll(/-{2,}/g, '-').replaceAll(/-+$/g, ''), // removes double dashes and trailing dashes
			name: names[index],
			short_description:
				faker.helpers.maybe(() => faker.commerce.productDescription(), {
					probability: 0.8,
				}) ?? null,
			ror_id: index < rorIds.length ? rorIds[index] : null,
			website: faker.internet.url(),
			is_tenant: !!faker.helpers.maybe(() => true, {probability: 0.05}),
			country:
				faker.helpers.maybe(() => faker.location.country(), {
					probability: 0.8,
				}) ?? null,
			logo_id:
				faker.helpers.maybe(() => localOrganisationLogoIds[index % localOrganisationLogoIds.length], {
					probability: 0.8,
				}) ?? null,
		});
	}

	return result;
}

export function generateProjectForOrganisation(idsProjects, idsOrganisations) {
	const result = generateRelationsForDifferingEntities(idsProjects, idsOrganisations, 'project', 'organisation');

	const roles = ['funding', 'hosting', 'participating'];
	result.forEach(entry => {
		entry['role'] = faker.helpers.arrayElement(roles);
	});

	return result;
}

