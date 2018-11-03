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
    if (car.year === "") {
      car.year = value;
    } else if (car.make === "") {
      car.make = value;
    } else {
      car.model = value;
    }
  };

  render() {
    return (
      <div className='App'>
        <div className='main4'>
          <div className='m4Upper'>
          </div>
          <div className='m4Middle row mg20-top pd20-top'>
            <div className='m4mLeft col-md-6'>
              <div className="row">
                <div className="m4mLeft-content col-md-8 offset-md-3">
                  <div className="form-group row">
                    <p className='regular full-width text-center'>What is your daily average<br />commute in miles?</p>
                    <div className="col-md-6 offset-md-3">
                      <input type="email" className="form-control userInput light" ref={this.tripRef} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <p className='regular text-center full-width'>What is your miles per gallon <br />average?</p>
                    <div className="col-md-6 offset-md-3">
                      <input type="text" className="form-control userInput light" ref={this.mpgRef} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='m4mRight col-md-6'>
              <div className="row">
                <div className="col-md-8 offset-md-1 vertical-outer">
                  <div className='m4mrM row vertical-middle'>
                    <p className='regular text-center full-width'>Electric Vehicle Type</p>
                    <div className="col-md-6 offset-md-3">
                      <CarMenu updateCar={this.updateCar} />
                    </div>
                  </div>
                  <div className='m4mrL'></div>
                </div>
              </div>
            </div>
          </div>
          <div className='m4Lower row'>
            <div className="col-md-2 offset-md-5 mg20-top m4Lower-content flex-center">
              <input className='btn btn-primary submitButton light' type='submit' value="Submit" onClick={this.submitHandler} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForthPart;