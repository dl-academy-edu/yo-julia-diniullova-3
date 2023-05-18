(function() {
  const profileImg = document.querySelector('.j-profile-img');
  const profileName = document.querySelector('.j-profile-name');
  const profileSurname = document.querySelector('.j-profile-surname');
  const profileEmail = document.querySelector('.j-profile-email');
  const profilePassword = document.querySelector('.j-profile-password');
  const profileLocation = document.querySelector('.j-profile-location');
  const profileAge = document.querySelector('.j-profile-age');
  const btnLogOut = document.querySelector('.j-logout');

  const btnOpenModalEdit = document.querySelector('.j-editing-button');
  const modalEdit = document.forms.editPassword;
  const btnCloseModalEdit = document.querySelector('.editPassword__close');

  const btnOpenModalEditData = document.querySelector('.j-editing-data');
  const modalEditData = document.forms.editData;
  const btnCloseModalEditData = document.querySelector('.editData__close');

  let profile = null;

  getProfile();

  function changeData(e) {
    e.preventDefault();
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
        location.pathname = '/';
        return;
      }
      return res.json();
    })
    .then(res => {
      if(res.success) {
        profile = res.data;
        renderProfile();
      } else {
        throw res;
      }
    })
    .catch(err => {
      if(err._message) {
        alert(err._message);
      }
    })
    .finally(() => {
      interactionModal(editData);
    })
  }

  function changePassword(e) {
    e.preventDefault();
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
        location.pathname = '/';
        return;
      }
      return res.json();
    })
    .then(res => {
      if(res.success) {
        profile = res.data;
        renderProfile();
      } else {
        throw res;
      }
    })
    .catch(err => {
      if(err._message) {
        alert(err._message);
      }
    })
    .finally(() => {
      interactionModal(editPassword);
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
}());
