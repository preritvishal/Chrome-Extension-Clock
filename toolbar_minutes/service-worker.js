chrome.runtime.onStartup.addListener(() => {
    startClock();
});

chrome.runtime.onInstalled.addListener(() => {
    startClock();
});

let intervalId = null;

function updateTime() {

    const now = new Date();

    const minutes = now.getMinutes()
        .toString()
        .padStart(2, '0');

    const pixelSize = 20;

    const canvas = new OffscreenCanvas(pixelSize, pixelSize);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, pixelSize, pixelSize);

    // Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 18px Monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';

    ctx.fillText(minutes, 0, 11);

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
        title: `Current Minute: ${minutes}`
    });
}

function startClock() {

    updateTime();

    if (intervalId !== null) {
        clearInterval(intervalId);
    }

    const delay =
        (60 - new Date().getSeconds()) * 1000
        - new Date().getMilliseconds();

    setTimeout(() => {

        updateTime();

        intervalId = setInterval(() => {
            updateTime();
        }, 60 * 1000);

    }, delay);
}

startClock();