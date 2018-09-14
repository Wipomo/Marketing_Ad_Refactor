import React from 'react';

class ThirdPart extends React.Component {

    submitHandler = (event) => {
        event.preventDefault();
        this.props.hideChanger('showForthPart');
    };

    imgHandler = (event) => {
        event.preventDefault();
        window.location.href = "https://wipomo-zoho-database.herokuapp.com/";
    };

    render() {
        return(
            <div className='App'>
                <div className='side' />
                <div className='main3'>
                    <div className='m3Upper'>
                        <p className='medium'>Thank you! We will reach out to you shortly!</p>
                        <p>Our Clean Energy Specialists are looking over your information to start you on the path to saving The Makello Way!</p>
                    </div>
                    <div className='m3Middle'>
                            <img src="/images/makelloLogoNG.png" onClick={this.imgHandler} />
                    </div>
                    <div className='m3Lower'>
                        <input className='submitButtonBig light' type='submit' value="Interested to see how much an electric car can increase savings?" onClick={this.submitHandler}/>
                    </div>
                </div>
                <div className='side' />
            </div>
        );
    }
}

export default ThirdPart;