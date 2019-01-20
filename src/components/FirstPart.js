import React from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import MakelloSlider from './MakelloSlider';

const min_slider_value = 50;
const max_slider_value = 2000;
const slider_increment_step = 25;

class FirstPart extends React.Component {

  constructor(props) {
    super(props);

    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.state = {
      popoverOpen1: false,
      popoverOpen2: false,
      popoverOpen3: false
    };
  }

  toggle1() {
    this.setState({
      popoverOpen1: !this.state.popoverOpen1
    });
  }
  toggle2() {
    this.setState({
      popoverOpen2: !this.state.popoverOpen2
    });
  }
  toggle3() {
    this.setState({
      popoverOpen3: !this.state.popoverOpen3
    });
  }

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
      
      var monthlyBill = this.getSliderValue();
      this.props.getChartData(monthlyBill);
      this.props.billEmailUpdater(monthlyBill, this.emailRef.current.value, testingUser);
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
                      <a href="https://www.makello.com" target="_blank" rel="noopener noreferrer" > Makello.com </a>
                    </span>
                  </div>
                  <span className="navbar-text">
                  	{/* <a href="#">Energy Analysis</a> */}
                  </span>
                </div>
              </nav>
            </header>

            <div className="header">
              <div className="container">
                <div className="header-container">
                  <div className="outer">
                    <div className="inner text-center mcText mt-2">
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
                        onMouseOut={this.props.handleSlideChange}
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
              <div className="row">
                <div className="col-lg-6">

                  <div className="paybackWrapper">
                    <h2 className="payback-heading">High Energy Bill? <span className="text-muted">No Problem!</span></h2>
                    <div className="mt-3">
                      Enter your email above, for a Coupon Code that includes: 
                      <ul>
                        <li>Free Energy Analysis <span className="readme" id="Popover3" onMouseOver={this.toggle3} onMouseOut={this.toggle3}>
                      &nbsp;<sup><img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/></sup></span></li>
                        <li>Simple payback in 1 - 3 years <span className="readme" id="Popover1" onMouseOver={this.toggle1} onMouseOut={this.toggle1}>
                      &nbsp;<sup><img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/></sup></span></li>
                        <li>Systems starting at $5,599 or $53/mo.<span className="readme" id="Popover2" onMouseOver={this.toggle2}
                      onMouseOut={this.toggle2}>&nbsp;<sup> <img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/></sup>
                      </span></li>
                      </ul>
                    </div>

                    <div className="mt-4"></div>
                  </div>
                </div>

                <div className="col-lg-6">

                	<div className="surveyVid">
	                	<div className="embed-responsive embed-responsive-16by9">
		                	{/* <video width="100%" height="100%" controls="true" poster="/images/video_poster_title.jpg">
		                    	<source src = "https://www.youtube.com/watch?v=kDz-cchV6QA" type="video/mp4" ></source>
		                    	Your browser does not support the video tag, please open using one of the following browsers:Internet Explorer, Chrome, Firefox, Opera or Safari.
                        </video> 
                        <iframe width="560" height="315" title="makello_video"src="https://www.youtube.com/embed/kDz-cchV6QA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        */}
      
                        <iframe class="embed-responsive-item" title="makello_video" src="https://www.youtube.com/embed/kDz-cchV6QA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        
	                	</div>
                	</div>

                </div>
              </div>


              <Popover placement="auto" isOpen={this.state.popoverOpen3} target="Popover3" toggle={this.toggle3}>
                <PopoverBody><div className="payback-disclaimer">
                Makello's Energy Analysis includes:<br></br>

                  &nbsp;&nbsp; -Site survey<br></br>
                  &nbsp;&nbsp; -Shading analysis<br></br>
                  &nbsp;&nbsp; -Cash flow analysis<br></br>
                  &nbsp;&nbsp; -Trade-off study<br></br>
                  &nbsp;&nbsp; -Custom proposal<br></br>
                  <br></br>

                  SDG&E and Home Energy Auditors typically charge between $400-$800.
                  Enter your email in the form above to receive a Coupon Code for a FREE Energy Analysis by our Ethical Energy Efficiency Experts, and a comprehensive report.
                  You may also request access to site survey measurements, shading analysis, and pictures.
                  </div></PopoverBody>
              </Popover>

              <Popover placement="auto" isOpen={this.state.popoverOpen1} target="Popover1" toggle={this.toggle1}>
                <PopoverBody><div className="payback-disclaimer">
                    Simple Payback in 1-3 years is possible for SDGE
                    annual electric utility bills on the Standard Domestic Rate, and ineligible
                    for Medical & Low Income discounts.
                    Actual time to Simple Payback depends on Time-Of-Use interval data for electric
                    consumption, and solar PV production variables.
                  </div></PopoverBody>
              </Popover>

              <Popover placement="auto" isOpen={this.state.popoverOpen2} target="Popover2" toggle={this.toggle2}>
                <PopoverBody><div className="payback-disclaimer">
                  Includes highest quality: LG 335 watt - 400 watt solar panels, SolarEdge, SMA or Enphase IQ7 inverter(s), balance of system and installation. After 30% Federal Income Tax Credit, and if loan, applied as downpayment for 12 Yr Loan @ 5.49% APR. Actual APR based on credit application.
                  </div></PopoverBody>
              </Popover>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default FirstPart;