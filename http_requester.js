var loggingUrl = "http://foreign-language-chrome-ext.herokuapp.com/log";
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        $.post(loggingUrl, {"payload": JSON.stringify(request)}, function (response) {
            sendResponse(response);
        });

        return true;
    });
