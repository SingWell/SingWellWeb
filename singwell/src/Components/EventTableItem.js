import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


class EventTableItem extends Component {

    render() {

        return (

            <TableRow key={this.props.programItem.id}>
                <TableRowColumn style={{
                    fontSize: '16pt',
                    width: '56px',
                    borderRight: '1px solid rgba(244,244,244)'
                }}>{this.props.index + 1}</TableRowColumn>
                <TableRowColumn style={{fontSize: '16pt'}}>{this.props.programItem.field_title}</TableRowColumn>
                <TableRowColumn style={{fontSize: '16pt'}}><Link style={{color: 'rgb(0, 0, 240)'}}
                                                                 to={'/organizations/' + this.props.orgID + '/music/' + this.props.programItem.music_record}>{this.props.programItem.title}</Link></TableRowColumn>
                <TableRowColumn style={{fontSize: '16pt'}}>{this.props.programItem.notes}</TableRowColumn>
            </TableRow>


        );
    }

}

export default EventTableItem;
