const btnDelete = document.querySelector('.j-delete');
const loader = document.querySelector('.loader_js');

btnDelete.addEventListener('click', () => {
  loader.classList.remove('hidden');
  sendRequest({
    url: `/api/users/${localStorage.getItem("userId")}`,
    method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"x-access-token": localStorage.getItem("token")
		}
  })
  .then(res => {
    if ( res.ok ) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      rerenderLinks();
      location.pathname = '/';
      } else {
          throw res;
      }
  })
  .catch(err => {
    console.log(localStorage.getItem('token'));
    console.error(err);
  })
  .finally(() => {
    loader.classList.add('hidden');
  })
});
