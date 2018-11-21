import React from 'react';
import CarMenu from './carMenu/CarMenu';

class ForthPart extends React.Component {

  componentDidMount() {
    fetch("./cars.json")
        .then(response => response.json())
        .then(cars => this.setState({cars}))
  }

  state = {
    cars: [],
    makeMenu: [],
    modelMenu: [],

    year: "year",
    make: "make",
    model: "model",

    mpg:"0",
    dailyTrip:"0",

    showFakeMake: {
        hidden: ''
    },
    showFakeModel: {
        hidden: ''
    },
    showMake: {
        hidden: 'hidden'
    },
    showModel: {
        hidden: 'hidden'
    }
  };

  submitHandler = (event) => {
    event.preventDefault();

    let trip = this.state.dailyTrip;
    let mpg = this.state.mpg;

    let year = this.state.year;
    let make = this.state.make;
    let model = this.state.model;

    this.props.carInfoUpdater(trip, mpg, year, make, model);

    this.props.hideChanger('showFifthPart');
    //this.props.createCustomerEmail(trip, mpg, make, model, year);
  };

  setYear = (e) => {
    let year = e.target.value;
    this.setState({year: year});
    //this.updateCar(year, 1);
    this.makeMenuMaker(year);
  };

  setMake = (e) => {
      let make = e.target.value;
      this.setState({make: make});
      this.makeModelMenu(make);
      //this.updateCar(make,2);
  };

  setModel = (e) => {
      let model = e.target.value;
      this.setState({model: model});
      //this.updateCar(model,3);
  };

  setdailyTrip = (e) => {
    let dailyTrip = e.target.value;
    this.setState({dailyTrip: dailyTrip});

};

setMpg = (e) => {
    let mpg = e.target.value;
    this.setState({mpg: mpg});
};

  makeMenuMaker = (year) => {
    if (year !== 'year') {
        this.showMake(true);
        this.setState({makeMenu: (this.state.cars[year])});
    } else {
        this.showMake(false);
        this.setState({makeMenu: this.state.cars});
    }
  };

showMake = (bool) => {
    if (bool) {
        this.setState({showFakeMake: {hidden: 'hidden'}});
        this.setState({showMake: {hidden: ''}});
    } else {
        this.setState({showFakeMake: {hidden: ''}});
        this.setState({showMake: {hidden: 'hidden'}});
    }

};

makeModelMenu = (make) => {
    if (make !== 'make') {
        this.showModel(true);
        this.setState({modelMenu: this.state.makeMenu[make]});
    } else {
        this.showModel(false);
        this.setState({modelMenu: this.state.cars});
    }
};

showModel = (bool) => {
    if (bool) {
        this.setState({showFakeModel: {hidden: 'hidden'}});
        this.setState({showModel: {hidden: ''}});
    } else {
        this.setState({showFakeModel: {hidden: ''}});
        this.setState({showModel: {hidden: 'hidden'}});
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
                      <input type="email" className="form-control userInput light" onChange={this.setdailyTrip} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <p className='regular text-center full-width'>What is your miles per gallon <br />average?</p>
                    <div className="col-md-6 offset-md-3">
                      <input type="text" className="form-control userInput light" onChange={this.setMpg}/>
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
                      <CarMenu 
                      setYear={this.setYear} setMake={this.setMake} setModel={this.setModel}
                      year={this.state.year} make={this.state.make} model={this.state.model}
                      makeMenu={this.state.makeMenu} modelMenu={this.state.modelMenu}
                      showFakeMake={this.state.showFakeMake} showFakeModel={this.state.showFakeModel}
                      showMake={this.state.showMake} showModel={this.state.showModel}
                      />
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