function updateSeconds() {
    const seconds = new Date()
        .getSeconds()
        .toString()
        .padStart(2, '0');

    chrome.action.setBadgeText({
        text: seconds
    });
}

updateSeconds();

setInterval(updateSeconds, 1000);