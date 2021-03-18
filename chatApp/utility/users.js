const users = []

//join user to chat
function userJoin(id, userName, room) {
    const user = {id, userName, room}

    users.push(user)

    return user
}

//get current user
function getCurrentuser(id) {
 return users.find(user => user.id === id)
}

//user leaves chatroom
function userLeave(id) {
    const index = users.findIndex(user => user.id === id)

    if(index !== -1) {
        //return the current user
        return users.splice(index,1)[0]
    }
}

//get users room
function usersRoom(room) {
    return users.filter(user => user.room === room)
}

module.exports = {
    userJoin, getCurrentuser, userLeave, usersRoom
} 