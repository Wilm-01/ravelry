
// https://www.ravelry.com/patterns/search#yardage-in=0-150%7C150-300&view=captioned_thumbs

var get_page_args = function(){
    var url = window.location.href;
    if (url.indexOf("#") == -1) {
        return "";
    }

    if (url.includes("#")) {
        return url.split("#")[1].split("&");
    } else {
        return "";
    }
}

var parse_args = function(args){
    var values = {}
    for (pair of args) {
        var left = pair.split("=")[0];
        var right = pair.split("=")[1];
        values[left] = right;
    }
    return values;
}

var textRangeToNumRange = function(text_range){

    if (!text_range.includes("-")){
        return [parseInt(text_range), parseInt(text_range)];
    }

    var left = text_range.split("-")[0];
    var right = text_range.split("-")[1];
    return [parseInt(left), parseInt(right)];
}

var rawYardageToRangeList = function(raw_yardage){

    if (!raw_yardage.includes("%7C")){
        return [textRangeToNumRange(raw_yardage)];
    }

    var ranges_to_convert = raw_yardage.split("%7C");
    var ranges = [];
    for (range of ranges_to_convert){
        ranges.push(textRangeToNumRange(range));
    }

    return ranges;
}

var numInRange = function(num, range){
    var mn = range[0];
    var mx = range[1];
    if (mn == NaN){
        mx = Infinity;
    }
    return ((mn < num) && (num < mx));
}

var rangeInRange = function(leftRange, rightRange){
    if (numInRange(leftRange[0], rightRange) && numInRange(leftRange[1], rightRange)){
        return true;
    }
    return false;
}

var numInRanges = function(num, ranges){
    for (range of ranges){
        if (numInRange(num, range)){
            return true;
        }
    }
    return false;
}

var rangeInRanges = function(range, ranges){
    for (r of ranges){
        if (rangeInRange(range, r)){
            return true;
        }
    }
    return false;
}

var string_until_substring = function(string, substring){
    return string.slice(0, string.indexOf(substring));
}


var getURL = function(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    return req.responseText
}

var parseYardageFromHTML = function(html){
    var start_marker = "Yardage</label>\n<div class=\"value\">";
    var start = html.indexOf(start_marker) + start_marker.length;
    var end = start+100;
    var value = html.slice(start, end);
    value = value.slice(0, value.indexOf("y"));
    return value;
}

var page_args = get_page_args();
var parsed_args = parse_args(page_args);
var yardage_text = "???";
if ("yardage-in" in parsed_args){
    yardage_text = parsed_args["yardage-in"];
}
var yardage = rawYardageToRangeList(yardage_text);

var pattern_links = document.getElementsByClassName("pattern_name");
for (link of pattern_links){
    console.log(link);
    var yrange = textRangeToNumRange(parseYardageFromHTML(getURL(link.href)));
    var compatible = rangeInRange(yrange, yardage);
    if (!compatible){
        link.classList.add("incompatible");
    }
}

/*
for (url of urls){
    var yrange = textRangeToNumRange(parseYardageFromHTML(getURL(url)));

    console.log(url + " : ", yrange);
    console.log("Compatible: " + rangeInRanges(yrange, yardage));
}
*/

/*
var req = new XMLHttpRequest();  
req.open('GET', 'http://www.mydomain.com/', false);   
req.send(null);  
if(req.status == 200)  
   dump(req.responseText);
*/