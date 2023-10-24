function getQueryOfElement(element){
    var attributeNames = element.getAttributeNames();
    if (attributeNames.includes('class')){
        var classes = '.' + element.className.replaceAll(' ', '.');
    } else {
        var classes = '';
    }

    if (attributeNames.includes('id')){
        var id = '#' + element.id;
    } else {
        var id = '';
    }

    var query = element.tagName.toLowerCase() + id + classes;

    return {
        query: query,
        queryAll: document.querySelectorAll(query)
    };
}