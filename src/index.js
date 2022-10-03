class vDOM {
observalbe = (target, callback, _base = []) => {
    for (const key in target) {
        if (typeof target[key] === 'object')
        target[key] = this.observalbe(target[key], callback, [..._base, key])
    }
    return new Proxy(target, {
        set(target, key, value) {
        if (typeof value === 'object') value = this.observalbe(value, callback, [..._base, key])
        callback([..._base, key], target[key] = value)
        return value
        }
    })
}

virtualDOM = [];
datas = this.observalbe({
    num: 1,
    text: 'some text', 
    arr: [1, 2, 4, 7, 9],
    obj: { text: 'text', num: 10, arr: [1, 2, 4, 7, 9], obj: { text: 'text', num: 10, arr: [1, 2, 4, 7, 9], obj: { text: 'text', num: 10, arr: [1, 2, 4, 7, 9] } } }
}, (key, val) => {
    console.log(key, val);
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

            content[index] = eval(el[0]);

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
    this.virtualDOM = { head: [], body: [] };

    html.body.childNodes.forEach(el => {
        this.virtualDOM.body.push(this.childAppend(el))
    })

    console.log(this.virtualDOM)
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

var vdom = new vDOM();
vdom.HtmlTovDOM('<div><i>Italic text: {{ this.datas.num }}, {{ this.datas.text }}</i><br><b>Bold text: {{ this.datas.num }}{{ this.datas.text }}</b></div>');

vdom.render(document.getElementById('app'))
