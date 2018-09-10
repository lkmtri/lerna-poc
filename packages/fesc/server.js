import next from 'next'
import server from 'core/server'

const PORT = 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(server(PORT, handle))