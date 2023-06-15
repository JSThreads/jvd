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
            change(fn) { return fn(this.value); }
            subscribe(subscriber, name="update") { this.subscribers.push([subscriber, name]); }
            unsubscribe(subscriber) { this.subscribers.slice(this.subscribers.indexOf(subscriber), 1); }
            valueOf() { return this.value; }
            toString() { return String(this.value); }
        }
        class Slice {
            constructor(source, accessor, pointer) {
                this.source = source;
                this.accessor = typeof accessor == 'object' ? [...accessor] : [accessor];
                this.pointer = pointer;
                
                if (typeof this.pointer == 'object') {
                    if (Array.isArray(this.pointer)) {
                        this.concat = (src) => { this.pointer.concat(src); }
                        this.fill = (value, start=null, end=null) => {
                            if (start == null) this.pointer.fill(value);
                            else if (end == null) this.pointer.fill(value, start);
                            else this.pointer.fill(value, start, end);
                        }
                        this.forEach = (fn) => { this.pointer.forEach(fn); }
                        this.from = (src) => { this.pointer = Array.from(src); }
                        this.pop = () => { this.pointer.pop(); }
                        this.push = (...val) => { this.pointer.push(...val); }
                        this.sort = () => { this.pointer.sort(); }
                        this.splice = (start, deleteCount=null, ...items) => {
                            if (deleteCount == null) this.pointer.splice(start);
                            if (items.length == 0) this.pointer.splice(start, deleteCount);
                            this.pointer.splice(start, deleteCount, ...items);
                        }
                        this.reverse = () => { this.pointer.reverse(); }
                        this.unshift = (...el) => { this.pointer.unshift(...el); }

                        this.with = (index, value) => { return this.pointer.with(index, value); }
                        this.values = () => { return this.pointer.values(); }
                        this.toString = () => { return this.pointer.toString(); }
                        this.toSpliced = (start, deleteCount=null, ...items) => {
                            if (deleteCount == null) return this.pointer.toSpliced(start);
                            if (items.length == 0) return this.pointer.toSpliced(start, deleteCount);
                            return this.pointer.toSpliced(start, deleteCount, ...items);
                        }
                        this.toSorted = (fn=null) => { 
                            if (fn == null) return this.pointer.toSorted(); 
                            return this.pointer.toSorted(fn); 
                        }
                        this.toLocaleString = (str=null, options={}) => { return str == null ? this.pointer.toLocaleString() : this.pointer.toLocaleString(str, options); }
                        this.some = (fn) => { return this.pointer.some(fn); }
                        this.slice = (start=null, end=null) => {
                            if (start==null) return this.pointer.slice();
                            if (end==null) return this.pointer.slice(start);
                            return this.pointer.slice(start, end);
                        }
                        this.shift = () => { return this.pointer.shift(); }
                        this.toReversed = () => { return this.pointer.toReversed(); }
                        this.reduce = (fn, init=null) => { return init == null ? this.pointer.reduce(fn) : this.pointer.reduce(fn, init); }
                        this.reduceRight = (fn, init=null) => { return init == null ? this.pointer.reduceRight(fn) : this.pointer.reduceRight(fn, init); }                        
                        this.map = (fn) => { return this.pointer.map(fn); }
                        this.lastIndexOf = (val) => { return this.pointer.lastIndexOf(val); }
                        this.keys = () => { return this.pointer.keys(); }
                        this.join = (str=',') => { return this.pointer.join(str); }
                        this.indexOf = (val) => { return this.pointer.indexOf(val); }
                        this.includes = (val) => { return this.pointer.includes(val); }
                        this.flatMap = (fn) => { return this.pointer.flatMap(fn); }
                        this.flat = (depth=null) => { return depth != null ? this.pointer.flat(depth) : this.pointer.flat(); }
                        this.findLast = (fn) => { return this.pointer.findLast(fn); }
                        this.findLastIndex = (fn) => { return this.pointer.findLastIndex(fn); }
                        this.findIndex = (fn) => { return this.pointer.findIndex(fn); }
                        this.find = (fn) => { return this.pointer.find(fn); }
                        this.filter = (fn) => { return this.pointer.filter(fn); }
                        this.every = (fn) => { return this.pointer.every(fn); }
                        this.entries = () => { return this.pointer.entries(); }
                        this.copyWithin = (target, start, end=null) => { return end == null ? this.pointer.copyWithin(target, start) : this.pointer.copyWithin(target, start, end); }
                        this.length = () => { return this.pointer.length; }
                    }
                    else {
                        this.assign = (src) => { Object.assign(this.pointer, src); }
                        this.create = (src) => { this.pointer = Object.create(src); }
                        this.defineProperties = (props) => { Object.defineProperties(this.pointer, props); }
                        this.defineProperty = (name, props) => { Object.defineProperty(this.pointer, name, props); }
                        this.freeze = () => { Object.freeze(this.pointer); }
                        this.fromEntries = (src) => { this.pointer = Object.fromEntries(src); }
                        this.preventExtensions = () => { Object.preventExtensions(this.pointer); }
                        this.seal = () => { Object.seal(this.pointer); }
                        this.setPrototypeOf = (src) => { Object.setPrototypeOf(this.pointer, src); }
                        this.setValueOf = (fn) => { this.pointer.prototype.valueOf = fn; }
                        this.setToString = (fn) => { this.pointer.prototype.toString = fn; }

                        this.values = () => { return this.pointer.values(); }
                        this.valueOf = () => { return this.pointer.valueOf(); }
                        this.toString = () => { return this.pointer.toString(); }
                        this.toLocaleString = (str=null, options={}) => { return str == null ? this.pointer.toLocaleString() : this.pointer.toLocaleString(str, options); }
                        this.propertyIsEnumerable = (name) => { return this.pointer.propertyIsEnumerable(name); }
                        this.keys = () => { return Object.keys(this.pointer); }
                        this.isSealed = () => { return Object.isSealed(this.pointer); }
                        this.isPrototypeOf = (proto) => { return this.pointer.prototype.isPrototypeOf(proto); }
                        this.isFrozen = () => { return Object.isFrozen(this.pointer); }
                        this.isExtensible = () => { return Object.isExtensible(this.pointer); }
                        this.hasOwnProperty = (name) => { return this.pointer.hasOwnProperty(name); }
                        this.hasOwn = (name) => { return Object.hasOwn(this.pointer, name); }
                        this.getPrototypeOf = () => { return Object.getPrototypeOf(this.pointer); }
                        this.getOwnPropertyDescriptor = (name) => { return Object.getOwnPropertyDescriptor(this.pointer, name); } 
                        this.getOwnPropertyDescriptors = () => { return Object.getOwnPropertyDescriptors(this.pointer); } 
                        this.getOwnPropertyNames = () => { return Object.getOwnPropertyNames(this.pointer); }
                        this.getOwnPropertySymbols = () => { return Object.getOwnPropertySymbols(this.pointer); }
                        this.entries = () => { return Object.entries(this.pointer); }
                    }

                    this.at = (accessor) => {
                        return new Slice(this.source, [...this.accessor, accessor], this.pointer[accessor]);
                    } 
                }
            }
            set(v) { this.pointer = v; }
            get() { return this.pointer; } 
        }
        this.Slice = Slice

        this.useState = (val) => {
            let e = new State(val);

            // functions for optimisation 
            if (typeof e.value == 'object') {
                if (Array.isArray(e.value)) {
                    e.concat = (src) => { e.value.concat(src); }
                    e.fill = (value, start=null, end=null) => {
                        if (start == null) e.value.fill(value);
                        else if (end == null) e.value.fill(value, start);
                        else e.value.fill(value, start, end);
                    }
                    e.forEach = (fn) => { e.value.forEach(fn); }
                    e.from = (src) => { e.value = Array.from(src); }
                    e.pop = () => { e.value.pop(); }
                    e.push = (...val) => { e.value.push(...val); }
                    e.sort = (fn=null) => { fn == null ? e.value.sort() : e.value.sort(fn); }
                    e.splice = (start, deleteCount=null, ...items) => {
                        if (deleteCount == null) e.value.splice(start);
                        if (items.length == 0) e.value.splice(start, deleteCount);
                        e.value.splice(start, deleteCount, ...items);
                    }
                    e.reverse = () => { e.value.reverse(); }
                    e.unshift = (...el) => { e.value.unshift(...el); }

                    e.with = (index, value) => { return e.value.with(index, value); }
                    e.values = () => { return e.value.values(); }
                    e.toString = () => { return e.value.toString(); }
                    e.toSpliced = (start, deleteCount=null, ...items) => {
                        if (deleteCount == null) return e.value.toSpliced(start);
                        if (items.length == 0) return e.value.toSpliced(start, deleteCount);
                        return e.value.toSpliced(start, deleteCount, ...items);
                    }
                    e.toSorted = (fn=null) => { 
                        if (fn == null) return e.value.toSorted(); 
                        return e.value.toSorted(fn); 
                    }
                    e.toLocaleString = (str=null, options={}) => { return str == null ? e.value.toLocaleString() : e.value.toLocaleString(str, options); }
                    e.some = (fn) => { return e.value.some(fn); }
                    e.slice = (start=null, end=null) => {
                        if (start==null) return e.value.slice();
                        if (end==null) return e.value.slice(start);
                        return e.value.slice(start, end);
                    }
                    e.shift = () => { return e.value.shift(); }
                    e.toReversed = () => { return e.value.toReversed(); }
                    e.reduce = (fn, init=null) => { return init == null ? e.value.reduce(fn) : e.value.reduce(fn, init); }
                    e.reduceRight = (fn, init=null) => { return init == null ? e.value.reduceRight(fn) : e.value.reduceRight(fn, init); }                        
                    e.map = (fn) => { return e.value.map(fn); }
                    e.lastIndexOf = (val) => { return e.value.lastIndexOf(val); }
                    e.keys = () => { return e.value.keys(); }
                    e.join = (str=',') => { return e.value.join(str); }
                    e.indexOf = (val) => { return e.value.indexOf(val); }
                    e.includes = (val) => { return e.value.includes(val); }
                    e.flatMap = (fn) => { return e.value.flatMap(fn); }
                    e.flat = (depth=null) => { return depth != null ? e.value.flat(depth) : e.value.flat(); }
                    e.findLast = (fn) => { return e.value.findLast(fn); }
                    e.findLastIndex = (fn) => { return e.value.findLastIndex(fn); }
                    e.findIndex = (fn) => { return e.value.findIndex(fn); }
                    e.find = (fn) => { return e.value.find(fn); }
                    e.filter = (fn) => { return e.value.filter(fn); }
                    e.every = (fn) => { return e.value.every(fn); }
                    e.entries = () => { return e.value.entries(); }
                    e.copyWithin = (target, start, end=null) => { return end == null ? e.value.copyWithin(target, start) : e.value.copyWithin(target, start, end); }
                    e.length = () => { return e.value.length; }
                }
                else {
                    e.assign = (src) => { Object.assign(e.value, src); }
                    e.create = (src) => { e.value = Object.create(src); }
                    e.defineProperties = (props) => { Object.defineProperties(e.value, props); }
                    e.defineProperty = (name, props) => { Object.defineProperty(e.value, name, props); }
                    e.freeze = () => { Object.freeze(e.value); }
                    e.fromEntries = (src) => { e.value = Object.fromEntries(src); }
                    e.preventExtensions = () => { Object.preventExtensions(e.value); }
                    e.seal = () => { Object.seal(e.value); }
                    e.setPrototypeOf = (src) => { Object.setPrototypeOf(e.value, src); }
                    e.setValueOf = (fn) => { e.value.prototype.valueOf = fn; }
                    e.setToString = (fn) => { e.value.prototype.toString = fn; }

                    e.values = () => { return e.value.values(); }
                    e.valueOf = () => { return e.value.valueOf(); }
                    e.toString = () => { return e.value.toString(); }
                    e.toLocaleString = (str=null, options={}) => { return str == null ? e.value.toLocaleString() : e.value.toLocaleString(str, options); }
                    e.propertyIsEnumerable = (name) => { return e.value.propertyIsEnumerable(name); }
                    e.keys = () => { return Object.keys(e.value); }
                    e.isSealed = () => { return Object.isSealed(e.value); }
                    e.isPrototypeOf = (proto) => { return e.value.prototype.isPrototypeOf(proto); }
                    e.isFrozen = () => { return Object.isFrozen(e.value); }
                    e.isExtensible = () => { return Object.isExtensible(e.value); }
                    e.hasOwnProperty = (name) => { return e.value.hasOwnProperty(name); }
                    e.hasOwn = (name) => { return Object.hasOwn(e.value, name); }
                    e.getPrototypeOf = () => { return Object.getPrototypeOf(e.value); }
                    e.getOwnPropertyDescriptor = (name) => { return Object.getOwnPropertyDescriptor(e.value, name); } 
                    e.getOwnPropertyDescriptors = () => { return Object.getOwnPropertyDescriptors(e.value); } 
                    e.getOwnPropertyNames = () => { return Object.getOwnPropertyNames(e.value); }
                    e.getOwnPropertySymbols = () => { return Object.getOwnPropertySymbols(e.value); }
                    e.entries = () => { return Object.entries(e.value); }
                }

                e.at = (accessor) => {
                    return new Slice(e.value, [accessor], e.value);
                } 
            }
        
            return [
                e,
                (val) => {
                    e.value = val;
                    e.subscribers.forEach(sub => { sub[0][sub[1]](val); });
                }
            ]
        }

        /**
         * Element
         * ~ an element is static and can be only change on
         * parent component render / or not at all
         */
        class Element {
            constructor({ tag, props, children }) {
                this.tag = tag;
                this.props = props;
                this.children = children;
            }
            renderHTML() {

            }
        }
        this.createElement = ({tag, props, children}) => { return new Element({ tag, props, children }); }

        /**
         * Component
         * ~ an component is reactif, at each state change in 
         * the component the component is optimaly rerender in 
         * the most optimal way:
         * - all the tree up in array / objects is rerender
         * - components are not rerender if hasn't updated props
         * - attributes rerender anything but does changes in the 
         * HTML dom to be faster
         */
        class Component {
            constructor(props = {}, slot = []) {
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
            mount($el) { 
                $el = Object.assign(new JVD.Component, $el) instanceof JVD.Component 
                ? Object.assign(new Component, $el) 
                : structuredClone($el); 
                /*this.p.appendChild();*/
                $el.renderHTML(this.p) 
            }
        }
        this.createRoot = (el) => { return new Root(el) };
    }
}

const JVD = new _JVD();

// Comparaison of dom to do