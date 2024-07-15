console.log('Hello from the background script!')

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Received message:', request);
    if (request.action === 'enable-key-display') {
        toggleContentScript(request.status);
    }
});

function toggleContentScript(isEnable: boolean) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id!, { action: 'toggle-key-display', status: isEnable });
    });
}