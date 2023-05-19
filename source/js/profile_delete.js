const btnDelete = document.querySelector('.j-delete');
const loader = document.querySelector('.loader_js');

btnDelete.addEventListener('click', () => {
  loader.classList.remove('hidden');
  sendRequest({
    method: 'DELETE',
    url: `/api/users/:${localStorage.getItem('userId')}`,
    headers: {
      'x-access-token': localStorage.getItem('token'),
    }
  })
  .then(res => {
    return res.json();
  })
  .then(res => {
    if ( res.success ) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      rerenderLinks();
      location.pathname = '/';
      } else {
          throw res;
      }
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    loader.classList.add('hidden');
  })
});
