// add new chat document

// setting up a real-time listener to update chatroom

// updating username

// updating the room

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message) {
        // format a chat object
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };

        // save chat document to database

        const response = await this.chats.add(chat);
        return response;

    }

    getChats(callback){
        this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot( snapshot => {
            snapshot.docChanges().forEach( change => {
                if (change.type === 'added'){
                    callback(change.doc.data());
                }
                else if(change.type === 'deleted'){
                    console.log('some messages got deleted');
                }
            })
        });
    }

    updateName(username){
        this.username = username;
    }

    updateRoom(room){
        this.room = room;
        console.log('Room was changed to: ' + room);
        if(this.unsub) this.unsub();
    }

}

const chatroom = new Chatroom('general', 'Sperthix');

chatroom.getChats( data => {
    console.log(data);
});

setTimeout( () => {
    chatroom.updateRoom('gaming');
    chatroom.updateName('Pumec');
    chatroom.getChats( data => {
        console.log(data);
    });
    chatroom.addChat('Am I a gamer now?');
}, 3000);