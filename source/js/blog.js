const loader = document.querySelector('.loader');

(function() {
    const form = document.forms.filter;
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let data = {};

        data.name = form.elements.name.value;
        data.tags = [...form.elements.tags].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        data.views = ([...form.elements.views].find(radio => radio.checked) || {value: null}).value;
        data.comments = ([...form.elements.comments].find(checkbox => checkbox.checked) || {value: null}).value;
        data.show = ([...form.elements.show].find(radio => radio.checked) || {value: null}).value;
        data.sort = ([...form.elements.sort].find(checkbox => checkbox.checked) || {value: null}).value;

        getData(data);
        setSearchParams(data);
    })

    let reqTags = new XMLHttpRequest();

    reqTags.open('GET', BASE_SERVER + '/api/tags');
    reqTags.setRequestHeader('Content-Type', 'application/json');

    loader.classList.remove('hidden');
    reqTags.send();
    reqTags.onload = () => {
      loader.classList.add('hidden');
      const tags = JSON.parse(reqTags.response).data;
      const tagsBox = document.querySelector('.filter__tags');
      tags.forEach(tag => {
        const tagHTML = createTag(tag);
        tagsBox.insertAdjacentHTML('beforeend', tagHTML);
      });

      const params = getParamsFromLocation();
      setDataToFilter(params);
      getData(params);
    }
    reqTags.onerror = () => {
      loader.classList.add('hidden');
      alert("Сервер недоступен!");
    }
})();

function getParamsFromLocation() {
  let searchParams = new URLSearchParams(location.search);
  return {
    name: searchParams.get('name') || '',
    tags: searchParams.getAll('tags'),
    sort: searchParams.getAll('sort'),
    views: searchParams.get('views'),
    comments: searchParams.getAll('comments'),
    show: searchParams.get('show'),
  }
}

function setSearchParams(data) {
  let searchParams = new URLSearchParams();
  searchParams.set('name', data.name);
  data.tags.forEach(tag => {
    searchParams.append('tags', tag);
  });
  if(data.sort) {
    searchParams.set('sort', data.sort);
  }
  history.replaceState(null, document.title, '?' + searchParams.toString());
}

function getData(params) {
  const result = document.querySelector('.posts');
  let xhr = new XMLHttpRequest();
  let searchParams = new URLSearchParams();
  searchParams.set('v', '1.0.0');

  if(params.tags && Array.isArray(params.tags) && params.tags.length) {
    searchParams.set('tags', JSON.stringify(params.tags));
  }

  let filter = {};

  if(params.name) {
    filter.title = params.name;
  }

  searchParams.set('filter', JSON.stringify(filter));

  if(params.sort) {
    searchParams.set('sort', JSON.stringify([params.sort, 'DESC']));
  }

  xhr.open('GET', BASE_SERVER + '/api/posts?' + searchParams.toString());
  xhr.send();
  result.innerHTML = '';
  xhr.onload = () => {
    const response = JSON.parse(xhr.response);
    response.data.forEach(post => {
      const card = cardCreate({
        title: post.title,
        text: post.text,
        src: post.photo.desktopPhotoUrl,
        tags: post.tags
      })
      result.insertAdjacentHTML('beforeend', card);
    })

  }
}

function cardCreate({title, text, src, tags}) {
  return `
  <div>
    <div class="card">
      <img src ="${BASE_SERVER}${src}" alt="${title}">
      <div class="card__content">
        <div class="card__wrapper">
          ${tags.map(tag => `<div class="card__tag" style="background: ${tag.color}"></div>`)}
        </div>
        <h5 class="card__title">${title}</h5>
        <p class="card__text">${text}</p>
        <a class="card__link">Go to this post</a>
      </div>
    </div>
  </div>`
}

function setDataToFilter(data) {
  const form = document.forms.filter;
  form.elements.name.value = data.name;
  form.elements.tags.forEach(checkbox => {
    checkbox.checked = data.tags.includes(checkbox.value);
  });
  form.elements.sort.forEach(checkbox => {
    checkbox.checked = data.sort.includes(checkbox.value);
  });
  form.elements.views.forEach(radio => {
    radio.checked = data.views === radio.value;
  });
  form.elements.comments.forEach(checkbox => {
    checkbox.checked = data.comments.includes(checkbox.value);
  });
  form.elements.show.forEach(radio => {
    radio.checked = data.show === radio.value;
  });
}

function createTag({id, name, color}) {
  return `
  <div class="filter__tags">
    <input name="tags" type="checkbox" id="tags-${id}" value="${id}" class="filter__input--tags">
    <label for="tags-${id}"></label>
  </div>`
}
