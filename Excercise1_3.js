// FireflyDomSniffer library
function FireflyDomSniffer(elemnet) {
	if (elemnet) {
        if (window === this) {
            return new FireflyDomSniffer(elemnet);
        }
        this.element = document.getElementById(elemnet);
        return this;
    }
}

// FireflyDomSniffer prototype
FireflyDomSniffer.prototype = {
    appendChild: function (data) {
    	var child = document.createElement('div');
		child.innerHTML = data;
		child = child.firstChild;
        this.element.appendChild(child);
        this.log("appendChild", data);
        return child;
    },
    removeChild: function (data) {
        var child = document.createElement('div');
		child.innerHTML = data;
		child = child.firstChild;
        this.element.removeChild(child);
        this.log("removeChild", data);
        return this;
    },
    collectTextNodes: function () {
	    var inputArray = document.getElementsByTagName("input");
	    var result = [];
	    for (var i = 0; i < inputArray.length; i++) {
	        var input = inputArray[i];
	        if (input.type == 'text') {
	           result.push(input.parentNode.id + ":" + input.value);
	        }
	    }
	    this.log("collectTextNodes", JSON.stringify(result));
	    return inputArray;
    },
    includeList: function () {
       return ["class", "id", "name", "href"];
    },
    sanitizeHTML: function (name, attrVal) {
        this.log("sanitizeHTML", JSON.stringify({[name]: attrVal}));
        switch (name) {
            case "class":
                var regex = /^[a-zA-Z0-9\s,\-_]+$/;
                var result = regex.test(attrVal);
                return result;
                break;
            case "id":
                var regex = /^[a-zA-Z0-9\:\-_\.]+$/;
                var result = regex.test(attrVal);
                return result;
                break;

            default:
                var regex = /^.*$/;
                var result = regex.test(attrVal);
                return result;
        }
    }, 
    log: function (func, delta) {
    	var str = "Received Overridden function Call!!";
        str += "<br>Function : <b>" + func + "</b>";
        str += "<br>HtmlDelta: <b><xmp>" + delta + "</xmp></b>";
    	var child = document.createElement('div');
		child.innerHTML = str;
        document.getElementById("log").appendChild(child);
    }
}

FireflyDomSniffer('output').appendChild("<div class='foo'>bar</div>");
FireflyDomSniffer('output').collectTextNodes();
var testSanitize = document.getElementById("xyz");
var testSanitizeAttr = testSanitize.attributes;
for(var i= 0; i < testSanitizeAttr.length; i++) {
	var checkArray = FireflyDomSniffer("xyz").includeList();
    if (checkArray.indexOf(testSanitizeAttr[i].name) != -1) {
        // remove attribute on fail
        if (!FireflyDomSniffer("xyz").sanitizeHTML(testSanitizeAttr[i].name, testSanitizeAttr[i].value)) {
        	testSanitize.removeAttribute(testSanitizeAttr[i].name);
        }
    } else {
        // remove attribute
        testSanitize.removeAttribute(testSanitizeAttr[i].name);
    }
}
