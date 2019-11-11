// Init
console.log('Init imagegrow.js');

// Get elements
const figures = document.querySelectorAll('.text-block__figure');
const imgs = document.querySelectorAll('.text-block__figure > img');
const body = document.querySelector('body');

// Convert duration custom property to milliseconds
const duration = 1000 * Number(getComputedStyle(document.documentElement).getPropertyValue('--duration').slice(0, -1));

// Functions
// @params img as Node
function grow(img) {
  img.style.transition = 'transform .2s ease';

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Set the margin around enlarged image as percent of window width
  const windowMargin = .15 * windowWidth;

  const imgOffset = img.getBoundingClientRect();
  const imgTop = imgOffset.top;
  const imgLeft = imgOffset.left;
  const imgWidth = imgOffset.width;
  const imgHeight = imgOffset.height;
  
  const windowAspect = windowHeight / windowWidth;  
  const imgAspect = imgHeight / imgWidth;
  
  let growWidth, growHeight;

  // Chooses whether to use window width or height as the constraining dimension
  if (imgAspect <= windowAspect) {
    growWidth = windowWidth - (windowMargin * 2);
    growHeight = growWidth * imgAspect;
  } else {
    growHeight = windowHeight - (windowMargin * 2);
    growWidth = growHeight / imgAspect;
  }
  
  const growShiftY = (-imgTop + (windowHeight - imgHeight) / 2);
  const growShiftX = (-imgLeft + (windowWidth - imgWidth) / 2);
  const growScale = (growWidth / imgWidth);
  
  img.style.setProperty('--img-top', imgTop + 'px');
  img.style.setProperty('--img-left', imgLeft + 'px');
  img.style.setProperty('--grow-shift-x', growShiftX + 'px');
  img.style.setProperty('--grow-shift-y', growShiftY + 'px');
  img.style.setProperty('--grow-scale', growScale);

  img.classList.add('grow');
}

function shrink(img) {
  const figure = img.parentNode;

  const imgTop = Number(getComputedStyle(img).getPropertyValue('--img-top').slice(0, -2));
  
  // const imgLeft = Number(getComputedStyle(img).getPropertyValue('--img-left').slice(0, -2));
  
  const figureOffset = figure.getBoundingClientRect();
  const figureTop = figureOffset.top;

  const growShiftX = 0;
  const growShiftY = figureTop - imgTop;
  const growScale = 1;

  console.log('scrollY:', window.scrollY);
  console.log('imgTop:', imgTop);
  console.log('figureTop:', figureTop);
  console.log('growShiftY:', growShiftY);

  img.style.setProperty('--grow-shift-x', growShiftX + 'px');
  img.style.setProperty('--grow-shift-y', growShiftY + 'px');
  img.style.setProperty('--grow-scale', growScale);

  // const windowWidth = window.innerWidth;
  // const windowHeight = window.innerHeight;

  // const imgTop = img.getBoundingClientRect().top;

  // const shrinkLeft = shrinkOffset.left;
  // const shrinkWidth = shrinkOffset.width;
  // const shrinkHeight = shrinkOffset.height;

  // const shrinkShiftY = -window.scrollY + shrinkOffset.top;
  // const shrinkShiftX
  
  setTimeout(function () {
    img.style.transition='transform 0s linear';
    img.classList.remove('grow')
  }, duration);
}

function toggleGrow() {
  const img = this;

  if (this.classList.contains('grow')) {
    shrink(img);
  } else {
    grow(img);
  }
}

// Event Listeners
imgs.forEach(function(img) {
   img.addEventListener('click', toggleGrow);              
});

