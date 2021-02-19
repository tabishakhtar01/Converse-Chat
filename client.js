const socket = io("http://localhost:8000");

const formConatiner = document.getElementById('form-container');
const messageContainer = document.getElementById('message-container');
const inputMessage = document.getElementById('input-message');
// const iname = document.getElementById('name');
// const ibtn = document.getElementById('ibtn');

// ibtn.addEventListener('submit',()=>
// {
//     while(!names)
//     {
//         const names = iname.value;
//         appendMessage(`${names} connected, Hii`,'right');
//     }
const names = "Friend";
console.log("working");

socket.on('send-everyone',data => // step 5: connected clients recives the message
{
    // console.log(message);
    appendMessage(`${data.username}: ${data.message}`,'left');
})



socket.emit('new-user',names);



socket.on('new-user-joined',user=>
{
    appendMessage(`${user} joined`,'left');
})

socket.on('user-disconnected',()=>
{
    appendMessage(`${user} disconnected`,'left');
})



formConatiner.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const message = inputMessage.value;
    console.log(message);
    socket.emit('send-message',message); //step 2 seding/emiting message to the server
    inputMessage.value = "";
    appendMessage(`${message}`,'right');
})

function appendMessage(data,position)  // function for appending message on the div
{  
    const messageBody = document.createElement('div');
    messageBody.innerText = data;
    messageBody.classList.add('message');
    messageBody.classList.add(position);
    messageContainer.append(messageBody);
    scrollPage();
}

function scrollPage()
{
    messageContainer.scrollTop =  messageContainer.scrollHeight;
}
