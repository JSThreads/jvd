class JVD {
    constructor() {}

    static createRoot(root, el, datas) {
        let updateMap = {};

        return {
            root: root,
            element: el,
            datas: datas,
            observer: Object.observer(datas, (c) => {
                if (updateMap[c.name]) {
                    // use a while loop with index variable 
                    // because the foreach lock the heap

                    updateMap[c.name].forEach(el => {
                        el.update();
                    });
                }
            }),
            render: el.render(root, datas, updateMap),
            updateMap: updateMap
        }
    }
    static createElement(props) {
        this.JVDElement = class {
            constructor(props) {
                this.props = props;
                console.log(this)
            }
            render(parent, datas, updateMap) {
                this.parent = parent;
                this.datas = datas;
                this.updateMap = updateMap;
            }
        }

        return new this.JVDElement(props);
    }
}

let data = {
    a: 5,
    b: 9
}

let root = JVD.createRoot(
    null, 
    JVD.createElement({ children: ["test"] }),
    data
)

data.a = 8;

console.log(root)