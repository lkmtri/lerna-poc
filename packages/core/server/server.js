import express from 'express'

export default (port, handler) => () => {
  const server = express()

  server.get('*', handler)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}