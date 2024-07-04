
import {faker} from '@faker-js/faker';

import {postToBackend} from './utils.js';
import {images,getLocalImageIds} from './images.js';

export async function generateNews(){
  const newsImageIds = await getLocalImageIds(images);
  const news = await postToBackend('/news', createNews())
  const newsIds = news.map(n=>n.id)

  const newsData = Promise.all([
    postToBackend('/image_for_news', generateImagesForNews(newsIds, newsImageIds))
  ])

  return newsIds
}

function createNews() {
	const entries = [
		{
			title: 'RSD released',
			slug: 'rsd-released',
		},
		{
			title: 'Some Big News',
			slug: 'some-big-news',
		},
		{
			title: 'You wont believe this!',
			slug: 'you-wont-believe-this',
		},
		{
			title: "The perfect software doesn't exi-",
			slug: 'the-prefect-software-doesnt-exi',
		},
		{
			title: "10 clickbait headlines you didn't know about!",
			slug: '10-clickbait-headlines',
		},
		{
			title: 'You will never use a dependency anymore after you know this...',
			slug: 'never-dependency',
		},
		{
			title: 'Sunsetting the RSD',
			slug: 'sunsetting-the-rsd',
		},
		{
			title: 'The last package you will ever need',
			slug: 'last-package',
		},
		{
			title: 'How to make your project a big success',
			slug: 'project-success',
		},
		{
			title: 'The 5 best dependencies you never heard about',
			slug: '5-best-dependencies',
		},
		{
			title: 'Rewriting the RSD in CrabLang',
			slug: 'rewrite-rsd-crablang',
		},
		{
			title: 'The RSD joins forces with Big Company (tm)',
			slug: 'rsd-joins-big-company',
		},
		{
			title: "3 features you didn't know about",
			slug: '3-features',
		},
		{
			title: 'Interview with RSD founders',
			slug: 'interview-rsd-founders',
		},
	];

	const result = [];
	for (const newsItem of entries) {
		result.push({
			slug: newsItem.slug,
			is_published: !!faker.helpers.maybe(() => true, {probability: 0.8}),
			publication_date: faker.date.anytime(),
			title: newsItem.title,
			author: faker.person.fullName(),
			summary: faker.lorem.paragraph(),
			description: faker.lorem.paragraphs(faker.number.int({max: 20, min: 3}), '\n\n'),
		});
	}

	return result;
}

function generateImagesForNews(newsIds, imageIds) {
	const result = [];

	for (const id of newsIds) {
		if (faker.datatype.boolean(0.2)) {
			continue;
		}

		result.push({
			news: id,
			image_id: faker.helpers.arrayElement(imageIds),
		});
	}

	return result;
}


export async function generateMetaPages(){
  const meta = await postToBackend('/meta_pages', createMetaPages())
  const idsMeta = meta.map(m=>m.id)
  return idsMeta
}

function createMetaPages() {
	const result = [];

	const titles = ['About', 'Terms of Service', 'Privacy Statement'];
	const slugs = ['about', 'terms-of-service', 'privacy-statement'];
	for (let index = 0; index < titles.length; index++) {
		result.push({
			title: titles[index],
			slug: slugs[index],
			description: faker.lorem.paragraphs(10, '\n\n'),
			is_published: true,
			position: index + 1,
		});
	}

	return result;
}