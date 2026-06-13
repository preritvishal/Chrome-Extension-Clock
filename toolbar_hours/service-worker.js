chrome.runtime.onStartup.addListener(() => {
    startClock();
});

chrome.runtime.onInstalled.addListener(() => {
    startClock();
});

let intervalId = null;

function updateTime() {

    const now = new Date();

    const hours = now.getHours()
        .toString()
        .padStart(2, '0');

    const pixelSize = 20;

    const canvas = new OffscreenCanvas(pixelSize, pixelSize);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, pixelSize, pixelSize);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px Monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    ctx.fillText(hours, 0, 11);

    const imageData = ctx.getImageData(
        0,
        0,
        pixelSize,
        pixelSize
    );

    chrome.action.setIcon({
        imageData
    });

    chrome.action.setTitle({
        title: `Current Hour: ${hours}`
    });
}

function startClock() {

    updateTime();

    if (intervalId !== null) {
        clearInterval(intervalId);
    }

    // Same heartbeat as Minutes
    intervalId = setInterval(updateTime, 5000);
}

startClock();