class State {
    constructor(val) {
        this.value = val;
        this.subscribers = [];
    }
    subscribe(subscriber, name = "update") { this.subscribers.push([subscriber, name]); }
    unsubscribe(subscriber) { this.subscribers.slice(this.subscribers.indexOf(subscriber), 1); }
    valueOf() { return this.value; }
    toString() { return String(this.value); }
}

var useState = (val) => {
    let e = new State(val);

    return [
        e,
        (val) => {
            e.value = val;
            e.subscribers.forEach(sub => { sub[0][sub[1]](val); });
        }
    ]
}