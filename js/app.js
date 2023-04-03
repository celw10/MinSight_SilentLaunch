// ============================================================================
// Slideshow
// ============================================================================

// Initalize on first slide
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

//Slideshow fuction
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  //Initiate the animation here before slide change
  slides[slideIndex-1].style.animationPlayState = 'running';

  //Change slide and dot
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// ============================================================================
// Cursor
// ============================================================================

// Constants from the DOM
const cursorTrace = document.querySelector("#cursorTrace");
const cursorText = document.querySelector("#cursorText")

// globals for current mouse x / y coordinates and offset
let x = 0;
let y = 0;
let y_off = 0;

// globals for tracer position
let tracerX = 0;
let tracerY = 0;

// acceleration speed of cursor animation
let speed = 0.2;

// Animation function for cursor movements (found on SO)
function animate(){
  
  let distX = x - tracerX;
  let distY = y - tracerY;
  
  tracerX = tracerX + (distX * speed);
  tracerY = tracerY + (distY * speed);
  
  cursorTrace.style.left = tracerX + "px";
  cursorTrace.style.top = tracerY + "px";
  
  requestAnimationFrame(animate);
}
animate();

// Declare a throttler to avoid blowing up our browser - More on this?
let throttle = (func, delay) => {
  let prev = Date.now() - delay;
  return (...args) => {
    let current = Date.now();
    if (current - prev >= delay) {
      prev = current;
      func.apply(null, args);
    }
  }
};

// Declare a callback for updating our globals and tracer position
const handleMouseMove = (event) =>
{
  x = event.pageX;
  y = event.pageY;
  y_off = event.offsetY
  cursorTrace.style.top = `${y}px`;
  cursorTrace.style.left = `${x}px`;
}

// listener for tracking mouse position
document.addEventListener("mousemove", throttle(handleMouseMove, 10));

// listener for testing coordinates stored in globals
document.addEventListener("click", (event) => {
  console.log(x, y);
});

// Rock Type List Elements to Grab
const chris = document.getElementById("cwContact");
const brandon = document.getElementById("brContact");

// Generic function for displaying custom data @ the tracer
const handleElementMessage = (element_ref, message) =>{
  
  // extract element's container data from DOM
  const {x: left_bound, width, height } = element_ref.getBoundingClientRect();

  // infer right bounding rect extent
  const right_bound = left_bound + width;

  // set up checks for validating if the cursor is on the element or not
  const x_check = ( left_bound < x && x < right_bound ) ? true : false;
  const y_check = (0 < y_off && y_off < height ) ? true : false;

  if (x_check && y_check) {

    // Set text based off image hover
    cursorText.innerHTML = message;

    // Run text animation on image hover
    cursorText.style.animationName = 'textAppear';
    cursorText.style.animationPlayState = 'running';
  }
}

const handleMessageReset = () => {

  // Reset text animation;
  cursorText.style.animationName = 'revertTextAppear';
}

//Event listners for defined elements

chris.addEventListener('mousemove', () => {handleElementMessage(chris, `CEO Chris Williams`)})
chris.addEventListener('mouseleave', () => {handleMessageReset(chris)})

brandon.addEventListener('mousemove', () => {handleElementMessage(brandon, `COO Brandon Randell`)})
brandon.addEventListener('mouseleave', () => {handleMessageReset(brandon)})