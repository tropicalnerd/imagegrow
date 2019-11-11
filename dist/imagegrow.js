// Init
console.log('Init imagegrow.js');

// Get elements
const figures = document.querySelectorAll('.text-block__figure');
const imgs = document.querySelectorAll('.text-block__figure > img');
const body = document.querySelector('body');

// Functions
function toggleGrow() {

  if (this.classList.contains('grow')) {
    
    this.classList.remove('grow');
    // document.removeEventListener('click', shrinkAll);
  } else {
    // const windowMargin = Number(getComputedStyle(document.documentElement).getPropertyValue('--window-margin'));
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const windowMargin = .15 * windowWidth;

    const imgOffset = this.getBoundingClientRect();
    const imgTop = imgOffset.top;
    const imgLeft = imgOffset.left;
    const imgWidth = imgOffset.width;
    const imgHeight = imgOffset.height;
    
    const windowAspect = windowHeight / windowWidth;  
    const imgAspect = imgHeight / imgWidth;
    
    let growWidth, growHeight;

    if (imgAspect <= windowAspect) {
      growWidth = windowWidth - 2 * windowMargin;
      growHeight = growWidth * imgAspect;
    } else {
      growHeight = windowHeight - 2 * windowMargin;
      growWidth = growHeight / imgAspect;
    }
    
    const growY = -imgTop + (windowHeight - imgHeight) / 2;
    // const growLeft = windowMargin + (windowWidth - growWidth) / 2;
    const growScale = growWidth / imgWidth;
    
    this.style.setProperty('--img-top', imgTop + 'px');
    this.style.setProperty('--img-left', imgLeft + 'px');
    this.style.setProperty('--grow-scale', growScale);
    this.style.setProperty('--grow-y', growY + 'px');

    console.log(growWidth, growHeight)
    // this.style.setProperty('--grow-', imgLeft);
    // this.style.setProperty('--img-left', imgLeft);
    
    this.classList.add('grow');
    // document.addEventListener('click', shrinkAll);
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

