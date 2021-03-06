// Test with html element.
var initElement = document.getElementsByTagName("html")[0];
console.log(mapDOM(initElement));

function mapDOM(element) {
    var domObject = {};
    //Recursively loop through DOM elements
    function domHTML(element, object) {
        object[element.nodeName] = element.nodeName;
        var nodeList = element.childNodes;

        if (nodeList != null) {
            if (nodeList.length) {
                object[element.nodeName] = [];
                for (var i = 0; i < nodeList.length; i++) {
                    if(!/\S/.test(nodeList[i].nodeValue)){
                        continue;
                    }
                    if (nodeList[i].nodeType == 3) {
                        object[element.nodeName].push(nodeList[i].nodeValue);
                    } else {
                        object[element.nodeName].push({});
                        domHTML(nodeList[i], object[element.nodeName][object[element.nodeName].length-1]);
                    }
                }
            }
        }
    }
    domHTML(element, domObject);
    return JSON.stringify(domObject);
}