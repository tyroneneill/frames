export const getFrameRate = (update: (rate: number) => void,
                             rAf = window.requestAnimationFrame) => {
    let position: number = 0, last: number = 0, count: number = 0;
    return getLoop(timestamp => {
        ++count;
        position += last ? timestamp - last : 0;
        last = timestamp;
        if (position >= 1000) {
            update(Math.floor(1000 / (position / count)));
            position = last = count;
        }
    }, rAf);
};

export const getLoop = (onFrame: (timestamp: number) => void,
                        rAf: (callback: FrameRequestCallback) => number) => {
    let isDisposed = false;
    const loop = (timestamp: number) => {
        if (!isDisposed) {
            onFrame(timestamp);
            rAf(loop);
        }
    };
    rAf(loop);
    return () => isDisposed = true;
};
