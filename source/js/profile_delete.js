const btnDelete = document.querySelector('.j-delete');

btnDelete.addEventListener('click', () => {
  sendRequest({
    url: `/api/users/:${localStorage.getItem('userId')}`,
    method: 'DELETE',
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  })
  .then(res => {
    return res.json();
  })
  .then(res => {
    if ( res.success ) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      location.pathname = '/';
      rerenderLinks();
      } else {
          throw res;
      }
  })
  .catch(err => {
    console.log(err);
  })
});
