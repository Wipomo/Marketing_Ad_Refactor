import React from 'react';

class LowerPart extends React.Component {

    nameRef = React.createRef();
    phoneRef = React.createRef();
    addressRef = React.createRef();
    cityRef = React.createRef();
    stateRef = React.createRef();
    zipRef = React.createRef();

    submitHandler = (e) => {
        e.preventDefault();
        let fullName = this.nameRef.current.value;
        let phone = this.phoneRef.current.value;
        let address = this.addressRef.current.value;
        let city = this.cityRef.current.value;
        let state = this.stateRef.current.value;
        let zip = this.zipRef.current.value;
        this.props.restOfFormUpdater(fullName, phone, address, city, state, zip);
        this.props.hideChanger('showThirdPart');
    }

    render() {
        return(
            <div className="LowerPart">
                <p>Are you ready to save money?</p>
                <form className="detailsForm">
                    <div className="nestName">
                    <p>Get a custom energy savings report from Makello.</p>
                    <div className="topForm">
                    <input type="text" ref={this.nameRef} placeholder="Full Name*"/>
                    <input type="text" ref={this.phoneRef} placeholder="Phone"/>
                    <input type="text" ref={this.addressRef} placeholder="Address*"/>
                    <input type="text" ref={this.cityRef} placeholder="City*"/>
                    </div>
                    <div className="bottomForm">
                    <select ref={this.stateRef}>
                        <option value="State*">State*</option>
                    </select>
                    <input type="text" ref={this.zipRef} placeholder="Zipcode*"/>
                    </div>
                    <button onClick={this.submitHandler}>Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LowerPart;