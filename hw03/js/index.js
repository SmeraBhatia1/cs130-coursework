/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.
 * 
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 * 
 * 3. If you get to the end, start at the beginning. 
 * 
 * 4. If you get to the beginning, loop around to the end.
 * 
 * 
 */

const images = [
    'images/field1.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg',
    'images/daisy1.jpg'
];



const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
            <li class="card">
                <div class="image" onclick="showImage(event);"
                    style="background-image:url('${image}')"
                    data-index="${idx}"></div>
            </li>`;
    });
};

initScreen();


var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("card");
  var dots = document.getElementsByClassName("demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}



const showImage = (ev) => {
    const elem = ev.currentTarget;
    console.log(elem.style.backgroundImage);

    // your job: set the .featured_image's backgroundImage to the
    // element that was just clicked.
};


// attach event handler to all of the image tags 
// (after initScreen() has been invoked).

// first get all of the image elements from the DOM:
const imageElements = document.querySelectorAll('.image');


// then loop through each one and attach an event handler
// to each element's click event:
for (const elem of imageElements) {
    elem.onclick = showImage;
}
document.querySelector('#showImage').onclick = showImage;




//----------
// tutorial 6 solutions (for guidance)
// let i = 0;
// for (const track of tracks) {
//     const template = `
//         <div data-index="${i}" onclick="playSong(event);">
//             <img src="${track.image_url}" />
//             <h2>${track.name}</h2>
//         </div>`;
//     document.querySelector('main').innerHTML += template;
//     i += 1;
// }

// const playSong = ev => {
//     console.log(ev.currentTarget.dataset.index);
//     const idx = Number(ev.currentTarget.dataset.index);
//     console.log(tracks[idx].preview_url);
//     document.querySelector('#audio-source').src = tracks[idx].preview_url;
    
//     const audio = document.querySelector('audio');
//     audio.load();
//     audio.play();
// };

//--------

// original starter code: 

// const initScreen = () => {
//     images.forEach((image, idx) => {
//         document.querySelector('.cards').innerHTML += `
//             <li class="card">
//                 <div class="image" 
//                     style="background-image:url('${image}')"
//                     data-index="${idx}"></div>
//             </li>`;
//     });
// };

// initScreen();

