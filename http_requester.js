var loggingUrl = "http://foreign-language-chrome-ext.herokuapp.com/log";
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        $.post(loggingUrl, request, function (response) {
            console.log('resp. receipved, sending');
            sendResponse(response);
        });

        return true;
    });
