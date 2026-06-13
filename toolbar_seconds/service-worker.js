chrome.runtime.onStartup.addListener(() => {
    startClock();
});

chrome.runtime.onInstalled.addListener(() => {
    startClock();
});

let intervalId = null;

function updateTime() {

    const now = new Date();

    const seconds = now.getSeconds()
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

    ctx.fillText(seconds, 0, 11);

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
        title: `Current Second: ${seconds}`
    });
}

function startClock() {

    updateTime();

    // Prevent multiple intervals
    if (intervalId !== null) {
        clearInterval(intervalId);
    }

    // Align to next second boundary
    const delay = 1000 - (Date.now() % 1000);

    setTimeout(() => {

        updateTime();

        intervalId = setInterval(() => {
            updateTime();
        }, 1000);

    }, delay);
}

startClock();