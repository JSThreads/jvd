class vDOM {
            virtualDOM = [];
            virtualDatas = {
                data: {
                    i: 0
                }
            }

            datas = new Proxy(this.virtualDatas, {
                set: function (target, key, value) {
                    console.log(`${key} set to ${value}`);
                    target[key] = value;
                    return true;
                },
                defineProperty(target, key, descriptor) {
                    console.log(target)
                    console.log(key)
                    console.log(descriptor)
                    return true;
                }
            });

            /*
            
              //================================//
             //       HTML to VirtualDOM       //
            //================================//

            We transform HTML to VirtualDOM

            */

            childAppend(el) {
                if (el.nodeName == '#text') {
                    return { type: 'text', content: el.data }
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
                this.virtualDOM = { head: [], body: [] };

                html.body.childNodes.forEach(el => {
                    this.virtualDOM.body.push(this.childAppend(el))
                })

                //console.log(this.virtualDOM)
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
                    return document.createTextNode(el.content);
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

        var vdom = new vDOM();
        vdom.HtmlTovDOM('<div><b class="a" id=b>sfdfds</b>fds</div><i class="a" id=b>sfdfds</i>');

        vdom.render(document.getElementById('app'))
