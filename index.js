const puppeteer = require('puppeteer')
const login = require('./modules/login')
const addSocioValor = require('./modules/addSocioValor')
const runMultiple = require('./modules/runMultiple')
require('dotenv').config()

const { USERNAME, PASSWORD } = process.env

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  })

  const page = await browser.newPage()

  await login({
    page,
    username: USERNAME,
    password: PASSWORD,
    onError: (e) => {
      console.log(e)
    },
    onSuccess: () => {
      console.log('Login OK')
    }
  })

  const arrayData = ['00730K 22', '00767K 22']

  const addData = async (data) => {
    const dataSplitted = data.split(' ')
    const cod = dataSplitted[0]
    const val = dataSplitted[1]

    await addSocioValor(page, cod, val)
    Promise.resolve()
  }

  await runMultiple(arrayData, addData)
})()
