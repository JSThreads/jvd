/**
 * Check a problem with Node destruction 
 * */

module.exports.JVD = class {
    constructor() {
        this.Element = class {
            constructor(tag, props, parent) {

            }

            render() {
                if (this.parent && this.element) { this.parent.removeChild(this.element); }
            }
        }
    }

    static createElement(tag, props, ...children) {
        return {
            tag: tag,
            props: props,
            parent: null,
            children: children,
            element: null,
            render() {
                this.element
            }
        }
    }
}