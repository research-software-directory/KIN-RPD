
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
] = await Promise.allSettled([
	generateAccounts(orcids),
	generateMentions()
])

if (accounts.status==='fulfilled'){
	console.log("accounts...DONE...", accounts.value.length)
}else{
	console.log("accounts...FAILED...", accounts.reason)
}

if(idsMentions.status==='fulfilled'){
	console.log("mentions...DONE...", idsMentions.value.length)
}else{
	console.log("mentions...FAILED...", idsMentions.reason)
}

// software, projects, news and meta pages
const [
	// idsSoftware,
	idsProjects,
	idsNews,
	idsMeta
] = await Promise.allSettled([
	// generateSoftware({orcids,idsMentions}),
	generateProject({
		orcids,
		idsMentions:idsMentions.value
	}),
	generateNews(),
	generateMetaPages()
])

if (idsProjects.status==='fulfilled'){
	// console.log("software...", idsSoftware.length)
	console.log("projects...DONE...", idsProjects.value.length)
}else{
	console.log("projects...FAILED...", idsProjects.reason)
}

if (idsNews.status==='fulfilled'){
	console.log("news...DONE...", idsNews.value.length)
}else{
	console.log("news...FAILED...", idsNews.reason)
}

if (idsMeta.status==='fulfilled'){
	// console.log("news...", idsNews.length)
	console.log("meta pages...DONE...", idsMeta.value.length)
}else{
	console.log("meta pages...FAILED...", idsMeta.reason)
}

// organisations, news and communities
const [
	idsOrganisations,
	// idsCommunities,
] = await Promise.allSettled([
	generateOrganisation({
		idsSoftware:[],
		idsProjects:idsProjects.value,
		idsMentions: idsMentions.value
	}),
	// generateCommunities({idsSoftware}),
])

if (idsOrganisations.status==='fulfilled'){
	console.log("organisations...DONE...", idsOrganisations.value.length)
}else{
	console.log("organisations...FAILED...", idsOrganisations.reason)
}

console.log('Done');

// This is unfortunately needed, because when using docker compose, the node process might hang for a long time
process.exit(0);
