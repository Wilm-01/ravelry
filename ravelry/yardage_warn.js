
// https://www.ravelry.com/patterns/search#yardage-in=0-150%7C150-300&view=captioned_thumbs

var get_page_args = function(){
    var url = window.location.href;
    if (url.indexOf("#") == -1) {
        return "";
    }

    var unparsed_args = url.split("#")[1].split("&");
    var parsed_args = {};
    for (arg of unparsed_args){
        var sides = arg.split("=");
        parsed_args[sides[0]] = sides[1];
    }
    return parsed_args;
}

var string_until_substring = function(string, substring){
    return string.slice(0, string.indexOf(substring));
}

var convert_yardage = function(yardage_range){
    if (yardage_range == "") {
        return "";
    }
    var reversed = reverse_string(yardage_range);
    var min_yardage = parseInt(string_until_substring(yardage_range, "-"));
    var max_yardage = parseInt(reverse_string(string_until_substring(reversed, "-")));
    return [min_yardage, max_yardage];
}

console.debug("Yardage = " + convert_yardage(get_page_args()["yardage-in"]));