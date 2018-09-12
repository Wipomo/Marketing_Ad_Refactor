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
        showTooltip: {
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
            monthlyBill: '2500',
            email: '',
            fullName: '',
            phone: '',
            address: '',
            dailyTrip: '',
            mpg: '',
            carYear: '',
            carMake: '',
            carModel: ''
        },
        userId: 0
    };


    hideChanger = (input) => {
        if (this.state[input].hidden === 'hidden') {
            this.setState({showFirstPart: {hidden: 'hidden'}});
            this.setState({showTooltip: {hidden: ' hidden'}});
            this.setState({showSecondPart: {hidden: 'hidden'}});
            this.setState({showThirdPart: {hidden: 'hidden'}});
            this.setState({showForthPart: {hidden: 'hidden'}});
            this.setState({showFifthPart: {hidden: 'hidden'}});
            this.setState({[input]: {hidden: ''}});
        } else {
            this.setState({[input]: {hidden: 'hidden'}});
        }
    };

    emailValidator = (email) => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                console.log("Email valid");
                return true;
            } else {
                console.log("Invalid Email");
                return false;
            }
    };

    billEmailUpdater = (bill, email) => {
        let clientProfile = { ...this.state.clientProfile};
        console.table(clientProfile);
        console.log(bill);
        clientProfile.monthlyBill = bill;
        clientProfile.email = email;
        this.setState({ clientProfile });
        this.postBillEmailData(bill, email);
    };

    clientInfoUpdater = (fullName, phone, address) => {
        let clientProfile = { ...this.state.clientProfile };
        clientProfile.fullName = fullName;
        clientProfile.phone = phone;
        clientProfile.address = address;
        this.setState({ clientProfile });
        this.putClientInfo(fullName, phone, address);
    };

    carInfoUpdater = (dailyTrip, mpg, year, make, model) => {
        let clientProfile = { ...this.state.clientProfile };
        clientProfile.dailyTrip = dailyTrip;
        clientProfile.mpg = mpg;
        clientProfile.carYear = year;
        clientProfile.carMake = make;
        clientProfile.carModel = model;
        this.setState({ clientProfile });
        this.putCarInfo(dailyTrip, mpg, year, make, model)
    };

    postBillEmailData = (bill, email) => {
        fetch("https://makeitlow-makello-refactor.herokuapp.com/customers/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                monthlyBill: bill,
                email: email
            })
        })
            .then(response => response.json())
            .then(resData => {
                console.log(resData);
                this.setUserId(resData.customer.id);
            })
    };

    putClientInfo = (fullName, phone, address) => {
        fetch(`https://makeitlow-makello-refactor.herokuapp.com/customers/${this.state.userId}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName: fullName,
                phone: phone,
                address: address
            })
        })
            .then(response => response.json())
            .then(resData => console.log(resData))
    };

    putCarInfo = (dailyTrip, mpg, year, make, model) => {
        fetch(`https://makeitlow-makello-refactor.herokuapp.com/customers/${this.state.userId}`,{
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dailyTrip: dailyTrip,
                mpg: mpg,
                year: year,
                make: make,
                model: model
            })
        })
            .then(response => response.json())
            .then(resData => console.log(resData))
    };

    setUserId = (data) => {
        this.setState({userId: data});
        this.sendNewLeadEmail();
    };

    sendNewLeadEmail = () => {
        fetch(`https://makeitlow-makello-refactor.herokuapp.com/generate-email`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: "info@makello.com",
                bcc: "ellie.lader@wipomo.com",
                subject: `New Lead Generated - ${this.state.clientProfile.email}`,
                body: `A new lead had been added to the database.
                Database ID: ${this.state.userId}
                Email: ${this.state.clientProfile.email}`
            })
        })
    };

    render () {
        return(
            <div>
                <div className={`FirstPart ${this.state.showFirstPart.hidden}`}>
                    <FirstPart
                        billEmailUpdater={this.billEmailUpdater}
                        hideChanger={this.hideChanger}
                        showTooltip={this.state.showTooltip}
                        monthlyBill={this.state.clientProfile.monthlyBill}
                        emailValidator={this.emailValidator}
                    />
                </div>
                <div className={`SecondPart ${this.state.showSecondPart.hidden}`}>
                    <SecondPart
                        monthlyBill={this.state.clientProfile.monthlyBill}
                        clientInfoUpdater={this.clientInfoUpdater}
                        hideChanger={this.hideChanger}/>
                </div>
                <div className={`ThirdPart ${this.state.showThirdPart.hidden}`}>
                    <ThirdPart hideChanger={this.hideChanger}/>
                </div>
                <div className={`ThirdPart ${this.state.showForthPart.hidden}`}>
                    <ForthPart carInfoUpdater={this.carInfoUpdater} hideChanger={this.hideChanger}/>
                </div>
                <div className={`ThirdPart ${this.state.showFifthPart.hidden}`}>
                    <FifthPart hideChanger={this.hideChanger}/>
                </div>
            </div>
        );
    }
}

export default App;