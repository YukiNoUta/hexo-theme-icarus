function busuanziJS() {
    $.getScript("//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js");
}

const loadJS = () => {
    busuanziJS();
    backToTopJS();
    galleryJS(jQuery);
    mainJS(jQuery, window.moment, window.ClipboardJS, window.IcarusThemeSettings);
}

function reloadDataPjax() {
    $('script[data-pjax], .pjax-reload script')
    .each(function () {
        $(this).parent().append($(this).remove());
    });
}

function removeClipboard() {
    const ClipboardJS = window.IcarusThemeSettings;
    const on = window.IcarusThemeSettings.article.highlight.clipboard;
    const fold = window.IcarusThemeSettings.article.highlight.fold.trim();
    if (typeof ClipboardJS !== 'undefined' && (on || fold)) {
        $('figcaption').each(
        function () {$(this).remove();});
    }
}

function pjaxJS($) {
    var pjax = new Pjax({
        elements: 'a[href]:not([href^="#"]):not([href="javascript:void(0)"]):not(.paw-button)',
        selectors: [
            "title",
            ".column-main",
            "script[data-pjax]",
            "#pjax-container",
            "#pjax-nav"
        ],
        switches: {
            ".column-main": function(oldEl, newEl, options) {
                oldEl.outerHTML = newEl.outerHTML;
                this.onSwitch();
            },
        },
        cacheBust: false,
        scrollRestoration: true,
        debug: false
    })

    document.addEventListener('pjax:send', function () {
        removeClipboard();
    });

    document.addEventListener('pjax:complete', function () {
        loadJS();
        reloadDataPjax();
    });

    document.addEventListener('pjax:error', function () {
        console.log("Pjax loading error is occurred.");
    });
}

document.addEventListener("DOMContentLoaded", pjaxJS);