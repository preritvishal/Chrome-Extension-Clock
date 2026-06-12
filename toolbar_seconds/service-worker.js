chrome.runtime.onStartup.addListener(() => {
    updateTime();
});

chrome.action.setBadgeBackgroundColor({
    color: '#000000'
});

function updateTime() {

    const now = new Date();

    const minutes = now.getMinutes()
        .toString()
        .padStart(2, '0');

    const seconds = now.getSeconds()
        .toString()
        .padStart(2, '0');

    // Badge = seconds
    chrome.action.setBadgeText({
        text: seconds
    });

    // Icon = minutes
    const canvas = new OffscreenCanvas(32, 32);
    const ctx = canvas.getContext('2d');

    // Black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 32, 32);

    // White text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px Arial';
    // ctx.textAlign = 'center';
    ctx.textAlign = 'left'; // to ensure readability
    
    ctx.textBaseline = 'middle';

    // ctx.fillText(minutes, 16, 16);
    ctx.fillText(minutes, 2, 16);


    const imageData = ctx.getImageData(0, 0, 32, 32);

    chrome.action.setIcon({
        imageData
    });

    chrome.action.setTitle({
        title: `Current Time: ${now.getHours()
            .toString()
            .padStart(2, '0')}:${minutes}:${seconds}`
    });
}

updateTime();

setInterval(updateTime, 1000);