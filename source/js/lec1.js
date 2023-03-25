let num = 11;
let str = 'hello';
let age = true;
let name = undefined;
let device = null;
let big = 3456789009876543n;
let color = {
    red: '#FF0000',
    blue: '#87CEEB',
    white: '#FFFFFF'
};
let user = Symbol();

console.log('Приведение к числу, строке и булевому типу\n');
console.log('Число:');
console.log(Number(num), String(num), Boolean(num));
console.log('Строка:');
console.log(Number(str), String(str), Boolean(str));
console.log('Булевый тип:');
console.log(Number(age), String(age), Boolean(age));
console.log('undefined:');
console.log(Number(name), String(name), Boolean(name));
console.log('null:');
console.log(Number(device), String(device), Boolean(device));
console.log('Большое число:');
console.log(Number(big), String(big), Boolean(big));
console.log('Объект:');
console.log(Number(color), String(color), Boolean(color));
console.log('Символ:');
console.log(String(user), Boolean(user));
