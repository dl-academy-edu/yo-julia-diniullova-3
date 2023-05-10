const modalSend = document.querySelector('.send__btn');
const loaderSend = document.querySelector('.loader_js');
const sendForm = document.forms.send;
const formSuccessfullySend = document.querySelector('.send__formSuccessfully');
const btnFormSuccessSend = formSuccessfullySend.querySelector('.formSuccessfully__btn');
const textSuccessfullySend = formSuccessfullySend.querySelector('.formSuccessfully__text');

sendForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loaderSend.classList.remove('hidden');

  const body = {
    email: sendForm.email.value,
    name: sendForm.name.value,
    message: sendForm.message.value,
    phone: +sendForm.phone.value,
    textarea: sendForm.textarea.value
  }

  let data = {
    to: "diniullova7@yandex.ru",
    body: JSON.stringify(body),
  };

  data.body.email = sendForm.email.value;
  data.body.name = sendForm.name.value;
  data.body.message = (sendForm.message.value) ? sendForm.message.value : " ";
  data.body.phone = +sendForm.phone.value;
  data.body.textarea = sendForm.textarea.value;

  createFormSuccess = () => {
    textSuccessfullySend.innerText = 'Form has been sent successfully';
    formSuccessfullySend.classList.remove('hidden');
  }

  btnFormSuccessSend.addEventListener('click', () => {
    formSuccessfullySend.classList.add('hidden');
  });

  sendRequest({
    url: '/api/emails',
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
      interactionModal(modalSend);
      createFormSuccess();
      clearErrors(sendForm);
      sendForm.reset();
      } else {
          throw res;
      }
  })
  .catch(err => {

  })
  .finally(() => {
    loaderSend.classList.add('hidden');
  });
})
