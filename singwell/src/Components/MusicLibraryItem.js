import React, {Component} from 'react';


class MusicLibraryItem extends Component {

    componentWillMount() {
        this.setState({});
    }

    render() {

        return (

            <li className="mn-pymk-list__card display-flex flex-column"
                onClick={() => this.props.history.push('/organizations/' + this.props.music.organization + "/music/" + this.props.music.id)}
                style={{cursor: 'pointer'}}>
                <div className="pymk-card" style={{marginBottom: '0'}}>
                    <div className="pymk-card__details text-align-center">
                        <div className="pymk-card__name pymk-card__name--card-layout">
                            {this.props.music.title}
                        </div>
                        <div className="pymk-card__occupation pymk-card__occupation--card-layout">
                            {this.props.music.composer}
                        </div>
                        <div className="pymk-card__occupation pymk-card__occupation--card-layout"
                             style={{marginTop: '10pt'}}>
                            {this.props.music.arranger}
                        </div>
                        <div className="pymk-card__occupation pymk-card__occupation--card-layout"
                             style={{marginTop: '10pt'}}>
                            {this.props.music.instrumentation}
                        </div>
                    </div>
                </div>
            </li>
        );
    }

}

export default MusicLibraryItem;
