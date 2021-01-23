//this is a controller [methods for models]
const Friends = require('../models/friendModel')
const { getPostData } = require('../utils')

//@desc gets all friends
//@route GET api/friends
async function getFriends (req, res) {
  try {
    const friends = await Friends.findAll()

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(friends))
  } catch (error) {
    console.log(error)
  }
}

//@desc gets specific friend
//@route GET api/friends/:id
async function getFriend (req, res, id) {
  try {
    const friend = await Friends.findById(id)
    if (!friend) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Friend not found' }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(friend))
    }
  } catch (error) {
    console.log(error)
  }
}

//@desc create friend
//@route POST api/friends
async function createFriend (req, res) {
  try {
    const body = await getPostData(req)
    const { id, name } = JSON.parse(body) 

    const friend = {
      id,
      name
    }

    const newFriend = await Friends.create(friend)
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(newFriend))

  } catch (error) {
    console.log(error)
  }
}

//@desc update specific friend
//@route PUT api/friends/:id
async function updateFriend (req, res, id) {
  try {
    const friend = await Friends.findById(id)

    if (!friend) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Friend not found' }))
    } else {
      const body = await getPostData(req)
      const { id, name } = JSON.parse(body) 

      const friendData = {
        id: id || friend.id,
        name: name || friend.name
      }

      const updateFriend = await Friends.update(friendData, id)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(updateFriend))
    }
  } catch (error) {
    console.log(error)
  }
}

//@desc remove specific friend
//@route DELETE api/friends/:id
async function removeFriend (req, res, id) {
  try {
    const friend = await Friends.findById(id)

    if (!friend) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Friend not found' }))
    } else {
      await Friends.remove(id)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: `Friend #${id} removed` }))
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getFriends,
  getFriend,
  createFriend,
  updateFriend,
  removeFriend
}