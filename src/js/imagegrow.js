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
    const windowMargin = getComputedStyle(document.documentElement).getPropertyValue('--window-margin');

    const windowWidth = window.innerWidth - 2 * windowMargin;
    const windowHeight = window.innerHeight - 2 * windowMargin;

    const imgOffset = this.getBoundingClientRect();
    const imgTop = imgOffset.top;
    const imgLeft = imgOffset.left;
    const imgWidth = this.offsetWidth;
    const imgHeight = this.offsetHeight;
    
    const windowAspect = windowHeight / windowWidth;  
    const imgAspect = imgHeight / imgWidth;
    
    let growWidth, growHeight;
    
    if (imgAspect <= windowAspect) {
      growWidth = windowWidth;
      growHeight = growWidth * imgAspect;
    } else {
      growHeight = windowHeight;
      growWidth = growHeight / imgAspect;
    }
    
    const growTop = windowMargin + (windowHeight - growHeight) / 2;
    const growLeft = windowMargin + (windowWidth - growWidth) / 2;
    const growScale = imgWidth / growWidth;
    
    this.style.setProperty('--img-top', imgTop);
    this.style.setProperty('--img-left', imgLeft);
    this.style.setProperty('--grow-scale', growScale);
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

