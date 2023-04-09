(function() {
  const form = document.forms.signIn;
  const buttonOpen = document.querySelector('.header__signIn');
  const buttonClose = document.querySelector('.signIn__close');
  const overlay = document.querySelector('.signIn__overlay');

  if (!form) return;

  buttonOpen.addEventListener("click", () => {
    form.classList.add('open');
  });

  buttonClose.addEventListener("click", () => {
    modalClose();
  });

  overlay.addEventListener("click", () => {
    modalClose();
  });

  window.addEventListener('keydown', (e) => {
    if(e.keyCode === 27) {
      modalClose();
    }
  });

  function modalClose () {
    form.classList.remove('open');
  };

})();

(function() {
  const form = document.forms.register;
  const buttonOpen = document.querySelector('.header__register');
  const buttonClose = document.querySelector('.register__close');
  const overlay = document.querySelector('.register__overlay');

  if (!form) return;

  buttonOpen.addEventListener("click", () => {
    form.classList.add('open');
  });

  buttonClose.addEventListener("click", () => {
    modalClose();
  });

  overlay.addEventListener("click", () => {
    modalClose();
  });

  window.addEventListener('keydown', (e) => {
    if(e.keyCode === 27) {
      modalClose();
    }
  });

  function modalClose () {
    form.classList.remove('open');
  };

})();

(function() {
  const form = document.forms.send;
  const buttonOpen = document.querySelector('.footer__btn');
  const buttonClose = document.querySelector('.send__close');
  const overlay = document.querySelector('.send__overlay');

  if (!form) return;

  buttonOpen.addEventListener("click", () => {
    form.classList.add('open');
  });

  buttonClose.addEventListener("click", () => {
    modalClose();
  });

  overlay.addEventListener("click", () => {
    modalClose();
  });

  window.addEventListener('keydown', (e) => {
    if(e.keyCode === 27) {
      modalClose();
    }
  });

  function modalClose () {
    form.classList.remove('open');
  };

})();
