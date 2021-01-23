const http = require('http')
const { getFriends, 
  getFriend, 
  createFriend, 
  updateFriend, 
  removeFriend } = require('./controllers/friendController')

const PORT = process.env.PORT || 4000

//creating server
const server = http.createServer((req, res) => {
  // all friends route
  if (req.url === '/api/friends' && req.method === 'GET') {
    getFriends(req, res)
  } 
  // specific friend route
  else if (req.url.match(/\/api\/friends\/([0-9]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3]
    getFriend(req, res, parseInt(id))
  } 
  // create friend route
  else if (req.url === '/api/friends' && req.method === 'POST') {
    createFriend(req, res)
  }
  // update friend route
  else if (req.url.match(/\/api\/friends\/([0-9]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[3]
    updateFriend(req, res, parseInt(id))
  }
  // delete friend route
  else if (req.url.match(/\/api\/friends\/([0-9]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3]
    removeFriend(req, res, parseInt(id))
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ "error": "Route Not Found" }))
  }
})

//starting
server.listen(PORT, () => {console.log(`Server running at port ${PORT}`)})