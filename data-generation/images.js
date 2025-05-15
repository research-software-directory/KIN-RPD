// SPDX-FileCopyrightText: 2022 Dusan Mijatovic (dv4all)
// SPDX-FileCopyrightText: 2022 dv4all
// SPDX-FileCopyrightText: 2023 - 2024 Ewan Cahen (Netherlands eScience Center) <e.cahen@esciencecenter.nl>
// SPDX-FileCopyrightText: 2023 - 2024 Netherlands eScience Center
//
// SPDX-License-Identifier: Apache-2.0

import fs from 'fs/promises';
import {getFromBackend, mimeTypeFromFileName,postToBackend} from "./utils.js"

export const images = [
	'img/213x640-pexels-1262302.png',
	'img/426x640-pexels-357573.jpg',
	'img/480x480-pexels-54455.png',
	'img/480x720-pexels-67552.jpg',
	'img/640x640-pexels-940302.jpg',
	'img/720x720-pexels-1391487.jpg',
	'img/960x640-pexels-1391487.png',
	'img/960x720-pexels-70842.jpg',
	'img/1440x720-pexels-989946.jpg',
	'img/1600x900-pexels-17609.jpg',
	'img/1728x1080-pexels-1630588.jpg',
	'img/1920x1080-pexels-1424246.jpg',
	'img/1920x1200-pexels-1207875.jpg',
	'img/1920x1200-pexels-247502.jpg',
	'img/abacaxi-fruit-pineapple-svgrepo-com.svg',
	'img/amoras-fruit-svgrepo-com.svg',
	'img/bee-svgrepo-com.svg',
	'img/hibiscus-svgrepo-com.svg',
	'img/supportfemale-svgrepo-com.svg',
	'img/supportmale-svgrepo-com.svg',
];

export const organisationLogos = [
	'img/logos/AMOLF.jpg',
	'img/logos/Amsterdamuniversitylogo.svg',
	'img/logos/Eindhoven_University_of_Technology_logo_new.png',
	'img/logos/Erasmus_University_Rotterdam_Stacked_logo_Colour.png',
	'img/logos/Nikhef_logo_red-on-white.svg',
	'img/logos/NWO_logo_-_RGB.jpg',
	'img/logos/Radboud_Universiteit.jpg',
	'img/logos/Sron-Logo_kleur_RGB.jpg',
	'img/logos/UniversiteitLeidenLogo.svg',
];

export const softwareLogos = [
	'img/software/Apache_Airavata_Logo.svg',
	'img/software/Apache_Camel_Logo.svg',
	'img/software/Apache_kafka.svg',
	'img/software/Apache_Kylin_logo.svg',
	'img/software/GNU_Compiler_Collection_logo.svg',
	'img/software/ibis-logo.png',
	'img/software/JavaGAT.png',
	'img/software/manta_flipped.jpg',
	'img/software/Tux.svg',
	'img/software/Xenon_logo.svg',
];


// returns the IDs of the images after they have been posted to the database
export async function getLocalImageIds(fileNames) {
	const imageAsBase64Promises = [];

	for (let index = 0; index < fileNames.length; index++) {
		const fileName = fileNames[index];
		imageAsBase64Promises[index] = fs.readFile(fileName, {encoding: 'base64'}).then(base64 => {
			return {
				data: base64,
				mime_type: mimeTypeFromFileName(fileName),
			};
		});
	}

	const imagesAsBase64 = await Promise.all(imageAsBase64Promises);
	// create images
	let images = await postToBackend('/image?select=id', imagesAsBase64);
	// same images posted - no return
	if (images.length === 0){
		// get images from backend
		images = await getFromBackend('/image?select=id')
	}
	const ids = images.map(a => a.id);
	return ids;
}


// returns the IDs of the images after they have been posted to the database
export async function downloadAndGetImages(urlGenerator, amount) {
	const imageAsBase64Promises = [];
	const timeOuts = [];
	for (let index = 0; index < amount; index++) {
		const url = urlGenerator();
		imageAsBase64Promises.push(
			Promise.race([
				fetch(url)
					.then(resp => {
						clearTimeout(timeOuts[index]);
						return resp.arrayBuffer();
					})
					.then(ab => Buffer.from(ab))
					.then(bf => bf.toString('base64')),
				new Promise((res, rej) => (timeOuts[index] = setTimeout(res, 3000))).then(() => {
					console.warn('Timeout for ' + url + ', skipping');
					return null;
				}),
			]),
		);
	}
	const imagesAsBase64 = await Promise.all(imageAsBase64Promises);

	const imagesWithoutNulls = imagesAsBase64
		.filter(img => img !== null)
		.map(base64 => {
			return {data: base64, mime_type: 'image/jpeg'};
		});

	const resp = await postToBackend('/image?select=id', imagesWithoutNulls);
	const idsAsObjects = await resp.json();
	const ids = idsAsObjects.map(idAsObject => idAsObject.id);
	return ids;
}
