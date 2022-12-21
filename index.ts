//* EventEmitter class to track events:
//* Define events interface:
interface Events {
    [key: string]: Function[]; // using an array because there could be more than one subscriber for each event.
}

class EventEmitter {
    public events: Events;
    constructor(events?: Events) {
      this.events = events || {};
    }
  
    //* Subscription + Unsubscription:
    public subscribe (eventName: string, cb: Function) {
        (this.events[eventName] || (this.events[eventName] = [])).push(cb);
        return {
            unsubscribe: () =>
              this.events[eventName] && this.events[eventName].splice(this.events[eventName].indexOf(cb) >>> 0, 1) // using bitwise operator to get a real number every time we call splice()
          };
    }
    
    //* Emitting:
    public emit(eventName: string, ...args: any[]): void {
        (this.events[eventName] || []).forEach(fn => fn(...args)); // iterate through the array of callbacks that have been stored. 
      }
}

function logKeydown (eventName) {
    console.log('keyboard pressed: ' + eventName.key);
}
function alertKeydown (eventName) {
    alert('keyboard pressed: ' + eventName.key);
}

//* Check:

const logKeydownSubscription = new EventEmitter;
logKeydownSubscription.subscribe('keydown', logKeydown);

const alertKeydownSubscription = new EventEmitter;
const a = alertKeydownSubscription.subscribe('keydown', alertKeydown);
a.unsubscribe();
logKeydownSubscription.emit('keydown', {key: 'Enter'});
