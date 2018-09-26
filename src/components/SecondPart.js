import React from 'react';
import Chart from './Chart';

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
    };

    nameRef = React.createRef();
    phoneRef = React.createRef();
    addressRef = React.createRef();

    submitHandler = (event) => {

        event.preventDefault();
        let fullName = this.nameRef.current.value;
        let phone = this.phoneRef.current.value;
        let address = this.addressRef.current.value;
        this.props.clientInfoUpdater(fullName, phone, address, this.getSaveValue());
        this.props.createCustomerEmail();
        this.props.hideChanger('showThirdPart');
    };

    getSaveValue = () => {
        var saveValue = document.getElementById("bucket_savings").innerText;
        return saveValue;
    };

    formatNumber = (number) => {
        console.log(number.length);
        let numStr = number.toString();
    };

    render() {
            return(
                <div className='App'>
                    <div className='m2sideL'></div>
                    <div className='main2'>
                        <div className='m2Upper'>
                            <div className='m2uTextu'>
                                <p className="light">You can save</p>
                                <h1 className="bigBlue">${this.props.chartData.savingsAmount}</h1>
                                <p className="light">annually with 100% Clean Energy</p>
                                <br/>
                            </div>
                            <div className='m2uChart'>
                                <Chart
                                    monthlyBill={this.props.monthlyBill}
                                    chartData={this.props.chartData}
                                />
                            </div>
                            <div className='m2uTextl'>
                                <br/>
                                <p className="light">with as low as a</p>
                                <h1 className="bigBlue">${this.props.chartData.installFee}</h1>
                                <p className="light">installation fee - before discounts!</p>
                                <br/>
                            </div>
                        </div>
                        <div className='imageTest2' />
                        <div className='m2Lower'>
                            <div className='m2lTop'>
                                <br/>
                                <br/>
                                <br/>
                                <p  className='light'>Are you ready to save money?</p>
                                <br/>
                            </div>
                            <div className='m2lBottom'>
                                <br/>
                                <p className='light'>Get a custom energy savings report from Makello</p>
                                <br/>
                                <input className='userInput light' type='text' placeholder='Full Name*' ref={this.nameRef}/>
                                <br/>
                                <input className='userInput light' type='text' placeholder='Phone' ref={this.phoneRef}/>
                                <br/>
                                <input id='autocomplete' onFocus={this.initAutoComplete} className='userInput light' type='text' placeholder='Enter full address*' ref={this.addressRef}/>
                                <br/>
                                <input className='submitButton light' value="Submit" type='submit' onClick={this.submitHandler}/>
                                <br/>
                            </div>
                        </div>
                    </div>
                    <div className='m2sideR'></div>
                </div>
            );
        }
}

export default SecondPart;