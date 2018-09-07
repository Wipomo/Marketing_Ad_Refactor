import React from 'react';

class ForthPart extends React.Component {

    tripRef = React.createRef();
    mpgRef = React.createRef();
    yearRef = React.createRef();
    makeRef = React.createRef();
    modelRef = React.createRef();

    submitHandler = (event) => {
        event.preventDefault();
        let trip = this.tripRef.current.value;
        let mpg = this.mpgRef.current.value;
        let year = this.yearRef.current.value;
        let make = this.makeRef.current.value;
        let model = this.modelRef.current.value;
        this.props.carInfoUpdater(trip, mpg, year, make, model);
        this.props.hideChanger('showFifthPart');
    };


    render() {
        return(
            <div className='App'>
                <div className='side' />
                <div className='main4'>
                    <div className='m4Upper'>
                        <p className='medium'>Thank you! We will reach out to you shortly!</p>
                        <p className='medium'>Interested to see how much an electric car can increase savings?</p>
                    </div>
                    <div className='m4Middle'>
                        <div className='m4mLeft'>
                            <p className='regular'>What is daily average commute in miles?</p>
                            <input ref={this.tripRef} className='userInput' type='text' />
                            <p className='regular'>What is your miles per gallon average?</p>
                            <input ref={this.mpgRef} className='userInput' type='text' />
                        </div>
                        <div className='m4mRight'>
                            <div className='m4mrM'>
                                <p className='regular'>Electric Vehicle Type</p>
                                <input ref={this.yearRef} className='userInput' type='text' />
                                <input ref={this.makeRef} className='userInput' type='text' />
                                <input ref={this.modelRef} className='userInput' type='text' />
                            </div>
                            <div className='m4mrL'></div>
                        </div>
                    </div>
                    <div className='m4Lower'>
                        <input className='submitButton light' type='submit' value="Submit" onClick={this.submitHandler}/>
                    </div>
                </div>
                <div className='side' />
            </div>
        );
    }
}

export default ForthPart;