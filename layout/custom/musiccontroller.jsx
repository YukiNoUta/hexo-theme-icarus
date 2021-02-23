const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

class MusicController extends Component {
    render() {
        const {

        } = this.props;

        return <div class="music-controller-container">
            <a class="navbar-item music" id="music-nav" title="Music Controller" href="javascript:;">
                <i class="fas fa-music" id="music-icon"></i>
            </a>
        </div>
    }
}

module.exports = cacheComponent(MusicController, 'custom.musiccontroller', props => {
    const { config } = props;

    return {
    };
});