import React from 'react';
import InputThing from './InputThing';
import TextPart from './TextPart';

class LandingBody extends React.Component {
    render() {
        return(
            <div className="LandingBody">
                <TextPart />
                <InputThing emailUpdater={this.props.emailUpdater} hideChanger={this.props.hideChanger}/>
            </div>
        );
    }
}

export default LandingBody;