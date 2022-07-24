var removeBreaks = function(input){
    return input.replace(/(\r\n|\n|\r)/gm, '');
}

var nameToWeight = function(input, just_number = false){
    var vals = {
        "Thread": "0: Lace",
        "Cobweb": "0: Lace",
        "Lace": "0: Lace",
        "Light Fingering": "0: Lace",
        "Fingering": "1: Super Fine",
        "Sport": "2: Fine",
        "DK": "3: Light",
        "Worsted": "4: Medium",
        "Aran": "4: Medium",
        "Bulky": "5: Bulky",
        "Super Bulky": "6: Super Bulky",
        "Jumbo": "7: Jumbo"
    }
    
    if (input in vals){
        var ret =  vals[input];
    } else {
        var ret =  "??: Unknown";
    }

    if (just_number){
        ret = " (" + ret.slice(0, ret.indexOf(":")) + ")";
    }

    return ret;
}

var reverse_string = function(input){
    return input.split("").reverse().join("");
}