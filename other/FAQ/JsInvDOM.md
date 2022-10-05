# Js in vDOM

To start all the Javascript is stored between `{{` and `}}`. The string inside is a template so it's not changable in runtime. First all the used variables are extracted by an iterpreter and finally are strored unter the next form:

```js
{
  vars: {
  
  },
  template: ''
}
```

At change the template is reavuluted.

For less changes only the DOM is observabled.
