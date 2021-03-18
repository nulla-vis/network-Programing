//front-end js
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const onlineUser = document.getElementById('users')
const feedback = document.getElementById('feedback')
const inputmsg = document.getElementById('msg')
const socket = io()

//get userName and roomName from URL
const{ username , room} = Qs.parse(location.search, {
    //add option(s)
    ignoreQueryPrefix: true
})

// console.log(username,room )
//join chatroom
socket.emit('joinRoom', {username,room})

//get online user(s) and room name
socket.on('userRoom', ({room, users}) => {
    outputRoomName(room)
    outputOnlineUsers(users)
})

//message from server
socket.on('message',message=>{
    // console.log(message)
    outputMessage(message)
    feedback.innerHTML = ''

    //scroll down every time a message inputted
    chatMessages.scrollTop = chatMessages.scrollHeight
})

//istyping
socket.on('typing',data=>{
    // console.log(data)
    feedback.innerHTML = `<p><em> ${data.userName} is typing a message...</em></p>`
})

//event listener when message submit
chatForm.addEventListener('submit',(e)=>{
    //prevent default behavior
    e.preventDefault();

    //get message text
    const msg = e.target.elements.msg.value

    // console.log(msg)

    //emit message to server
    socket.emit('chatMessage',msg)

    //clear input message form
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

inputmsg.addEventListener('keypress', message=>{
    socket.emit('typing',message)
})

//function(s)=========================================================================
//output message to DOM
function outputMessage(message){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.userName} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

//add room name to DOM
function outputRoomName(room) {
    roomName.innerHTML = room
}

//add online user(s) to DOM
function outputOnlineUsers(users) {
    onlineUser.innerHTML = `${users.map(user => `<li>${user.userName}</li>`).join('')} `// ''=> remove comma
}