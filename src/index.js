class vDOM {
    virtualDOM = [];

    // HTML 5 syntaxe requestemenets
    SELF_CLOSE = ['base', 'meta', 'link', 'br', 'hr', 'img', 'area', 'input', 'col', 'param', 'wbr'] 

    childToDOM(idx, tmpDOM) {
        if (tmpDOM[idx].type == 'text') {
            return 0;
        }
        var totChilds = tmpDOM[idx].opt.childs.length;

        for (var i = 0; i < tmpDOM[idx].opt.childs.length; i++) {
            totChilds += this.childToDOM(tmpDOM[idx].opt.childs[i], tmpDOM)
            tmpDOM[idx].opt.childs[i] = tmpDOM[tmpDOM[idx].opt.childs[i]];
        }

        return totChilds;
    }
    HtmlTovDOM(html = '') {
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

        /*
        ||========================||
        ||        TEST UNIT       ||
        ||========================||

        tmpDOM = [
            { type: 'tag', name: 'div', opt: { args: [], childs: [ 1, 2 ] } }, 
            { type: 'tag', name: 'p', opt: { args: [], childs: [ 3 ] } }, 
            { type: 'tag', name: 'div', opt: { args: [], childs: [ 4 ] } }, 
            { type: 'text', content: 'the text content' }, 
            { type: 'tag', name: 'b', opt: { args: [], childs: [ 5 ] } }, 
            { type: 'text', content: 'some bold text' }
        ]
        */

        // link
        for (var i = 0; i < tmpDOM.length; i++) {
            var inc = this.childToDOM(i, tmpDOM);
            this.virtualDOM.push(tmpDOM[i]);
            i += inc;
        }

        // console.log(this.virtualDOM);
    }
}

/*var vdom = new vDOM();
vdom.HtmlTovDOM();*/
