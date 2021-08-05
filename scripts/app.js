// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');


// create class instances
const chatroom = new Chatroom('general', 'Sperthix');
const chatUI = new ChatUI(chatList);


// get data & render
chatroom.getChats( data => chatUI.render(data));


// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
    .then( () => newChatForm.reset())
    .catch( err => console.log(err));
})