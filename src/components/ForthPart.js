import React from 'react';
import CarMenu from './carMenu/CarMenu';

var car = {
    year: "",
    make: "",
    model: ""
}

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
        this.props.carInfoUpdater(trip, mpg, car.year, car.make, car.model);
        this.props.hideChanger('showFifthPart');
    };

    updateCar = (value) => {
        if (car.year == "") {
            car.year = value;
        } else if (car.make =="") {
            car.make = value;
        } else {
            car.model = value;
        }
    };

    render() {
         return(
                <div className='App'>
                    <div className='side' />
                    <div className='main4'>
                        <div className='m4Upper'>
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
                                    <CarMenu updateCar={this.updateCar}/>
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