const buttonMenu = document.querySelector('.burger__btn--js');
const menu = document.querySelector('.burger');
const menuClose = menu.querySelector('.burger__btn--close');

buttonMenu.addEventListener("click", () => {
  menu.classList.add('burger__open');
  input.focus();
});

menuClose.addEventListener("click", () => {
  menu.classList.remove('burger__open');
  input.focus();
});
