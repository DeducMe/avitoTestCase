# Тестование задания на позицию Frontend-стажёр в юнит VAS
____
Не стал серьезно прорабатывать дизайн, больше сконцентрировался на JS.

Старался как можно меньше нагрузить приложение и использовал только нативный js и одну библиотеку для создания картинки из баннера.

Для сериализации в JSON добавил два результирующих варианта. Функции htmlToJson и copyJson.

```JS
function copyJson(){
    const html = banner.outerHTML;       
    const data = { html: html }; 

    // Для хранения в JSON
    let json = JSON.stringify(data);
    

    copyToClipboard(json)
}

// Для дальнешей работы с JSON
function htmlToJson(div){
    let tag = {};
    tag['tagName']=div.tagName;
    tag['children'] = [];
    for(let i = 0; i< div.children.length;i++){
       tag['children'].push(htmlToJson(div.children[i]));
    }
    for(let i = 0; i< div.attributes.length;i++){
       let attr= div.attributes[i];
       tag['@'+attr.name] = attr.value;
    }
    let json = JSON.stringify(data); 
    copyToClipboard(json)
}
```

Все написано синтаксисом ES6.
