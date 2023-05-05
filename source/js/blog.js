const BASE_SERVER = 'https://academy.directlinedev.com';

const loader = document.querySelector('.loader');

(function() {
    const form = document.forms.filter;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    })

    let reqTags = new XMLHttpRequest();

    reqTags.open('GET', BASE_SERVER + '/api/tags');
    reqTags.setRequestHeader('Content-Type', 'application/json');

    loader.classList.remove('hidden');
    reqTags.send();
    reqTags.onload = () => {
      loader.classList.add('hidden');
      const tags = JSON.parse(reqTags.response).data;
      console.log(tags);
    }
    reqTags.onerror = () => {
      loader.classList.add('hidden');
      alert("Сервер недоступен!");
    }
})();
