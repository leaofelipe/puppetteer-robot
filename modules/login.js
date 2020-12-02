const hasInternalAccess = require('./hasInternalAccess')

async function login({
  page,
  username,
  password,
  onSuccess = () => {},
  onError = () => {}
}) {
  const { BASE_URL } = process.env
  try {
    const response = await page.goto(`${BASE_URL}/faces/login.xhtml`, {
      waitUntil: 'networkidle0'
    })

    await page.type('#login\\:usuarioNome', username)
    await page.type('#login\\:senha', password)
    await page.$eval('input[name=login\\:j_idt38]', (el) => el.click())

    const hasAccess = await hasInternalAccess(page)

    if (!hasAccess) throw new Error('Erro ao efetuar o Login.')

    return response

    // onSuccess();
  } catch (e) {
    onError(e)
  }
}

module.exports = login
