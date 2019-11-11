// Init
console.log('Init imagegrow.js');

// Get elements
const figures = document.querySelectorAll('.text-block__figure');
const imgs = document.querySelectorAll('.text-block__figure > img');
const body = document.querySelector('body');

// Convert duration custom property to milliseconds
const duration = 1000 * Number(getComputedStyle(document.documentElement).getPropertyValue('--duration').slice(0, -1));
console.log(duration);

// Functions

// @params img as Node
function grow(img) {
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
  
  const growShiftY = (-imgTop + (windowHeight - imgHeight) / 2).toFixed(2);
  const growShiftX = (-imgLeft + (windowWidth - imgWidth) / 2).toFixed(2);
  const growScale = (growWidth / imgWidth).toFixed(2);
  
  img.style.setProperty('--img-top', imgTop + 'px');
  img.style.setProperty('--img-left', imgLeft + 'px');
  img.style.setProperty('--grow-shift-x', growShiftX + 'px');
  img.style.setProperty('--grow-shift-y', growShiftY + 'px');
  img.style.setProperty('--grow-scale', growScale);

  img.classList.add('grow');
}

function shrink(img) {
  const figure = img.parentNode;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const figureOffset = figure.getBoundingClientRect();
  const figureTop = figureOffset.top;
  const figureLeft = figureOffset.left;
  const figureWidth = figureOffset.width;
  const figureHeight = figureOffset.height;
  

}

function toggleGrow() {
  const img = this;

  if (this.classList.contains('grow')) {
    shrink(img);

    this.classList.remove('grow');
  } else {
    grow(img);
  }
}

function shrinkAll() {
  console.log('shrinkAll')
  imgs.forEach(function(img) {
    if (img.classList.contains('grow')) {
      img.classList.remove('grow');  
    }             
  });
  
  document.removeEventListener('click', shrinkAll);
}

// Event Listeners
imgs.forEach(function(figure) {
   figure.addEventListener('click', toggleGrow);              
});

