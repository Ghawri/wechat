const socket = io()
let name;

let textarea= document.querySelector("#textarea")
let messageArea = document.querySelector(".message__area")
do{

    name =prompt('Enter your name... ')
}while(!name)

    textarea.addEventListener('keyup',(e)=>{
        if(e.key == "Enter"){
            sendMessage(e.target.value)
        }
    })

    function sendMessage(message){
        let msg ={
            user: name,
            message: message.trim()
        }
        //append

        appendMessage(msg,'outgoing')
        textarea.value="";

        scrolltobottom()

        //send to server
        socket.emit('message',msg)
    }

    function appendMessage(msg,type){
        let maindiv = document.createElement('div')
        let className = type ;
        maindiv.classList.add(type,'message')

        let markup =`
        <h4> ${msg.user}</h4>
        <p> ${msg.message}</p>`

        maindiv.innerHTML = markup
        messageArea.appendChild(maindiv)
    }

    // recive message

    socket.on('message',(msg)=>{
        // console.log(msg)
        appendMessage(msg,'incoming')
        scrolltobottom()
    })

    function scrolltobottom(){
        messageArea.scrollTop = messageArea.scrollHeight;
    }