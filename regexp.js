// --- MATCH ---
const stringMatch = 'Ваш заказ оформлен 20.12.2021 с номером №024242'

// Example 1
const regexp = /(?<=№)\d+/ // с помощью литеральной конструкции
const regexpConstructor = new RegExp('(?<=№)\\d+') // с помощью конструктора
console.log(regexp.exec(stringMatch)) // регулярное выражение, как объект
console.log(stringMatch.match(regexp)) // регулярное выражение, как параметр
regexpConstructor.sticky
// Example 2
// \d => 0-9
// {} => квантификатор
// /№\d{n}/ => n количество символов
// /№\d{n,}/ => от n символа до символа отличного от \d
// /№\d{n,k}/ => от n символов до k символов или до символа отличного от \d
// /№\d*/ => от 0 до бесконечности
// /№\d+/ => от 1 до бесконечности
// /№\d?/ => либо есть, либо нет
const regexpNumber = /№\d+/
console.log(regexpNumber.exec(stringMatch))

// Example 3
// \ - экранирование
// | - альтернация
// () - группировка
// (?!) - опережающая проверка
// [] - диапазоны символов
// [a-b] - от символа a до символа b
// [^a-b] - не входят от символа a до символа b (любой символ не входящий в диапазон a-b)
const regexpDate = /(\d{2}\.){2}(19\d{2}|2[0-2]\d{2}|\d{2})(?!\d)/
console.log(regexpDate.exec(stringMatch))

// --- REPLACE ---
const stringReplace = 'Hello ${name}, your age is ${age}'

// Example 1
const person = {
    name: 'Bob',
    age: 22
}
// g - global (lastIndex с какого символа начнется следующий поиск)
// i - ignoreCase (игнорирует регистр)
// m - multiline (учитывает многосторонность)
// +? - не жадный поиск

const regexpReplace = [/\${(.+?)}/g, (string, key, index, fullString) => {
    console.log(string)
    console.log(key)
    console.log(person[key])
    return person[key]
}]
const [arg_1, arg_2] = regexpReplace
const resultReplace = stringReplace.replace(arg_1, arg_2)
console.log(resultReplace)

// Example 2
const stringReplaceDuplicate = "aaaabbdbbbcccccsas"
const regexpReplaceDuplicate = /([a-z])\1+/g

console.log(stringReplaceDuplicate.replace(regexpReplaceDuplicate, '$1'))