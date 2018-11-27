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
    
      return (
        <div className='App'>
          <div className='main3'>

            <div className='jumbotron text-center bg-white'>
              <h3 className="display-6">Thank you!</h3>
              <p className='lead'>Check for a confirmation email in your Inbox or SPAM folder</p>
              <div>Add us to your Contacts to receive a personalized <a href="https://www.makello.com/energy-analysis.html">Energy Analysis</a> from <a href="https://www.makello.com/">Makello</a>!</div>
            </div>

            <div className='jumbotron text-center rounded-0 border-0'>
              <div className='row'>
                <div className="col-md-4 offset-md-4">
                  <img className="img-fluid" src="/images/makelloLogoNG.png" alt="makelloLogoNG" onClick={this.imgHandler} />
                </div>
              </div>
              <p><a href="http://www.makello.com">www.makello.com</a></p>
              <h4 className="font-italic">"Make it low, with Makello!"</h4>
              <p>
                <small className="text-muted">Makello is an authorized distributor for Green Energy EPC (CSLB License #978836) having 5-Star Average Reviews on Yelp! (93 total)</small>
              </p>
            </div>

          </div>
        </div>
      );

  }
}

export default ThirdPart;