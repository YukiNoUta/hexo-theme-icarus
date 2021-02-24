function imgShuffler(arr) {
    let n = arr.length;
    while (n --) {
        let index = Math.floor(Math.random() * n);
        let temp = arr[index];
        arr[index] = arr[n];
        arr[n] = temp;
    }
    return arr;
}

const bsCfg = window.yuukiSettings.backstretch ?? {};

if (bsCfg.shuffle) imgShuffler(bsCfg.images);
const { duration, fade } = bsCfg;

$('#cover-backstretch').backstretch(
    bsCfg.images, { duration, fade }
)