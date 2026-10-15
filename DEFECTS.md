# Карта дефектів (варіант 6, «Ресторан: замовлення за столиками»)

| №   | Рядок                 | Група | Опис дефекту                                                                          | Прогноз                                            | Виявлено | Виправлено |
| --- | --------------------- | ----- | ------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- | ---------- |
| 1   | 14–23                 | Ф1    | змішані відступи: 1, 3, 8 пробілів і табуляції (рядки 35, 39–41, 60–63, 67–68, 91–94) | Prettier, tabWidth/useTabs                         |          |            |
| 2   | 34–35                 | Ф2    | `price,qty){`, `price*qty`, `p+q`, `[1,2,3]` без пробілів                             | Prettier, базове форматування                      |          |            |
| 3   | 11, 12                | Ф3    | лапки упереміш, є `"I'm here"`                                                        | Prettier, singleQuote                              |          |            |
| 4   | 3, 12, 35, 40, 68     | Ф4    | частина інструкцій із `;`, частина без                                                | Prettier, semi                                     |          |            |
| 5   | 173, 174              | Ф5    | виклик console.log із 8+ аргументами в одному рядку (179 і 218 символів)              | Prettier, printWidth                               |          |            |
| 6   | 166                   | Ф6    | `let p = 1; let q = 2; console.log(p+q)` в одному рядку                               | Prettier, базове форматування                      |          |            |
| 7   | 7–10                  | Ф7    | короткі об’єкти `tiny`, `zone` у кілька рядків, частково з переносами                 | Prettier, objectWrap (preserve — не змінить)       |          |            |
| 8   | 16, 19, 23, 30        | Ф8    | багаторядкові масиви й об’єкти з комою і без неї                                      | Prettier, trailingComma                            |          |            |
| 9   | 5, 6                  | Ф9    | `{a: 1}` і `{ b: 2 }`                                                                 | Prettier, bracketSpacing                           |          |            |
| 10  | 167, 168              | Ф10   | `(x) => x * 2` і `y => y + 1`                                                         | Prettier, arrowParens                              |          |            |
| 11  | 4                     | Ф11   | `{ 'max-items': 20, "min": 1, step: 2 }`                                              | Prettier, quoteProps                               |          |            |
| 12  | 91–94, 163–165        | Ф12   | довгі логічні вирази з довільними переносами                                          | Prettier, printWidth, experimentalOperatorPosition |          |            |
| 13  | 25–27, 32, 39, 8, 110 | Ф13   | 3 порожні рядки поспіль, пробіли в кінці рядків, `}` у рядку з кодом                  | Prettier, базове форматування                      |          |            |
| 14  | 3                     | К     | `unusedTax` не використано                                                            | ESLint, no-unused-vars                             |          |            |
| 15  | 106                   | К     | функція `legacyCheck` ніколи не викликається                                          | ESLint, no-unused-vars                             |          |            |
| 16  | 108                   | К     | `console.log(totl)` — неоголошена змінна                                              | ESLint, no-undef                                   |          |            |
| 17  | 107                   | К     | `if (status = "done")`                                                                | ESLint, no-cond-assign                             |          |            |
| 18  | 114                   | К     | код після `return`                                                                    | ESLint, no-unreachable                             |          |            |
| 19  | 2                     | К     | ключ `currency` двічі в `settings`                                                    | ESLint, no-dupe-keys                               |          |            |
| 20  | 52                    | К     | другий `case 'main'`                                                                  | ESLint, no-duplicate-case                          |          |            |
| 21  | 111                   | К     | `status = status`                                                                     | ESLint, no-self-assign                             |          |            |
| 22  | 112                   | К     | порожній блок `if (value < 0) {}`                                                     | ESLint, no-empty                                   |          |            |
| 23  | 110                   | К     | `value === NaN`                                                                       | ESLint, use-isnan                                  |          |            |
| 24  | 63                    | В     | `{ table: table, items: items, ... }`                                                 | ESLint, object-shorthand                           |          |            |
| 25  | 67                    | В     | `{ id: id, qty: qty }`                                                                | ESLint, object-shorthand                           |          |            |
| 26  | 59                    | В     | `createOrder` має 4 параметри (межа 3)                                                | ESLint, max-params                                 |          |            |
| 27  | 143                   | В     | `function (item) {…}` як колбек у filter                                              | ESLint, prefer-arrow-callback                      |          |            |
| 28  | 148                   | В     | `function (item) {…}` як колбек у filter                                              | ESLint, prefer-arrow-callback                      |          |            |
| 29  | 135                   | В     | вкладений тернарний оператор `tier`                                                   | ESLint, no-nested-ternary                          |          |            |
| 30  | 61                    | В     | `note = note \|\| "…"`                                                                | ESLint, logical-assignment-operators               |          |            |
| 31  | 62                    | В     | `waiter = waiter \|\| "Анонім"`                                                       | ESLint, logical-assignment-operators               |          |            |
| 32  | 72                    | В     | `label = label \|\| "Без назви"`                                                      | ESLint, logical-assignment-operators               |          |            |
| 33  | 126–161               | В     | `printReport` має 36 рядків коду (межа 30)                                            | ESLint, max-lines-per-function                     |          |            |
| 34  | 40                    | Л     | знижка `* 0.8` (20 %) замість `* 0.9` (10 %)                                          | жоден                                              |          |            |
| 35  | 101                   | Л     | у `tableStats` сумується `cooking` замість `price`                                    | жоден                                              |          |            |

Кількість дефектів: Ф — 13, К — 10 (9 різних правил), В — 6 правил (10 порушень), Л — 2.

Очікувані правильні значення для Л:

- Стіл 2: 4·480 + 5·70 + 2·130 = 2050 → зі знижкою 10 % = 1845.00 (зараз 1640.00)
- Стіл 4: 2·190 + 150 + 2·60 = 650 → зі знижкою 10 % = 585.00 (зараз 520.00)
- Найбільший чек: 1845.00 (зараз 1640.00)
- Виручка за `tableStats` (сума цін без знижки): 450 + 2050 + 190 + 650 = 3340.00 (зараз 237.00)
