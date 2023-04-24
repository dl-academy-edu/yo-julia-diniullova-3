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
    if (!userEmail.getAttribute('required')) errors.email = 'This field is required';

    if (userPassword.value.length < 2) errors.password = 'Too short password';
    if (!userPassword.getAttribute('required')) errors.password = 'This field is required';

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

    const goodMessages = document.querySelectorAll('.valid-feedback');
    for (let good of goodMessages) {
      good.remove();
    }

    const userEmail = form.elements.email;
    const userName = form.elements.name;
    const userSurname = form.elements.surname;
    const userPassword = form.elements.password;
    const userRepeatPassword = form.elements.repeatPassword;
    const userLocation = form.elements.location;
    const userAge = form.elements.age;

    let errors = {};
    let good = {};

    if (!userEmail.getAttribute('required')) errors.email = 'This field is required';
    else if (!isEmailCorrect(userEmail.value)) errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    else good.email = 'All right';

    if (!userName.getAttribute('required')) errors.name = 'This field is required';
    else if (userName.value.length < 2) errors.name = 'Name too short';
    else good.name = 'All right';

    if (!userSurname.getAttribute('required')) errors.surname = 'This field is required';
    else if (userSurname.value.length < 2) errors.surname = 'Surname too short';
    else good.surname = 'All right';

    if (!userPassword.getAttribute('required')) errors.password = 'This field is required';
    else if (userPassword.value.length < 2) errors.password = 'Too short password';
    else good.password = 'All right';

    if (!userRepeatPassword.getAttribute('required')) errors.repeatPassword = 'This field is required';
    else if (userRepeatPassword.value.length !== userPassword) errors.repeatPassword = 'Password mismatch';
    else good.repeatPassword = 'All right';

    if (!userLocation.getAttribute('required')) errors.location = 'This field is required';
    else if (userLocation.value.length < 2) errors.location = 'Too short location';
    else good.location = 'All right';

    if (!userAge.getAttribute('required')) errors.age = 'This field is required'
    else good.age = 'All right';

    if (Object.keys(errors).length) {
      Object.keys(errors).forEach(key => {
        const messageError = errors[key];
        const input = form.elements[key];
        setError(input, messageError);
      })
    }
    if (Object.keys(good).length) {
      Object.keys(good).forEach(key => {
        const messageGood = good[key];
        const input = form.elements[key];
        setGood(input, messageGood);
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

    const goodMessages = document.querySelectorAll('.valid-feedback');
    for (let good of goodMessages) {
      good.remove();
    }

    const userName = form.elements.name;
    const userMessageSubject = form.elements.message;
    const userEmail = form.elements.email;
    const userPhone = form.elements.phone;

    let errors = {};
    let good = {};

    if (!userName.getAttribute('required')) errors.name = 'This field is required';
    else if (userName.value.length < 2) errors.name = 'Name too short';
    else good.name = 'All right';

    if (!userMessageSubject.getAttribute('required')) errors.message = 'This field is required';
    else if (userMessageSubject.value.length < 2) errors.message = 'Message subject too short';
    else good.message = 'All right';

    if (!userEmail.getAttribute('required')) errors.email = 'This field is required';
    else if (!isEmailCorrect(userEmail.value)) errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")';
    else good.email = 'All right';

    if (!userPhone.getAttribute('required')) errors.phone = 'This field is required';
    else if (!isPhoneCorrect(userPhone.value)) errors.phone = 'Please enter a valid phone';
    else good.phone = 'All right';

    if (Object.keys(errors).length) {
      Object.keys(errors).forEach(key => {
        const messageError = errors[key];
        const input = form.elements[key];
        setError(input, messageError);
      })
    }
    if (Object.keys(good).length) {
      Object.keys(good).forEach(key => {
        const messageGood = good[key];
        const input = form.elements[key];
        setGood(input, messageGood);
      })
    }
  })
})();

function setError(input, messageError) {
  if (!input[0]) {
    setErrorText(input, messageError);
  }
}

function setGood(input, messageGood) {
  if (!input[0]) {
    setGoodText(input, messageGood);
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

function setGoodText(input, messageGood) {
  const good = goodCreator(messageGood);
  input.classList.add('is-valid');
  input.classList.add('input__margin');
  input.insertAdjacentElement('afterend', good);
  input.addEventListener('input', () => {
    good.remove();
    input.classList.remove('is-valid');
  })
}

function errorCreator(errorMessage) {
  let messageErrorContainer = document.createElement('div');
  messageErrorContainer.classList.add('invalid-feedback');
  messageErrorContainer.innerText = errorMessage;
  return messageErrorContainer;
}

function goodCreator(goodMessage) {
  let messageGoodContainer = document.createElement('div');
  messageGoodContainer.classList.add('valid-feedback');
  messageGoodContainer.innerText = goodMessage;
  return messageGoodContainer;
}

function isEmailCorrect(email) {
  return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function isPhoneCorrect(phone) {
  return phone.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
}

