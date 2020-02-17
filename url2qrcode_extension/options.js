chrome.tabs.query({ "active": true }, function (tabs) {
    if (!tabs) {
        return;
    }
    for (var i of tabs) {
        if (!i.url) {
            document.getElementById("qrcode").innerText = "No url found";
            return;
        }
        if (!i.url.startsWith("http"))  {
            document.getElementById("qrcode").innerText = "No url found";
            return;
        }
        $('#qrcode').qrcode(i.url);
    }
})


