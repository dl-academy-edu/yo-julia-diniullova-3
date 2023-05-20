(function() {
  const profileImg = document.querySelector('.j-profile-img');
  const profileName = document.querySelector('.j-profile-name');
  const profileSurname = document.querySelector('.j-profile-surname');
  const profileEmail = document.querySelector('.j-profile-email');
  const profilePassword = document.querySelector('.j-profile-password');
  const profileLocation = document.querySelector('.j-profile-location');
  const profileAge = document.querySelector('.j-profile-age');
  const btnLogOut = document.querySelector('.j-logout');
  const loader = document.querySelector('.loader_js');

  const answerServer = document.querySelector('.answerServer');
  const btnFormAnswer = answerServer.querySelector('.answerServer__btn');
  const textAnswer = answerServer.querySelector('.answerServer__text');

  const btnOpenModalEdit = document.querySelector('.j-editing-button');
  const modalEdit = document.forms.editPassword;
  const btnCloseModalEdit = document.querySelector('.editPassword__close');

  const btnOpenModalEditData = document.querySelector('.j-editing-data');
  const modalEditData = document.forms.editData;
  const btnCloseModalEditData = document.querySelector('.editData__close');

  let profile = null;

  getProfile();
  rerenderLinks();

  function changeData(e) {
    e.preventDefault();
    loader.classList.remove('hidden');
    const data = new FormData(editData);
    sendRequest({
      method: 'PUT',
      url: '/api/users',
      body: data,
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })
    .then(res => {
      if(res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        return;
      }
      return res.json();
    })
    .then(res => {
      if(res.success) {
        profile = res.data;
        createFormSuccess();
        setTimeout(() => {
          answerServer.classList.add('hidden');
        }, 2000)
        renderProfile();
      } else {
        throw res;
      }
    })
    .catch(err => {
      if(err._message) {
        alert(err._message);
        createFormError();
        setTimeout(() => {
          answerServer.classList.add('hidden');
        }, 2000)
      }
    })
    .finally(() => {
      loader.classList.add('hidden');
    })
  }

  function changePassword(e) {
    e.preventDefault();
    loader.classList.remove('hidden');
    const data = new FormData(editPassword);
    sendRequest({
      method: 'PUT',
      url: '/api/users',
      body: data,
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })
    .then(res => {
      if(res.status === 401 || res.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        return;
      }
      return res.json();
    })
    .then(res => {
      if(res.success) {
        profile = res.data;
        createFormSuccess();
        setTimeout(() => {
          answerServer.classList.add('hidden');
        }, 2000)
        renderProfile();
      } else {
        throw res;
      }
    })
    .catch(err => {
      if(err._message) {
        alert(err._message);
        createFormError();
        setTimeout(() => {
          answerServer.classList.add('hidden');
        }, 2000)
      }
    })
    .finally(() => {
      loader.classList.add('hidden');
    })
  }

  function renderProfile(profile) {
    profileImg.style.backgroundImage = `url(${BASE_SERVER + profile.photoUrl})`;
    profileName.innerText = profile.name;
    profileSurname.innerText = profile.surname;
    profileEmail.innerText = profile.email;
    profileLocation.innerText = profile.location;
    profileAge.innerText = profile.age;
    profilePassword.innerText = profile.password;
  }

  function getProfile() {
    loader.classList.remove('hidden');
    sendRequest({
      method: 'GET',
      url: `/api/users/${localStorage.getItem('userId')}`,
    })
    .then(res => {
      return res.json();
    })
    .then((res) => {
      if(res.success) {
        profile = res.data;
        renderProfile(profile);
      } else {
        throw new Error(`${res.status} ${res.message}`);
      }
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      loader.classList.add('hidden');
    })
  }

  btnOpenModalEdit.addEventListener('click', () => {
    editPassword.oldPassword.value = profile.password;
    interactionModal(modalEdit);
  });

  btnCloseModalEdit.addEventListener('click', () => {
    interactionModal(modalEdit);
  });

  btnOpenModalEditData.addEventListener('click', () => {
    editData.email.value = profile.email;
    editData.name.value = profile.name;
    editData.surname.value = profile.surname;
    editData.location.value = profile.location;
    editData.age.value = profile.age;
    //editData.picture.value = profile.photoUrl;
    interactionModal(modalEditData);
  });

  btnCloseModalEditData.addEventListener('click', () => {
    interactionModal(modalEditData);
  });

  editPassword.addEventListener('submit', changePassword);
  editData.addEventListener('submit', changeData);

  btnLogOut.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    location.pathname = '/';
    rerenderLinks();
  });

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
}());
