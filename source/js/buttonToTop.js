(function() {
  const buttonTop = document.querySelector('.buttonToTop');

  if (!buttonTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 1500) {
      visuallyBtn();
    }
    else {
      notVisuallyBtn();
    }

    buttonTop.addEventListener('click', scrollToTop);
  });

  function visuallyBtn() {
    buttonTop.classList.remove('buttonToTop__scroll--hidden');
  };

  function notVisuallyBtn() {
    buttonTop.classList.add('buttonToTop__scroll--hidden');
  };

  function scrollToTop() {
    window.scrollTo ({
      top: 0,
      behavior: 'smooth',
    })
  };
})();
