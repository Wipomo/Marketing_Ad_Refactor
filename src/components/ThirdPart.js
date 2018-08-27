import React from 'react';

class ThirdPart extends React.Component {
    render() {
        return(
            <div className='App'>
                <div className='side' />
                <div className='main3'>
                    <div className='m3Upper'>
                        <p className='medium'>Thank you! We will reach out to you shortly!</p>
                        <p className='medium'>Interested to see how much an electric car can increase savings?</p>
                    </div>
                    <div className='m3Middle'>
                        <div className='m3mLeft'>
                            <p className='regular'>What is your weekly commute in miles?</p>
                            <input className='userInput' type='text' />
                            <p className='regular'>What is your weekly commute in miles?</p>
                            <input className='userInput' type='text' />
                        </div>
                        <div className='m3mRight'>
                            <div className='m3mrM'>
                                <p className='regular'>Electric Vehicle Type</p>
                                <input className='userInput' type='text' />
                                <input className='userInput' type='text' />
                                <input className='userInput' type='text' />
                            </div>
                            <div className='m3mrL'></div>
                        </div>
                    </div>
                    <div className='m3Lower'>
                        <input className='submitButtonBig light' type='submit' />
                    </div>
                </div>
                <div className='side' />
            </div>
        );
    }
}

export default ThirdPart;