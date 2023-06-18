class _JVD {
    constructor() {
        let stateWatcherKey = Symbol('watcher');
        let stateTargetKey = Symbol('target');

        this.watcher = stateWatcherKey;
        this.target = stateTargetKey;

        class State {
            constructor(value, dependencices=[], subscribers=[], watchers={}, accessor=[]) {
                this.value = value;
                // accessors
                this.dependencices = dependencices;
                // subscribers
                this.subscribers = subscribers;
                // watchers
                this.watchers = watchers;
                // accessor path
                this.accessor = accessor;
            }
            valueOf() { return this.value; }
            toString() { return this.value.toString(); }
        }
        this.State = State;

        this.useState = (value, dependencices=[], subscribers=[], watchers={}, accessor=[]) => {
            let x = this;
            let y = this.State;
            let z = this.useState;
            
            return new Proxy(new this.State(value, dependencices, subscribers, watchers, accessor),
            {
                get(target, accessor) {
                    if (accessor == x.watcher) return (w) => {
                        target.watchers[target.accessor] ? target.watchers[target.accessor].push(w) : target.watchers[target.accessor] = [w];          
                        return target.value;
                    }
                    if (accessor == x.target) return target;

                    if (accessor instanceof y) return z(target.value[accessor], structuredClone([accessor, ...target.dependencices]), target.subscribers, target.watchers, structuredClone([accessor[x.target].toString(), ...target.accessor]));
                    return z(target.value[accessor], structuredClone(target.dependencices), target.subscribers, target.watchers, structuredClone([accessor.toString(), ...target.accessor]));
                }
            });
        }
    }
}

const JVD = new _JVD();

let l = JVD.useState({ e: { r: { l: 9 } } })
let q = l[JVD.watcher](9)
console.log(l.e.r.l)
console.log(q, l)

// Comparaison of dom to do