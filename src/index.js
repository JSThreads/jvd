class App {
            constructor () {
                this.events = {};   
            }
            
            addListener (event, callback) {
                // Check if the callback is not a function
                if (typeof callback !== 'function') {
                    console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
                    return false;
                }
                
                
                // Check if the event is not a string
                if (typeof event !== 'string') {
                    console.error(`The event name must be a string, the given type is ${typeof event}`);
                    return false;
                }
                
                // Check if this event not exists
                if (this.events[event] === undefined) {
                    this.events[event] = {
                        listeners: []
                    }
                }
                
                this.events[event].listeners.push(callback);
            }
            
            removeListener (event, callback) {
                // Check if this event not exists
                if (this.events[event] === undefined) {
                    console.error(`This event: ${event} does not exist`);
                    return false;
                }
                
                this.events[event].listeners = this.events[event].listeners.filter(listener => {
                    return listener.toString() !== callback.toString(); 
                });
            }
            
            dispatch (event, details) {
                // Check if this event not exists
                if (this.events[event] === undefined) {
                    console.error(`This event: ${event} does not exist`);
                    return false;
                }
                
                this.events[event].listeners.forEach((listener) => {
                    listener(details);
                });
            }  

            __observalbe = (target, callback, _base = []) => {
                for (const key in target) {
                    if (typeof target[key] === 'object')
                        target[key] = this.__observalbe(target[key], callback, [..._base, key])
                }
                let THIS = this
                return new Proxy(target, {
                    set(target, key, value) {
                        if (typeof value === 'object') 
                            value = THIS.__observalbe(value, callback, [..._base, key])
                        callback([..._base, key], target[key] = value)
                        return value
                    }
                })
            }

            virtualDOM = [];
            datas = this.__observalbe({
                num: 1,
                text: 'some text', 
                arr: [1, 2, 4, 7, 9],
                obj: { text: 'text', num: 10, arr: [1, 2, 4, 7, 9], obj: { text: 'text', num: 10, arr: [1, 2, 4, 7, 9], obj: { text: 'text', num: 10, arr: [1, 2, 4, 7, 9] } } }
            }, (key, val) => {
                this.dispatch('datas', {
                    key: key,
                    val: val
                })
            })

            /*
            //================================//
            //       HTML to VirtualDOM       //
            //================================//
            We transform HTML to VirtualDOM
            */

            childAppend(el) {
                if (el.nodeName == '#text') {
                    var content = el.data.split(/{{(.|\n)*?}}/g), variables = [...el.data.matchAll(/{{(.|\n)*?}}/g)]; 

                    var index = content.indexOf('');
                    while (index != -1) {
                        content.splice(index, 1);
                        index = content.indexOf('');
                    }

                    var last = 0; index = 0;
                    variables.forEach(el => {
                        if (last != el.index)
                            index++;

                        content[index] = el[0];

                        last = el[0].length + el.index;
                        index++;
                    })

                    return { type: 'text', content: content }
                }

                // getting childs
                var childs = [];
                el.childNodes.forEach(el => childs.push(this.childAppend(el)))

                //getting attrs
                const attrs = el.getAttributeNames().reduce((acc, name) => {
                    return {...acc, [name]: el.getAttribute(name)};
                }, {});

                return { type: 'tag', tag: el.nodeName,  attrs: attrs, childs: childs};
            }
            HtmlTovDOM(html) {
                // parsing 
                var parser = new DOMParser();
                html = parser.parseFromString(html, "text/html");

                // writing DOM
                this.virtualDOM = this.__observalbe({ head: [], body: [] }, (key, val) => {
                    console.log(key, val)
                });

                html.body.childNodes.forEach(el => {
                    this.virtualDOM.body.push(this.childAppend(el))
                })
            }

            /*
            //================================//
            //       VirtualDOM to HTML       //
            //================================//
            We render the VirtualDOM with applied changes
            */

            renderChild(el) {
                if (el.type == 'tag') {
                    const element = document.createElement(el.tag);
                    for (const [k, v] of Object.entries(el.attrs)) 
                        element.setAttribute(k, v);
                    for (const child of el.childs) 
                        element.appendChild(this.renderChild(child));

                    return element;
                } else {
                    var content = '';
                    el.content.forEach(el => { content += el })
                    return document.createTextNode(content);
                }
            }

            render(target) {                    
                this.virtualDOM.body.forEach(el => {
                    target.appendChild(this.renderChild(el));
                })  
            }

            /*
            //================================//
            //       Update VirtualDOM        //
            //================================//
            We update the VirtualDOM with applied changes
            */
        }

        var vdom = new App();
        vdom.HtmlTovDOM('<div><i>Italic text: {{ this.datas.num }}, {{ this.datas.text }}</i><br><b>Bold text: {{ this.datas.num }}{{ this.datas.text }}</b></div>');

        vdom.datas.num = 9

        vdom.render(document.getElementById('app'))
