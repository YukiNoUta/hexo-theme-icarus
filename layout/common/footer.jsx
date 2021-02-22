const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');
const APlayer = require('../custom/aplayer');

class Footer extends Component {
    render() {
        const {
            logo,
            logoLightUrl,
            logoDarkUrl,
            siteUrl,
            siteTitle,
            siteYear,
            author,
            links,
            showVisitorCounter,
            visitorCounterTitle,
            content,
            aplayer
        } = this.props;

        let footerLogo = '';
        if (logo) {
            if (logo.text) {
                footerLogo = logo.text;
            } else {
                footerLogo = [
                    <img no-lazy class="logo-img" src={logoLightUrl} alt={siteTitle} height="28" />,
                    <img no-lazy class="logo-img-dark" src={logoDarkUrl} alt={siteTitle} height="28" />
                ];
            }
        } else {
            footerLogo = siteTitle;
        }

        return <footer class="footer">
            <div class="container">
                <div class="level">
                    <div class="level-start">
                        <a class="footer-logo is-block mb-2" href={siteUrl}>
                            {footerLogo}
                        </a>
                        <p class="is-size-7">
                            <span dangerouslySetInnerHTML={{ __html: `&copy; ${siteYear} ${author || siteTitle}` }}></span>
                            &nbsp;&nbsp;Powered by <a href="https://hexo.io/" target="_blank" rel="noopener">Hexo</a>&nbsp;&&nbsp;
                            <a href="https://github.com/YukiNoUta/hexo-theme-icarus" target="_blank" rel="noopener">Icarus</a>&nbsp;&nbsp;
                            {showVisitorCounter ? <br /> : null}
                            {showVisitorCounter ? <span id="busuanzi_container_site_uv"
                                dangerouslySetInnerHTML={{ __html: visitorCounterTitle }}></span> : null}
                            {content}  
                        </p>
                    </div>
                    <div class="level-end">
                        {Object.keys(links).length ? <div class="field has-addons">
                            {Object.keys(links).map(name => {
                                const link = links[name];
                                return <p class="control">
                                    <a class={`button is-transparent ${link.icon ? 'is-large' : ''}`} target="_blank" rel="noopener" title={name} href={link.url}>
                                        {link.icon ? <i class={link.icon}></i> : name}
                                    </a>
                                </p>;
                            })}
                        </div> : null}
                        {aplayer?.enable && <APlayer config={aplayer} />}
                    </div>
                </div>
            </div>
        </footer>;
    }
}

module.exports = cacheComponent(Footer, 'common.footer', props => {
    const { config, helper } = props;
    const { url_for, _p, date } = helper;
    const { logo, title, author, footer, plugins, aplayer } = config;

    const logoLight = logo instanceof String ? logo : logo.light
    const logoDark = logo instanceof String ? logo : logo.dark

    const content = footer.content.map(value => {
        return <><br />
        {typeof value === 'string' ?
        <span dangerouslySetInnerHTML={{__html: value}}></span> :
        <a href={value.href} target="_blank" dangerouslySetInnerHTML={{__html: value.html}}></a>}
        </>
    });

    const links = {};
    if (footer && footer.links) {
        Object.keys(footer.links).forEach(name => {
            const link = footer.links[name];
            links[name] = {
                url: url_for(typeof link === 'string' ? link : link.url),
                icon: link.icon
            };
        });
    }

    return {
        logo,
        logoLightUrl: url_for(logoLight),
        logoDarkUrl: url_for(logoDark),
        siteUrl: url_for('/'),
        siteTitle: title,
        siteYear: date(new Date(), 'YYYY'),
        author,
        links,
        showVisitorCounter: plugins && plugins.busuanzi === true,
        visitorCounterTitle: _p('plugin.visitor_count', '<span id="busuanzi_value_site_uv">0</span>'),
        content, 
        aplayer
    };
});
