import React from 'react';
import FirstPart from './FirstPart';
import SecondPart from './SecondPart';
import ThirdPart from './ThirdPart';
import ForthPart from './ForthPart';
import FifthPart from './FifthPart';

class App extends React.Component {

  state = {
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
      monthlyBill: 525,
      email: '',
      fullName: '',
      phone: '',
      address: '',
      dailyTrip: '',
      mpg: '',
      carYear: '',
      carMake: '',
      carModel: '',
      saveAmount: ''
    },
    chartData: {
      savingsAmount: 0,
      installFee: 0,
      monthly_loan_pmt:0,
      Baseline: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0
      },
      Economy: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0
      },
      Intermediate: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0
      },
      Premium: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0
      }
    },
    userId: 0,
    resolution: window.innerWidth
  };

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // handlers start

  handleWindowSizeChange = () => {
    this.setState({ resolution: window.innerWidth });
  };

  handleSlideChange = (event) => {
    let clientData = { ...this.state.clientProfile };
    this.setState({ clientProfile: clientData });
    this.getChartData(event);
  };

  hideChanger = (input) => {
    if (this.state[input].hidden === 'hidden') {
      this.setState({ showFirstPart: { hidden: 'hidden' } });
      this.setState({ showTooltip: { hidden: ' hidden' } });
      this.setState({ showSecondPart: { hidden: 'hidden' } });
      this.setState({ showThirdPart: { hidden: 'hidden' } });
      this.setState({ showForthPart: { hidden: 'hidden' } });
      this.setState({ showFifthPart: { hidden: 'hidden' } });
      this.setState({ [input]: { hidden: '' } });
    } else {
      this.setState({ [input]: { hidden: 'hidden' } });
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
    let clientProfile = { ...this.state.clientProfile };
    clientProfile.monthlyBill = Number(bill);
    clientProfile.email = email;
    this.setState({ clientProfile });
    this.postBillEmailData(bill, email);
  };

  clientInfoUpdater = (fullName, phone, address) => {
    let clientProfile = { ...this.state.clientProfile };
    clientProfile.fullName = fullName;
    clientProfile.phone = phone;
    clientProfile.address = address;
    clientProfile.saveAmount = this.state.chartData.savingsAmount;
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
    fetch("https://makeitlow-makello-server.herokuapp.com/customers/", {
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
    fetch(`https://makeitlow-makello-server.herokuapp.com/customers/${this.state.userId}`, {
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
    fetch(`https://makeitlow-makello-server.herokuapp.com/customers/${this.state.userId}`, {
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
    this.setState({ userId: data });
    this.sendNewLeadEmail();
  };
    // sendSecondCustomerEmail = () => {
  //   fetch('https://makeitlow-makello-server.herokuapp.com/generate-client-email', {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       to: `${this.state.clientProfile.email}`,
  //       bcc: "webdev@wipomo.com",
  //       subject: `Hello from Makello!`,
  //       body: `Thank you for considering saving The Makello Way!
  //               A representative will be in touch with you soon to discussion how you can save up to ${"$" + this.state.chartData.savingsAmount} annually by using 100% Clean Energy!.
  //               In the meantime - feel free to visit us at our website www.makello.com`
  //     })
  //   })
  // };

  sendNewLeadEmail = () => {
    fetch(`https://makeitlow-makello-server.herokuapp.com/generate-email`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: "sales@makello.com",
        cc: ["olasubomi.awokoya@hotmail.com", "charlieqjohnson@gmail.com"],
        bcc: "no-reply@makello.com",
        subject: `New Lead Generated - ${this.state.clientProfile.email}`,
        body: `A new lead had been added to the database.
                Database ID: ${this.state.userId}
                Email: ${this.state.clientProfile.email}`
      })
    })
  };

  createCustomerEmail = () => {
    console.log("customer email func: <\n>"+this.state.clientProfile.email+"<\n>");
    fetch('https://makeitlow-makello-server.herokuapp.com/generate-client-email', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: `${this.state.clientProfile.email}`,
        cc: ["olasubomi.awokoya@hotmail.com", "charlieqjohnson@gmail.com"],
        bcc: "no-reply@makello.com",
        subject: `Hello from Makello`,
        body:`Thank you for contacting Makello!

        A representative will be in touch with you soon to discuss how you can save up to ${"$" + Number(this.state.chartData.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} annually with 100% Clean Energy,
        with a Premium energy upgrade, for as low as ${"$" + Number(this.state.chartData.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}  or ${"$" + Number(this.state.chartData.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} /mo.*
        
        In the meantime - feel free to visit us at our website: http://makello.com
        `
      })
    })
  };

  // chart functionality with state
  getChartData = (monthlyBill) =>{
    //console.log("Comes in getChartData function in refactored app");
    var bill_input = monthlyBill;
    var annual_bill = bill_input * 12;
    var bucket;

    if (annual_bill < 1000)
        bucket = 500;
    else
        bucket = Math.floor(annual_bill / 1000) * 1000;

    // get all data for 3 system types
    // get chart data, then set chartData state to automatically update
    // we do this by picking out certain columns to fill our chartData object,

    this.setChartSeriesData(bucket, "Baseline");
    this.setChartSeriesData(bucket, "Economy");
    this.setChartSeriesData(bucket, "Intermediate");
    this.setChartSeriesData(bucket, "Premium");
  };

  setChartSeriesData(bucket, system_type){

    var series= {
      data: [],
      payback: 0,
      savingsAmount:0,
      installFee: 0,
      monthly_loan_pmt:0,
    };

    var url = "https://makeitlow-makello-server.herokuapp.com/get-chart-data/" + bucket + "/" +system_type;

    fetch(url)
        .then((response) => {
            return response.text()
        })
        .then((response_in_text) => {
            return JSON.parse(response_in_text)
        })
        .then((data) => {
            //console.log("parsed JSON data:");
            // console.log(data);
            // console.log("printing specified data values in premium");
            // console.log(data['bucket_rows'][0]);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr0']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr1']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr2']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr3']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr4']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr5']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr6']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr7']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr8']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr9']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr10']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr11']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr12']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr13']);
            series.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr14']);
            series.payback= data['bucket_rows'][0]['avg_payback'];

            var chartDataTmp = {...this.state.chartData}

            switch(system_type){
              case "Baseline":
                chartDataTmp.Baseline.data = series.data.map( element => Number(element))
                chartDataTmp.Baseline.payback = series.payback;
                break;
              case "Economy":
                chartDataTmp.Economy.data = series.data.map( element => Number(element))
                chartDataTmp.Economy.payback = series.payback;
                break;
              case "Intermediate":
                chartDataTmp.Intermediate.data = series.data.map( element => Number(element))
                chartDataTmp.Intermediate.payback = series.payback;
                break;
              case "Premium":
                series.savingsAmount = data['bucket_rows'][0]['you_save_100re'];
                series.installFee = -Number(data['bucket_rows'][0]['avg_system_cost_yr0']) - Number(data['bucket_rows'][0]['avg_incentive_yr1']);
                series.monthly_loan_pmt = data['bucket_rows'][0]['monthly_loan_payment'];

                chartDataTmp.Premium.data = series.data.map( element => Number(element))
                chartDataTmp.Premium.payback = series.payback;

                chartDataTmp.savingsAmount = series.savingsAmount;
                chartDataTmp.installFee = series.installFee;
                chartDataTmp.monthly_loan_pmt = series.monthly_loan_pmt;
                break;
              default:
                break;
            }
            this.setChartData(chartDataTmp);
          })
        .catch(function (e) {
          console.warn("Error: Caught a network/db connection error!");
          console.log(e);
        })
  };

  setChartData = (data) => {
    this.setState({ chartData: data });
  };

  render() {

    if (this.state.resolution <= 900) {
      var root = document.querySelector(':root');
      root.style.setProperty('--page-layout', '0% 100% 0%');
    }

    return (
      <div className="container responsive-container container-wrapper remove-pd15">
        <div className={`FirstPart ${this.state.showFirstPart.hidden}`}>
          <FirstPart
            billEmailUpdater={this.billEmailUpdater}
            hideChanger={this.hideChanger}
            showTooltip={this.state.showTooltip}
            monthlyBill={this.state.clientProfile.monthlyBill}
            emailValidator={this.emailValidator}
            handleSlideChange={this.handleSlideChange}
            getChartData={this.getChartData}
          />
        </div>
        <div className={`SecondPart ${this.state.showSecondPart.hidden}`}>
          <SecondPart
            monthlyBill={this.state.clientProfile.monthlyBill}
            fullName={this.state.clientProfile.fullName}
            address={this.state.clientProfile.address}
            clientInfoUpdater={this.clientInfoUpdater}
            hideChanger={this.hideChanger}
            createCustomerEmail={this.createCustomerEmail}
            getSaveAmount={this.getSaveAmount}
            chartData={this.state.chartData}
          />
        </div>
        <div className={`ThirdPart ${this.state.showThirdPart.hidden}`}>
          <ThirdPart hideChanger={this.hideChanger} />
        </div>
        <div className={`ThirdPart ${this.state.showThirdPart.hidden}`}>
          <ForthPart carInfoUpdater={this.carInfoUpdater} hideChanger={this.hideChanger} />
        </div>
        <div className={`ThirdPart ${this.state.showFifthPart.hidden}`}>
          <FifthPart hideChanger={this.hideChanger} />
        </div>
      </div>
    );
  }
}

export default App;