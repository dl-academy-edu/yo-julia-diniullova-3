const modalSend = document.querySelector('.send__btn');
const sendForm = document.forms.send;

sendForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loader.classList.remove('hidden');

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
      setTimeout(() => {
        answerServer.classList.add('hidden');
      }, 2000)
      clearErrors(sendForm);
      sendForm.reset();
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
    clearErorrs(sendForm);
    errorFormHandler(err.errors, sendForm);
  })
  .finally(() => {
    loader.classList.add('hidden');
  });
})
