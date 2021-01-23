//following MVC pattern 
//we are making an API so we dont have to worry about View
//this is a model [includes fetching data from database and CRUD database]

let friends = require('../data/friends.json')
const { updateFriendsBook } = require('../utils')

const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(friends)
  })
}

const findById = (id) => {
  return new Promise((resolve, reject) => {
    const friend = friends.find((f) => f.id === id)
    resolve(friend)
  })
}

const create = (friend) => {
  return new Promise((resolve, reject) => {
    friends.push(friend)
    updateFriendsBook('./data/friends.json', friends)
    resolve(friend)
  })
}

const update = (friendData, id) => {
  return new Promise((resolve, reject) => {
    const index = friends.findIndex((f) => f.id === id)
    friends[index] = { ...friendData }
    updateFriendsBook('./data/friends.json', friends)
    resolve(friends[index])
  })
}

const remove = (id) => {
  return new Promise((resolve, reject) => {
    friends = friends.filter((f) => f.id !== id)
    updateFriendsBook('./data/friends.json', friends)
    resolve()
  })
}

module.exports = { findAll, findById, create, update, remove }