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

    }
    Fragement = class {

    }

    static createRoot(DOMEl, el) {

    }
    static createElement(tag, props, ...children) {
        return {
            tag: tag,
            props: props,
            children: children,
            parse: {

            },
            render() {
                let el = document.createElement(this.tag);

                // setting all the props
                for (let prop in this.props) {
                    if (this.parse[prop]) this.parse[prop](el, this.props[prop]);
                    else el.setAttribute(prop, this.prop[prop]);
                }

                // appending all childs
                for (let child in this.children) {
                    if (child.render)
                        el.appendChild(this.children[child].render());
                    else
                        el.appendChild(document.createTextNode(this.children[child]));
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