class vDOM {
    virtualDOM = [];

    // HTML 5 syntaxe requestemenets
    SELF_CLOSE = ['base', 'meta', 'link', 'br', 'hr', 'img', 'area', 'input', 'col', 'param', 'wbr', 'embed', 'source', 'track'] 

    childAppend(el) {
        var childs = [];
        el.childNodes.forEach(el => childs.push(this.childAppend(el)))

        return { original: el, childs: childs};
    }
    HtmlTovDOM(html = '') {
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
}

var vdom = new vDOM();
vdom.HtmlTovDOM('<div>a<lols>sfdfds</lols>fds</div>');
