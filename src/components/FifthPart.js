import React from 'react';

class FifthPart extends React.Component {

    render() {

        if (this.props.resolution <= 500) {
            return(
                <div className='App'>
                    <div className='main3'>
                        <div className='m3Upper'>
                            <p className='medium'>Thank you for the additional information!</p>
                            <p>Our Clean Energy Specialists are adding this information to your personalized Makello savings report!</p>

                        </div>
                        <div className='m3Middle'>
                            <img src="/images/makelloLogoNG.png" />
                        </div>
                        <div className='m3Lower'>
                            <p className="regular">Come visit our website</p>
                            <a className="semiBold" href="http://www.makello.com"><h1>www.makello.com</h1></a>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div className='App'>
                    <div className='side' />
                    <div className='main3'>
                        <div className='m3Upper'>
                            <p className='medium'>Thank you for the additional information!</p>
                            <p>Our Clean Energy Specialists are adding this information to your personalized Makello savings report!</p>

                        </div>
                        <div className='m3Middle'>
                            <img src="/images/makelloLogoNG.png" />
                        </div>
                        <div className='m3Lower'>
                            <p className="regular">Come visit our website</p>
                            <a className="semiBold" href="http://www.makello.com"><h1>www.makello.com</h1></a>
                        </div>
                    </div>
                    <div className='side' />
                </div>
            );
        }



    }
}


export default FifthPart;