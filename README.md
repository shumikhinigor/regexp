# RegExp

## Символьные классы

**Символьный класс** – это специальное обозначение, которое соответствует любому символу из определённого набора.

<table>
    <thead>
        <tr>
            <td><b>Символ</b></td>
            <td><b>Значение</b></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>\d</td>
            <td><code>[0-9]</code></td>
        </tr>
        <tr>
            <td>\D</td>
            <td><code>[^0-9]</code></td>
        </tr>
        <tr>
            <td>\w</td>
            <td><code>[a-zA-Z0-9_]</code></td>
        </tr>
        <tr>
            <td>\W</td>
            <td><code>[^a-zA-Z0-9_]</code></td>
        </tr>
        <tr>
            <td>\s</td>
            <td><code>[ \t\n\r\v]</code></td>
        </tr>
        <tr>
            <td>\S</td>
            <td><code>[^ \t\n\r\v]</code></td>
        </tr>
        <tr>
            <td>\.</td>
            <td><code>[^\n]</code></td>
        </tr>
        <tr>
            <td>\n</td>
            <td>Перевод строки</td>
        </tr>
        <tr>
            <td>\r</td>
            <td>Возврат каретки</td>
        </tr>
        <tr>
            <td>\v</td>
            <td>Вертикальная табуляция</td>
        </tr>
        <tr>
            <td>\t</td>
            <td>Табуляция</td>
        </tr>
        <tr>
            <td>\b</td>
            <td>
                <code>\(^|\W)\w+($|\W)\</code>
                <br/>
                <i>Работает только с латинским алфавитом</i>
            </td>
        </tr>
        <tr>
            <td>\p{Letter}</td>
            <td>
                Unicode
                <br/>
                {} - диапазон
            </td>
        </tr>
    </tbody>
</table>

#### Пример

```
const string = 'Ваш заказ оформлен 20.12.2021 с номером №024242'
const regexp = /(?<=№)\d+/

string.match(regexp) // ['024242']
```

## Якорные символы

У символов каретки `^` и доллара `$` есть специальные значения в регулярных выражениях. Они называются «якоря» (anchors).

Каретка `^` означает совпадение с началом текста, а доллар `$` – с концом.

<table>
    <thead>
        <tr>
            <td><b>Символ</b></td>
            <td><b>Значение</b></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>$</td>
            <td>Конец строки (вне диапазона)</td>
        </tr>
        <tr>
            <td>^</td>
            <td>Начало строки (вне диапазона)</td>
        </tr>
    </tbody>
</table>

#### Пример

```
const string = '123a'
const stringNumbers = '123'
const regexp = /^\d+$/

string.match(regexp) // null
stringNumbers.match(regexp) // ['123']
```

## Специальные символы

Для поиска специальных символов `[ ] \ ^ $ . | ? * + ( )` нужно использовать **экранирование** - ` \ `

#### Пример

```
const string = 'Глава 1.1'
const regexp = /\d+\.\d+/

string.match(regexp) // ['1.1']
```

## Диапазоны

**Наборы**, несколько символов или символьных классов в квадратных скобках `[…]` - поиск по заданным символам

**Символьные диапазоны**, например `[a-z]` - соответствует символу в диапазоне т `a` до `z`

**Исключающие символьные диапазоны** `[^aeyo]` – любой символ, за исключением `a`, `e`, `y` или `o`


#### Пример

```
const string = 'Бор Вор Хор'
const regexp = /[бв]ор/gi

string.match(regexp) // ['Бор', 'Вор']
```

## Квантификаторы

- `{n}` - точное количество
- `{n, k}` - диапазон
- `+` - один или более === `{1,}`
- `?` - ноль или один === `{0,1}` (делает символ необязательным)
- `*` - ноль или более === `{0,}`

#### Пример

```
const string = '<span></span>'
const regexp = /<[a-z]+>/gi

string.match(regexp) // ['<span>']
```

## Жадные и ленивые квантификаторы

Символ `?` после другого квантификатора меняет режим совпадения с жадного на ленивый

Ленивый режим включается только для квантификаторов с `?`, остальные квантификаторы остаются жадными

#### Пример

```
// Жадный поиск
const string = 'Lorem "ipsum" dolor "sit" amet.';
const regexp = /".+"/g;

string.match(regexp) // "ipsum" dolor "sit"

// Ленивый поиск
const string = 'Lorem "ipsum" dolor "sit" amet.';
const regexp = /".+?"/g;

string.match(regexp) // ['"ipsum"', '"sit"']
```

## Скобочные группы

**Скобочная группа**, часть шаблона в скобках `(...)`

Если установить квантификатор после скобочной группы, то он будет применяться ко всему содержимому скобки, а не к одному символу.

Именование группы `?<name>` непосредственно после открытия скобки.

Скобочную группу можно исключить из запоминаемых и нумеруемых, добавив в её начало `?:`.

#### Пример

```
const string = 'site.com my.site.com';
const regexp = /([\w-]+\.)+\w+/g;

string.match(regexp); // ['site.com', 'my.site.com']
```

## Альтернация

В регулярных выражениях она обозначается символом вертикальной черты `|`.

#### Пример

```
const string = 'Сначала появился язык Java, затем HTML, потом JavaScript';
const regexp = /html|css|java(script)?/gi;

string.match(regexp); // ['Java', 'HTML', 'JavaScript']
```

## Опережающие и ретроспективные проверки

В некоторых случаях нам нужно найти соответствия шаблону, но только те, за которыми или перед которыми следует другой шаблон.

Синтаксис опережающей проверки: 

- `X(?=Y)` - Позитивная опережающая проверка (ищет совпадение с `X` при условии, что после него ЕСТЬ `Y`)
- `X(?!Y)` - Негативная опережающая проверка (ищет совпадение с `X` при условии, что после него НЕТ `Y`)

Синтаксис ретроспективной проверки: 

- `(?<=Y)X` - Позитивная ретроспективная проверка (ищет совпадение с `X` при условии, что перед ним ЕСТЬ `Y`)
- `(?<!Y)X` - Негативная ретроспективная проверка (ищет совпадение с `X` при условии, что перед ним НЕТ `Y`)

#### Пример

```
// Опережающая проверка
const string = '1 индейка стоит 30€';
const regexp = /\d+(?=€)/;

string.match(regexp); // [30]

// Ретроспективная проверка
const string = '1 индейка стоит $30';
const regexp = /(?<=\$)\d+/;

string.match(regexp); // [30]
```

## Флаги

Флаги можно комбинировать

<table>
    <thead>
        <tr>
            <td><b>Символ</b></td>
            <td><b>Значение</b></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>g</td>
            <td>global (lastIndex с какого символа начнется следующий поиск)</td>
        </tr>
        <tr>
            <td>i</td>
            <td>ignoreCase (игнорирует регистр)</td>
        </tr>
        <tr>
            <td>m</td>
            <td>multiline (учитывает многосторонность)</td>
        </tr>
        <tr>
            <td>s</td>
            <td>включает режим «dotall», при котором точка <code>.</code> может соответствовать символу перевода строки <code>\n</code></td>
        </tr>
        <tr>
            <td>u</td>
            <td>полная поддержка юникода</td>
        </tr>
        <tr>
            <td>y</td>
            <td>поиск с конкретной позиции (ни до и ни после)</td>
        </tr>
    </tbody>
</table>

#### Пример

```
const string = `123 
456
789
`
const regexp = /^\d+$/gm

string.match(regexp) // ['456', '789']
```

## Методы RegExp и String

### str.match(regexp)

Метод `str.match(regexp)` ищет совпадения с `regexp` в строке `str`.

### str.matchAll(regexp)

Метод `str.matchAll(regexp)` – «новый, улучшенный» вариант метода `str.match`.

Он используется, в первую очередь, для поиска всех совпадений вместе со скобочными группами.

### str.split(regexp|substr, limit)

Разбивает строку в массив по разделителю – регулярному выражению `regexp` или подстроке `substr`.

### str.search(regexp)

Метод `str.search(regexp)` возвращает позицию первого совпадения с `regexp` в строке `str` или `-1`, если совпадения нет.

### str.replace(str|regexp, str|func)

Это универсальный метод поиска и замены, один из самых полезных.

### regexp.exec(str)

Метод `regexp.exec(str)` ищет совпадение с `regexp` в строке `str`. В отличие от предыдущих методов, вызывается на регулярном выражении, а не на строке.

### regexp.test(str)

Метод `regexp.test(str)` ищет совпадение и возвращает `true/false`, в зависимости от того, находит ли он его.

## Шаблоны

<code>const regexp = /pattern/flags;</code>

<code>const regexp = new RegExp("pattern", "flags");</code>
