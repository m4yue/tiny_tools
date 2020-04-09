chrome.tabs.query({ "active": true }, function (tabs) {
    if (!tabs) {
        return;
    }

    for (var i of tabs) {
        // 当打开多个chrome窗口时，tabs会包含多个窗口的当前active tab
        if (!i.url) {
            continue;
        }
        if (!i.url.startsWith("http"))  {
            continue;
        }
        $('#qrcode').qrcode(i.url);
        return;
    }
    document.getElementById("qrcode").innerText = "No valid tab found";
})
