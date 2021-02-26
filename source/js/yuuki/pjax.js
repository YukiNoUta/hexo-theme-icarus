function loadJS() {
    $.getScript("//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js");
    $.getScript("/js/toc.js", () => console.log('pjax: toc.js is reload'));
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
        window.clipInst && window.clipInst.destroy();
    }
}

function removeToggleToc() {
    const $toc = $('#toc');
    const $mask = $('#toc-mask');
    $mask.remove();
    $toc.removeClass('is-active');
    $toc.unbind('click');
    $('.navbar-main .catalogue').unbind('click');
}

function removeBinding() {
    $('#night-nav').unbind('click');
    $(window).unbind('resize');
    $(window).unbind('scroll');
    $(document).unbind('scroll');
    $('body').unbind('click');
}

function pjaxJS() {
    var pjax = new Pjax({
        elements: 'a[href]:not([href^="#"]):not([href="javascript:void(0)"]):not(.paw-button)',
        selectors: [
            "title",
            ".column-main",
            "script[data-pjax]",
            "#pjax-container",
            "#pjax-nav",
            "#pjax-buttons"
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
        removeBinding();
        removeToggleToc();
    });

    document.addEventListener('pjax:complete', function () {
        columnJS();
        loadJS();
        reloadDataPjax();
        nightJS();
    });

    document.addEventListener('pjax:error', function () {
        console.log("Pjax loading error is occurred.");
    });
}

document.addEventListener("DOMContentLoaded", pjaxJS);