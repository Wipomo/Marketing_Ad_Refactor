import React from 'react';
import FirstPart from './FirstPart';
import SecondPart from './SecondPart';
import ThirdPart from './ThirdPart';
import ForthPart from './ForthPart';
import FifthPart from './FifthPart';
import FooterComponent from './FooterComponent';
 



class App extends React.Component {
facebook_campaign="TOF HD2";
nexom_req_id=0;
leadPhoneVerified = false;
myReferer="Direct Access, No Referrer";
constructor(props){
  super(props);

  this.state = {
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
      hidden: ''
    },
    clientProfile: {
      test: false,
      monthlyBill: 525,
      email: 'N/A',
      fullName: '',
      phone: 'N/A',
      address: '',
      dailyTrip: '',
      mpg: '',
      carYear: '',
      carMake: '',
      carModel: '',
      saveAmount: '',
      selectedSystem: {
        selectsSystem: false,
        system_type:'',
        savingsAmount:'',
        installFee:'',
        monthly_loan_payment: '',
        cashorloan: ''
      }
    },
    chartData: {
      Optimal:{
        system_type: 'Default',
        system_cost:999999,
        payback:999,
        loan_payback: 99,
        savingsAmount: 0,
        installFee: 0,
        monthly_loan_pmt:0,
        cashorloan: ''
      },
      Baseline: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        loanData : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        visible: true
      },
      Economy: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0,
        loanData : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        loan_payback:0,
        system_cost:0,
        visible: false,
        savingsAmount: 0,
        installFee: 0,
        monthly_loan_pmt:0
      },
      Compact: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0,
        loanData : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        loan_payback:0,
        system_cost:0,
        visible: false,
        savingsAmount: 0,
        installFee: 0,
        monthly_loan_pmt:0
      },
      Intermediate: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0,
        loanData : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        loan_payback:0,
        system_cost:0,
        visible: false,
        savingsAmount: 0,
        installFee: 0,
        monthly_loan_pmt:0
      },
      Standard: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0,
        loanData : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        loan_payback:0,
        system_cost:0,
        visible: false,
        savingsAmount: 0,
        installFee: 0,
        monthly_loan_pmt:0
      },
      Premium: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0,
        loanData : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        loan_payback:0,
        system_cost:0,
        visible: false,
        savingsAmount: 0,
        installFee: 0,
        monthly_loan_pmt:0
      },
      Selected_EVPV: {
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        payback: 0,
        loanData : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        loan_payback:0,
        system_cost:0,
        visible: false,
        savingsAmount: 0,
        installFee: 0,
        monthly_loan_pmt:0
      },
    },
    userId: 0,
    resolution: window.innerWidth,
    lightboxIsOpen: false,
  };

  //this.setNexomId = this.setNexomId.bind(this);

}
  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  };

  componentDidMount(){
    var campaign_source = "";
    if(window.location.href.indexOf("utm_campaign") > -1){
      campaign_source = this.getUrlVars()["utm_campaign"];
    }
    if(campaign_source !== undefined && campaign_source !== ""){
      this.facebook_campaign = campaign_source;
    }
    console.log(this.facebook_campaign);
    this.getChartData(525);
  }

  getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
  }  

  // handlers start
  handleWindowSizeChange = () => {
    this.setState({ resolution: window.innerWidth });
  };

  handleSlideChange = (event) => {
    //console.log("Event is:\n"+ event);
    let clientData = { ...this.state.clientProfile };
    console.log("Setting monthlybill state to: "+ event);
    clientData.monthlyBill = event;
    //console.log("Client monthlyBill is:\n"+ typeof(clientData.monthlyBill)+" " +clientData.monthlyBill);
    this.setState({ clientProfile: clientData });
  };

  hideChanger = (input) => {
    if (this.state[input].hidden === 'hidden') {
      this.setState({ showFirstPart: { hidden: 'hidden' } });
      this.setState({ showTooltip: { hidden: ' hidden' } });
      this.setState({ showSecondPart: { hidden: 'hidden' } });
      this.setState({ showThirdPart: { hidden: '' } });
      this.setState({ showForthPart: { hidden: 'hidden' } });
      this.setState({ showFifthPart: { hidden: '' } });
      this.setState({ [input]: { hidden: '' } });
    } else {
      this.setState({ [input]: { hidden: 'hidden' } });
    }
  };

  showAllParts = () => {
    console.log("Coming in here to update page display views");
    this.setState({ showFirstPart: { hidden: '' } });
    this.setState({ showTooltip: { hidden: '' } });
    this.setState({ showSecondPart: { hidden: '' } });
    this.setState({ showThirdPart: { hidden: 'hidden' } });
    this.setState({ showForthPart: { hidden: 'hidden' } });
    this.setState({ showFifthPart: { hidden: '' } });
  }
  

  billandEmailorPhoneUpdater = (bill, email, phone, test) => {
    let clientProfile = { ...this.state.clientProfile };
    clientProfile.monthlyBill = bill;
    clientProfile.email = email;
    clientProfile.phone = phone;
    console.log("Test user is :"+test);
    clientProfile.test = test;
    this.setState({ clientProfile });
    this.postBillandEmailorPhoneData(bill, email , phone, Date(Date.now()).toString());
  };

  clientInfoUpdater = (fullName, phone, email, address, system_selected, paymentType ) => {
    let updatedInput = this.checkStringLengths([fullName, phone, email, address]);
    //console.log("Returned client info is: "+updatedInput[0]+ ", "+ updatedInput[1]+ " and "+ updatedInput[2]);
    //console.log(updatedInput);
    fullName=updatedInput[0];
    phone=updatedInput[1];
    email=updatedInput[2];
    address=updatedInput[3];
    
    let clientProfile = { ...this.state.clientProfile };
    clientProfile.fullName = fullName;
    clientProfile.phone = phone;
    clientProfile.email = email;
    clientProfile.address = address;
    clientProfile.saveAmount = this.state.chartData.Optimal.savingsAmount;
    clientProfile.selectedSystem.system_type = system_selected;
    clientProfile.selectedSystem.cashorloan = paymentType;
    var customer_selects_preffered_system = true;


    switch(system_selected){
      case("Optimal"):
        clientProfile.selectedSystem.savingsAmount = this.state.chartData.Optimal.savingsAmount;
        clientProfile.selectedSystem.installFee = this.state.chartData.Optimal.installFee;
        clientProfile.selectedSystem.monthly_loan_payment = this.state.chartData.Optimal.monthly_loan_pmt;
        customer_selects_preffered_system = false;
        break;
      case("Economy"):
        clientProfile.selectedSystem.savingsAmount = this.state.chartData.Economy.savingsAmount;
        clientProfile.selectedSystem.installFee = this.state.chartData.Economy.installFee;
        clientProfile.selectedSystem.monthly_loan_payment = this.state.chartData.Economy.monthly_loan_pmt;
        break;
      case("Compact"):
        clientProfile.selectedSystem.savingsAmount = this.state.chartData.Compact.savingsAmount;
        clientProfile.selectedSystem.installFee = this.state.chartData.Compact.installFee;
        clientProfile.selectedSystem.monthly_loan_payment = this.state.chartData.Compact.monthly_loan_pmt;
        break;
      case("Intermediate"):
        clientProfile.selectedSystem.savingsAmount = this.state.chartData.Intermediate.savingsAmount;
        clientProfile.selectedSystem.installFee = this.state.chartData.Intermediate.installFee;
        clientProfile.selectedSystem.monthly_loan_payment = this.state.chartData.Intermediate.monthly_loan_pmt;
          break;
      case("Standard"):
        clientProfile.selectedSystem.savingsAmount = this.state.chartData.Standard.savingsAmount;
        clientProfile.selectedSystem.installFee = this.state.chartData.Standard.installFee;
        clientProfile.selectedSystem.monthly_loan_payment = this.state.chartData.Standard.monthly_loan_pmt;
        break;
      case("Premium"):
        clientProfile.selectedSystem.savingsAmount = this.state.chartData.Premium.savingsAmount;
        clientProfile.selectedSystem.installFee = this.state.chartData.Premium.installFee;
        clientProfile.selectedSystem.monthly_loan_payment = this.state.chartData.Premium.monthly_loan_pmt;
        break;
      default:
        break;
    }
    // set boolean of wether customer selects system to send custom email
    console.log("Customer selects preferred system: ");
    console.log(customer_selects_preffered_system);
    clientProfile.selectedSystem.selectsSystem = customer_selects_preffered_system;
    this.setState({ clientProfile });
    this.putClientInfo(fullName, phone, email, address, system_selected, paymentType);
    this.createFirstCustomerEmail(fullName, phone, email, address, customer_selects_preffered_system);
  };

  carInfoUpdater = (dailyTrip, mpg, year, make, model) => {
    let updatedInput = this.checkStringLengths([dailyTrip,mpg]);
    dailyTrip=updatedInput[0];
    mpg=updatedInput[1];
    
    let clientProfile = { ...this.state.clientProfile };
    clientProfile.dailyTrip = dailyTrip;
    clientProfile.mpg = mpg;
    clientProfile.carYear = year;
    clientProfile.carMake = make;
    clientProfile.carModel = model;

    this.setState({ clientProfile });
    this.putCarInfo(dailyTrip, mpg, year, make, model);
    this.createCustomerEmail(dailyTrip, mpg, year,make,model, this.state.clientProfile.selectedSystem.selectsSystem);
  };

  checkStringLengths = (list)=>{
    let input;
    var newList =[]
    for (input in list){
      var newInput = list[input];
      if(typeof(newInput)=== "string" && newInput.length > 200){
        var changedString = newInput.slice(0,200);
        newList.push(changedString);
        // console.log("input is a "+typeof(newInput));
        // console.log("newInput is changed to "+ newInput);
      }
      else{
        // console.log(newInput.length);
        // console.log("type of newvar input is "+typeof(newInput));
        newList.push(newInput);
        //console.log("newInput is"+ newInput);

      }
    }
    return newList;
  }

  postBillandEmailorPhoneData = (bill, email, phone, time) => {
    //var myReferer="Direct Access, No Referrer";

    if (document.referrer) {
      console.log("Confirming refferer");
      this.myReferer = document.referrer;
      console.log(this.myReferer);
    }

    fetch("https://makeitlow-makello-server.herokuapp.com/customers/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        monthlyBill: bill,
        email: email,
        phone: phone,
        time: time,
        trafficSource: this.myReferer,
        campaignSource: this.facebook_campaign
      })
    })
      .then(response => response.json())
      .then(resData => {
        console.log(resData);
        this.setUserId(resData.customer.id);
      })
  };

  putClientInfo = (fullName, phone, email, address, selectedSystem, paymentType) => {
    fetch(`https://makeitlow-makello-server.herokuapp.com/customers/${this.state.userId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
        selectedSystem: selectedSystem,
        paymentType: paymentType,
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
    var emailSubject = ``;

    //console.log("Approved of work email is: "+ this.state.clientProfile.test);
    if(this.state.clientProfile.test || this.myReferer === "http://localhost:3000/"|| this.myReferer === "http://localhost:5000/" ){
      emailSubject = `Test of Lead Email Generated - ${this.state.clientProfile.email}`;
     }
     else{
      emailSubject = `New Lead Generated - ${this.state.clientProfile.email}`;
     }
     //console.log("Email subject is: "+ emailSubject);
    fetch(`https://makeitlow-makello-server.herokuapp.com/generate-email`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: "sales@makello.com",
        bcc: "no-reply@makello.com",
        subject: emailSubject,
        body: `A new lead has been added to the database.
Monthly Bill: ${Number(this.state.clientProfile.monthlyBill).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
Email: ${this.state.clientProfile.email}
Phone: ${this.state.clientProfile.phone}
Database ID: ${this.state.userId}

Your monthly electric bill, matched with 100’s of our customer case studies, averages ${Number(this.state.chartData.Optimal.payback).toLocaleString(navigator.language, { maximumSignificantDigits: 2 })} year simple payback for cash purchase, or ${Number(this.state.chartData.Optimal.loan_payback).toLocaleString(navigator.language, { maximumSignificantDigits: 3 })} year simple payback for loan. 

You Can Save $${Number(this.state.chartData.Optimal.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Annually with 100% Clean Energy.
 
We selected the optimal ${this.state.chartData.Optimal.system_type} energy upgrade package for you!

$${Number(this.state.chartData.Optimal.installFee).toLocaleString(navigator.language, { maximumFractionDigits: 0 })} or $${Number(this.state.chartData.Optimal.monthly_loan_pmt).toLocaleString(navigator.language, { maximumFractionDigits: 0 })}/month*
Source: ${this.myReferer}
Campaign: GEEPC ${this.facebook_campaign}`
      })
    })
  };

  createFirstCustomerEmail = (fullName, phone, email, address, customerSelectsSystem) => {
    //console.log("customer email func: <\n>"+this.state.clientProfile.email+"<\n>");
    var emailSubject = ``;
    if(this.state.clientProfile.test || this.myReferer === "http://localhost:3000/"|| this.myReferer === "http://localhost:5000/" ){
      emailSubject = `Test of First Customer Email- Hello from Makello`;
    }
    else{
      emailSubject = `Hello from Makello`;
    }

    var emailBody = '';
    if(customerSelectsSystem){
      emailBody = `Thank you for contacting Makello!
      
A representative will be in touch with you soon to discuss how you can save up to ${"$" + Number(this.state.clientProfile.selectedSystem.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} annually with 100% Clean Energy.

You selected the ${this.state.clientProfile.selectedSystem.system_type}* energy upgrade, for as low as ${"$" + Number(this.state.clientProfile.selectedSystem.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} or ${"$" + Number(this.state.clientProfile.selectedSystem.monthly_loan_payment).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/month**.

For more information, visit https://makello.com


*Includes highest quality: LG 335 watt - 400 watt solar panels, SolarEdge, SMA or Enphase IQ7 inverter(s), balance of system and installation.
**After 30% Federal Income Tax Credit, and if loan, applied as downpayment for 12 Yr Loan @ 5.49% APR. Actual APR based on credit
- - - - - - - - - - - - - - - 
[https://makeitlow-makello.herokuapp.com/]
Monthly Electric Bill: ${Number(this.state.clientProfile.monthlyBill).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
Full Name: ${fullName}
Phone: ${phone}
Email: ${email}
Address: ${address}
Package Selection: ${this.state.clientProfile.selectedSystem.system_type}
Payment Type: ${this.state.clientProfile.selectedSystem.cashorloan}
Daily Average Commute (miles): N/A
MPG Average: N/A
Plug-In Vehicle Type: N/A

-----------------------------
Optimal: ${this.state.chartData.Optimal.system_type} ${this.state.chartData.Optimal.cashorloan}
Payment type: ${this.state.chartData.Optimal.cashorloan}
Source: ${this.myReferer}
`
    }
    else{
      emailBody= `Thank you for contacting Makello!

A representative will be in touch with you soon to discuss how you can save up to ${"$" + Number(this.state.clientProfile.selectedSystem.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} annually with 100% Clean Energy.

We selected the optimal ${this.state.chartData.Optimal.system_type}* energy upgrade for you, for as low as ${"$" + Number(this.state.clientProfile.selectedSystem.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} or ${"$" + Number(this.state.clientProfile.selectedSystem.monthly_loan_payment).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/month**.

For more information, visit https://makello.com


*Includes highest quality: LG 335 watt - 400 watt solar panels, SolarEdge, SMA or Enphase IQ7 inverter(s), balance of system and installation.
**After 30% Federal Income Tax Credit, and if loan, applied as downpayment for 12 Yr Loan @ 5.49% APR. Actual APR based on credit
- - - - - - - - - - - - - - - 
[https://makeitlow-makello.herokuapp.com/]
Monthly Electric Bill: ${Number(this.state.clientProfile.monthlyBill).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
Full Name: ${fullName}
Phone: ${phone}
Email: ${email}
Address: ${address}
Package Selection: ${this.state.clientProfile.selectedSystem.system_type}
Payment Type: ${this.state.clientProfile.selectedSystem.cashorloan}
Daily Average Commute (miles): N/A
MPG Average: N/A
Plug-In Vehicle Type: N/A

-----------------------------
Optimal: ${this.state.chartData.Optimal.system_type} ${this.state.chartData.Optimal.cashorloan}
Source: ${this.myReferer}
  `
    }

    fetch('https://makeitlow-makello-server.herokuapp.com/generate-client-email', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: `${this.state.clientProfile.email}`,
        bcc: "sales@makello.com",
        subject: emailSubject,
        body: emailBody
      })
    })
  };

createCustomerEmail = (dailyTrip,mpg, year, make, model, customerSelectsSystem ) => {
  //console.log("customer email func: <\n>"+this.state.clientProfile.email+"<\n>");
  var emailSubject = ``;
  if(this.state.clientProfile.test || this.myReferer === "http://localhost:3000/"|| this.myReferer === "http://localhost:5000/" ){
      emailSubject = `Test of Final Customer Email- Hello from Makello`;
    }
    else{
      emailSubject = `Hello from Makello`;
    }

    var emailBody = '';
    if(customerSelectsSystem){
      emailBody = `Thank you for contacting Makello!
      
A representative will be in touch with you soon to discuss how you can save up to ${"$" + Number(this.state.clientProfile.selectedSystem.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} annually with 100% Clean Energy.

You selected the ${this.state.clientProfile.selectedSystem.system_type}* energy upgrade, for as low as ${"$" + Number(this.state.clientProfile.selectedSystem.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} or ${"$" + Number(this.state.clientProfile.selectedSystem.monthly_loan_payment).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/month**.

For more information, visit https://makello.com


*Includes highest quality: LG 335 watt - 400 watt solar panels, SolarEdge, SMA or Enphase IQ7 inverter(s), balance of system and installation.
**After 30% Federal Income Tax Credit, and if loan, applied as downpayment for 12 Yr Loan @ 5.49% APR. Actual APR based on credit
- - - - - - - - - - - - - - - 
[https://makeitlow-makello.herokuapp.com/]
Monthly Electric Bill: ${Number(this.state.clientProfile.monthlyBill).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
Email: ${this.state.clientProfile.email}
Full Name: ${this.state.clientProfile.fullName}
Phone: ${this.state.clientProfile.phone}
Address: ${this.state.clientProfile.address}
Package Selection: ${this.state.clientProfile.selectedSystem.system_type}
Payment Type: ${this.state.clientProfile.selectedSystem.cashorloan}
Daily Average Commute (miles): ${dailyTrip}
MPG Average: ${mpg}
Plug-In Vehicle Type: ${year} ${make}, ${model}

-----------------------------
Optimal: ${this.state.chartData.Optimal.system_type} ${this.state.chartData.Optimal.cashorloan}
Source: ${this.myReferer}
  `
    }
    else{
      emailBody= `Thank you for contacting Makello!
        
A representative will be in touch with you soon to discuss how you can save up to ${"$" + Number(this.state.clientProfile.selectedSystem.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} annually with 100% Clean Energy.
  
We selected the optimal ${this.state.chartData.Optimal.system_type}* energy upgrade for you, for as low as ${"$" + Number(this.state.clientProfile.selectedSystem.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} or ${"$" + Number(this.state.clientProfile.selectedSystem.monthly_loan_payment).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/month**.
  
For more information, visit https://makello.com
  
  
*Includes highest quality: LG 335 watt - 400 watt solar panels, SolarEdge, SMA or Enphase IQ7 inverter(s), balance of system and installation.
**After 30% Federal Income Tax Credit, and if loan, applied as downpayment for 12 Yr Loan @ 5.49% APR. Actual APR based on credit
- - - - - - - - - - - - - - - 
[https://makeitlow-makello.herokuapp.com/]
Monthly Electric Bill: ${Number(this.state.clientProfile.monthlyBill).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
Email: ${this.state.clientProfile.email}
Full Name: ${this.state.clientProfile.fullName}
Phone: ${this.state.clientProfile.phone}
Address: ${this.state.clientProfile.address}
Package Selection: ${this.state.clientProfile.selectedSystem.system_type}
Payment Type: ${this.state.clientProfile.selectedSystem.cashorloan}
Daily Average Commute (miles): ${dailyTrip}
MPG Average: ${mpg}
Plug-In Vehicle Type: ${year} ${make}, ${model}

-----------------------------
Optimal: ${this.state.chartData.Optimal.system_type} ${this.state.chartData.Optimal.cashorloan}
Source: ${this.myReferer}
  `
    }
  fetch('https://makeitlow-makello-server.herokuapp.com/generate-client-email', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: `${this.state.clientProfile.email}`,
      bcc: "sales@makello.com",
      subject: emailSubject,
      body:emailBody
    })
  })
};

  // chart functionality with state
  getChartData = (monthlyBill) =>{
    // Clear Optimal Data first
    this.resetOptimalSystem();
    //console.log("Comes in gehandleSlideChangetChartData function in refactored app");
    var bill_input = Number(monthlyBill);
    //console.log("Monthly Bill type is : "+typeof(monthlyBill) +" Bill is: "+ typeof(bill_input));
    var annual_bill = bill_input * 12;
    var bucket = 500;
    //console.log("Monthly bill is: "+monthlyBill+" and Bucket is defaultly: "+bucket);

    if (annual_bill < 1000)
        bucket = 500;
    else
        bucket = Math.floor(annual_bill / 1000) * 1000;

    // get all data for 3 system types
    // get chart data, then set chartData state to automatically update
    // we do this by picking out certain columns to fill our chartData object,
    console.log("Monthly bill is: "+monthlyBill+" and Bucket is: "+bucket);

    this.setChartSeriesData(bucket);

  };


  setChartSeriesData(bucket){

    var url = "https://makeitlow-makello-server.herokuapp.com/get-chart-data/" + bucket;

    fetch(url)
        .then((response) => {
            return response.text()
        })
        .then((response_in_text) => {
            return JSON.parse(response_in_text)
        })
        .then((data) => {
          var chartDataTmp = {...this.state.chartData};
          var row;

          // iterate through all system type rows returned from specific bucket
          for (row = 0; row<7; row++){
            var series= {
              system_type:"",
              bucket: bucket,
              data: [],
              loanData: [],
              payback: 0,
              loan_payback:0,
              savingsAmount:0,
              installFee: 0,
              monthly_loan_pmt:0,
              system_cost: 0
            };

            series.system_type = data['rows'][row]['system_type'];
             var j;
            for( j = 0 ; j <= 29; j++){
              var indexed_loan_yr = 'ccfloanyr' + j;
              //console.log(indexed_loan_yr);
              //console.log(data['rows'][row][indexed_loan_yr]);
              var arraylength = series.loanData.push(data['rows'][row][indexed_loan_yr]);
              //console.log(arraylength);
              if(arraylength<=26){
                var indexed_cash_flow_yr = 'avg_cumulative_cash_flow_yr' + j;
                //console.log(indexed_cash_flow_yr);
                //console.log(data['rows'][row][indexed_cash_flow_yr]);
                series.data.push(data['rows'][row][indexed_cash_flow_yr])
              }
            }


            // get loanpayback for current system type
            var loanYear;
            for( loanYear in series.loanData){
              //console.log(series.loanData[loanYear]+" and "+ loanYear);
              if(series.loanData[loanYear] > 0 && loanYear > 0){
                // console.log("Sets loan year to: "+loanYear);
                // console.log(typeof(loanYear));
                var prevYearLoanValue = series.loanData[loanYear-1];
                var breakEvenYearLoanValue = series.loanData[loanYear];
                var decimal = (prevYearLoanValue/(prevYearLoanValue+breakEvenYearLoanValue));
                //console.log("Decimal is: "+ decimal);
                //console.log(typeof(decimal));
                //console.log("Payback is "+ loanYear+" + " + decimal+ " = " + loanYear+decimal);
                series.loan_payback = Number(loanYear) + decimal;
                break;
              }
            }

            //series.loanData = series.loanData.slice(0,15);
          
            // get data for display on Second Part
            series.system_cost = Number(data['rows'][row]['avg_cumulative_cash_flow_yr0']);
            series.payback= Number(data['rows'][row]['avg_payback']);

            series.savingsAmount = Number(data['rows'][row]['you_save_100re']);
            series.installFee = -Number(data['rows'][row]['avg_system_cost_yr0']) - Number(data['rows'][row]['avg_incentive_yr1']);
            series.monthly_loan_pmt = Number(data['rows'][row]['monthly_loan_payment']);
            switch(series.system_type){
              case "Baseline":
                chartDataTmp.Baseline.data = series.data.map( element => Number(element));
                //console.log(chartDataTmp.Baseline.data);
                chartDataTmp.Baseline.loanData = series.loanData.map( element => Number(element));
                chartDataTmp.Baseline.payback = series.payback;
                break;
              case "Economy":
                chartDataTmp.Economy.data = series.data.map( element => Number(element));
                //console.log(chartDataTmp.Economy.data);
                chartDataTmp.Economy.loanData = series.loanData.map( element => Number(element));
                chartDataTmp.Economy.loan_payback = series.loan_payback;
                //console.log("Economy Loan payback is :"+series.loan_payback);
                chartDataTmp.Economy.payback = series.payback;
                chartDataTmp.Economy.savingsAmount = series.savingsAmount;
                chartDataTmp.Economy.installFee = series.installFee;
                chartDataTmp.Economy.monthly_loan_pmt = series.monthly_loan_pmt;
                this.checkOptimalDisplayValues(series, chartDataTmp);
                break;
              case "Compact":
                chartDataTmp.Compact.data = series.data.map( element => Number(element));
                //console.log(chartDataTmp.Compact.data);
                chartDataTmp.Compact.loanData = series.loanData.map( element => Number(element));
                chartDataTmp.Compact.loan_payback = series.loan_payback;
                chartDataTmp.Compact.payback = series.payback;
                chartDataTmp.Compact.savingsAmount = series.savingsAmount;
                chartDataTmp.Compact.installFee = series.installFee;
                chartDataTmp.Compact.monthly_loan_pmt = series.monthly_loan_pmt;
                this.checkOptimalDisplayValues(series, chartDataTmp);
                break;
              case "Intermediate":
                chartDataTmp.Intermediate.data = series.data.map( element => Number(element));
                //console.log(chartDataTmp.Intermediate.data);
                chartDataTmp.Intermediate.loanData = series.loanData.map( element => Number(element));
                chartDataTmp.Intermediate.loan_payback = series.loan_payback;
                chartDataTmp.Intermediate.payback = series.payback;
                chartDataTmp.Intermediate.savingsAmount = series.savingsAmount;
                chartDataTmp.Intermediate.installFee = series.installFee;
                chartDataTmp.Intermediate.monthly_loan_pmt = series.monthly_loan_pmt;
                this.checkOptimalDisplayValues(series, chartDataTmp);
                break;
              case "Standard":
                chartDataTmp.Standard.data = series.data.map( element => Number(element));
                //console.log(chartDataTmp.Standard.data);
                chartDataTmp.Standard.loanData = series.loanData.map( element => Number(element));
                chartDataTmp.Standard.loan_payback = series.loan_payback;
                chartDataTmp.Standard.payback = series.payback;
                chartDataTmp.Standard.savingsAmount = series.savingsAmount;
                chartDataTmp.Standard.installFee = series.installFee;
                chartDataTmp.Standard.monthly_loan_pmt = series.monthly_loan_pmt;
                this.checkOptimalDisplayValues(series, chartDataTmp);
                break;
              case "Premium":
                chartDataTmp.Premium.data = series.data.map( element => Number(element));
                //console.log(chartDataTmp.Premium.data);
                chartDataTmp.Premium.loanData = series.loanData.map( element => Number(element));
                chartDataTmp.Premium.loan_payback = series.loan_payback;
                chartDataTmp.Premium.payback = series.payback;
                chartDataTmp.Premium.savingsAmount = series.savingsAmount;
                chartDataTmp.Premium.installFee = series.installFee;
                chartDataTmp.Premium.monthly_loan_pmt = series.monthly_loan_pmt;
                this.checkOptimalDisplayValues(series, chartDataTmp);
                break;
              case "Selected EVPV":
                chartDataTmp.Selected_EVPV.data = series.data.map( element => Number(element));
                chartDataTmp.Selected_EVPV.loanData = series.loanData.map( element => Number(element));
                chartDataTmp.Selected_EVPV.loan_payback = series.loan_payback;
                chartDataTmp.Selected_EVPV.payback = series.payback;
                chartDataTmp.Selected_EVPV.savingsAmount = series.savingsAmount;
                chartDataTmp.Selected_EVPV.installFee = series.installFee;
                chartDataTmp.Selected_EVPV.monthly_loan_pmt = series.monthly_loan_pmt;
                this.checkOptimalDisplayValues(series, chartDataTmp);
                break;
              default:
                break;
            }
          }
            // set optimum data to be displayed
            console.log(chartDataTmp);
            this.setChartData(chartDataTmp);
          })
        .catch(function (e) {
          console.warn("Error: Caught a network/db connection error!");
          console.log(e);
        })

    //return series.payback;
  };

  checkOptimalDisplayValues(series, chartDataTmp){
    console.log("checking if "+ series.system_type+ " payback of "+ series.payback+
    " is less than "+ this.state.chartData.Optimal.system_type +" of "+ this.state.chartData.Optimal.payback);
    if(series.payback < this.state.chartData.Optimal.payback ||
      (series.payback === this.state.chartData.Optimal.payback &&
        series.system_cost < this.state.chartData.Optimal.system_cost)){
          this.setOptimalDisplayValues(series, chartDataTmp);
          //console.log("Answer is true, replacing..")
        }
    else{
      console.log("Answer is false, not replacing..")

    }
    
  };

  setOptimalDisplayValues(series, chartDataTmp){
    chartDataTmp.Optimal.system_type = series.system_type;
    if(series.system_type === "Selected EVPV"){
      chartDataTmp.Optimal.system_type = "Solar+EV";
    }
    chartDataTmp.Optimal.system_cost = series.system_cost;
    chartDataTmp.Optimal.payback = series.payback;
    chartDataTmp.Optimal.loan_payback = series.loan_payback;
    if(series.payback >=4){
      console.log("Sets optimal system type to loan" + series.payback + " : " + series.loan_payback);
      chartDataTmp.Optimal.cashorloan = "(loan)";
    }
    else{
      chartDataTmp.Optimal.cashorloan = "(cash)";
      console.log("Sets optimal system type to cash" + series.payback + " : " + series.loan_payback);
    }

    chartDataTmp.Optimal.savingsAmount= series.savingsAmount;
    chartDataTmp.Optimal.installFee = series.installFee;
    chartDataTmp.Optimal.monthly_loan_pmt= series.monthly_loan_pmt;
    this.setChartData(chartDataTmp);
  };

 

  resetOptimalSystem = () =>{
    var chartDataTmp = {...this.state.chartData};
    chartDataTmp.Optimal.system_type = 'Default';
    chartDataTmp.Optimal.system_cost = 999999;
    chartDataTmp.Optimal.payback = 999;
    chartDataTmp.Optimal.loan_payback = 99;
    chartDataTmp.Optimal.savingsAmount= 0;
    chartDataTmp.Optimal.installFee = 0;
    chartDataTmp.Optimal.monthly_loan_pmt= 0;
    chartDataTmp.Optimal.cashorloan= '';
    this.setChartData(chartDataTmp);

  }

  setChartData = (data) => {
    this.setState({ chartData: data });
  };

  setOptimalPaymentType = (cashorloan) =>{
    var chartDataTmp = {...this.state.chartData};
    chartDataTmp.Optimal.cashorloan = cashorloan;
    this.setChartData(chartDataTmp);
  }

  toggleLightBox=()=>{
    console.log("setting lightbox state");
    this.setState({lightboxIsOpen: !this.state.lightboxIsOpen});
  }
 

  

  render() {

    if (this.state.resolution <= 900) {
      var root = document.querySelector(':root');
      root.style.setProperty('--page-layout', '0% 100% 0%');
    }

    // console.log("State of test client is:"+this.state.clientProfile.test);
    // console.log("State of email is:"+this.state.clientProfile.email);

    return (
      <div className="container">
        <div className="bg-white">
          <div className={`FirstPart ${this.state.showFirstPart.hidden}`}>
            <FirstPart
              billandEmailorPhoneUpdater={this.billandEmailorPhoneUpdater}
              //hideChanger={this.hideChanger}
              showAllParts={this.showAllParts}
              showTooltip={this.state.showTooltip}
              monthlyBill={this.state.clientProfile.monthlyBill}
              // emailValidator={this.emailValidator}
              //setNexomId = {this.setNexomId}
              handleSlideChange={this.handleSlideChange}
              getChartData={this.getChartData}
              toggleLightBox = {this.toggleLightBox}
              //sendVerificationCheck = {this.sendVerificationCheck}
              //confirmVerificationCode={this.confirmVerificationCode}
              cancelVerificationRequest={this.cancelVerificationRequest}
            />
          </div>
          <div className={`SecondPart ${this.state.showSecondPart.hidden}`}>
            <SecondPart
              email={this.state.clientProfile.email}
              clientInfoUpdater={this.clientInfoUpdater}
              hideChanger={this.hideChanger}
              chartData={this.state.chartData}
              setOptimalPaymentType ={this.setOptimalPaymentType}
              lightboxIsOpen = {this.state.lightboxIsOpen}
              toggleLightBox = {this.toggleLightBox}
            />
          </div>
          <div className={`ThirdPart ${this.state.showThirdPart.hidden}`}>
            <ThirdPart hideChanger={this.hideChanger} />
          </div>
          <div className={`ThirdPart ${this.state.showThirdPart.hidden}`}>
            <ForthPart carInfoUpdater={this.carInfoUpdater} hideChanger={this.hideChanger} 
            />
          </div>
          <div className={`ThirdPart ${this.state.showFifthPart.hidden}`}>
            <FifthPart hideChanger={this.hideChanger} />
          </div>
          
          <FooterComponent/>
        </div>
      </div>
    );
  }
}

export default App;