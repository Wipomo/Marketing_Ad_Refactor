import React from 'react';
import MakelloSlider from './MakelloSlider';

const min_slider_value = 50;
const max_slider_value = 1000;
const slider_increment_step = 25;

class FirstPart extends React.Component {

  emailRef = React.createRef();

  submitHandler = (event) => {

    if (this.props.emailValidator(this.emailRef.current.value)) {
      event.preventDefault();
      this.props.hideChanger('showSecondPart');
      this.props.billEmailUpdater(this.getSliderValue(), this.emailRef.current.value);
    } else {
      event.preventDefault();
      window.alert("Please enter a valid email address.");
    }
  };

  getSliderValue = () => {
    var sliderHolder = document.getElementById("sliderHandle").innerText;
    var sliderValue = sliderHolder.slice(1);
    return sliderValue;
  };

  render() {
    return (
      <div className="App">
        <div className='side'></div>
        <div className='main'>
          <div className="container responsive-container">
            <header className="header responsive-header">
              <div className="container">
                <div className="outer">
                  <div className="inner text-center mcText">
                    <h1 className="mctUpper semiBold responsive-mctUpper">You don't need tons of solar panels to save money.</h1>
                    <h1 className="mctLower semiBold responsive-mctLower">See how much you can save.</h1>
                  </div>
                </div>
              </div>
            </header>

            <div className='imageTest'></div>
            <div className='mCenter'>
              {/* <div className='mcText'>
                <p className='mctUpper semiBold'>You don't need tons of solar panels to save money.</p>
                <p className='mctLower semiBold'>See how much you can save.</p>
              </div> */}
              {/* <div className='mcSlider'>
                <p className='regular sliderText'>What's your monthly electric bill?</p>
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
                <div className='bottomInputs'>
                  <input className='userInput light' type='email' ref={this.emailRef} placeholder='Email*' />
                  <input className='submitButton light' type='submit' value="Submit" onClick={this.submitHandler} />
                </div>
              </div> */}
            </div>
            {/* <div className='mHeader'>
              <p className='mhText semiBold'>Makello</p>
            </div> */}
            <div className='mFooter'></div>
          </div>
        </div>
        <div className='side'></div>
      </div>
    );
  }
}

export default FirstPart;