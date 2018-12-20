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

          <div className='p-2'>

            <h3 className="text-center">Interested to see how much a Plug-In Vehicle can increase savings?</h3>
            <input className='hidden' type='submit' value="" onClick={this.submitHandler} />

          </div>

          <div className="row">
            <div className="col-md-6 offset-md-3">

              <div className='card bg-light mb-5 mt-2 rounded-0'>
                <div className="card-body p-5">

                  <div className="form-group">
                    <label>What is your daily average commute in miles?</label>
                    <input type="text" className="form-control" id="inputDailyTrip" onChange={this.setdailyTrip} />
                  </div>
                  <div className="form-group">
                    <label>What is your average miles per gallon?</label>
                    <input type="text" className="form-control" id="inputMPG" onChange={this.setMpg}/>
                  </div>
                  <div className="form-group">
                    <label>Plug-In Vehicle Type</label>
                    <CarMenu 
                      setYear={this.setYear} setMake={this.setMake} setModel={this.setModel}
                      year={this.state.year} make={this.state.make} model={this.state.model}
                      makeMenu={this.state.makeMenu} modelMenu={this.state.modelMenu}
                      showFakeMake={this.state.showFakeMake} showFakeModel={this.state.showFakeModel}
                      showMake={this.state.showMake} showModel={this.state.showModel}
                    />
                  </div>
                  <div className="form-group text-center mt-4">
                    <input className='btn btn-primary submitButton light' type='submit' value="Submit" onClick={this.submitHandler} />
                    <p text-align="center">Now serving San Diego</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default ForthPart;