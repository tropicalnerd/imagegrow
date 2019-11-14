// Get elements
const html = document.querySelector('html');
const figures = document.querySelectorAll('.imlarge');
const closeButton =
  `<button class="button imlarge__close-button" >
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

function imgKeys() {
  if (event.keyCode === 13) {
    grow(this);
  }
}

function closeKeys(img) {
  if ([9, 13, 27, 32].includes(event.keyCode)) {
    event.preventDefault();
    shrink(img);
  }
}

function grow(img) {
  const windowWidth = html.getBoundingClientRect().width;
  const windowHeight = window.innerHeight;

  const figure = img.parentNode;
  const close = figure.querySelector('.imlarge__close-button');
  const clickPlate = figure.querySelector('.imlarge__click-plate');

  const imgOffset = img.getBoundingClientRect();
  const imgTop = imgOffset.top;
  const imgLeft = imgOffset.left;
  const imgWidth = imgOffset.width;
  const imgHeight = imgOffset.height;
  
  const closeHeight = close.getBoundingClientRect().height;

  const windowAspect = windowHeight / windowWidth;  
  const imgAspect = imgHeight / imgWidth;
  
  let windowMargin, closeMargin;
  if (windowAspect <= 1) {
    windowMargin = .15 * windowHeight;
    closeMargin = 16 + .04 * windowHeight;
  } else {
    windowMargin = .15 * windowWidth;
    closeMargin = 16 + .04 * windowWidth; 
  }

  // Determine maximum size for image
  const maxGrowWidth = windowWidth - (windowMargin * 2);
  const maxGrowHeight = windowHeight - windowMargin - closeHeight - (closeMargin * 2);
  const maxGrowAspect = maxGrowHeight / maxGrowWidth;

  let growWidth, growHeight

  // Chooses whether to use window width or height as the constraining dimension
  if (imgAspect <= maxGrowAspect) {
    growWidth = maxGrowWidth;
    growHeight = growWidth * imgAspect;
  } else {
    growHeight = maxGrowHeight;
    growWidth = growHeight / imgAspect;
  }
  
  const growShiftY = -imgTop + (windowHeight - imgHeight - closeHeight - (closeMargin * 2)) / 2 ;
  const growShiftX = -imgLeft + (windowWidth - imgWidth) / 2;
  const growScale = growHeight / imgHeight;

  const closeTop = (windowHeight + growHeight - closeHeight - closeMargin) / 2;
  
  if (growScale > 1.125) {
    figure.setAttribute('style', `width: ${imgWidth}px; height: ${imgHeight}px`);
    figure.classList.add('grow');
    img.setAttribute('style', `position: fixed; transition: transform ${durationCSS} ease; top: ${imgTop}px; left: ${imgLeft}px; width: ${imgWidth}px; transform: translate(${growShiftX}px, ${growShiftY}px) scale(${growScale})`);
    img.setAttribute('tabindex', '-1');
    close.setAttribute('style', 'display: block');
    close.focus();
    clickPlate.style.display = 'block';
    setTimeout(function() {
      close.setAttribute('style', `display: block; top: ${closeTop}px; opacity: 1;`);
    }, 20);
  }
}

function shrink(img) {
  const figure = img.parentNode;
  const close = figure.querySelector('.imlarge__close-button');
  const clickPlate = figure.querySelector('.imlarge__click-plate');

  const imgTop = Number(img.style.top.slice(0, -2));
  
  const figureOffset = figure.getBoundingClientRect();
  const figureTop = figureOffset.top;

  const growShiftX = 0;
  const growShiftY = figureTop - imgTop;
  const growScale = 1;

  img.style.transform = `scale(${growScale}) translate(${growShiftX}px, ${growShiftY}px)`;
  close.style.opacity = 0
  clickPlate.setAttribute('style', 'display: none');

  setTimeout(function () {
    img.setAttribute('style', 'position: static; transition: unset');
    img.setAttribute('tabindex', '0');
    img.focus(); 
    close.removeAttribute('style');
    figure.classList.remove('grow');
    figure.removeAttribute('style');

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
  figure.append(template.content.firstChild);
  const close = figure.querySelector('.imlarge__close-button');

  // Create click plate
  template.innerHTML = `<div class="imlarge__click-plate" style="display: none"></div>`;
  figure.prepend(template.content.firstChild);
  const clickPlate = figure.querySelector('.imlarge__click-plate');

  // Add event listeners
  img.addEventListener('load', function() {
    img.addEventListener('click', toggleGrow);
    img.addEventListener('keyup', imgKeys);
    img.setAttribute('tabindex', '0');      
    close.addEventListener('click', () => shrink(img));
    close.addEventListener('keydown', () => closeKeys(img));
    clickPlate.addEventListener('click', () => shrink(img));
  });
});

