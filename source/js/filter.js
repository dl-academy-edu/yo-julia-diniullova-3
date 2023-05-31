if (location.search) {
  const params = {};

  const arrayParams = location.search.substring(1).split("&");

  for (let stringParam of arrayParams) {
    let param = stringParam.split("=");
    let nameParam = param[0];
    let valueParam = param[1];

    if (nameParam in params) {
      params[nameParam].push(valueParam);
    } else {
      params[nameParam] = [valueParam];
    }
  }

  const filterForm = document.forms.filter;

  const updateInput = (gInputs, typeParam) => {
    for (let input of gInputs) {
      const param = params[typeParam];
      if (!param) return;
      for (let partParam of param) {
        if (partParam === input.value) {
          input.checked = true;
        }
      }
    }
  };

  updateInput(filterForm.views, "views");
  updateInput(filterForm.comments, "comments");
  updateInput(filterForm.show, "show");
  updateInput(filterForm.sort, "sort");

const url = new URL(location.pathname, location.origin);
filterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  url.searchParams.delete('views');
  url.searchParams.delete('comments');
  url.searchParams.delete('show');
  url.searchParams.delete('sort');

  const addCheckedInput = (nameGroupInput, typeParam) => {
    for (checkbox of nameGroupInput) {
      if (checkbox.checked) {
        url.searchParams.append(typeParam, checkbox.value);
      }
    }
  };

  addCheckedInput(e.target.views, "views");
  addCheckedInput(e.target.comments, "comments");
  addCheckedInput(e.target.show, "show");
  addCheckedInput(e.target.sort, "sort");

  history.replaceState(null, '', url);
});
}
