(function initLogin() {
  const loginForm = document.forms.signIn;

  rerenderLinks();

  const login = (e) => {
      e.preventDefault();
      let data = {};
      data.email = loginForm.email.value;
      data.password = loginForm.password.value;

      // Validation

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
          setTimeout(() => {
              location.pathname = '/'
          }, 2000)
      })
      .catch(err => {
          if(err._message) {
              alert(err._message);
          }
          clearErorrs(loginForm);
          errorFormHandler(err.errors, loginForm);
      })
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

