(function() {
  const checkbox = document.querySelector('.register__checkbox');
  const button = document.querySelector('.register__btn');

  checkbox.onmouseenter = function() {
    button.classList.add('btn--hover');
  }

  checkbox.onmouseleave = function() {
    button.classList.remove('btn--hover');
  }

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      button.classList.remove('btn--hover');
      button.classList.add('btn--active');
      button.removeAttribute('disabled');
    }
    else {
      button.classList.remove('btn--active');
      button.setAttribute('disabled');
    }
})
})();

(function() {
  const checkbox = document.querySelector('.send__checkbox');
  const button = document.querySelector('.send__btn');

  checkbox.onmouseenter = function() {
    button.classList.add('btn--hover');
  }

  checkbox.onmouseleave = function() {
    button.classList.remove('btn--hover');
  }

  checkbox.addEventListener("change", function () {
    if (this.checked) {
      button.classList.remove('btn--hover');
      button.classList.add('btn--active');
      button.removeAttribute('disabled');
    }
    else {
      button.classList.remove('btn--active');
      button.setAttribute('disabled', 'disabled');
    }
})
})();

