const btnOpenSend = document.querySelector('.footer__btn');
const modalSend = document.querySelector('.send__btn');
const btnCloseSend = document.querySelector('.send__close');
const loaderSend = document.querySelector('.loader_js');
const sendForm = document.forms.send;

sendForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loaderSend.classList.remove('hidden');
  const email = "diniullova2011@yandex.ru";
  let data = {};
  data.email = sendForm.email.value;
  data.name = sendForm.name.value;
  data.message = (sendForm.message.value) ? sendForm.message.value : " ";
  data.phone = +sendForm.phone.value;
  data.textarea = sendForm.textarea.value;

  sendRequest({
    url: '/api/emails',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    to: email,
    body: JSON.stringify(data),
  })
  .then(res => {
    return res.json();
  })
  .then(res => {
    if ( res.success ) {
      interactionModal(modalReg);
      alert(`Сообщение ${res.body.message} отправлено!`);
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
