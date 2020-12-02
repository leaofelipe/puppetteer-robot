async function hasInternalAccess(page) {
  const { BASE_URL } = process.env
  const SOCIOS_PAGE = `${BASE_URL}/faces/socios/search.xhtml`

  const response = await page.goto(SOCIOS_PAGE, {
    waitUntil: 'networkidle0'
  })

  return response.url() === SOCIOS_PAGE
}

module.exports = hasInternalAccess
