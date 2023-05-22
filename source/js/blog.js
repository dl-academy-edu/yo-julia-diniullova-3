const btnReset = document.querySelector('.filter__btn--reset');

let limit = 5;

let loaderCount = 0;

const showLoader = () => {
  loaderCount++;
  loader.classList.remove('hidden');
}

const hideLoader = () => {
  loaderCount--;
  if(loaderCount <= 0) {
    loader.classList.add('hidden');
    loaderCount = 0;
  }
}

(function() {
    const form = document.forms.filter;
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let data = {
          page: 1,
        };

        data.name = form.elements.name.value;
        data.tags = [...form.elements.tags].filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        data.views = ([...form.elements.views].find(radio => radio.checked) || {value: null}).value;
        data.comments = ([...form.elements.comments].find(checkbox => checkbox.checked) || {value: null}).value;
        data.show = ([...form.elements.show].find(radio => radio.checked) || {value: null}).value;
        data.sort = ([...form.elements.sort].find(checkbox => checkbox.checked) || {value: null}).value;

        getData(data);
        setSearchParams(data);
    })

    let xhr = new XMLHttpRequest();

    xhr.open('GET', BASE_SERVER + '/api/tags');
    xhr.send();
    showLoader();
    xhr.onload = () => {
      const tags = JSON.parse(xhr.response).data;
      const tagsBox = document.querySelector('.filter__tags');
      tags.forEach(tag => {
        const tagHTML = createTag(tag);
        tagsBox.insertAdjacentHTML('beforeend', tagHTML);
      });

      const params = getParamsFromLocation();
      setDataToFilter(params);
      getData(params);
      hideLoader();
    }
})();

function getParamsFromLocation() {
  let searchParams = new URLSearchParams(location.search);
  return {
    name: searchParams.get('name') || '',
    tags: searchParams.getAll('tags'),
    sort: searchParams.get('sort'),
    views: searchParams.get('views'),
    comments: searchParams.getAll('comments'),
    show: searchParams.get('show'),
    page: +searchParams.get('page') || 1,
  }
}

function setSearchParams(data) {
  let searchParams = new URLSearchParams();
  searchParams.set('name', data.name);
  data.tags.forEach(tag => {
    searchParams.append('tags', tag);
  });
  if(data.page) {
    searchParams.set('page', data.page);
  } else {
    searchParams.set('page', 1);
  }
  if(data.sort) {
    searchParams.set('sort', data.sort);
  }
  if(data.views) {
    searchParams.set('views', data.views);
  }
  if(data.comments) {
    searchParams.set('comments', data.comments);
  }
  if(data.show) {
    searchParams.set('show', data.show);
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

  if(params.show) {
    limit = params.show;
  }

  searchParams.set('limit', limit);

  if(+params.page) {
    searchParams.set('offset', (+params.page) * limit);
  }

  if(params.sort) {
    searchParams.set('sort', JSON.stringify([params.sort, 'ASC']));
  }

  if(params.views) {
    let paramViews =  params.views.split("-");
    searchParams.set('filter', JSON.stringify({"views": {"$between": [paramViews[0], paramViews[1]]}}));
  }

  if(params.comments && params.comments.length) {
    let paramComments = params.comments.length === 1 ? 0 : params.comments.split("-");
    if (paramComments === 0) {
      searchParams.set('filter', JSON.stringify({"commentsCount": 0}));
    } else {
      searchParams.set('filter', JSON.stringify({"commentsCount": {"$between": [paramComments[0], paramComments[1]]}}));
    }
  }

  xhr.open('GET', BASE_SERVER + '/api/posts?' + searchParams.toString());
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  showLoader();
  result.innerHTML = '';
  const links = document.querySelector('.sliderPosts__number');
  links.innerHTML = '';
  xhr.onload = () => {
    const response = JSON.parse(xhr.response);
    let dataPosts = '';
    response.data.forEach(post => {
      dataPosts += cardCreate({
        title: post.title,
        text: post.text,
        src: post.photo.desktopPhotoUrl,
        tags: post.tags,
        date: post.date,
        views: post.views,
        commentsCount: post.commentsCount,
      })
    })
    result.innerHTML = dataPosts;
    hideLoader();
    const pageCount = Math.ceil(response.count / limit);
    for(let i = 0; i < pageCount; i++) {
      const link = linkElementCreate(i);
      links.insertAdjacentElement('beforeend', link);
    }
  }
}

function linkElementCreate(page) {
  const btnLeft = document.querySelector('.btnLeft--js');
  const btnRight = document.querySelector('.btnRight--js');
  const link = document.createElement('a');
  page++;
  link.href = '?page=' + page;
  link.innerText = (page);
  link.classList.add('sliderPosts__link');

  let params = getParamsFromLocation();
  if(page === +params.page) {
    link.classList.add('sliderPosts__link--active');
  }

  link.addEventListener('click', (e) => {
    e.preventDefault();
    const links = document.querySelectorAll('.sliderPosts__link');
    let searchParams = new URLSearchParams(location.search);
    let params = getParamsFromLocation();
    links[params.page].classList.remove('sliderPosts__link--active');
    searchParams.set('page', page);
    links[page].classList.add('active');
    history.replaceState(null, document.title, '?' + searchParams.toString());
    getData(getParamsFromLocation());
  });

  btnLeft.addEventListener('click', () => {
    page--;
    const links = document.querySelectorAll('.sliderPosts__link');
    let searchParams = new URLSearchParams(location.search);
    let params = getParamsFromLocation();
    links[params.page].classList.remove('sliderPosts__link--active');
    searchParams.set('page', page);
    links[page].classList.add('active');
    history.replaceState(null, document.title, '?' + searchParams.toString());
    getData(getParamsFromLocation());
  });

  btnRight.addEventListener('click', () => {
    page++;
    const links = document.querySelectorAll('.sliderPosts__link');
    let searchParams = new URLSearchParams(location.search);
    let params = getParamsFromLocation();
    links[params.page].classList.remove('sliderPosts__link--active');
    searchParams.set('page', page);
    links[page].classList.add('active');
    history.replaceState(null, document.title, '?' + searchParams.toString());
    getData(getParamsFromLocation());
  });

  return link;
}

function cardCreate({title, text, src, tags, date, views, commentsCount}) {

  let dateFromServer = new Date(date);

  let year = dateFromServer.getFullYear();
  let month = dateFromServer.getMonth() + 1;
  let day = dateFromServer.getDate();

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  const finalDate = `${day}.${month}.${year}`;

  return `
  <div class="posts__wrapper">
    <div class="card">
      <img src ="${BASE_SERVER}${src}" alt="${title}">
      <div class="card__content">
        <div class="card__wrapper">
          ${tags.map(tag => `<div class="card__tag" style="background: ${tag.color}"></div>`).join('')}
        </div>
        <div class="card__info">
        <p class="card__subtitle">${finalDate}</p>
        <p class="card__subtitle">${views} views</p>
        <p class="card__subtitle">${commentsCount} comments</p>
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
  form.elements.sort.forEach(radio => {
    radio.checked = data.sort === radio.value;
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

function createTag({id, color}) {
  return `
  <label class="filter__tag">
    <input name="tags" type="checkbox" id="tags-${id}" value="${id}" class="filter__input--tags">
    <span class="filter__span" style="border-color: ${color}"></span>
  </label>`
}

btnReset.addEventListener('click', () => {
  document.filter.reset();
});
