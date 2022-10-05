class App { 
            constructor () {
                this.events = {};   
            }
            
            addListener (event, callback) {
                if (typeof callback !== 'function') {
                    console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
                    return false;
                }
                
                if (typeof event !== 'string') {
                    console.error(`The event name must be a string, the given type is ${typeof event}`);
                    return false;
                }

                if (this.events[event] === undefined) {
                    this.events[event] = {
                        listeners: []
                    }
                }
                
                this.events[event].listeners.push(callback);
            }
            
            removeListener (event, callback) {
                if (this.events[event] === undefined) {
                    console.error(`This event: ${event} does not exist`);
                    return false;
                }
                
                this.events[event].listeners = this.events[event].listeners.filter(listener => {
                    return listener.toString() !== callback.toString(); 
                });
            }
            
            dispatch (event, details) {
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
                    for (var t = 0; t < variables.length; t++) {
                        let el = variables[t];
                        if (last != el.index)
                            index++;

                        var key = [];
                        var tokens = esprima.tokenize(el[0]);
                        for (var i = 2; i < tokens.length - 3; i++) {
                            if ((tokens[i].type == 'Keyword' && tokens[i].value == 'this') && (tokens[i + 1].type == 'Punctuator' && tokens[i + 1].value == '.') && (tokens[i + 2].type == 'Identifier' && tokens[i + 2].value == 'datas')) {
                                i += 3
                                while ((tokens[i].type == 'Punctuator' && tokens[i].value == '.') || tokens[i].type == 'Identifier') {
                                    if (tokens[i].type == 'Identifier')
                                        key.push(tokens[i].value)
                                    i++
                                }
                            }
                        }

                        eval(`
                            this.addListener('datas', (details) => {
                                var ok = true;
                                for (var i = 0; i < details.key; i++) {
                                    try {
                                        if (details.key[i] != key[i]) {
                                            ok = false;
                                            break;
                                        }
                                    } catch (e) {
                                        ok = false;
                                        break;
                                    }
                                }
                                if (ok) {
                                    content[`+index +`] = eval("` +el[0] + `")
                                    vdom.render(document.getElementById('app'))
                                }
                            })
                        `)
                        content[index] = eval(el[0]); // data with listener

                        last = el[0].length + el.index;
                        index++;
                    }

                    return { type: 'text', content: content }
                }

                // getting childs
                var childs = [];
                for (var t = 0; t < el.childNodes.length; t++) {
                    childs.push(this.childAppend(el.childNodes[t]))
                }

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

                for (var i = 0; i < html.body.childNodes.length; i++) 
                    this.virtualDOM.body.push(this.childAppend(html.body.childNodes[i]))
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
                target.innerHTML = ''         
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

        vdom.datas.num = -1;

        vdom.render(document.getElementById('app'))
