import React from 'react';
import YearMenu from './YearMenu';
import MakeMenu from './MakeMenu';
import ModelMenu from './ModelMenu';
import FakeMakeMenu from './FakeMakeMenu';
import FakeModelMenu from './FakeModelMenu';

class CarMenu extends React.Component {
    // year= "year";
    // make= "make";
    // model= "model";

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
    }

    setYear = (e) => {
        let year = e.target.value;
        this.setState({year: year});
        this.makeMenuMaker(year);
    };
    
    setMake = (e) => {
        let make = e.target.value;
        this.setState({make: make});
        this.makeModelMenu(make);
    };
    
    setModel = (e) => {
        let model = e.target.value;
        this.setState({model: model});
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

    submitHandler = (event) => {
        event.preventDefault();
    
        let trip = this.state.dailyTrip;
        let mpg = this.state.mpg;
    
        let year = this.state.year;
        let make = this.state.make;
        let model = this.state.model;
    
        this.props.carInfoUpdater(trip, mpg, year, make, model);
    
        this.props.hideChanger('showFifthPart');
      };

    render() {

        return(
            <div className='styled-select'>
                <div className="form-group">
                    <label>What is your daily average commute in miles?</label>
                    <input type="text" className="form-control" id="inputDailyTrip" onChange={this.setdailyTrip} />
                </div>
                <div className="form-group">
                    <label>What is your average miles per gallon?</label>
                    <input type="text" className="form-control" id="inputMPG" onChange={this.setMpg}/>
                </div>
                
                <div className="form-group">
                    <div className="carMenu">
                        <YearMenu year={this.state.year} setYear={this.setYear}/>
                    </div>
                    <div className={`${this.state.showFakeMake.hidden} carMenu`}>
                        <FakeMakeMenu />
                    </div>
                    <div className={`${this.state.showMake.hidden} carMenu`}>
                        <MakeMenu make={this.state.make} setMake={this.setMake}
                        makeMenu={this.state.makeMenu}/>
                    </div>
                    <div className={`${this.state.showFakeModel.hidden} carMenu`}>
                        <FakeModelMenu className={this.state.showFakeModel}/>
                    </div>
                    <div className={`${this.state.showModel.hidden} carMenu`}>
                        <ModelMenu model={this.state.model} setModel={this.setModel}
                        modelMenu={this.state.modelMenu}/>
                    </div>
                </div>

                <div className="form-group text-center mt-4">
                    <input className='btn btn-primary submitButton light' type='submit' value="Submit" onClick={this.submitHandler} />
                    <p text-align="center">Now serving San Diego</p>
                </div>
            </div>
        );
    }
}

export default CarMenu;