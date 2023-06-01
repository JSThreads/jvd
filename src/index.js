const { useState } = require('./state/state.js');
const { JVD } = require('./dom/element.js');

JVD.createElement('div',
    {
        style: {
            width: "100px",
            background: "red"
        },
        onclick: (e) => {
            console.log(e)
        }
    },
    "hi ", JVD.createElement('ul', null, [1, 2, 3, 4, 5, 6].map(e => JVD.createElement('li', null, e - 1))))