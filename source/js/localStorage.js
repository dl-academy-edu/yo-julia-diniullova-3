// const btnNext = document.querySelector('.slider__btn--right');
// const btnBack = document.querySelector('.slider__btn--left');

// let activeSlide;

// const updateSlide = () => {
//   +localStorage.getItem('activeSlide')
//     ? (activeSlide = +localStorage.getItem('activeSlide'))
//     : (activeSlide = 1);
// }
// updateSlide();

// const slideChange = (direction) => {
//   switch(direction) {
//     case 'next': {
//       if (activeSlide < 4) {
//         localStorage.setItem('activeSlide', activeSlide + 1);
//         updateSlide();
//       }
//       break;
//     }
//     case 'back': {
//       break;
//     }
//   }
// }

// btnNext.addEventListener('click', () => {
//   slideChange('next');
// })

// btnBack.addEventListener('click', () => {
//   slideChange('back');
// })

