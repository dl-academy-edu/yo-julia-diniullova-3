const btnOpenReg = document.querySelector('.header__register');
const modalReg = document.querySelector('.register__btn');
const btnCloseReg = document.querySelector('.register__close');
const loader = document.querySelector('.loader_js');
const regForm = document.forms.register;
const formAnswer = document.querySelector('.formAnswer');
const btnFormAnswer = formAnswer.querySelector('.formAnswer__btn');
const textAnswer = formAnswer.querySelector('.formAnswer__text');

regForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loader.classList.remove('hidden');
  let data = {};
  data.email = regForm.email.value;
  data.name = regForm.name.value;
  data.surname = regForm.surname.value;
  data.password = regForm.password.value;
  data.location = regForm.location.value;
  data.age = +regForm.age.value;

  createFormSuccess = () => {
    textAnswer.innerText = 'Form has been sent successfully';
    textAnswer.classList.remove('textError');
    formAnswer.classList.remove('hidden');
  }

  createFormError = () => {
    textAnswer.innerText = 'Wrong data';
    textAnswer.classList.add('textError');
    formAnswer.classList.remove('hidden');
  }

  btnFormAnswer.addEventListener('click', () => {
    formAnswer.classList.add('hidden');
  });

  sendRequest({
    url: '/api/users',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(res => {
    return res.json();
  })
  .then(res => {
    if ( res.success ) {
      interactionModal(modalReg);
      createFormSuccess();
      setTimeout(() => {
        formSuccessfully.classList.add('hidden');
      }, 2000)
      clearErrors(regForm);
      regForm.reset();
      } else {
          throw res;
      }
  })
  .catch(err => {
    createFormError();
    setTimeout(() => {
      formAnswer.classList.add('hidden');
    }, 2000)
    if(err._message) {
      alert(err._message);
    }
    clearErorrs(regForm);
    errorFormHandler(err.errors, regForm);
  })
  .finally(() => {
    loader.classList.add('hidden');
  });
})
