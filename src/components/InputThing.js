import React from 'react';

class InputThing extends React.Component {

    emailRef = React.createRef();

    submitHandler = (event) => {
        event.preventDefault();
        this.props.hideChanger('showSecondPart');
        this.props.emailUpdater(this.emailRef.current.value);
    }

    render() {
        return(
            <div className="InputThing">
                <p>What's your monthly electric bill?</p>
                <div className="Slider">
                <p>$50</p>
                <input type="range" min="50" step="25" max="5000"/>
                <p>$5000</p>
                </div>
                <input type="email" ref={this.emailRef}/>
                <input type="submit" value="submit" onClick={this.submitHandler} />
            </div>
        );
    }
}

export default InputThing;