//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

//function to download an image
const loadImage = (image) => {
return new Promise((resolve, reject) => {
	const img = new Image();
	img.src = image.url;
	img.onload =() => resolve(img); //resolve the promise when the image is loaded
	img.onerror=() =>
		reject(new Error('Failed to load image's URL: ${image.url}')); //reject if loading fails
		
});
};
//Function to handel the click event and download images in parallel
btn.addEventListener("click", () => {
	//map the array of image URLs into an array of promises
	const promises = images.map((image) => loadImage(image));

	//use promise.all to download all images in parallel
	Promise.all(promises)
	.then((loadedImages) => {
		//clear any previous images
		output.innerHTML = "";

		//Append all successfully loaded images to the output div
		loadedImages.forEacch((img) => {
			output.appendChild(img);
		});
	})
	.catch((error) => {
		//Handle errors if any img fails to load
		console.error(error.message);
	});
});