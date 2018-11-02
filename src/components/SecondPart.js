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
        { types: ['address'], placeIdOnly: true }
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
    this.props.clientInfoUpdater(fullName, phone, address);
    this.props.createCustomerEmail();
    this.props.hideChanger('showThirdPart');
  };

  formatNumber = (number) => {
    console.log(number.length);
    let numStr = number.toString();
  };

  render() {
    return (
      <div className='App'>
        <div className='main2'>
          <div className="row">
            <div className="col-md-8 offset-md-2 main2-container">
              <div className='m2Upper'>
                <div className='m2uTextu'>
                  <p className="regular regular-fontSize">You can save</p>
                  <h1 className="bigBlue superBold">${this.props.chartData.savingsAmount}</h1>
                  <p className="regular regular-fontSize">annually with 100% Clean Energy</p>
                </div>
                <div className='m2uChart'>
                  <Chart
                    monthlyBill={this.props.monthlyBill}
                    chartData={this.props.chartData}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='m2uTextl row text-center'>
            <br />
            <p className="regular regular-fontSize">with a Premium energy upgrade, for as low as</p>
            <h1 className="bigBlue superBold">${this.props.chartData.installFee}&nbsp;<small>or</small>&nbsp;$191/mo.*</h1>
          </div>
          <div className="row">
            <div className="m2uTextl-small text-center deactive-color">
              <h6>
                (includes highest quality: LG 335 watt - 400 watt solar panels, SolarEdge, SMA or Enphase IQ7 inverter(s), balance of system and installation.)
              </h6>
              <h6>
                *After 30% Federal Income Tax Credit, and if loan, applied as downpayment for 12 Yr Loan@5.49% APR. Actual APR based on credit
              </h6>
            </div>
          </div>
          <div className="row remove-mg15">
            <div className="imageTest2-container img-container">
              <img className="imageTest2" src="/images/savings-bg.png" />
              <div className="m2Lower-overlay col-md-8 offset-md-2">
                <div className="m2Lower text-center">
                  <div className='m2lTop'>
                    <p className='regular regular-fontSize'>Are you ready to save money?</p>
                  </div>
                  <div className='row m2lBottom'>
                    <div className="text-center full-width pd20-top">
                      <p className='light deactive-color'>Get a custom energy savings report from Makello</p>
                    </div>
                    <div className="col-md-6 offset-md-3">
                      <div className="form-group">
                        <input type="email" className="form-control userInput light full-width" placeholder='Full Name*' ref={this.nameRef} />
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control userInput light full-width" placeholder='Phone' ref={this.phoneRef} />
                      </div>
                      {/* <div className="form-group">
                        <input id='autocomplete' onFocus={this.initAutoComplete} type="text" className="form-control userInput light full-width" placeholder='Enter full address*' ref={this.addressRef} />
                      </div> */}
                      <div className="form-group">
                        <input type="text" className="form-control userInput light full-width" placeholder='Address*' />
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control userInput light full-width" placeholder='City*' />
                      </div>
                      <div className="form-group row">
                        <div className="col-md-6">
                          <input type="text" className="form-control userInput light full-width" placeholder='State*' />
                        </div>
                        <div className="col-md-6">
                          <input type="number" className="form-control userInput light full-width" placeholder='Zipcode*' />
                        </div>
                      </div>
                      <div className="form-group">
                        <input className='btn btn-primary submitButton light' value="Submit" type='submit' onClick={this.submitHandler} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='m2sideR'></div>
        </div>
      </div>
    );
  }
}
    
export default SecondPart;