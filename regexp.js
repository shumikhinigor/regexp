// --- MATCH ---
const stringMatch = 'Ваш заказ оформлен 20.12.2021 с номером №024242'

// Example 1
const regexp = /(?<=№)\d+/ // с помощью литеральной конструкции
const regexpConstructor = new RegExp('(?<=№)\\d+') // с помощью конструктора
const resultObject = regexp.exec(stringMatch) // регулярное выражение, как объект
const resultParameter = stringMatch.match(regexp) // регулярное выражение, как параметр

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
const resultNumber = regexpNumber.exec(stringMatch)

// Example 3
// \ - экранирование
// | - альтернация
// () - группировка
// (?!) - опережающая проверка
// [] - диапазоны символов
// [a-b] - от символа a до символа b
// [^a-b] - не входят от символа a до символа b (любой символ не входящий в диапазон a-b)
const regexpDate = /(\d{2}\.){2}(19\d{2}|2[0-2]\d{2}|\d{2})(?!\d)/
const resultDate = regexpDate.exec(stringMatch)

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
const [ arg_1, arg_2 ] = regexpReplace
const resultReplace = stringReplace.replace(arg_1, arg_2)

// Example 2
const stringReplaceDuplicate = 'aaaabbdbbbcccccsas'
// ([a-z]) - запоминаем символ
// \1+ - ссылка на символ (больше одного)
// $1 - запомнившийся символ
const regexpReplaceDuplicate = /([a-z])\1+/g
const resultReplaceDuplicate = stringReplaceDuplicate.replace(regexpReplaceDuplicate, '$1')

// Example 3
const stringReplaceQuotes = 'foo "bl\\"a\\\\" bar'
const regexpReplaceQuotes = /(?<quote>['"`])(?<content>(?:\\{2}|\\\k<quote>|.(?!\k<quote>))*)\k<quote>/g
const resultReplaceQuotes = stringReplaceQuotes.replace(regexpReplaceQuotes, '$<content>')