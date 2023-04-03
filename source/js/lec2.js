// Создать программу, которая запрашивает у пользователя число, в консоль выводит числа от 1 до этого числа, но пропускает числа,
// которые кратны (делятся без остатка) 4-м.

let num;
let result = 0;

do {
  num = prompt('Введите положительное число');

  if (Number(num)) {
    for (let i = 0; i < num; i++) {
      result++;
      if (result % 4 === 0) {
        continue;
      }
      else {
        console.log(result);
      }
    }
  }
  else {
    console.log('Неверные данные');
  }
} while (num <= 0);


//Написать программу, которая будет получать число и с помощью цикла while считать его факториал.

// let num;
// let result = 1;

// do {
//   num = prompt('Введите число');

//   if (Number(num)) {
//     if (num == 1) {
//       console.log(0);
//     }
//     else {
//       while (num > 0) {
//         result *= num;
//         num--;
//       }
//       console.log(result);
//     }
//   }
//   else {
//     console.log('Неверные данные');
//   }
// } while (num < 0);


//Написать программу, которая будет получать число и его степень, с помощью цикла for возвести число в степень.

// let num1 = prompt('Введите положительное число');
// let num2 = prompt('Введите положительную степень');

// if (Number(num1) && Number(num2)) {
//   if (num2 == 0) {
//     console.log(1);
//   }
//   else {
//     for (let i = 0; i < num2; i++) {
//       num1 *= num1;
//       num2--;
//     }
//     console.log(num1);
//   }
// }
// else {
//   console.log('Неверные данные');
// }


//Написать игру “Угадай число”

// for (;;) {
//   let num = +prompt('Угадайте число');
//   let rand = Math.floor(1 + Math.random() * 10);

//   if (num === rand) {
//     console.log('Вы угадали!');
//     break;
//   }
// }





