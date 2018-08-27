import React from 'react';

class FirstPart extends React.Component {

    emailRef = React.createRef();

    submitHandler = (event) => {
        event.preventDefault();
        this.props.hideChanger('showSecondPart');
        this.props.emailUpdater(this.emailRef.current.value);
    };

    render() {
        return (
            <div className="App">
                <div className='side'></div>
                <div className='main'>
                    <div className='imageTest'></div>
                    <div className='mCenter'>
                        <div className='mcText'>
                            <p className='mctUpper semiBold'>You don't need tons of solar panels to save money.</p>
                            <p className='mctLower regular'>See how much you can save.</p>
                        </div>
                        <div className='mcSlider'>
                            <p className='regular sliderText'>What's your monthly electric bill?</p>
                            <div className='slider'>
                                <p>$50</p>
                                <input type='range' />
                                <p>$5000</p>
                            </div>
                            <div className='bottomInputs'>
                                <input className='userInput light' type='email' ref={this.emailRef} placeholder='Email*'/>
                                <input className='submitButton light' type='submit' onClick={this.submitHandler}/>
                            </div>
                        </div>
                    </div>
                    <div className='mHeader'>
                        <p className='mhText semiBold'>Makello</p>
                    </div>
                    <div className='mFooter'></div>
                </div>
                <div className='side'></div>
            </div>
        );
    }
}

export default FirstPart;