import React from 'react';
import FirstPart from './FirstPart';
import SecondPart from './SecondPart';
import ThirdPart from './ThirdPart';
import Radio from './Radio';

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
            address: ''
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
                    <Radio/>
                </div>
                <div className={`SecondPart ${this.state.showSecondPart.hidden}`}>
                    <SecondPart restOfFormUpdater={this.restOfFormUpdater} hideChanger={this.hideChanger}/>
                </div>
                <div className={`ThirdPart ${this.state.showThirdPart.hidden}`}>
                    <ThirdPart hideChanger={this.hideChanger}/>
                </div>
            </div>
        );
    }
}

export default App;