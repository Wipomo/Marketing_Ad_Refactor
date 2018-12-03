import React from 'react';
import Chart from './Chart';

var initAuto = false;

class SecondPart extends React.Component {

  initAutoComplete = () => {
    var input = document.getElementById('autocomplete');
    if (initAuto === false) {
      console.log("initializes autocomplete once only");
      //var autocomplete = 
      new window.google.maps.places.Autocomplete(
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
    this.props.hideChanger('showThirdPart');
  };

  DescribeSystemType = (system_type)=>{
    if(system_type === "Economy" || system_type === "Intermediate"){
      return <p className="regular regular-fontSize">with an {(this.props.chartData.Optimal.system_type)} energy upgrade, for as low as</p> ;
    }
    else{
      return <p className="regular regular-fontSize">with a {(this.props.chartData.Optimal.system_type)} energy upgrade, for as low as</p>
    }
  }

  render() {
    return (
      <div className='App'>
        <div className='main2'>

          <div className="row">
            <div className="col-md-8 offset-md-2">

              <div className="main2-container">
                <div className='m2Upper'>
                  <div className='m2uTextu'>
                    <p className="regular regular-fontSize">You Can Save</p>
                    <h1 className="bigBlue superBold">${Number(this.props.chartData.Optimal.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>
                    <p className="regular regular-fontSize">Annually with 100% Clean Energy</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-md-10 offset-md-1">

              <div className='m2uChart'>
                <Chart chartData={this.props.chartData} />
              </div>

            </div>
          </div>

          <div className='m2uTextl text-center'>
            <br />
            {/* {this.DescribeSystemType(this.props.chartData.Optimal.system_type)} */}
            <p className="regular regular-fontSize">We selected the optimal {(this.props.chartData.Optimal.system_type)} upgrade package for you!</p>
            <h1 className="bigBlue superBold">${Number(this.props.chartData.Optimal.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
            <small> or</small>&nbsp;${this.props.chartData.Optimal.monthly_loan_pmt}/mo.*</h1>
          </div>
          
          <div className="m2uTextl-small text-center deactive-color">
            <h6>Includes highest quality LG 335w - 400w solar panels; SolarEdge, SMA or Enphase inverter(s); balance of system & installation.</h6>
            <h6>*After 30% Federal ITC, and if loan, applied as down payment on 12 Yr Loan @ 5.49% APR (based on credit).</h6>
          </div>
              
          <div className="saveMoneyBox">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h4 className='text-white text-center'>Are you ready to save money?</h4>
                <div className="card border-0 rounded-0">
                  <div className="card-body">
                    <div className="text-center full-width pd20-top">
                      <p className='light deactive-color m2lBottom-title'>Get a custom energy savings report from Makello</p>
                    </div>

                    <div className="row">
                      <div className="col-md-6 offset-md-3">
                        <div className="form-group">
                          <input type="email" className="form-control userInput light full-width" placeholder='Full Name*' ref={this.nameRef} />
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control userInput light full-width" placeholder='Phone' ref={this.phoneRef} />
                        </div>
                        <div className="form-group">
                          <input id='autocomplete' onFocus={this.initAutoComplete} type="text" className="form-control userInput light full-width" placeholder='Enter full address*' ref={this.addressRef} />
                        </div>
                        <div className="form-group">
                          <input className='btn btn-primary submitButton light' value="Submit" type='submit' onClick={this.submitHandler} />
                          <p className="mcTextCopyright"><a href="https://www.makello.com/about-us.html" target="_blank" rel="noopener noreferrer">We will not share your data.</a></p>
                        </div>
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