//checks if the given string end with a given string
function endsWith(string_full, suffix) {
    return string_full.indexOf(suffix, string_full.length - suffix.length) !== -1;
}//end endsWith()
