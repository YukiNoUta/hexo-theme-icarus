const { Component, Fragment } = require('inferno');
const Plugins = require('./plugins');

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

        const vanillaLazyload = 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.1/dist/lazyload.min.js';
        const lazyloadScripts = addons.lazyload?.enable ? <>
            <script defer src={addons.lazyload?.js ?? vanillaLazyload}></script>
            <script src="/js/yuuki/lazyload_embedded.js"></script>
        </> : null;

        return <Fragment>
            <script src={cdn('jquery', '3.3.1', 'dist/jquery.min.js')}></script>
            <script src={cdn('moment', '2.22.2', 'min/moment-with-locales.min.js')}></script>
            {config.comment?.jsUrl && <script src={config.comment.jsUrl}></script>}
            {clipboard && <script src={cdn('clipboard', '2.0.4', 'dist/clipboard.min.js')} defer></script>}
            <script dangerouslySetInnerHTML={{ __html: `moment.locale("${language}");` }}></script>
            <script dangerouslySetInnerHTML={{ __html: embeddedConfig }}></script>
            <script src={url_for('/js/column.js')}></script>
            <Plugins site={site} config={config} page={page} helper={helper} head={false} />
            <script src={url_for('/js/main.js')} defer></script>
            {lazyloadScripts}
        </Fragment>;
    }
};
