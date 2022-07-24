var main = function() {
    var weightBox = document.getElementById("facet_152");
    var weightBoxBody = weightBox.getElementsByClassName("advanced_search__facet__body box_body")[0];
    var listItems = weightBoxBody.getElementsByTagName("li");

    for (var i = 0; i < listItems.length; i++){
        let li = listItems[i];
        var weightName = li.textContent.slice(0, li.textContent.indexOf("(") - 1)
        var newElement = document.createElement('span');
        var newText = document.createTextNode(nameToWeight(removeBreaks(weightName), just_number = true))
        newElement.appendChild(newText);
        a = li.getElementsByTagName('a')[0];
        a.insertBefore(newElement, a.getElementsByTagName('input')[0]);
    }

}

setTimeout(main, 3000);

/*
var newElement = document.createElement('span');
            var newText = document.createTextNode("{{" + nameToWeight(removeBreaks(weightName)) + "}}");
            newElement.appendChild(newText);
            field.insertBefore(newElement, values[0]);

*/