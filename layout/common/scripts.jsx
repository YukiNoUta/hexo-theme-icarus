const { Component, Fragment } = require('inferno');
const Plugins = require('./plugins');

function yuukiEmbedded(config) {
    const addons = config.addons ?? {};
    const cfg = {};
    if (addons.backstretch?.enable && 
        addons.backstretch.images) {
        const { 
            shuffle, duration, 
            fade, images 
        } = addons.backstretch;
        cfg.backstretch = {
            shuffle, duration, 
            fade, images
        }
    }
    return cfg;
}

function yuukiToString(embedded, symbol) {
    const varName = symbol ?? 'yuukiSettings';
    const cfgObj = embedded ?? {};
    return `var ${varName} = ${JSON.stringify(cfgObj)}`;
}

module.exports = class extends Component {
    render() {
        const { site, config, helper, page } = this.props;
        const { url_for, cdn } = helper;
        const { article, addons } = config;
        const language = page.lang || page.language || config.language || 'en';

        let fold = 'unfolded';
        let clipboard = true;
        if (article && article.highlight) {
            if (typeof article.highlight.clipboard !== 'undefined') {
                clipboard = !!article.highlight.clipboard;
            }
            if (typeof article.highlight.fold === 'string') {
                fold = article.highlight.fold;
            }
        }

        const embeddedConfig = `var IcarusThemeSettings = {
            article: {
                highlight: {
                    clipboard: ${clipboard},
                    fold: '${fold}'
                }
            }
        };`;
        const yuukiCfg = yuukiEmbedded(config);

        const vanillaLazyload = 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.1/dist/lazyload.min.js';
        const lazyloadScripts = addons.lazyload?.enable ? <>
            <script defer src={addons.lazyload?.js ?? vanillaLazyload}></script>
            <script src="/js/yuuki/lazyload_embedded.js"></script>
        </> : null;

        const defaultPjax = "https://cdn.jsdelivr.net/npm/pjax/pjax.js";
        const pjaxScripts = addons.pjax?.enable ? <>
            <script src={addons.pjax?.js ?? defaultPjax}></script>
        </> : null;    
        const jQueryBackstretch = 'https://cdn.jsdelivr.net/npm/jquery-backstretch@2.1.18/jquery.backstretch.min.js';
        const useBackstretch = config.addons?.backstretch.enable ?? false;
        const backstretchJS = config.addons?.backstretch.js ?? jQueryBackstretch;

        return <Fragment>
            <script src={cdn('jquery', '3.3.1', 'dist/jquery.min.js')}></script>
            <script src={cdn('moment', '2.22.2', 'min/moment-with-locales.min.js')}></script>
            <script dangerouslySetInnerHTML={{ __html: yuukiToString(yuukiCfg) }}></script>
            {useBackstretch && <script src={backstretchJS}></script>}
            {useBackstretch && <script src="/js/yuuki/backstretch_embedded.js"></script>}
            {config.comment?.jsUrl && <script src={config.comment.jsUrl}></script>}
            {clipboard && <script src={cdn('clipboard', '2.0.4', 'dist/clipboard.min.js')} defer></script>}
            <script dangerouslySetInnerHTML={{ __html: `moment.locale("${language}");` }}></script>
            <script dangerouslySetInnerHTML={{ __html: embeddedConfig }}></script>
            <script src={url_for('/js/column.js')}></script>
            <Plugins site={site} config={config} page={page} helper={helper} head={false} />
            <script src={url_for("/js/yuuki/gallery.js")} defer></script>
            <script src={url_for('/js/main.js')} defer></script>
            {pjaxScripts}{lazyloadScripts}
        </Fragment>;
    }
};
