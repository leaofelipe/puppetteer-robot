const date = new Date()
let day = date.getDay() - 1
day = day.toString()
let month = date.getMonth() + 1
month = month.toString()

const year = date.getFullYear().toString()

if (day.length === 1) day = `0${day}`
if (month.length === 1) month = `0${month}`
const fullDate = `${day}${month}${year}`
const midDate = `${month}${year}`

module.exports = {
  fullDate,
  midDate
}
