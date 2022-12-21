class EventEmitter {
    events : {key: string, function:[]} | {} = {}

    
    
    //* Subscription:
    static subscribe () {

    }

    //* Subscription:
    static unsubscribe () {

    }


    //* Emitting:
    static emit () {

    }



}



function logKeydown (event) {
    console.log('keyboard pressed: ', event.key);
}
function alertKeydown (event) {
    alert('keyboard pressed: ' + event.key);
}

const logKeydownSubscription = EventEmitter.subscribe('keydown', logKeydown);
const alertKeydownSubscription = EventEmitter.subscribe('keydown', alertKeydown);


