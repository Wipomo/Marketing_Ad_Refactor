import React from 'react';
import MakelloSlider from './MakelloSlider';

const min_slider_value = 50;
const max_slider_value = 2000;
const slider_increment_step = 25;

class FirstPart extends React.Component {

  emailRef = React.createRef();

  submitHandler = (event) => {
    var testingUser = false;
    if (this.props.emailValidator(this.emailRef.current.value)) {
      event.preventDefault();
      // check for testing input
      // also check if work email for testing purposes
      if(/^\w+([.-]?\w+)*@wipomo.com$/.test(this.emailRef.current.value)) {
        console.log("TEST: Sets client test state")
        testingUser = true;
      }
      this.props.billEmailUpdater(this.getSliderValue(), this.emailRef.current.value, testingUser);
      this.props.getChartData(this.getSliderValue());
      this.props.hideChanger('showSecondPart');

    } else {
      event.preventDefault();
      window.alert("Please enter a valid email address.");
    }
  };

  getSliderValue = () => {
    var sliderHolder = document.getElementById("sliderHandle").innerText;
    console.log("slider holder is: "+sliderHolder);
    var sliderValue = Number(sliderHolder.replace(/[^\d]/g, ""));
    console.log("slider value is: "+sliderValue);

    return sliderValue;
    //return this.props.monthlyBill;
  };

  render() {
    return (
      <div className="App">
        <div className='main'>
          <div className="wrapper">

            <header className="mHeader">
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <span className="navbar-brand">
                      Makello
                    </span>
                  </div>
                </div>
              </nav>
            </header>

            <div className="header">
              <div className="container">
                <div className="header-container">
                  <div className="outer">
                    <div className="inner text-center mcText">
                      <h1 className="mctUpper semiBold responsive-mctUpper">You don't need tons of solar panels to save money.</h1>
                      <h1 className="mctLower semiBold responsive-mctLower">See how much you can save.</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="slider-section">
              <div className="row">
                <div className='col-md-8 offset-md-2 col-sm-8 offset-sm-2 col-xs-10 offset-xs-1'>

                  <div className="mcSlider">

                    <p className='text-center regular sliderText responsive-sliderText'>What's your monthly electric bill?</p>

                    <div className='slider'>
                      <MakelloSlider
                        showTooltip={this.props.showTooltip}
                        className="makelloSlider"
                        min={min_slider_value}
                        max={max_slider_value}
                        step={slider_increment_step}
                        onChange={this.props.handleSlideChange}
                        monthlyBill={this.props.monthlyBill} />
                    </div>

                    <div className="bottomInputs">
                      <div className="row">
                        <div className="col-md-6 offset-md-3">
                          <div className="form-group">
                            <input type="email" className="form-control userInput light" id="email" ref={this.emailRef} aria-describedby="emailHelp" placeholder="Email*" />
                          </div>
                          <div className="form-group">
                            <input className="btn btn-primary submitButton light" type="submit" value="Submit" onClick={this.submitHandler} />
                            <p text-align="center">Now serving San Diego</p> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </section>
            
            <section className="payback">

              <div class="row">
                <div class="col-md-7">
                  <h2 class="payback-heading">High Energy Bill? <span class="text-muted">No Problem!</span></h2>
                  <p class="lead mt-3">
                    If you:
                    <ul>
                      <li>Own or lease the property,</li>
                      <li>Are the electric utility account owner, or</li>
                      <li>Have a Standard Domestic Utility Rate</li>
                    </ul>
                    Then, get Simple Payback in 1 - 3 years**
                  </p>

                  <p class="mt-4">
                    <a class="btn btn-warning" href="https://www.makello.com/cashloan.html">Cash/Loan</a> &nbsp; <strong>Starting at $7,999</strong>
                  </p>
                </div>
                <div class="col-md-5">
                  <p><img class="payback-image img-fluid mx-auto" src="/images/website-pic-2.jpeg" alt="solar"/></p>
                  <p class="payback-disclaimer">
                    **Simple Payback in 1-3 years is possible for SDGE
                    annual electric utility bills on the Standard Domestic Rate, and ineligible
                    for Medical & Low Income discounts.
                    Actual time to Simple Payback depends on Time-Of-Use interval data for electric
                    consumption, and solar PV production variables.
                  </p>
                </div>
              </div>

            </section>
            
          </div>
        </div>
      </div>
    );
  }
}

export default FirstPart;