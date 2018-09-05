import React from 'react';
import FirstPart from './FirstPart';
import SecondPart from './SecondPart';
import ThirdPart from './ThirdPart';
import ForthPart from './ForthPart';
import FifthPart from './FifthPart';

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
        showForthPart: {
            hidden: 'hidden'
        },
        showFifthPart: {
            hidden: 'hidden'
        },
        clientProfile: {
            email: '',
            fullName: '',
            phone: '',
            address: '',
            dailyTrip: '',
            mpg: '',
            carYear: '',
            carMake: '',
            carModel: ''
        }
    };

    hideChanger = (input) => {
        if (this.state[input].hidden === 'hidden') {
            this.setState({showFirstPart: {hidden: 'hidden'}});
            this.setState({showSecondPart: {hidden: 'hidden'}});
            this.setState({showThirdPart: {hidden: 'hidden'}});
            this.setState({showForthPart: {hidden: 'hidden'}});
            this.setState({showFifthPart: {hidden: 'hidden'}});
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

    restOfFormUpdater = (fullName, phone, address) => {
        let clientProfile = { ...this.state.clientProfile };
        clientProfile.fullName = fullName;
        clientProfile.phone = phone;
        clientProfile.address = address;
        this.setState({ clientProfile });
    };

    render () {
        return(
            <div>
                <div className={`FirstPart ${this.state.showFirstPart.hidden}`}>
                    <FirstPart emailUpdater={this.emailUpdater} hideChanger={this.hideChanger}/>
                </div>
                <div className={`SecondPart ${this.state.showSecondPart.hidden}`}>
                    <SecondPart restOfFormUpdater={this.restOfFormUpdater} hideChanger={this.hideChanger}/>
                </div>
                <div className={`ThirdPart ${this.state.showThirdPart.hidden}`}>
                    <ThirdPart hideChanger={this.hideChanger}/>
                </div>
                <div className={`ThirdPart ${this.state.showForthPart.hidden}`}>
                    <ForthPart hideChanger={this.hideChanger}/>
                </div>
                <div className={`ThirdPart ${this.state.showFifthPart.hidden}`}>
                    <FifthPart hideChanger={this.hideChanger}/>
                </div>
            </div>
        );
    }
}

export default App;