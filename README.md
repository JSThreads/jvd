# VirtualDOM 🛠

The template don't change, we give the maximum content to the virtual DOM. 

![image](https://user-images.githubusercontent.com/73474137/193359180-f890403b-e15c-49e6-b0fa-5f3d871ecd7b.png)

## Example

```html 
<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <link rel="text/stylesheet" href="${cssPath}">
</head>
<body>
  <h1>A small list</h1>
  <ul for="el in list">
    <li>${list[el]}</li>
  </ul>
</body>
</html>
```

```json
{
  "vDom": [
    { "name": "!DOCTYPE", "opt": { "args": [{ "html": null }], "childs": [] } },
    { "name": "html", "opt": { "args": [], "childs": [2] } },
    { "name": "head", "opt": { "args": [], "childs": [3, 4] } },
    { "name": "title", "opt": { "args": [], "childs": ["${title}"] } },
    { "name": "link", "opt": { "args": [{ "rel": "text/stylesheet" }, { "href": "${cssPath}" }], "childs": [] } },
    { "name": "body", "opt": { "args": [], "childs": [6, 7] } },
    { "name": "h1", "opt": { "args": [], "childs": ["A small list"] } },
    { "name": "ul", "opt": { "args": [], "childs": [8] } }
    { "name": "li", "opt": { "args": [], "childs": ["${list[el]}"] } }
  ]
}
```
