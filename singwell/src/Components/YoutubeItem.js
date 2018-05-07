import React, {Component} from 'react';
import YouTube from 'react-youtube';


class YoutubeItem extends Component {

    youtube_parser(url) {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        let match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {

        return (
            <div>
                <div style={{display: "flex", alignItems: 'center', flexDirection: "column"}}>
                    <h4>{this.props.youtubeItem.title}</h4>
                    <YouTube
                        videoId={this.youtube_parser(this.props.youtubeItem.url)}
                        opts={
                            {
                                height: '390',

                                padding: '25px'
                            }
                        }
                        onReady={this._onReady}
                    />
                </div>
            </div>
        );
    }

}

export default YoutubeItem;
