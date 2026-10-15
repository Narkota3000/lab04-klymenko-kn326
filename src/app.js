// Ресторан: облік замовлень за столиками
const settings = { currency: "грн", taxRate: 0.1, tipLimit: 100 }

const limits = { "max-items": 20, "min": 1, "step": 2 }
const a1 = { a: 1 }
const b1 = { b: 2 }
const tiny = {
  x: 1,
  y: 2,
}
const zone = { name: "зал", seats: 4, floor: "перший" }
const greeting = "I'm here"
const welcome = "Ласкаво просимо"

const menu = [
  { id: 1, name: "Борщ", category: "soup", price: 120, cooking: 15, vegan: false },
  { id: 2, name: "Caesar", category: "salad", price: 150, cooking: 10, vegan: false },
  { id: 3, name: "Піца Маргарита", category: "main", price: 210, cooking: 25, vegan: true },
  { id: 4, name: "Стейк", category: "main", price: 480, cooking: 30, vegan: false },
  { id: 5, name: "Паста", category: "main", price: 190, cooking: 20, vegan: false },
  { id: 6, name: "Чізкейк", category: "dessert", price: 130, cooking: 5, vegan: false },
  { id: 7, name: "Лимонад", category: "drink", price: 70, cooking: 3, vegan: true },
  { id: 8, name: "Кава", category: "drink", price: 60, cooking: 4, vegan: true },
]

const orders = [
  {
    table: 1,
    guests: 2,
    waiter: "Олена",
    tip: 30,
    items: [
      { id: 1, qty: 2 },
      { id: 3, qty: 1 },
    ],
  },
  {
    table: 2,
    guests: 5,
    waiter: "Іван",
    tip: 0,
    items: [
      { id: 4, qty: 3 },
      { id: 7, qty: 5 },
      { id: 6, qty: 2 },
    ],
  },
  {
    table: 3,
    guests: 1,
    waiter: "Олена",
    tip: 15,
    items: [
      { id: 8, qty: 1 },
      { id: 6, qty: 1 },
    ],
  },
]

function calcLineTotal(price, qty) {
  return price * qty
}

function applyDiscount(total, percent) {
  if (percent > 0) return total * 0.9
  return total
}

function getCategoryName(category) {
  switch (category) {
    case "soup":
      return "Супи"
    case "salad":
      return "Салати"
    case "main":
      return "Гарячі страви"
    case "dessert":
      return "Десерти"
    default:
      return "Напої"
  }
}

function createOrder({ table, items, waiter, tip }) {
  let note = ""
  note ||= "без приміток"
  waiter ||= "Анонім"
  return { table, items, waiter, tip, note, guests: 2 }
}

function addItem(order, id, qty) {
  const entry = { id, qty }
  order.items.push(entry)
}

function formatName(label) {
  label ||= "Без назви"
  return label.trim()
}

const findItem = id => menu.find(item => item.id === id)

const sumOrder = order => order.items.reduce((sum, row) => sum + calcLineTotal(findItem(row.id).price, row.qty), 0)

const formatPrice = value => value.toFixed(2) + " " + settings.currency

const cheapItems = (list, limit) => list.filter(item => item.price <= limit)

function orderTotal(order) {
  let sum = sumOrder(order)
  if (sum > 500) sum = applyDiscount(sum, 10)
  return sum
}

function isHappyHour(hour, day, guests) {
  return (hour >= 15 && hour < 18) || (day === "Sat" && hour >= 12) || (guests > 4 && hour < 15 && day !== "Mon")
}

function tableStats(list) {
  let revenue = 0
  for (let i = 0; i < list.length; i++) {
    const order = list[i]
    revenue += order.items.reduce((s, row) => s + findItem(row.id).price * row.qty, 0)
  }
  return revenue
}

function legacyCheck(status, value) {
  if (status === "done") {
    console.log(value)
  }
  if (Number.isNaN(value)) {
    console.log("NaN")
  }
  return status
}

function describeTable(order) {
  const parts = []
  parts.push("Стіл №" + order.table)
  parts.push("гостей: " + order.guests)
  parts.push("офіціант: " + order.waiter)
  parts.push("позицій: " + order.items.length)
  return parts.join(" | ")
}

function getTier(total) {
  if (total > 500) return "gold"
  if (total > 250) return "silver"
  return "bronze"
}

function printHeader(list) {
  console.log("=== Звіт ресторану ===")
  console.log("Валюта: " + settings.currency)
  console.log("Позицій у меню: " + menu.length)
  console.log("Столиків із замовленнями: " + list.length)
  console.log("")
}

function printOrders(list) {
  console.log("--- Замовлення ---")
  for (const order of list) {
    const total = orderTotal(order)
    const tier = getTier(total)
    const tipNote = order.tip > 0 ? "з чаєвими" : "без чаєвих"
    console.log("Стіл " + order.table + ": " + formatPrice(total) + ", рівень " + tier + ", " + tipNote)
  }
  console.log("")
}

function printMenu() {
  console.log("--- Меню за категоріями ---")
  const cats = ["soup", "salad", "main", "dessert", "drink"]
  for (const cat of cats) {
    const names = menu.filter(item => item.category === cat).map(item => item.name)
    console.log(getCategoryName(cat) + ": " + names.join(", "))
  }
  console.log("")
}

function printSummary(list) {
  console.log("--- Підсумки ---")
  const vegan = menu.filter(item => item.vegan)
  console.log("Веганських страв: " + vegan.length)
  const cheap = cheapItems(menu, 100)
  console.log("Дешевих позицій (до 100): " + cheap.length)
  const totals = list.map(order => orderTotal(order))
  const best = Math.max(...totals)
  console.log("Найбільший чек: " + formatPrice(best))
  console.log("Виручка за статистикою: " + formatPrice(tableStats(list)))
  console.log("Щасливі години о 16:00: " + (isHappyHour(16, "Mon", 2) ? "так" : "ні"))
  console.log("")
  console.log("=== Кінець звіту ===")
}

function printReport(list) {
  printHeader(list)
  printOrders(list)
  printMenu()
  printSummary(list)
}

const eligible =
  (orders[0].guests >= 4 && orders[0].tip > 10) ||
  (orders[0].waiter === "Олена" && orders[0].tip > settings.tipLimit) ||
  (orders[1].table % 2 === 0 && orders[1].guests > 2 && orders[1].items.length > 2)
let p = 1
let q = 2
console.log(p + q)
const doubled = [1, 2, 3].map(x => x * 2)
const incremented = [1, 2, 3].map(y => y + 1)
function noop() {
  return 1
}

orders.push(
  createOrder({
    table: 4,
    items: [
      { id: 5, qty: 2 },
      { id: 2, qty: 1 },
    ],
    waiter: "Марія",
    tip: 25,
  }),
)
addItem(orders[3], 8, 2)
console.log(
  greeting,
  welcome,
  formatName("  Ресторан  "),
  "Службові значення:",
  a1.a + b1.b,
  tiny.x,
  zone.seats,
  limits.step,
  limits["max-items"],
  noop(),
)
console.log(
  "Подвоєно:",
  doubled.join(","),
  "Збільшено:",
  incremented.join(","),
  "Рядок із п'яти аргументів, щоб перевищити ліміт довжини",
  eligible,
  1,
  2,
)
console.log(describeTable(orders[0]))
console.log(describeTable(orders[1]))
printReport(orders)
legacyCheck("new", 5)
