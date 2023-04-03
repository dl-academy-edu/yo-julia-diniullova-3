// Используя рекурсию попросите пользователя ввести возраст, если он больше 18, то покажите сообщение об успехе, если меньше,
// то запустите функцию снова.

const recursion = () => {
  const num = prompt("Введите ваш возраст");
  if (+num < 18) {
    recursion();
  } else {
    alert('Успешно!');
  }
};
recursion();


// Напишите 4 чистые функции, add (сложение 2 чисел), subtract (вычитание из первого аргумента второго), divide (деление первого аргумента на второй) и multiply (умножение). В комментариях напишите, почему эти функции чистые.

//1. Нет вывода на экран
//2. С одинаковыми аргументами всегда возвращает одинаковое значение
//3. Не пишет и не читает глобальные переменные

// const add = (num1, num2) => {
//   return num1 + num2;
// };
// add(3, 5);

// const subtract = (num1, num2) => {
//   return num1 - num2;
// };
// subtract(8, 3);

// const divide = (num1, num2) => {
//   return num1 / num2;
// };
// divide(10, 5);

// const multiply = (num1, num2) => {
//   return num1 * num2;
// };
// multiply(6, 3);


// Напишите функцию addCreator, которая будет работать по коду на след слайде

// let num1;
// let num2;

// const addCreator = (num1) => {
//   return function add(num2) {
//       return num1 + num2;
//   }
// }

// const add = addCreator(5);
// console.log(add(5));
// console.log(addCreator(1)(3));


// Создайте свой счетчик, который будет принимать шаг счетчика. То есть ваш counterCreater должен принимать аргумент step и изменять index на step.
// Step должен иметь значение по умолчанию 2.
// Изначально index равен 0.


// let index = 0;
// function counterCreater(step = 2) {
//   return function counter() {
//     return index = index + step;
//   }
// }

// let myCounter = counterCreater(4);
// console.log(myCounter());
// console.log(myCounter());
// console.log(myCounter());
// console.log(myCounter());
