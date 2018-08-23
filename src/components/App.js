import React from 'react';
import Header from './Header';
import LandingBody from './LandingBody';
import UpperPart from './UpperPart';
import LowerPart from './LowerPart';
import BottomPart from "./BottomPart";

class App extends React.Component {

    state={
        showFirstPart: {
            hidden: ''
        },
        showSecondPart: {
            hidden: 'hidden'
        },
        showThirdPart: {
            hidden: 'hidden'
        },
        clientProfile: {
            email: '',
            fullName: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipcode: ''
        }
    };

    hideChanger = (input) => {
        if (this.state[input].hidden === 'hidden') {
            this.setState({showFirstPart: {hidden: 'hidden'}});
            this.setState({showSecondPart: {hidden: 'hidden'}});
            this.setState({showThirdPart: {hidden: 'hidden'}});
            this.setState({[input]: {hidden: ''}});
        } else {
            this.setState({[input]: {hidden: 'hidden'}});
        }
    };

    emailUpdater = (email) => {
        let clientProfile = { ...this.state.clientProfile};
        console.table(clientProfile);
        clientProfile.email = email;
        this.setState({ clientProfile });
    };

    restOfFormUpdater = (fullName, phone, address, city, state, zipcode) => {
        let clientProfile = { ...this.state.clientProfile };
        clientProfile.fullName = fullName;
        clientProfile.phone = phone;
        clientProfile.address = address;
        clientProfile.city = city;
        clientProfile.state = state;
        clientProfile.zipcode = zipcode;
        this.setState({ clientProfile });
    };

    render () {
        return(
            <div>
                <div className={`FirstPart ${this.state.showFirstPart.hidden}`}>
                    <Header/>
                    <LandingBody emailUpdater={this.emailUpdater} hideChanger={this.hideChanger}/>
                </div>
                <div className={`SecondPart ${this.state.showSecondPart.hidden}`}>
                    <UpperPart/>
                    <LowerPart restOfFormUpdater={this.restOfFormUpdater} hideChanger={this.hideChanger}/>
                </div>
                <div className={`ThirdPart ${this.state.showThirdPart.hidden}`}>
                    <BottomPart hideChanger={this.hideChanger}/>
                </div>
            </div>
        );
    }
}

export default App;