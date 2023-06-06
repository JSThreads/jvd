/**
 * Check a problem with Node destruction 
 * */

class JVD {
    /**
     * Elements are immutable, their goal is just to
     * return an HTML element at render
     *  */
    Root = class {

    }
    // child component are only rerender if props
    Component = class {
        // before mount
        onMount() { }
        // after mount
        didMount() { }
        // before unmount
        onUnmount() { }
        // after unmount
        didUnmount() { }
        // update
        update() {

        }
        // render
        render(props) {

        }
    }
    Fragement = class {

    }

    static createText(...children) {

    }
    static createRoot(DOMEl, el) {
        DOMEl.appendChild(el.renderHTML(DOMEl));
    }
    static createElement(tag, props, ...children) {
        return {
            tag: tag,
            props: props,
            children: children,
            parse: {

            },
            renderHTML() {
                let el = document.createElement(this.tag);

                // setting all the props
                for (let prop in this.props) {
                    if (this.parse.hasOwnProperty(prop)) this.parse[prop](el, this.props[prop]);
                    else el.setAttribute(prop, this.props[prop]);
                }

                // appending all childs
                for (let child in this.children) {
                    if (this.children[child].hasOwnProperty('renderHTML')) el.appendChild(this.children[child].renderHTML());
                    else el.appendChild(document.createTextNode(this.children[child]));
                }

                return el;
            }
        };
    }
}

/**
 * HEADER
 *   
 * 
 * body
 *   div
 *     HEADER
 *     MAIN
 *     FOOTER     
 */