import React from 'react';
import YearMenu from './YearMenu';
import MakeMenu from './MakeMenu';
import ModelMenu from './ModelMenu';
import FakeMakeMenu from './FakeMakeMenu';
import FakeModelMenu from './FakeModelMenu';
import style from '../../css/styles.css';

class CarMenu extends React.Component {

    state = {
        cars: [],
        makeMenu: [],
        modelMenu: [],
        year: "year",
        make: "make",
        model: "model",
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


    componentDidMount() {
        fetch("./cars.json")
            .then(response => response.json())
            .then(cars => this.setState({cars}))
    }

    makeMenuMaker = (year) => {
        if (year !== 'year') {
            this.showMake(true);
            this.setState({makeMenu: (this.state.cars[year])});
        } else {
            this.showMake(false);
            this.setState({makeMenu: this.state.cars});
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

    showMake = (bool) => {
        if (bool) {
            this.setState({showFakeMake: {hidden: 'hidden'}});
            this.setState({showMake: {hidden: ''}});
        } else {
            this.setState({showFakeMake: {hidden: ''}});
            this.setState({showMake: {hidden: 'hidden'}});
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

    setYear = (e) => {
        let year = e.target.value;
        this.setState({year: year});
        this.makeMenuMaker(year);
        this.props.updateCar(year);
    };

    setMake = (e) => {
        let make = e.target.value;
        this.setState({make: make});
        this.makeModelMenu(make);
        this.props.updateCar(make);
    };

    setModel = (e) => {
        let model = e.target.value;
        this.setState({model: model});
        this.props.updateCar(model);
    };

    render() {

        return(
            <div className='styled-select'>
                <div className="carMenu">
                    <YearMenu year={this.state.year} setYear={this.setYear} />
                </div>
                <div className={`${this.state.showFakeMake.hidden} carMenu`}>
                    <FakeMakeMenu />
                </div>
                <div className={`${this.state.showMake.hidden} carMenu`}>
                    <MakeMenu make={this.state.make} setMake={this.setMake} makeMenu={this.state.makeMenu}/>
                </div>
                <div className={`${this.state.showFakeModel.hidden} carMenu`}>
                    <FakeModelMenu className={this.state.showFakeModel}/>
                </div>
                <div className={`${this.state.showModel.hidden} carMenu`}>
                    <ModelMenu model={this.state.model} setModel={this.setModel} modelMenu={this.state.modelMenu}/>
                </div>
            </div>
        );
    }
}



export default CarMenu;