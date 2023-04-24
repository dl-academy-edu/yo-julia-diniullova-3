(function() {
  const slider = document.querySelector('.slider');
  const wrapper = slider.querySelector('.slider__wrapper');
  const buttonLeft = slider.querySelector('.slider__btn--left');
  const buttonRight = slider.querySelector('.slider__btn--right');
  const innerWrapper = wrapper.querySelector('.slider__inner-wrapper');
  const pagination = slider.querySelector('.slider__pagination')
  const slides = [...innerWrapper.querySelectorAll('.slider__slide')];
  const slidesCount = slides.length;
  const dots = [];
  const animationDuration = 500;

  let timer = null;
  let wrapperWidth = wrapper.offsetWidth;
  let activeSlideIndex = 0;

  initWidth();
  createDots();
  setActiveSlide(0);

  window.addEventListener('resize', () => {
    initWidth();
    setActiveSlide(activeSlideIndex);
  })

  buttonLeft.addEventListener('click', () => {
    setActiveSlide(activeSlideIndex - 1);
  });

  buttonRight.addEventListener('click', () => {
    setActiveSlide(activeSlideIndex + 1);
  });

  function setActiveSlide(index, withAnimation = true) {
    if (index < 0 || index >= slidesCount) return;

    innerWrapper.style.transform = `translateX(${index * wrapperWidth * (-1)}px)`;

    buttonLeft.removeAttribute('disabled');
    buttonRight.removeAttribute('disabled');

    if (withAnimation) {
      clearTimeout(timer);
      innerWrapper.style.transition = 'transform ${animationDuration}ms';
      timer = setTimeout(() => {
        innerWrapper.style.transition = '';
      }, animationDuration);
    }

    if (index === 0) {
      buttonLeft.setAttribute('disabled', 'disabled');
    }

    if (index === slidesCount - 1) {
      buttonRight.setAttribute('disabled', 'disabled');
    }

    dots[activeSlideIndex].classList.remove('slider__dot--active');
    dots[index].classList.add('slider__dot--active');
    activeSlideIndex = index;
  }

  function initWidth() {
    wrapperWidth = wrapper.offsetWidth;

    slides.forEach(slide => {
      slide.style.width = `${wrapperWidth}px`;
    });
  }

  function createDots() {
    for (let i = 0; i < slidesCount; i++) {
      const dot = createDot(i);
      dots.push(dot);
      pagination.insertAdjacentElement('beforeend', dot);
    }
  }

  function createDot(index) {
    const dot = document.createElement('button');
    dot.classList.add('slider__dot');

    if (index == activeSlideIndex) {
      dot.classList.add('slider__dot--active');
    }

    dot.addEventListener('click', () => {
      setActiveSlide(index);
    })
    return dot;
  }
})();
