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
      Optimal:{
        system_type: 'Default',
        system_cost:999999,
        payback:999,
        savingsAmount: 0,
        installFee: 0,
        monthly_loan_pmt:0
      },
      Baseline: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      },
      Economy: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0,
        system_cost:0
      },
      Intermediate: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0,
        system_cost:0
      },
      Premium: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0,
        system_cost:0
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
    //console.log("Event is:\n"+ event);
    let clientData = { ...this.state.clientProfile };
    clientData.monthlyBill = event;
    //console.log("Client monthlyBill is:\n"+ typeof(clientData.monthlyBill)+" " +clientData.monthlyBill);

    this.setState({ clientProfile: clientData });
    //this.getChartData(event);
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
    clientProfile.monthlyBill = bill;
    clientProfile.email = email;
    this.setState({ clientProfile });
    this.postBillEmailData(bill, email);
  };

  clientInfoUpdater = (fullName, phone, address) => {
    let updatedClientProfile = { ...this.state.clientProfile };
    updatedClientProfile.fullName = fullName;
    updatedClientProfile.phone = phone;
    updatedClientProfile.address = address;
    updatedClientProfile.saveAmount = this.state.chartData.Optimal.savingsAmount;
    this.setState({ clientProfile: updatedClientProfile });
    this.putClientInfo(fullName, phone, address);
  };

  carInfoUpdater = (dailyTrip, mpg, year, make, model) => {
    let updateClientCarProfile = { ...this.state.clientProfile };
    updateClientCarProfile.dailyTrip = dailyTrip;
    updateClientCarProfile.mpg = mpg;
    updateClientCarProfile.carYear = year;
    updateClientCarProfile.carMake = make;
    updateClientCarProfile.carModel = model;
    console.log("Printing car states");
    console.log("dailyTrip is: "+typeof(updateClientCarProfile.dailyTrip) + " " + updateClientCarProfile.dailyTrip);
    console.log("mpg is: "+updateClientCarProfile.mpg);
    console.log("carYear is: "+updateClientCarProfile.carYear);
    console.log("carMake is: "+updateClientCarProfile.carMake);
    console.log("carModel is: "+updateClientCarProfile.carModel);

    this.setState({ clientProfile: updateClientCarProfile });

    console.log("checking states");
    console.log("dailyTrip is: "+this.state.clientProfile.dailyTrip);
    console.log("mpg is: "+this.state.clientProfile.mpg);
    console.log("carYear is: "+this.state.clientProfile.carYear);
    console.log("carMake is: "+this.state.clientProfile.carMake);
    console.log("carModel is: "+this.state.clientProfile.carModel);
    this.putCarInfo(dailyTrip, mpg, year, make, model);
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
        to: "sales@makello.com",
        bcc: "no-reply@makello.com",
        subject: `New Lead Generated - ${this.state.clientProfile.email}`,
        body: `A new lead had been added to the database.
                Database ID: ${this.state.userId}
                Email: ${this.state.clientProfile.email}`
      })
    })
  };

  createCustomerEmail = () => {
    //console.log("customer email func: <\n>"+this.state.clientProfile.email+"<\n>");
    fetch('https://makeitlow-makello-server.herokuapp.com/generate-client-email', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: `${this.state.clientProfile.email}`,
        bcc: "sales@makello.com",
        subject: `Hello from Makello`,
        body:`Thank you for contacting Makello!
        
A representative will be in touch with you soon to discuss how you can save up to ${"$" + Number(this.state.chartData.Optimal.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} annually with 100% Clean Energy, with a Premium* energy upgrade, for as low as ${"$" + Number(this.state.chartData.Optimal.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} or ${"$" + Number(this.state.chartData.Optimal.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/month**.
        
For more information, visit http://makello.com


*Includes highest quality: LG 335 watt - 400 watt solar panels, SolarEdge, SMA or Enphase IQ7 inverter(s), balance of system and installation.
**After 30% Federal Income Tax Credit, and if loan, applied as downpayment for 12 Yr Loan @ 5.49% APR. Actual APR based on credit
- - - - - - - - - - - - - - - 
[https://makeitlow-makello-refactor.herokuapp.com/]
Monthly Electric Bill: ${Number(this.state.clientProfile.monthlyBill).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
Email: ${this.state.clientProfile.email}
Full Name: ${this.state.clientProfile.fullName}
Phone: ${this.state.clientProfile.phone}
Address: ${this.state.clientProfile.address} 
Daily Average Commute (miles): ${this.state.clientProfile.dailyTrip}
MPG Average: ${this.state.clientProfile.mpg}
Plug-In Vehicle Type: ${this.state.clientProfile.carYear} ${this.state.clientProfile.carMake}, ${this.state.clientProfile.carModel}
        `
      })
    })
  };

  // chart functionality with state
  getChartData = (monthlyBill) =>{
    //console.log("Comes in gehandleSlideChangetChartData function in refactored app");
    var bill_input = Number(monthlyBill);
    console.log("Monthly Bill type is : "+typeof(monthlyBill) +" Bill is: "+ typeof(bill_input));
    var annual_bill = bill_input * 12;
    var bucket = 500;
    console.log("Monthly bill is: "+monthlyBill+" and Bucket is defaultly: "+bucket);

    if (annual_bill < 1000)
        bucket = 500;
    else
        bucket = Math.floor(annual_bill / 1000) * 1000;

    // get all data for 3 system types
    // get chart data, then set chartData state to automatically update
    // we do this by picking out certain columns to fill our chartData object,
    console.log("Monthly bill is: "+monthlyBill+" and Bucket is: "+bucket);

    this.setChartSeriesData(bucket, "Baseline");
    this.setChartSeriesData(bucket, "Economy");
    this.setChartSeriesData(bucket, "Intermediate");
    this.setChartSeriesData(bucket, "Premium");
  };


  setChartSeriesData(bucket, system_type){

    var series= {
      system_type: system_type,
      data: [],
      payback: 0,
      savingsAmount:0,
      installFee: 0,
      monthly_loan_pmt:0,
      system_cost: 0
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

            // get chart Data
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
          
            // get data for display on Second Part
            series.system_cost = Number(data['bucket_rows'][0]['avg_cumulative_cash_flow_yr0']);
            series.payback= Number(data['bucket_rows'][0]['avg_payback']);

            series.savingsAmount = Number(data['bucket_rows'][0]['you_save_100re']);
            series.installFee = -Number(data['bucket_rows'][0]['avg_system_cost_yr0']) - Number(data['bucket_rows'][0]['avg_incentive_yr1']);
            series.monthly_loan_pmt = Number(data['bucket_rows'][0]['monthly_loan_payment']);

            var chartDataTmp = {...this.state.chartData};

            switch(system_type){
              case "Baseline":
                chartDataTmp.Baseline.data = series.data.map( element => Number(element))
                chartDataTmp.Baseline.payback = series.payback;
                break;
              case "Economy":
                chartDataTmp.Economy.data = series.data.map( element => Number(element))
                chartDataTmp.Economy.payback = series.payback;
                this.checkOptimalDisplayValues(series, chartDataTmp);
                break;
              case "Intermediate":
                chartDataTmp.Intermediate.data = series.data.map( element => Number(element))
                chartDataTmp.Intermediate.payback = series.payback;
                this.checkOptimalDisplayValues(series, chartDataTmp);
                break;
              case "Premium":
                chartDataTmp.Premium.data = series.data.map( element => Number(element))
                chartDataTmp.Premium.payback = series.payback;
                this.checkOptimalDisplayValues(series, chartDataTmp);

                break;
              default:
                break;
            }
            // set optimum data to be displayed
            this.setChartData(chartDataTmp);
          })
        .catch(function (e) {
          console.warn("Error: Caught a network/db connection error!");
          console.log(e);
        })
  };

  checkOptimalDisplayValues(series, chartDataTmp){
    console.log("checking if "+ series.system_type+ " payback of "+ series.payback+
    " is less than "+ this.state.chartData.Optimal.system_type +" of "+ this.state.chartData.Optimal.payback);
    if(series.payback < this.state.chartData.Optimal.payback ||
      (series.payback === this.state.chartData.Optimal.payback &&
        series.system_cost < this.state.chartData.Optimal.system_cost)){
          this.setOptimalDisplayValues(series, chartDataTmp);
          console.log("Answer is true, replacing..")
        }
    else{
      console.log("Answer is false, not replacing..")

    }
    
  };

  setOptimalDisplayValues(series, chartDataTmp){
    // console.log("In setting optimal func");
    // console.log("system savings amount: "+ series.savingsAmount);
    // console.log("system type: "+ series.system_type);
    // console.log(" monthly_loan_pmt: "+ series.monthly_loan_pmt);

    chartDataTmp.Optimal.system_type = series.system_type;
    chartDataTmp.Optimal.system_cost = series.system_cost;
    chartDataTmp.Optimal.payback = series.payback;
    chartDataTmp.Optimal.savingsAmount= series.savingsAmount;
    chartDataTmp.Optimal.installFee = series.installFee;
    chartDataTmp.Optimal.monthly_loan_pmt= series.monthly_loan_pmt;
    this.setChartData(chartDataTmp);
    // console.log("Checking chart data");
    // console.log("system savings amount: "+ this.state.chartData.Optimal.savingsAmount);
    // console.log("system type: "+ this.state.chartData.Optimal.system_type);
    // console.log(" monthly_loan_pmt: "+ this.state.chartData.Optimal.monthly_loan_pmt);
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
            chartData={this.state.chartData}
          />
        </div>
        <div className={`ThirdPart ${this.state.showThirdPart.hidden}`}>
          <ThirdPart hideChanger={this.hideChanger} />
        </div>
        <div className={`ThirdPart ${this.state.showThirdPart.hidden}`}>
          <ForthPart carInfoUpdater={this.carInfoUpdater} hideChanger={this.hideChanger} 
          createCustomerEmail={this.createCustomerEmail}/>
        </div>
        <div className={`ThirdPart ${this.state.showFifthPart.hidden}`}>
          <FifthPart hideChanger={this.hideChanger} />
        </div>
      </div>
    );
  }
}

export default App;