var templateString = '#{{id}}. Hello, {{name}} from {{city}}!';

var users = [
  {id:1, name:'john', age:23, city:'kyiv'},
  {id:2, name:'alex', age:55, city:'lviv'},
  {id:3, name:'daniel', age:38, city:'london'},
  {id:4, name:'tim', age:15, city: 'madrid'}
];

var compile = function (template) {

  return function (obj) {

    return template.replace(/{{\w+}}/g, function (match) {
       var item = match.replace(/[{}]/g, '');
       var result;

       if (obj[item]) {
         if (item === 'name' || item === 'city') {
           // make first letter capital if name or city
           result = jsUcfirst(obj[item]);
         } else {
           result = obj[item];
         }
       } else {
         result = '\'no info\'';
       }
       return result;
    });

  };

};

var template = compile(templateString);

renderTable(users);
renderOutputBlock(users, template);

