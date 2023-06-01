class JVD {
    constructor() {}

    static createRoot(root, el, datas) {
        let updateMap = {};

        return {
            root: root,
            element: el,
            datas: datas,
            render: el.render(root, datas, updateMap),
            updateMap: updateMap
        }
    }
    static createElement(props) {
        this.JVDElement = class {
            constructor(props) {
                this.props = props;
                console.log(this)
            }
            render(parent, datas, updateMap) {
                this.parent = parent;
                this.datas = datas;
                this.updateMap = updateMap;
            }
        }

        return new this.JVDElement(props);
    }
}

function useState(val) {
    let e = {
        value: val,
        subscribers: [],
        subscribe(subscriber) { this.subscribers.push(subscriber); },
        unsubscribe(subscriber) { this.subscribers.slice(this.subscribers.indexOf(subscriber), 1); },
        valueOf() { return this.value; },
        toString() { return String(this.value); }
    };

    return [
        e,
        (val) => {
            e.value = val;
            e.subscribers.forEach(sub => { sub.update(val); });
        }
    ]
}

let [g, setG] = useState(6);

class DOMElement {
    constructor() {
        this.template = "test"
    }

    update(t) {
        this.template = t;
        console.log(this)
    }
}

console.log(g.valueOf());
let el = new DOMElement();

g.subscribe(el);
setG(8);