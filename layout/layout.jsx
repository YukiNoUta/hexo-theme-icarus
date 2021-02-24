const { Component } = require('inferno');
const classname = require('hexo-component-inferno/lib/util/classname');
const Head = require('./common/head');
const Navbar = require('./common/navbar');
const Widgets = require('./common/widgets');
const Footer = require('./common/footer');
const Scripts = require('./common/scripts');
const Search = require('./common/search');
const APlayer = require('./custom/aplayer');
const Cover = require('./custom/cover');

module.exports = class extends Component {
    render() {
        const { site, config, page, helper, body } = this.props;

        const language = page.lang || page.language || config.language;
        const columnCount = Widgets.getColumnCount(config.widgets);
        const fixedTop = config.navbar.fixed ? ` has-navbar-fixed-top` : ``;
        const waifu =  config.addons.waifuLive2D;
        const usePjax = config.addons.pjax.enable;
        const cover = config.addons?.backstretch.enable ?? false;

        return <html lang={language ? language.substr(0, 2) : ''}>
            <Head site={site} config={config} helper={helper} page={page} />
            <body class={`is-${columnCount}-column` + fixedTop}>
                <script type="text/javascript" src="/js/imaegoo/night.js"></script>
                <canvas id="universe"></canvas>
                {cover && <Cover config={config} />}

                <Navbar config={config} helper={helper} page={page} />
                <section class="section">
                    <div class="container" id="pjax-container">
                        <div class="columns">
                            <div class={classname({
                                column: true,
                                'order-2': true,
                                'column-main': true,
                                'is-12': columnCount === 1,
                                'is-8-tablet is-8-desktop is-8-widescreen': columnCount === 2,
                                'is-8-tablet is-8-desktop is-6-widescreen': columnCount === 3
                            })} dangerouslySetInnerHTML={{ __html: body }}></div>
                            <Widgets site={site} config={config} helper={helper} page={page} position={'left'} />
                            <Widgets site={site} config={config} helper={helper} page={page} position={'right'} />
                        </div>
                    </div>
                </section>

                {config.aplayer?.enable && <APlayer config={config.aplayer} />}
                <Footer config={config} helper={helper} />
                <Scripts site={site} config={config} helper={helper} page={page} />
                <Search config={config} helper={helper} />
                {usePjax && <script type="text/javascript" src="/js/yuuki/pjax.js"></script>}
                <script type="text/javascript" src="/js/imaegoo/imaegoo.js"></script>
                <script type="text/javascript" src="/js/imaegoo/universe.js"></script>
                {waifu && <script type="text/javascript" src="/js/live2d/autoload.js"></script>}
            </body>
        </html>;
    }
};
