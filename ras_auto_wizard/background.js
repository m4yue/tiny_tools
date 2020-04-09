var currentPassword = null;

var passwordURL = "http://127.0.0.1:60001/password";
$.get(passwordURL, function (data) {
    currentPassword = data;
})
setTimeout(function () {
    console.log("updating password");
    $.get(passwordURL, function (data) {
        currentPassword = data;
    })
},
    300000);
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message == "getpd") {
        sendResponse(currentPassword);
    }
    return true;
})