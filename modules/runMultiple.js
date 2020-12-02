async function runMultiple(arrayData, func, current = 0) {
  const arrLength = arrayData.length
  if (current >= arrLength) return
  console.log('Running: ', current)

  await func(arrayData[current])

  current++
  await runMultiple(arrayData, func, current)
}

module.exports = runMultiple
