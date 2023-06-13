class _JVD {
    constructor() {
        /**
         * State management
         */
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

        this.useState = (val) => {
            let e = new State(val);
        
            return [
                e,
                (val) => {
                    e.value = val;
                    e.subscribers.forEach(sub => { sub[0][sub[1]](val); });
                }
            ]
        }

        /**
         * Component
         */
        class Component {
            constructor(props, slot) {
                this.props = props;
                this.slot = slot;
            }
            render() { return []; }
            renderHTML() {
                let r = [];

                console.log(this.render());

                return r;
            }
        }
        this.Component = Component;

        /**
         * Root
         */
        class Root {
            constructor(el) { this.p = el; }
            // cloning the element to allow multiple app
            mount($el) { $el = Object.assign(new JVD.Component, $el) instanceof JVD.Component ? Object.assign(new Component, $el) : structuredClone($el); /*this.p.appendChild();*/$el.renderHTML(this.p) }
        }
        this.createRoot = (el) => { return new Root(el) };
    }
}

const JVD = new _JVD();

// Comparaison of dom to do