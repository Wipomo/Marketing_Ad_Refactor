import React from 'react';

class FifthPart extends React.Component {

  render() {
    return (
      <div className='App'>
        <div className='main3 fifth-part'>
          <div className='row m3Upper text-center pd20-top'>
            <p className='regular regular-fontSize full-width pd20-top'>Thank you for the additional information!</p>
            <p className='regular regular-fontSize full-width pd20-top'>Our Clean Energy Specialists are adding this information to your personalized Makello savings report!</p>
          </div>
          <div className='m3Middle row'>
            <div className="col-md-4 offset-md-4">
              <img className="full-width" src="/images/makelloLogoNG.png" alt="makelloLogoNG" onClick={this.imgHandler} />
            </div>
          </div>
          <div className='m3Lower text-center'>
            <p className="regular">Come visit our website</p>
            <a href="http://www.makello.com"><u><b>www.makello.com</b></u></a>
          </div>
        </div>
      </div>
    );
  }
}


export default FifthPart;