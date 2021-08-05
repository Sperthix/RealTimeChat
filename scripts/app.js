// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const showName = document.querySelector('.current-name');


// chceck local storage for a name
const username = localStorage.username ? localStorage.username : 'Anonymous';
showName.innerText = username;


// create class instances
const chatroom = new Chatroom('general', 'Anonymous');
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
});

// update name
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // get name from input field
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    newNameForm.reset();
    // show new name message for user
    updateMssg.innerText = `Name updated, hello ${newName}!`; 
    showName.innerText = newName;
    setTimeout( () => updateMssg.innerText = '', 3000);
});