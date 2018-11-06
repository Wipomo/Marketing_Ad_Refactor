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
      baseline: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0
      },
      eco: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0
      },
      inter: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0
      },
      prem: {
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

  sendNewLeadEmail = () => {
    fetch(`https://makeitlow-makello-server.herokuapp.com/generate-email`, {
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

  sendSecondCustomerEmail = () => {
    fetch('https://makeitlow-makello-server.herokuapp.com/generate-client-email', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: `${this.state.clientProfile.email}`,
        bcc: "no-reply@makello.com",
        subject: `Hello from Makello!`,
        body: `Thank you for considering saving The Makello Way!
                A representative will be in touch with you soon to discussion how you can save up to ${"$" + this.state.chartData.savingsAmount} annually by using 100% Clean Energy!.
                In the meantime - feel free to visit us at our website www.makello.com`
      })
    })
  };

  createCustomerEmail = () => {
    fetch('https://makeitlow-makello-server.herokuapp.com/generate-client-email', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: `${this.state.clientProfile.email}`,
        bcc: "no-reply@makello.com",
        subject: `Hello from Makello!`,
        body: `Thank you for considering saving The Makello Way!
                A representative will be in touch with you soon to discussion how you can save up to ${"$" + this.state.chartData.savingsAmount} annually by using 100% Clean Energy!.
                In the meantime - feel free to visit us at our website www.makello.com`
      })
    })
  };

  // chart functionality with state
  getChartData = (monthlyBill) =>{
    //console.log("Comes in getChartData function in refactored app");
    var bill_input = monthlyBill;
    var annual_bill = bill_input * 12;
    var bucket;
    var savingsAmt = 0;
    var baselineData = [];
    var economyData = [];
    var intermediateData = [];
    var premiumData = [];

    let chartData = {};

    chartData = {
      savingsAmount: savingsAmt,
      installFee: 0,
      monthly_loan_pmt:0,
      baseline: {
        data: baselineData,
        payback: 0
      },
      eco: {
        data: economyData,
        payback: 0
      },
      inter: {
        data: intermediateData,
        payback: 0
      },
      prem: {
        data: premiumData,
        payback: 0
      }
    };

    if (annual_bill < 1000)
        bucket = 500;
    else
        bucket = Math.floor(annual_bill / 1000) * 1000;


    console.log("Bucket is: "+bucket);
    // get all data for 3 system types
    // get chart data, then set chartData state to automatically update
    // we do this by picking out certain columns to fill our chartData object,

    var url = "https://makeitlow-makello-server.herokuapp.com/get-chart-data/" + bucket + "/Baseline";
    fetch(url)
        .then((response) => {
            return response.text()
        })
        .then((response_in_text) => {
            return JSON.parse(response_in_text)
        })
        .then((data) => {
            //console.log("parsed JSON data");
            console.log(data);
            console.log("printing specified data values in baseline");
            console.log(data['bucket_rows'][0]);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr0']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr1']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr2']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr3']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr4']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr5']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr6']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr7']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr8']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr9']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr10']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr11']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr12']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr13']);
            chartData.baseline.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr14']);
            chartData.baseline.payback= 0;
            console.log(this.state.chartData.baseline);


            var chartDataTmp = {...this.state.chartData}
            chartDataTmp.baseline.data = chartData.baseline.data.map( element => Number(element))
            chartDataTmp.baseline.payback = chartData.baseline.payback;
            this.setState({chartData: chartDataTmp})

          })
        .catch(function (e) {
            console.warn("SHOULLD NEVER COME IN HERE!!!");
            console.log(e);
        })

        url = "https://makeitlow-makello-server.herokuapp.com/get-chart-data/" + bucket + "/Economy";
    fetch(url)
        .then((response) => {
            return response.text()
        })
        .then((response_in_text) => {
            return JSON.parse(response_in_text)
        })
        .then((data) => {
            //console.log("parsed JSON data");
            console.log(data);
            console.log("printing specified data values in economy");
            console.log(data['bucket_rows'][0]);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr0']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr1']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr2']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr3']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr4']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr5']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr6']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr7']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr8']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr9']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr10']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr11']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr12']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr13']);
            chartData.eco.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr14']);
            chartData.eco.payback= data['bucket_rows'][0]['avg_payback'];
            console.log(this.state.chartData.baseline);
            //console.log(chartData.eco.data);
            var chartDataTmp = {...this.state.chartData}
            chartDataTmp.eco.data = chartData.eco.data.map( element => Number(element))
            chartDataTmp.eco.payback = chartData.eco.payback;
            this.setState({chartData: chartDataTmp})            

          })
        .catch(function (e) {
            console.warn("SHOULLD NEVER COME IN HERE!!!");
            console.log(e);
        })

        url = "https://makeitlow-makello-server.herokuapp.com/get-chart-data/" + bucket + "/Intermediate";
    fetch(url)
        .then((response) => {
            return response.text()
        })
        .then((response_in_text) => {
            return JSON.parse(response_in_text)
        })
        .then((data) => {
            //console.log("parsed JSON data");
            console.log(data);
            console.log("printing specified data values in intermediate");
            console.log(data['bucket_rows'][0]);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr0']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr1']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr2']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr3']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr4']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr5']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr6']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr7']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr8']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr9']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr10']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr11']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr12']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr13']);
            chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr14']);
            chartData.inter.payback= data['bucket_rows'][0]['avg_payback'];

            //chartData.inter.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr14']);
            var chartDataTmp = {...this.state.chartData}
            chartDataTmp.inter.data = chartData.inter.data.map( element => Number(element))
            chartDataTmp.inter.payback = chartData.inter.payback;
            this.setState({chartData: chartDataTmp})

            console.log(this.state.chartData.baseline);
            //console.log(chartData.inter.data);
          })
        .catch(function (e) {
            console.warn("SHOULLD NEVER COME IN HERE!!!");
            console.log(e);
        })

        url = "https://makeitlow-makello-server.herokuapp.com/get-chart-data/" + bucket + "/Premium";
    fetch(url)
        .then((response) => {
            return response.text()
        })
        .then((response_in_text) => {
            return JSON.parse(response_in_text)
        })
        .then((data) => {
            //console.log("parsed JSON data:");
            console.log(data);
            console.log("printing specified data values in premium");
            console.log(data['bucket_rows'][0]);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr0']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr1']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr2']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr3']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr4']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr5']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr6']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr7']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr8']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr9']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr10']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr11']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr12']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr13']);
            chartData.prem.data.push(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr14']);
            chartData.installFee = -Number(data['bucket_rows'][0]['avg_system_cost_yr0']) - Number(data['bucket_rows'][0]['avg_incentive_yr1']);
            chartData.monthly_loan_pmt = data['bucket_rows'][0]['monthly_loan_payment'];
            chartData.savingsAmount = data['bucket_rows'][0]['you_save_100re'];
            chartData.prem.payback= data['bucket_rows'][0]['avg_payback'];



            var chartDataTmp = {...this.state.chartData}
            chartDataTmp.prem.data = chartData.prem.data.map( element => Number(element))
            chartDataTmp.installFee = chartData.installFee;
            chartDataTmp.installFee = chartData.installFee;
            chartDataTmp.monthly_loan_pmt = chartData.monthly_loan_pmt;
            chartDataTmp.savingsAmount = chartData.savingsAmount;
            chartDataTmp.prem.payback = chartData.prem.payback;
            this.setState({chartData: chartDataTmp})
          })
        .catch(function (e) {
            console.warn("SHOULLD NEVER COME IN HERE!!!");
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