const imageContainer = document.getElementById('img-container')
const loader = document.getElementById('loader')

let ready =false;
let imagesLoaded = 0;
let totalImages = 0; 
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initialCount = 5;
const apiKey = 'ic6_fTcfYbIF1De_IVFQwkyUke2iYGuVpiRiDxsXJu8'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`

function updateAPIURLWithNewCount (picCount) {
    apiUrl =  `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`
}


// Check if all images were loaded 
function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        imagesLoaded = 0;
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element,attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }

}

// Create Elements for Links & Photos, Add to DOM 
function displayPhotos() { 
    totalImages = photosArray.length;
    console.log('total images ',totalImages)
    // Run function for each object in photosArray
    photosArray.forEach(photo => {
         // Create <a> link to Unsplash
         const item = document.createElement('a');
        //  item.setAttribute('href',photo.links.html);
        //  item.setAttribute('target', '_blank')
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        })

         // Create <img> for photos 
         const img = document.createElement('img');
        //  img.setAttribute('src',photo.urls.regular)
        //  img.setAttribute('alt',photo.alt_description)
        //  img.setAttribute('title',photo.alt_description)

        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description

        })

        // Event listener, check when each is finished loading 
        img.addEventListener('load', imageLoaded)

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
        if(isInitialLoad){
            updateAPIURLWithNewCount(10);
            isInitialLoad = false;
        }
    }catch(err){
        console.log(err)
    }
}

// Check to see if scrolling near bottoom of page, Load more Photos
window.addEventListener('scroll', () => {
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
     ready = false;
    getPhotos();
   }
})

getPhotos();
