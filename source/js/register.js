const btnOpenReg = document.querySelector('.header__register');
const modalReg = document.querySelector('.register__btn');
const btnCloseReg = document.querySelector('.register__close');
const loader = document.querySelector('.loader_js');
const regForm = document.forms.register;
const answerServer = document.querySelector('.answerServer');
const btnFormAnswer = answerServer.querySelector('.answerServer__btn');
const textAnswer = answerServer.querySelector('.answerServer__text');

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
    answerServer.classList.remove('hidden');
  }

  createFormError = () => {
    textAnswer.innerText = 'Wrong data';
    textAnswer.classList.add('textError');
    answerServer.classList.remove('hidden');
  }

  btnFormAnswer.addEventListener('click', () => {
    answerServer.classList.add('hidden');
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
        answerServer.classList.add('hidden');
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
      answerServer.classList.add('hidden');
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
