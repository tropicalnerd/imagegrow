// Init
console.log('Init imlarge.js');

// Get elements
const figures = document.querySelectorAll('.imgro');
// const imgs = figures.querySelectorAll('img');
const body = document.querySelector('body');
const closeButton =
  `<button class="close-button">
    <svg role="img"
        class="svg-icon"
        aria-labelledby="close-title"
        focusable="false"
        width="32"
        height="32">
        <title id="close-title">Close Image</title>
        <use xlink:href="#close-button" />
    </svg>
  </button>`

// Convert duration custom property to milliseconds ('0.1s' => 100)
const durationCSS = getComputedStyle(document.documentElement).getPropertyValue('--duration');
const durationJS = 1000 * Number(durationCSS.slice(0, -1));

// Functions
// @params img as Node
function grow(img) {
  img.style.transition = `transform ${durationCSS} ease`;

  const wrap = img.parentNode
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;


  const imgOffset = img.getBoundingClientRect();
  const imgTop = imgOffset.top;
  const imgLeft = imgOffset.left;
  const imgWidth = imgOffset.width;
  const imgHeight = imgOffset.height;
  
  const windowAspect = windowHeight / windowWidth;  
  const imgAspect = imgHeight / imgWidth;
  
  let windowMargin, growWidth, growHeight;

  // Chooses whether to use window width or height as the constraining dimension
  if (imgAspect <= windowAspect) {
    windowMargin = .10 * windowWidth;
    growWidth = windowWidth - (windowMargin * 2);
    growHeight = growWidth * imgAspect;
  } else {
    windowMargin = .10 * windowHeight;
    growHeight = windowHeight - (windowMargin * 2);
    growWidth = growHeight / imgAspect;
  }
  
  const growShiftY = (-imgTop + (windowHeight - imgHeight) / 2);
  const growShiftX = (-imgLeft + (windowWidth - imgWidth) / 2);
  const growScale = (growWidth / imgWidth);
  
  wrap.style.setProperty('--img-top', imgTop + 'px');
  wrap.style.setProperty('--img-left', imgLeft + 'px');
  wrap.style.setProperty('--grow-shift-x', growShiftX + 'px');
  wrap.style.setProperty('--grow-shift-y', growShiftY + 'px');
  wrap.style.setProperty('--grow-scale', growScale);

  wrap.classList.add('grow');
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

  figure.style.setProperty('--grow-shift-x', growShiftX + 'px');
  figure.style.setProperty('--grow-shift-y', growShiftY + 'px');
  figure.style.setProperty('--grow-scale', growScale);
  
  setTimeout(function () {
    img.style.transition='transform 0s linear';
    img.classList.remove('grow')
  }, durationJS);
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
figures.forEach(function(figure) {
  const img = figure.querySelector('img');
  img.addEventListener('click', toggleGrow);

  // Create close button
  const template = document.createElement('template');
  template.innerHTML = closeButton;

  // Wrap image
  const wrapper = document.createElement('div')
  wrapper.classList.add('imgro-wrap')
  wrapper.appendChild(img);
  wrapper.append(template.content.firstChild);
  figure.appendChild(wrapper);
});

