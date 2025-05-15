import {faker} from '@faker-js/faker';

import {postToBackend} from './utils.js'

export async function generateAccounts(orcids){
  const accounts = await postAccountsToBackend(100);
  const ids = accounts.map(a => a.id)
  const logins = await postToBackend('/login_for_account', generateLoginForAccount(ids, orcids))
	// console.log('accounts, login_for_accounts done');
	return ids
}

export async function postAccountsToBackend(amount = 100) {
	const accounts = [];
	for (let i = 0; i < amount; i++) {
		accounts.push({
			public_orcid_profile: !!faker.helpers.maybe(() => true, {
				probability: 0.8,
			}),
			agree_terms: !!faker.helpers.maybe(() => true, {probability: 0.8}),
			notice_privacy_statement: !!faker.helpers.maybe(() => true, {
				probability: 0.8,
			}),
		});
	}

	return postToBackend('/account', accounts);
}

// Generate one login_for_account per given account
export function generateLoginForAccount(accountIds, orcids) {
	const homeOrganisations = [null];
	for (let i = 0; i < 10; i++) {
		homeOrganisations.push('Organisation for ' + faker.word.noun());
	}
	const providers = ['ipd1', 'idp2', 'idp3', 'ip4'];

	let orcidsAdded = 0;
	const login_for_accounts = [];
	accountIds.forEach(accountId => {
		let firstName = faker.person.firstName();
		let givenName = faker.person.lastName();

		if (orcidsAdded < orcids.length) {
			const orcid = orcids[orcidsAdded];
			orcidsAdded += 1;
			login_for_accounts.push({
				account: accountId,
				name: firstName + ' ' + givenName,
				email: faker.internet.email({
					firstName: firstName,
					lastName: givenName,
				}),
				sub: orcid,
				provider: 'orcid',
				home_organisation: faker.helpers.arrayElement(homeOrganisations),
				last_login_date:
					faker.helpers.maybe(() => faker.date.past({years: 3}), {
						probability: 0.8,
					}) ?? null,
			});
		} else {
			login_for_accounts.push({
				account: accountId,
				name: firstName + ' ' + givenName,
				email: faker.internet.email({
					firstName: firstName,
					lastName: givenName,
				}),
				sub: faker.string.alphanumeric(30),
				provider: faker.helpers.arrayElement(providers),
				home_organisation: faker.helpers.arrayElement(homeOrganisations),
				last_login_date:
					faker.helpers.maybe(() => faker.date.past({years: 3}), {
						probability: 0.8,
					}) ?? null,
			});
		}
	});
	return login_for_accounts;
}

