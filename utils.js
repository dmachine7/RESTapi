const fs = require('fs')

const updateFriendsBook = (filename, content) => {
  fs.writeFileSync(filename, (JSON.stringify(content)), 'utf8', err => { err ? console.log(err) : null })
}

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = ''
      req.on('data', (chunk) => {
        body += chunk.toString()
      })

      req.on('end', () => {
        resolve(body)
      })
    } catch (error) {
      console.log(error)
    }
  })
}

module.exports = { updateFriendsBook, getPostData }