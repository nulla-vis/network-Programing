//this is client side



var socket = io()
var setUser = false
// socket.emit('message','sample') //'message' = event/connection name ,'sample' is the given value
var userName = ""
var arrayUser = []
var lastInput = "1023498234923knfdkjsndfkasbf90234823904zkm,nf,mzsdnf9034587394znfkjd"
var input = document.getElementById('message-input')


input.addEventListener('keypress',()=>{
    socket.emit('typing',userName)
})

input.addEventListener("keyup",(event)=>{
    if(event.keyCode === 13) {
        send()
    }
})

function send() {
    if(setUser === true) {
        const message = document.getElementById('message-input').value
        if(message != lastInput){
            lastInput = message
            document.getElementById('message-input').value = ""
            socket.emit('message',userName,message) //socket = server and ownself
        }else{
            alert("同じものを入力しないでください。")
        }
        
    }else {
        alert('User Nameを入力してください')
        document.getElementById('message-input').value = ""
    }
}

function updateScroll(){
    var element = document.getElementById("show-chat-history");
    element.scrollTop = element.scrollHeight;
}


function setUserName() {
    userName = document.getElementById('user-name').value
    if(userName === ""){
        alert('User Nameを入力してください')
    }else{
    // socket = io()
    const h3 = document.createElement('h3')
    const name = document.createTextNode(`User Name : ${userName}`)
    h3.appendChild(name)
    document.getElementById('show-user').appendChild(h3)
    document.getElementById('user-name').remove()
    document.getElementById('set-user-name').remove()
    setUser = true
    socket.emit('send-UserName',userName)
    socket.emit('offline',userName)
    }
}

socket.emit('online',userName)
socket.emit('offline',userName)



socket.on('send-UserName',(text)=>{
    socket.emit('offline',userName)
    const ul = document.getElementById('show-chat')
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(text))
    ul.appendChild(li)
    updateScroll()
})

socket.on('online',(arrayUser)=>{
    const ul = document.getElementById('online-list')
    console.log(ul.getElementsByTagName('li').length)
    var lis = document.querySelectorAll('#online-list li');
    for(var i=0; li=lis[i]; i++) {
        li.parentNode.removeChild(li);
    }
    for(let i = 0 ; i < arrayUser.length ; i++) {
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(arrayUser[i]))
        ul.appendChild(li)
    }
})

socket.on('message',(msg) => {
    document.getElementById('feedback').innerHTML = ''
    const ul = document.getElementById('show-chat')
    const li = document.createElement('li')
 
    li.appendChild(document.createTextNode(msg))
    ul.appendChild(li)

    updateScroll()
})

socket.on('typing',(userName)=>{
    document.getElementById('feedback').innerHTML = `${userName} is typing a message......`
})

socket.on('offline',(dcUser,arrayUser)=>{
    // var text = `${dcUser} has offline`
    console.log()
    const showChat = document.getElementById('show-chat')
    const liChat = document.createElement('li')
 
    liChat.appendChild(document.createTextNode(dcUser+' has left the chat'))
    showChat.appendChild(liChat)

    updateScroll()
    const ul = document.getElementById('online-list')
    console.log(ul.getElementsByTagName('li').length)
    var lis = document.querySelectorAll('#online-list li');
    for(var i=0; li=lis[i]; i++) {
        li.parentNode.removeChild(li);
    }
    for(let i = 0 ; i < arrayUser.length ; i++) {
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(arrayUser[i]))
        ul.appendChild(li)
    }
   
    // const li = document.createElement('li')
    // li.appendChild(document.createTextNode(text))
    // ul.appendChild(li)
    // updateScroll()
})
