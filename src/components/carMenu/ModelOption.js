import React from 'react';

class ModelOption extends React.Component {
    render() {
        return(
            <option value={this.props.value}>{this.props.value}</option>
        );
    }
}

export default ModelOption;