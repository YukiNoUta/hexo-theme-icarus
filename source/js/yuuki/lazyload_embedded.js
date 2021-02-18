// https://www.npmjs.com/package/vanilla-lazyload
// Set the options globally
// to make LazyLoad self-initialize
window.lazyLoadOptions = {
    elements_selector: ".lazyload",
    threshold: 0
};
// Listen to the initialization event
// and get the instance of LazyLoad
window.addEventListener(
    "LazyLoad::Initialized",
    function (event) {
    window.lazyLoadInstance = event.detail.instance;
    },
    false
);
document.addEventListener('DOMContentLoaded', function () {
    lazyLoadInstance.update();
});
document.addEventListener('pjax:complete', function () {
    lazyLoadInstance.update();
});