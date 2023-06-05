module.exports.useState = (val) => {
    let e = {
        value: val,
        subscribers: [],
        subscribe(subscriber, name = "update") { this.subscribers.push([subscriber, name]); },
        unsubscribe(subscriber) { this.subscribers.slice(this.subscribers.indexOf(subscriber), 1); },
        valueOf() { return this.value; },
        toString() { return String(this.value); }
    };

    return [
        e,
        (val) => {
            e.value = val;
            e.subscribers.forEach(sub => { sub[0][sub[1]](val); });
        }
    ]
}