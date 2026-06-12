chrome.runtime.onStartup.addListener(() => {
    updateTime();
});

function drawHourIcon() {
    const hour = new Date()
        .getHours()
        .toString()
        .padStart(2, '0');

    const canvas = new OffscreenCanvas(32, 32);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 32, 32);

    // Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(hour, 16, 16);

    const imageData = ctx.getImageData(0, 0, 32, 32);

    chrome.action.setIcon({
        imageData: imageData
    });

    chrome.action.setTitle({
        title: `Current Hour: ${hour}`
    });
}

drawHourIcon();

// Refresh every minute
setInterval(drawHourIcon, 60000);