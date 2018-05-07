import React, {Component} from 'react';
import {
    Cell,
    Card,
    CardTitle,
    CardText,
} from 'react-mdl';

import moment from 'moment';

class EventItem extends Component {

    render() {
        return (
            <Cell col={4}>
                <Card shadow={0} style={{margin: '10px auto', minHeight: "0px"}}
                      onClick={() => this.props.history.push('/organizations/' + this.props.event.organization + "/events/" + this.props.event.id)}>
                    <CardTitle style={{}}>{this.props.event.name}</CardTitle>
                    <CardText>
                        Date: {moment(this.props.event.date).format("MMM Do, YYYY")}
                        <br/>
                        Location: {this.props.event.location}
                        <br/>
                        Start Time: {moment(this.props.event.time, "H:m:s").format('LT')}
                    </CardText>
                </Card>
            </Cell>
        );
    }

}

export default EventItem;
