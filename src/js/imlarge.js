// Init
console.log('Init imlarge.js');

// Get elements

const html = document.querySelector('html');
const figures = document.querySelectorAll('.imlarge');
// const imgs = figures.querySelectorAll('img');
// const body = document.querySelector('body');
const closeButton =
  `<button class="button imlarge__close-button">
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
  // const wrap = img.parentNode;

  const windowWidth = html.getBoundingClientRect().width;
  const windowHeight = window.innerHeight;

  const figure = img.parentNode;
  const close = figure.querySelector('.imlarge__close-button');

  const imgOffset = img.getBoundingClientRect();
  const imgTop = imgOffset.top;
  const imgLeft = imgOffset.left;
  const imgWidth = imgOffset.width;
  const imgHeight = imgOffset.height;
  
  const closeHeight = close.getBoundingClientRect().height;
  const closeMargin = 16;

  const windowAspect = windowHeight / windowWidth;  
  const imgAspect = imgHeight / imgWidth;
  
  let windowMargin, growWidth, growHeight, buttonHeight

  // Assign width and height to figure for placeholder
  figure.style.width = imgWidth + 'px';
  figure.style.height = imgHeight + 'px';

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
  
  const growShiftY = -imgTop + (windowHeight - imgHeight) / 2;
  const growShiftX = -imgLeft + (windowWidth - imgWidth) / 2;
  const growScale = growWidth / imgWidth;
  
  img.setAttribute('style', `position: fixed; transition: transform ${durationCSS} ease; top: ${imgTop}px; left: ${imgLeft}px; transform: translate(${growShiftX}px, ${growShiftY}px) scale(${growScale})`);
  // figure.style.setProperty('--img-top', imgTop + 'px');
  // figure.style.setProperty('--img-left', imgLeft + 'px');
  // figure.style.setProperty('--grow-shift-x', growShiftX + 'px');
  // figure.style.setProperty('--grow-shift-y', growShiftY + 'px');
  // figure.style.setProperty('--grow-scale', growScale);

  figure.classList.add('grow');
}

function shrink(img) {
  const figure = img.parentNode;

  const imgTop = Number(img.style.top.slice(0, -2));
  // const imgLeft = Number(getComputedStyle(img).getPropertyValue('--img-left').slice(0, -2));
  
  const figureOffset = figure.getBoundingClientRect();
  const figureTop = figureOffset.top;

  const growShiftX = 0;
  const growShiftY = figureTop - imgTop;
  const growScale = 1;

  // console.log('scrollY:', window.scrollY);
  // console.log('imgTop:', imgTop);
  // console.log('figureTop:', figureTop);
  // console.log('growShiftY:', growShiftY);

  img.style.transform = `scale(${growScale}) translate(${growShiftX}px, ${growShiftY}px)`;

  // figure.style.setProperty('--grow-shift-x', growShiftX + 'px');
  // figure.style.setProperty('--grow-shift-y', growShiftY + 'px');
  // figure.style.setProperty('--grow-scale', growScale);
  
  setTimeout(function () {
    img.setAttribute('style', 'position: static; transition: unset');
    figure.classList.remove('grow');
  }, durationJS);
}

function toggleGrow() {
  const img = this;
  const figure = img.parentNode;

  if (figure.classList.contains('grow')) {
    shrink(img);
  } else {
    grow(img);
  }
}

// Start the thing
figures.forEach(function(figure) {
  const img = figure.querySelector('img');

  // Create close button
  const template = document.createElement('template');
  template.innerHTML = closeButton;

  // Wrap image
  // const wrapper = document.createElement('div')
  // wrapper.classList.add('imlarge__wrap')
  // wrapper.appendChild(img);
  figure.append(template.content.firstChild);
  // figure.appendChild(wrapper);

  // Add event listeners
  img.addEventListener('load', function() {
    img.addEventListener('click', toggleGrow);   
  });
});

