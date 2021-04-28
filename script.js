const imageContainer = document.getElementById('img-container')
const loader = document.getElementById('loader')

// Unsplash API
const apiKey = 'ic6_fTcfYbIF1De_IVFQwkyUke2iYGuVpiRiDxsXJu8'
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

let photosArray = [];

// Create Elements for Links & Photos, Add to DOM 
function displayPhotos() { 
    // Run function for each object in photosArray
    photosArray.forEach(photo => {
         // Create <a> link to Unsplash
         const item = document.createElement('a');
         item.setAttribute('href',photo.links.html);
         item.setAttribute('target', '_blank')

         // Create <img> for photos 
         const img = document.createElement('img');
         img.setAttribute('src',photo.urls.regular)
         img.setAttribute('alt',photo.alt_description)
         img.setAttribute('title',photo.alt_description)

         // Put <img> inside <a>, then put both inside imageContainer element
         item.appendChild(img)
         imageContainer.appendChild(item)
    });


}

// Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl)
        photosArray = await response.json();
        console.log(photosArray)
        displayPhotos();
    }catch(err){
        console.log(err)
    }
}

getPhotos();
