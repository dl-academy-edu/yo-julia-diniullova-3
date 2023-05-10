const btnOpenReg = document.querySelector('.header__register');
const modalReg = document.querySelector('.register__btn');
const btnCloseReg = document.querySelector('.register__close');
const loaderReg = document.querySelector('.loader_js');
const regForm = document.forms.register;
const formSuccessfully = document.querySelector('.register__formSuccessfully');
const btnFormSuccess = formSuccessfully.querySelector('.formSuccessfully__btn');
const textSuccessfully = formSuccessfully.querySelector('.formSuccessfully__text');

regForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loaderReg.classList.remove('hidden');
  let data = {};
  data.email = regForm.email.value;
  data.name = regForm.name.value;
  data.surname = regForm.surname.value;
  data.password = regForm.password.value;
  data.location = regForm.location.value;
  data.age = +regForm.age.value;

  createFormSuccess = () => {
    textSuccessfully.innerText = 'Form has been sent successfully';
    formSuccessfully.classList.remove('hidden');
  }

  btnFormSuccess.addEventListener('click', () => {
    formSuccessfully.classList.add('hidden');
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
      clearErrors(regForm);
      regForm.reset();
      } else {
          throw res;
      }
  })
  .catch(err => {

  })
  .finally(() => {
    loaderReg.classList.add('hidden');
  });
})
