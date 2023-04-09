const form = document.querySelector('.signIn');
const buttonOpen = document.querySelector('.header__signIn');
const buttonClose = document.querySelector('.close');
const overlay = document.querySelector('.overlay');

buttonOpen.addEventListener("click", () => {
    form.classList.add('open');
    input.focus();
});

buttonClose.addEventListener("click", () => {
    form.classList.remove('open');
});

overlay.addEventListener("click", () => {
    form.classList.remove('open');
});
