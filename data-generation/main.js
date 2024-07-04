
import {generateOrcids} from './utils.js';
import {generateAccounts} from './accounts.js'
import {generateMentions} from './mentions.js'
import {generateSoftware} from './software.js'
import {generateProject} from './project.js'
import {generateOrganisation} from './organisations.js'
import {generateCommunities} from './community.js'
import {generateNews,generateMetaPages} from './news.js'

// start of running code, main
const orcids = generateOrcids();

// generate accounts and mentions
const [
	accounts,
	idsMentions
] = await Promise.all([
	generateAccounts(orcids),
	generateMentions()
])

console.log("accounts...", accounts.length)
console.log("mentions...", idsMentions.length)

// software, projects, news and meta pages
const [
	// idsSoftware,
	idsProjects,
	idsNews,
	idsMeta
] = await Promise.all([
	// generateSoftware({orcids,idsMentions}),
	generateProject({orcids,idsMentions}),
	generateNews(),
	generateMetaPages()
])

// console.log("software...", idsSoftware.length)
console.log("projects...", idsProjects.length)
console.log("news...", idsNews.length)
console.log("meta pages...", idsMeta.length)

// organisations and communities
const [
	idsOrganisations,
	// idsCommunities,
] = await Promise.all([
	generateOrganisation({idsSoftware:[],idsProjects,idsMentions}),
	// generateCommunities({idsSoftware}),
])

console.log("organisations...", idsOrganisations.length)

// console.log("communities...", idsCommunities.length)
console.log('Done');

// This is unfortunately needed, because when using docker compose, the node process might hang for a long time
process.exit(0);
