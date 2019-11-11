// Init
console.log('Init imagegrow.js');

// Get elements
const figures = document.querySelectorAll('.text-block__figure');
const imgs = document.querySelectorAll('.text-block__figure > img');
const body = document.querySelector('body');

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
  
  const growY = -imgTop + (windowHeight - imgHeight) / 2;
  const growScale = growWidth / imgWidth;
  
  img.style.setProperty('--img-top', imgTop + 'px');
  img.style.setProperty('--img-left', imgLeft + 'px');
  img.style.setProperty('--grow-scale', growScale);
  img.style.setProperty('--grow-y', growY + 'px');

  img.classList.add('grow');
}

function toggleGrow() {
  const img = this;

  if (this.classList.contains('grow')) {
    
    this.classList.remove('grow');
    // document.removeEventListener('click', shrinkAll);
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

