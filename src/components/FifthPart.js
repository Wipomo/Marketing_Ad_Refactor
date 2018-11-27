import React from 'react';

class FifthPart extends React.Component {

  imgHandler = (event) => {
    event.preventDefault();
    window.location.href = "http://www.makello.com";
  };

  render() {
    return (
      <div className='App'>
        <div className='main3 fifth-part'>

          <div className='jumbotron text-center bg-white'>
              <h3 className="display-6">Thank you for the additional information!</h3>
              <p className='lead'>Check for a confirmation email in your Inbox or SPAM folder</p>
              <div>Add us to your Contacts to receive a personalized <a href="https://www.makello.com/energy-analysis.html">Energy Analysis</a> from <a href="https://www.makello.com/">Makello</a>!</div>
          </div>
          
          <div className='jumbotron text-center rounded-0 border-0'>
            <div className='row'>
              <div className="col-md-4 offset-md-4">
                <img className="full-width" border="1px" src="/images/makelloLogoNG.png" alt="makelloLogoNG" onClick={this.imgHandler} />
              </div>
            </div>
            <p><a href="http://www.makello.com">www.makello.com</a></p>
          </div>

        </div>
      </div>
    );
  }
}


export default FifthPart;