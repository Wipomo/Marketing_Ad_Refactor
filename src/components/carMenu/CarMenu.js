import React from 'react';
import YearMenu from './YearMenu';
import MakeMenu from './MakeMenu';
import ModelMenu from './ModelMenu';
import FakeMakeMenu from './FakeMakeMenu';
import FakeModelMenu from './FakeModelMenu';

class CarMenu extends React.Component {
    render() {

        return(
            <div className='styled-select'>
                <div className="carMenu">
                    <YearMenu year={this.props.year} setYear={this.props.setYear}/>
                </div>
                <div className={`${this.props.showFakeMake.hidden} carMenu`}>
                    <FakeMakeMenu />
                </div>
                <div className={`${this.props.showMake.hidden} carMenu`}>
                    <MakeMenu make={this.props.make} setMake={this.props.setMake}
                    makeMenu={this.props.makeMenu}/>
                </div>
                <div className={`${this.props.showFakeModel.hidden} carMenu`}>
                    <FakeModelMenu className={this.props.showFakeModel}/>
                </div>
                <div className={`${this.props.showModel.hidden} carMenu`}>
                    <ModelMenu model={this.props.model} setModel={this.props.setModel}
                    modelMenu={this.props.modelMenu}/>
                </div>
            </div>
        );
    }
}



export default CarMenu;