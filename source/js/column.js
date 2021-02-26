function columnJS() {
    function $() {
        return Array.prototype.slice.call(document.querySelectorAll.apply(document, arguments));
    }

    const rightCol = $('.columns .column-right');
    const shadowCol = $('.columns .column-right-shadow');

    // copy widgets in the right column, when exist, to the bottom of the left column
    if (rightCol.length && shadowCol.length && !shadowCol[0].children.length) {
        for (const child of rightCol[0].children) {
            shadowCol[0].append(child.cloneNode(true));
        }
    }
}

columnJS();
