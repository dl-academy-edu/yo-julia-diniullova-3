(function() {
  const buttonOpen = document.querySelectorAll('[data-modal]');

  if(!buttonOpen) return;

  const modals = document.querySelectorAll('.modal');
  const buttonClose = document.querySelectorAll('[data-close]');

  for (let element of buttonOpen) {
    element.addEventListener('click', function() {
      let modalId = element.dataset.modal;
      let modal = document.getElementById(modalId);

      modalOpen(modal);
    })
  }

  function modalOpen(modal) {
    modal.classList.add('open');
  }

  for (let element of buttonClose) {
    element.addEventListener('click', function() {
      let modalId = element.dataset.close;
      let modal = document.getElementById(modalId);

      modalClose(modal);
    })
  }

  window.addEventListener('keydown', (e) => {
    if(e.keyCode === 27) {
      for (let modal of modals) {
        modal.classList.remove('open');
      }
    }
  });

  function modalClose(modal) {
    modal.classList.remove('open');
  }
})();

(function() {
  const form = document.forms.signIn;

  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const errorMessages = document.querySelectorAll('.invalid-feedback');
    for (let error of errorMessages) {
      error.remove();
    }

    const userEmail = form.elements.email;
    const userPassword = form.elements.password;

    let errors = {};

    if (!isEmailCorrect(userEmail.value)) errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    if (userEmail.value.length === 0) errors.email = 'This field is required';

    if (userPassword.value.length < 2) errors.password = 'Too short password';
    if (userPassword.value.length === 0) errors.password = 'This field is required';

    if (Object.keys(errors).length) {
      Object.keys(errors).forEach(key => {
        const messageError = errors[key];
        const input = form.elements[key];
        setError(input, messageError);
      })
    }
  })
})();

(function() {
  const form = document.forms.register;

  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const errorMessages = document.querySelectorAll('.invalid-feedback');
    for (let error of errorMessages) {
      error.remove();
    }

    const userEmail = form.elements.email;
    const userName = form.elements.name;
    const userSurname = form.elements.surname;
    const userPassword = form.elements.password;
    const userRepeatPassword = form.elements.repeatPassword;
    const userLocation = form.elements.location;
    const userAge = form.elements.age;

    let errors = {};

    if (!isEmailCorrect(userEmail.value)) errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    if (userEmail.value.length === 0) errors.email = 'This field is required';

    if (userName.value.length < 2) errors.name = 'Name too short';
    if (userName.value.length === 0) errors.name = 'This field is required';

    if (userSurname.value.length < 2) errors.surname = 'Surname too short';
    if (userSurname.value.length === 0) errors.surname = 'This field is required';

    if (userPassword.value.length < 2) errors.password = 'Too short password';
    if (userPassword.value.length === 0) errors.password = 'This field is required';

    if (userRepeatPassword.value.length !== userPassword) errors.repeatPassword = 'Password mismatch';
    if (userRepeatPassword.value.length === 0) errors.repeatPassword = 'This field is required';

    if (userLocation.value.length < 2) errors.location = 'Too short location';
    if (userLocation.value.length === 0) errors.location = 'This field is required';

    if (userAge.value.length === 0) errors.age = 'This field is required';

    if (Object.keys(errors).length) {
      Object.keys(errors).forEach(key => {
        const messageError = errors[key];
        const input = form.elements[key];
        setError(input, messageError);
      })
    }
  })
})();

(function() {
  const form = document.forms.send;

  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const errorMessages = document.querySelectorAll('.invalid-feedback');
    for (let error of errorMessages) {
      error.remove();
    }

    const userName = form.elements.name;
    const userMessageSubject = form.elements.message;
    const userEmail = form.elements.email;
    const userPhone = form.elements.phone;

    let errors = {};

    if (userName.value.length < 2) errors.name = 'Name too short';
    if (userName.value.length === 0) errors.name = 'This field is required';

    if (userMessageSubject.value.length < 2) errors.message = 'Message subject too short';
    if (userMessageSubject.value.length === 0) errors.message = 'This field is required';

    if (!isEmailCorrect(userEmail.value)) errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    if (userEmail.value.length === 0) errors.email = 'This field is required';

    if (!isPhoneCorrect(userPhone.value)) errors.phone = 'Please enter a valid phone';
    if (userPhone.value.length === 0) errors.phone = 'This field is required';

    if (Object.keys(errors).length) {
      Object.keys(errors).forEach(key => {
        const messageError = errors[key];
        const input = form.elements[key];
        setError(input, messageError);
      })
    }
  })
})();

function setError(input, messageError) {
  if (!input[0]) {
    setErrorText(input, messageError);
  }
}

function setErrorText(input, messageError) {
  const error = errorCreator(messageError);
  input.classList.add('is-invalid');
  input.classList.add('input__margin');
  input.insertAdjacentElement('afterend', error);
  input.addEventListener('input', () => {
    error.remove();
    input.classList.remove('is-invalid');
  })
}

function errorCreator(errorMessage) {
  let messageErrorContainer = document.createElement('div');
  messageErrorContainer.classList.add('invalid-feedback');
  messageErrorContainer.innerText = errorMessage;
  return messageErrorContainer;
}

function isEmailCorrect(email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function isPhoneCorrect(phone) {
  return phone.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
}


// (function() {
//   const form = document.forms.signIn;
//   const buttonOpen = document.querySelector('.header__signIn');
//   const buttonClose = form.querySelector('.signIn__close');
//   const overlay = form.querySelector('.signIn__overlay');

//   if (!form) return;

//   buttonOpen.addEventListener("click", () => {
//     form.classList.add('open');
//   });

//   buttonClose.addEventListener("click", () => {
//     modalClose();
//   });

//   overlay.addEventListener("click", () => {
//     modalClose();
//   });

//   window.addEventListener('keydown', (e) => {
//     if(e.keyCode === 27) modalClose();
//   });

//   function modalClose () {
//     form.classList.remove('open');
//   };

// })();

// (function() {
//   const form = document.forms.register;
//   const buttonOpen = document.querySelector('.header__register');
//   const buttonClose = form.querySelector('.register__close');
//   const overlay = form.querySelector('.register__overlay');

//   if (!form) return;

//   buttonOpen.addEventListener("click", () => {
//     form.classList.add('open');
//   });

//   buttonClose.addEventListener("click", () => {
//     modalClose();
//   });

//   overlay.addEventListener("click", () => {
//     modalClose();
//   });

//   window.addEventListener('keydown', (e) => {
//     if(e.keyCode === 27) modalClose();
//   });

//   function modalClose () {
//     form.classList.remove('open');
//   };

// })();

// (function() {
//   const form = document.forms.send;
//   const buttonOpen = document.querySelector('.footer__btn');
//   const buttonClose = form.querySelector('.send__close');
//   const overlay = form.querySelector('.send__overlay');

//   if (!form) return;

//   buttonOpen.addEventListener("click", () => {
//     form.classList.add('open');
//   });

//   buttonClose.addEventListener("click", () => {
//     modalClose();
//   });

//   overlay.addEventListener("click", () => {
//     modalClose();
//   });

//   window.addEventListener('keydown', (e) => {
//     if(e.keyCode === 27) modalClose();
//   });

//   function modalClose () {
//     form.classList.remove('open');
//   };

// })();

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
