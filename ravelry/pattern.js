var showPanel = document.getElementById("show_panel");
var detailPanel = showPanel.getElementsByClassName("view_core_item")[0];
var detailFields = detailPanel.getElementsByClassName("fields")[0].children[0];
var fields = detailFields.getElementsByClassName("field");

for (field of fields) {

    var labelText = "undefined";
    var valueText = "undefined";

    if (field.children.length == 0) {
        continue;
    }

    try {
        labelText = field.getElementsByTagName("label")[0].textContent;
    } catch (err) {
        console.log("Couldn't isolate label text with error: " + err.toString());
        console.log("Failed Field: ");
        console.log(field);
    }

    try {
        var values = field.getElementsByClassName("value");
        if (values.length == 1) {
            valueText = values[0].textContent;
        } else {
            for (val of values) {
                valueText += val.textContent;
            }
        }

        if (values.length == 1 && removeBreaks(labelText) == "Yarn weight") {
            var weightName = values[0].textContent
            weightName = weightName.slice(0, weightName.indexOf("(") - 1);
            var newElement = document.createElement('span');
            var newText = document.createTextNode("{{" + nameToWeight(removeBreaks(weightName)) + "}}");
            newElement.appendChild(newText);
            newElement.style.marginLeft = "15px";
            field.insertBefore(newElement, values[0]);
        }

    } catch (err) {
        console.log("Couldn't isolate value text with error: " + err.toString());
    }
}