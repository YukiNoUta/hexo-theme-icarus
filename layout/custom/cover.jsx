const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

function imgShuffler(arr) {
    let n = arr.length;
    while (n --) {
        let index = Math.floor(Math.random() * n);
        let temp = arr[index];
        arr[index] = arr[n];
        arr[n] = temp;
    }
    return arr;
}

class Cover extends Component {
    render() {
        const { backstretch } = this.props;
        const {
            enable, js, shuffle, duration, fade, images
        } = backstretch;
        const selector = '#cover-backstretch';

        const usebs = (enable ?? false) && images;
        const img = shuffle ? imgShuffler(images) : images;

        return <div class="cover-wrapper" id="cover">
            {usebs && <div id="cover-backstretch"></div>}
        </div>
    }
}

module.exports = cacheComponent(Cover, 'custom.cover', props => {
    
    const { config } = props;
    
    const backstretch = config.addons?.backstretch ?? {};

    return { backstretch };
});