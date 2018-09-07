import React from 'react';
import AddressInput from './AddressInput';
import Chart from './chart/Chart';

var initAuto = false;

class SecondPart extends React.Component {

    initAutoComplete = () => {
        var input = document.getElementById('autocomplete');
        if (initAuto === false) {
            console.log("initializes autocomplete once only");
            var autocomplete = new window.google.maps.places.Autocomplete(
                input,
                {types: ['address'], placeIdOnly: true}
            );
            initAuto = true;
        }
    }

    nameRef = React.createRef();
    phoneRef = React.createRef();
    addressRef = React.createRef();

    submitHandler = (e) => {
        e.preventDefault();
        let fullName = this.nameRef.current.value;
        let phone = this.phoneRef.current.value;
        let address = this.addressRef.current.value;
        this.props.clientInfoUpdater(fullName, phone, address);
        this.props.hideChanger('showThirdPart');
    }

    render() {
        return(
            <div className='App'>
                <div className='side'></div>
                <div className='main2'>
                    <div className='m2Upper'>
                        <div className='m2uText'>
                            <p className='regular'>You can save</p>
                            <p className='semiBold bigBlue'>$X,XXX</p>
                            <p className='regular'>with 100% Clean Energy annually</p>
                        </div>
                            <Chart className='m2uChart' monthlyBillingAmount={2500}/>
                    </div>
                    <div className='imageTest2' />
                    <div className='m2Lower'>
                        <div className='m2lTop'>
                            <p  className='regular'>Are you ready to save money?</p>
                        </div>
                        <div className='m2lBottom'>
                            <p className='light'>Get a custom energy savings report from Makello</p>
                            <input className='userInput light' type='text' placeholder='Full Name*' ref={this.nameRef}/>
                            <input className='userInput light' type='text' placeholder='Phone' ref={this.phoneRef}/>
                            <input id='autocomplete' onFocus={this.initAutoComplete} className='userInput light' type='text' placeholder='Enter full address*' ref={this.addressRef}/>
                            <input className='submitButton light' value="Submit" type='submit' onClick={this.submitHandler}/>
                        </div>
                    </div>
                </div>
                <div className='side'></div>
            </div>
        );
    }
}

export default SecondPart;