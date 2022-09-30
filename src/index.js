class vDOM {
    virtualDOM = [];

    // HTML 5 syntaxe requestemenets
    SELF_CLOSE = ['base', 'meta', 'link', 'br', 'hr', 'img', 'area', 'input', 'col', 'param', 'wbr'] 

    nextChild(el) {
        
    }
    HtmlTovDOM(html) {
        // delete comments 
        html = html.replace(/<\!\-\-.*\-\->/g, '');
        // reset DOM
        this.virtualDOM = [];

        // read element by element
        var tmpContent = '', tmpDOM = [], tmpArgs = [], tree = [];

        for (var i = 0; i < html.length; i++) {
            tmpContent += html[i];
            if (html[i] == '<' && html[i + 1] == '!') {
                // html directives

            }
        }

        tmpDOM = [
            { type: 'tag', name: 'div', opt: { args: [], childs: [ 1, 2 ] } }, 
            { type: 'tag', name: 'p', opt: { args: [], childs: [ 3 ] } }, 
            { type: 'tag', name: 'div', opt: { args: [], childs: [ 4 ] } }, 
            { type: 'text', content: 'the text content' }, 
            { type: 'tag', name: 'b', opt: { args: [], childs: [ 5 ] } }, 
            { type: 'text', content: 'some bold text' }
        ]

        // link
        tmpDOM.forEach(el => {
            this.virtualDOM.push(el);

        })
    }
}
