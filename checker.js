function jbcheck() {
    var version = document.getElementById("fw").value;
    console.log(version);
    $.getJSON("jailbreaks.json", function(jb) {
        var jb = jb["jailbreak"]
        var major = version.split(".")[0];
        clearlist();
        if (major in jb) {
            var hasjb = false;
            jb[major].forEach(jailbreak => {
                if (jailbreak["versions"].exists(version)) {
                    if (jailbreak["bit"] == bit) {
                        _alert("Jailbreak possible at " + jailbreak["link"]);
                        $(".jailbreaks").append(`<p>${jailbreak["name"]} is available <a href=${jailbreak["link"]}>here</a>${special(jailbreak["name"])}</p>`);

                        hasjb = true;
                    }
                }
            });
            if (hasjb == false) {
                $(".jailbreaks").append("Sorry, no jailbreak available");
            }
        } else {
            $(".jailbreaks").append("No such firmware");
        }
    });
}
function dgcheck() {
    clearlist();
    if (bit == 64) {
        
    } else if (bit == 32) {

    } else {

    }
} 

function check() {
    _alert($(".jbvsdowngrade").text());
    if ($(".jbvsdowngrade").text() == "jailbreak") {
        jbcheck();
    } else if ($(".jbvsdowngrade").text() == "downgrade") {
        dgcheck();
    }
}

function detectinfo() {
    var parser = new UAParser();
    var result = parser.getResult();
    if (result.os.name == "iOS") {
        document.getElementById("fw").value = result.os.version;
        if (result.os.version > 10) {
            document.getElementById("over10").checked = true;
        }
    } else {
        alert("Not on iOS");
    }
}

// Extra functions
function debug(obj) {
    console.log(obj);
}

Array.prototype.exists = function(str){
    return this.indexOf(str) >= 0;
};
// End

function clearlist() {
    $(".jailbreaks").text("");
}


var bit = 64;
$(document).ready(function() {
    $('input[type=radio][name=jbordg]').change(function() {
        if (this.value == 'jb') {
            $(".jbvsdowngrade").text("jailbreak");
            $(".jbvsdowngrade1").text("Jailbreak");
        }
        else if (this.value == 'dg') {
            $(".jbvsdowngrade").text("downgrade");
            $(".jbvsdowngrade1").text("Downgrade");
        }
    });
    $('input[type=radio][name=bit]').change(function() {
        if (this.value == '32') {
            bit = 32;
        }
        else if (this.value == '64') {
            bit = 64;
        }
    });
    
});

// Some jailbreaks have special requirements and i don't want too many inputs
function special(jb) {
    switch (jb) {
        case "Yalu102":
            return ". iPhone 7 users, use another tool, others, this is the best one.";
        case "Extra_recipe":
            return ". Please only use this on iPhone 7.";
    }
    return ".";
}