const { fullDate, midDate } = require('./getFormDates')

async function addSocioValor(page, CODIGO, VALOR) {
  const { BASE_URL } = process.env

  const URL_SOCIOS = `${BASE_URL}/faces/socios/search.xhtml`
  const URL_SOCIOS_CREATE_ID = `${BASE_URL}/faces/socios/create.xhtml?id=`

  await page.goto(URL_SOCIOS, {
    waitUntil: 'networkidle2'
  })

  await page.type('#search\\:sociosBeanExampleCodigoAsilo', CODIGO)
  await page.$eval('input[name=search\\:j_idt69]', (el) => el.click())
  await page.waitForNavigation()

  const userId = await page.$eval(
    '#search\\:sociosBeanPageItems\\:0\\:itemNome',
    (el) => {
      const data = el.parentElement.href.split('?id=')[1]
      return Promise.resolve(data)
    }
  )

  await page.goto(`${URL_SOCIOS_CREATE_ID}${userId}`, {
    waitUntil: 'networkidle0'
  })

  console.log(fullDate, midDate)

  await page.type(
    '#create\\:sociosBeanSociosLancamentos\\:lancamentosBeanAddLancamento',
    fullDate
  )
  await page.type(
    '#create\\:sociosBeanSociosLancamentos\\:lancamentosBeanAddCompetencia',
    midDate
  )
  await page.type(
    '#create\\:sociosBeanSociosLancamentos\\:lancamentosBeanAddValor',
    VALOR
  )

  await page.$eval(
    '#create\\:sociosBeanSociosLancamentos\\:sociosBeanSociosLancamentosAdd',
    (el) => el.click()
  )

  await page.waitForNavigation()

  return Promise.resolve()
}

module.exports = addSocioValor
