const imageContainer = document.getElementById('imageContainer');
const loader = document.getElementById('loader');

const apiKey = `4PIVvx50MtbYRcoAEIGP1FetJg90i2XvkKEQBRXCp7k`;
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];

// image loaded fn
let ready = false;
let imageCount = 0;
let totalCount = 0;


function imageloaded() {
	imageCount++;
	if(imageCount === totalCount) {
		ready = true;
		loader.hidden = true;
		imageCount = 0;
	}
}

// helper fn for adding attributes
function setAttributes(element, attributes) {
	for(const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Add photos to DOM
function displayPhotos() {

	totalCount = photosArray.length;


	photosArray.forEach((photo)=> {
	const anchor = document.createElement('a');
	setAttributes(anchor, {
		href: photo.links.html,
		target: '_blank'
	});

	const img = document.createElement('img');
	setAttributes(img, {
		src: photo.urls.regular,
		alt: photo.alt_description,
		title: photo.alt_description
	});

	img.addEventListener('load', imageloaded);

	imageContainer.appendChild(anchor);
	anchor.appendChild(img);
});
}

// get photos from unsplash 
async function getPhotos() {

	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();

		displayPhotos();
		
	} catch (error) {
		console.log('oops something went wrong', error);
	}
}

// load photos on scroll

window.addEventListener('scroll', ()=> {

	if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
});

getPhotos();

//////////////////////////////////////
//flow

/* 
	phase -1 
	last proejct was using free api w/o key this one is with api key
	made 3 const, one for apikey, one for count and one for url
	this url is from unsplash, we used `` so that we can put variables too
	made a fn get photos, fetch photos then convert json 
	console.log it



	phase -2
	now we saw that photos load.
	lets make a function to load pics and display on webpage.
	we used combo of creatElement and setAttribute.
	then used appendchild 
	finally call that fn in getPhotos

	phase -3
	we introduced a helper fn, and use a for loop.
	fn takes in element and array fetched from unsplash
	for each key in attributes, element.setAttribute(key, attributes[key])
	
*/