(function initLogin() {
  const loginForm = document.forms.signIn;
  const answerServer = document.querySelector('.answerServer');
  const btnFormAnswer = answerServer.querySelector('.answerServer__btn');
  const textAnswer = answerServer.querySelector('.answerServer__text');

  rerenderLinks();

  const login = (e) => {
      e.preventDefault();
      loader.classList.remove('hidden');
      let data = {};
      data.email = loginForm.email.value;
      data.password = loginForm.password.value;

      createFormSuccess = () => {
        textAnswer.innerText = 'Form has been sent successfully';
        textAnswer.classList.remove('textError');
        answerServer.classList.remove('hidden');
      }

      createFormError = () => {
        textAnswer.innerText = 'Wrong login or password';
        textAnswer.classList.add('textError');
        answerServer.classList.remove('hidden');
      }

      btnFormAnswer.addEventListener('click', () => {
        answerServer.classList.add('hidden');
      });

      sendRequest({
          method: 'POST',
          url: '/api/users/login',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          },
      })
      .then((res) => {
          if (res.ok) return res.json();
      })
      .then(res => {
          rerenderLinks();
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userId', res.data.userId);
          interactionModal(loginForm);
          createFormSuccess();
          setTimeout(() => {
            answerServer.classList.add('hidden');
          }, 2000)
          setTimeout(() => {
              location.pathname = '/'
          }, 2000)
      })
      .catch(err => {
        createFormError();
        setTimeout(() => {
          answerServer.classList.add('hidden');
        }, 2000)
        if(err._message) {
          alert(err._message);
        }
      })
      .finally(() => {
        loader.classList.add('hidden');
      });
  }

  loginForm.addEventListener('submit', login);
})();

function rerenderLinks() {
  const loginButton = document.querySelector('.login-button');
  const registerButton = document.querySelector('.register-button');
  const toProfileButton = document.querySelector('.to-profile');

  const isLogin = localStorage.getItem('token');

  if(isLogin) {
      loginButton.classList.add('hidden');
      registerButton.classList.add('hidden');
      toProfileButton.classList.remove('hidden');
  } else {
      loginButton.classList.remove('hidden');
      registerButton.classList.remove('hidden');
      toProfileButton.classList.add('hidden');
  }
}

