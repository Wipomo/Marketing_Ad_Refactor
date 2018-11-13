import React from 'react';

class FifthPart extends React.Component {

  render() {
    return (
      <div className='App'>
        <div className='main3 fifth-part'>
          <div className='row m3Upper text-center pd20-top'>
            <p className='regular regular-fontSize full-width pd20-top'>Thank you for the additional information!</p>
            <p className='regular regular-fontSize full-width pd20-top'>Our Ethical Energy Efficiency Experts are creating your personalized Energy Analysis!</p>
          </div>
          <div className='m3Middle row'>
            <div className="col-md-4 offset-md-4">
            
              <img className="full-width" border="1px" src="/images/makelloLogoNG.png" alt="makelloLogoNG" onClick={this.imgHandler} />
            </div>
          </div>
          <br></br>
          <div className='m3Lower text-center'>
            {/* <p className="regular">Come visit our website</p> */}
            <u><a href="http://www.makello.com">www.makello.com</a></u>
          </div>
        </div>
      </div>
    );
  }
}


export default FifthPart;