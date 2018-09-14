import React from 'react';

class FifthPart extends React.Component {

    submitHandler = (event) => {
        event.preventDefault();
        window.location.href = "https://wipomo-zoho-database.herokuapp.com/"
    };


    render() {
        return(
            <div className='App'>
                <div className='side' />
                <div className='main3'>
                    <div className='m3Upper'>
                        <p className='medium'>Thank you for the additional information!</p>
                        <p>Our Clean Eregy Specialists are adding this information to your personalized Makello savings report!</p>

                    </div>
                    <div className='m3Middle'>
                        <img src="/images/makelloLogoNG.png" />
                    </div>
                    <div className='m3Lower'>
                        <input className='submitButtonBig light' type='submit' value="Come visit our website!" onClick={this.submitHandler}/>
                    </div>
                </div>
                <div className='side' />
            </div>
        );
    }
}


export default FifthPart;