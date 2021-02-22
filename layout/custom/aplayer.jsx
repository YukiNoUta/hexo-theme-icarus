const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

class APlayer extends Component {
    render() {
        const { aplayer, url, enable } = this.props;
        const { aplayerJS, aplayerCSS, metingJS } = url;

        const storage = 'aplayer-setting';
        const style = 'width: auto;height: 2000px;';

        return enable ? <div class="aplayer-container">
            <link rel="stylesheet" href={aplayerCSS} />
            <script src={aplayerJS}></script>
            <script src={metingJS}></script>
            <meting-js
                {...aplayer}
                style={style}
            ></meting-js>
        </div> : null;
    }
}

module.exports = cacheComponent(APlayer, 'custom.aplayer', props => {
    
    const { config } = props;
    const { 
        js, css, id,
        server, type, fixed, 
        loop, volumn, theme,
        order, mutex, autoplay 
    } = config;

    const $apcss = 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css';
    const $apjs = 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js';
    const $mtjs = 'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js';

    const url = {
        aplayerJS: js?.aplayer ?? $apjs,
        aplayerCSS: css ?? $apcss,
        metingJS: js?.meting ?? $mtjs
    };

    const aplayer = {
        server, type, id,
        fixed: fixed.toString(), 
        loop, volumn, 
        theme, order, 
        mutex: mutex.toString(), 
        autoplay
    };

    for (var key in aplayer) {
        if (typeof aplayer[key] === 'undefined') {
            delete aplayer[key];
        }
    }

    const enable = config.enable;

    return { aplayer, url, enable };
});