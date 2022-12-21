var EventEmitter = /** @class */ (function () {
    function EventEmitter(events) {
        this.events = events || {};
    }
    //* Subscription + Unsubscription:
    EventEmitter.prototype.subscribe = function (eventName, cb) {
        var _this = this;
        (this.events[eventName] || (this.events[eventName] = [])).push(cb);
        return {
            unsubscribe: function () {
                return _this.events[eventName] && _this.events[eventName].splice(_this.events[eventName].indexOf(cb) >>> 0, 1);
            } // using bitwise operator to get a real number every time we call splice()
        };
    };
    //* Emitting:
    EventEmitter.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (this.events[eventName] || []).forEach(function (fn) { return fn.apply(void 0, args); }); // iterate through the array of callbacks that have been stored. 
    };
    return EventEmitter;
}());
function logKeydown(eventName) {
    console.log('keyboard pressed: ' + eventName.key);
}
function alertKeydown(eventName) {
    alert('keyboard pressed: ' + eventName.key);
}
//* Check:
var logKeydownSubscription = new EventEmitter;
logKeydownSubscription.subscribe('keydown', logKeydown);
var alertKeydownSubscription = new EventEmitter;
var a = alertKeydownSubscription.subscribe('keydown', alertKeydown);
a.unsubscribe();
logKeydownSubscription.emit('keydown', { key: 'Enter' });
