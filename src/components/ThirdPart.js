import React from 'react';
import {  animateScroll as scroll } from 'react-scroll';

class ThirdPart extends React.Component {

  componentDidUpdate() {
    scroll.scrollToTop();
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.hideChanger('showForthPart');
    
  };

  imgHandler = (event) => {
    event.preventDefault();
    window.location.href = "http://www.makello.com";
  };

  render() {

    if (this.props.resolution <= 500) {
      return (
        <div className='App'>
          <div className='main3'>
            <div className='m3Upper'>
              <p className='medium'>Thank you! Check for a confirmation email in your Inbox or SPAM folder; add us to your Contacts to receive a personalized <a href="https://www.makello.com/energy-analysis.html">Energy Analysis</a> from Makello</p>
              <p>Our Clean Energy Specialists are looking over your information to start you on the path to saving The Makello Way!</p>
            </div>
            <div className='m3Middle'>
              <img src="/images/makelloLogoNG.png" alt="makelloLogoNG" onClick={this.imgHandler} />
            </div>
            <br></br>
            <div className='m3Lower'>
              <a href="http://www.makello.com"><u><b>www.makello.com</b></u></a>
              <p className="semiBold italic-font">"Make it low, with Makello!"</p>
              <p className="regular">Interested to see how much an electric car can increase savings?</p>
              <input className='hidden' type='submit' value="" onClick={this.submitHandler} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='App'>
          <div className='main3'>
            <div className='row m3Upper text-center pd20-top'>
              <p className='regular regular-fontSize full-width pd20-top'>Thank you! Check for a confirmation email in your Inbox or SPAM folder; add us to your Contacts to receive a personalized <a href="https://www.makello.com/energy-analysis.html">Energy Analysis</a> from <a href="https://www.makello.com/">Makello</a>!</p>
            </div>
            <div className='m3Middle row'>
              <div className="col-md-4 offset-md-4">
                <img className="full-width" src="/images/makelloLogoNG.png" alt="makelloLogoNG" onClick={this.imgHandler} />
              </div>
            </div>
            <br></br>
            <div className='m3Lower text-center'>
              <a href="http://www.makello.com italic-font"><u><b>www.makello.com</b></u></a>
              <p className="semiBold italic-font">"Make it low, with Makello!"</p>
              <p>
                <small className="italic-font deactive-color">Makello is an authorized distributor for Green Energy EPC (CSLB License #978836) having 5-Star Average Reviews on Yelp! (93 total)</small>
              </p>
              <p className="regular regular-fontSize pd20-top pd20-bottom">Interested to see how much an <br />electric car can increase savings?</p>
              <input className='hidden' type='submit' value="" onClick={this.submitHandler} />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ThirdPart;