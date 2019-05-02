import React from 'react';
import Chart from './Chart';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css'; // This only needs to be imported once in your app
import { Popover, PopoverBody} from 'reactstrap';
//import 'react-notifications/lib/notifications.css';

var initAuto = false;

const images = ["images/makello_lightbox1.jpg"];

class SecondPart extends React.Component {

  constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        dropdownOpen: false,
        value:"View upgrade packages!",
        system_to_display: "Optimal",
        paymentType: "cash",
        photoIndex: 0,
        popoverOpen1: false,
        popoverOpen2: false,
        popoverOpen3: false,
        privacy_popup_open: false
      };

      //this.changeSystemTypeDisplayValues = this.changeSystemTypeDisplayValues.bind(this);
      this.selectSystem = this.selectSystem.bind(this);
      this.selectPaymentType = this.selectPaymentType.bind(this);
      this.toggle1 = this.toggle1.bind(this);
      this.toggle2 = this.toggle2.bind(this);
      this.toggle3 = this.toggle3.bind(this);
      this.privacy_toggle = this.privacy_toggle.bind(this);


  }


  initAutoComplete = () => {
    var input = document.getElementById('autocomplete');
    if (initAuto === false) {
      console.log("initializes autocomplete once only");
      new window.google.maps.places.Autocomplete(
        input,
        { types: ['address'], place_id: true }
      );
      initAuto = true;
    }
  };

  nameRef = React.createRef();
  phoneRef = React.createRef();
  emailRef = React.createRef();
  addressRef = React.createRef();

  submitHandler = (event) => {
    event.preventDefault();
    let fullName = this.nameRef.current.value;
    let phone = this.phoneRef.current.value;
    let address = this.addressRef.current.value;
    let email = this.emailRef.current.value;
    this.props.clientInfoUpdater(fullName, phone, email, address, this.state.system_to_display, this.state.paymentType);
    this.props.hideChanger('showThirdPart');
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggle1() {
    this.setState({
      popoverOpen1: !this.state.popoverOpen1
    });
  }
  toggle2() {
    this.setState({
      popoverOpen2: !this.state.popoverOpen2
    });
  }
  toggle3() {
    this.setState({
      popoverOpen3: !this.state.popoverOpen3
    });
  }

  privacy_toggle(){
    this.setState({ privacy_popup_open: !this.state.privacy_popup_open });
  }

  selectPaymentType(event) {
    this.setState({
      paymentType: event,
    });
    //console.log("Updating system type to display to:"+ event.target.innerText);
    //this.changeSystemTypeDisplayValues(event.target.innerText);
  }

  selectSystem(event) {

    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      value: event.target.innerText,
      system_to_display: event.target.innerText
    });
    //console.log("Updating system type to display to:"+ event.target.innerText);
    //this.changeSystemTypeDisplayValues(event.target.innerText);
  }

  DescribeSavingsAmount = ()=>{
    let system_type = this.state.system_to_display;

    switch(system_type){
      case "Optimal":
        return <h1 className="bigBlue superBold">
          ${Number(this.props.chartData.Optimal.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Solar+EV":
        return <h1 className="bigBlue superBold">
          ${Number(this.props.chartData.Selected_EVPV.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Economy":
        return <h1 className="bigBlue superBold">
          ${Number(this.props.chartData.Economy.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Compact":
        return <h1 className="bigBlue superBold">
          ${Number(this.props.chartData.Compact.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Intermediate":
        return <h1 className="bigBlue superBold">
          ${Number(this.props.chartData.Intermediate.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Standard":
        return <h1 className="bigBlue superBold">
          ${Number(this.props.chartData.Standard.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      case "Premium":
        return <h1 className="bigBlue superBold">
          ${Number(this.props.chartData.Premium.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>;
      default:
        break;
    }
  }


  DescribeInstallAndMonthlyFee = ()=>{
    let system_type = this.state.system_to_display;

    switch(system_type){
      case "Optimal":
        return <div>
          <p className="regular regular-fontSize" >We selected the optimal {(this.props.chartData.Optimal.system_type)} upgrade package for you!</p>
          <h1 className="bigBlue superBold"> ${Number(this.props.chartData.Optimal.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
          <small> or</small>&nbsp;${Number(this.props.chartData.Optimal.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
          </div>;
      case "Solar+EV":
      return <div>
        <p className="regular regular-fontSize" >You selected the Solar+EV upgrade package!</p>
        <h1 className="bigBlue superBold"> ${Number(this.props.chartData.Selected_EVPV.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
        <small> or</small>&nbsp;${Number(this.props.chartData.Selected_EVPV.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      case "Economy":
      return <div>
        <p className="regular regular-fontSize" >You selected the Economy upgrade package!</p>
        <h1 className="bigBlue superBold"> ${Number(this.props.chartData.Economy.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
        <small> or</small>&nbsp;${Number(this.props.chartData.Economy.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      case "Compact":
      return <div>
        <p className="regular regular-fontSize" >You selected the Compact upgrade package!</p>
        <h1 className="bigBlue superBold"> ${Number(this.props.chartData.Compact.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
        <small> or</small>&nbsp;${Number(this.props.chartData.Compact.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
    </div>;
      case "Intermediate":
      return <div>
        <p className="regular regular-fontSize" >You selected the Intermediate upgrade package!</p>
        <h1 className="bigBlue superBold"> ${Number(this.props.chartData.Intermediate.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
        <small> or</small>&nbsp;${Number(this.props.chartData.Intermediate.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      case "Standard":
      return <div>
        <p className="regular regular-fontSize" >You selected the Standard upgrade package!</p>
        <h1 className="bigBlue superBold"> ${Number(this.props.chartData.Standard.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
        <small> or</small>&nbsp;${Number(this.props.chartData.Standard.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      case "Premium":
      return <div>
        <p className="regular regular-fontSize" >You selected the Premium upgrade package!</p>
        <h1 className="bigBlue superBold"> ${Number(this.props.chartData.Premium.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
        <small> or</small>&nbsp;${Number(this.props.chartData.Premium.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>
        </div>;
      default:
        break;
    }
  }

  // createNotification = (type) => {
  //   return () => {
  //     switch (type) {
  //       case 'info':
  //         NotificationManager.info('Info message');
  //         break;
  //       case 'success':
  //         NotificationManager.success('Success message', 'Your monthly electric bill matches 100s of our customer case studies');
  //         NotificationManager.success('Success message', 'Each package includes ALL of your electricity from renewable sources only!');
  //         NotificationManager.success('Success message', 'View the 5 system sizes selected for you.');
  //         break;
  //       case 'warning':
  //         NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
  //         break;
  //       case 'error':
  //         NotificationManager.error('Error message', 'Click me!', 5000, () => {
  //           alert('callback');
  //         });
  //         break;
  //     }
  //   };
  // };

  render() {

    const { photoIndex } = this.state;
    console.log("Lightbox open is: "+ this.props.lightboxIsOpen );
    //let Emaissl_placeholder = "Email"
    if(this.props.email !== 'N/A'){
      this.emailRef.current.value = this.props.email;
    }

    return (
      <div className='App'>
        <div className='main2'>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="main2-container">
                <div className='m2Upper'>
                  <div className='m2uTextu'>
                    <p className="regular regular-fontSize">You Can Save</p>
                    {this.DescribeSavingsAmount()}
                    {/* <h1 className="bigBlue superBold">${Number(this.props.chartData.Optimal.savingsAmount).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1> */}
                    <p className="regular regular-fontSize">Annually with 100% Clean Energy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className='m2uChart'>
                <Chart chartData={this.props.chartData} updatePaymentType={this.selectPaymentType}/>
              </div>
            </div>
          </div>

          <div>
              {this.props.lightboxIsOpen && (
                <Lightbox
                  mainSrc={images[photoIndex]}
                  // nextSrc={images[(photoIndex + 1) % images.length]}
                  // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                  onCloseRequest={() => this.props.toggleLightBox() }
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + images.length - 1) % images.length,
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % images.length,
                    })
                  }
                />
              )}
           </div>

          <div className='m2uTextl text-center'>

            <br />
            {/* <button className='btn btn-info'
          onClick={this.createNotification('info')}>Info
        </button>
        <hr/>
        <button className='btn btn-success'
          onClick={this.createNotification('success')}>Learn More on Chart
        </button>
        <hr/>
        <button className='btn btn-warning'
          onClick={this.createNotification('warning')}>Warning
        </button>
        <hr/>
        <button className='btn btn-danger'
          onClick={this.createNotification('error')}>Error
        </button>
 
        <NotificationContainer/> */}
            
      
            {this.DescribeInstallAndMonthlyFee()}
            {/* <h1 className="bigBlue superBold"> ${Number(this.props.chartData.Optimal.installFee).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
            <small> or</small> 
            &nbsp;${Number(this.props.chartData.Optimal.monthly_loan_pmt).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}/mo.*</h1>*/}


            <ButtonDropdown direction="right" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {this.state.value}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.selectSystem}>Optimal</DropdownItem> 
                <DropdownItem onClick={this.selectSystem}>Economy</DropdownItem>
                <DropdownItem onClick={this.selectSystem}>Compact</DropdownItem>
                <DropdownItem onClick={this.selectSystem}>Intermediate</DropdownItem>
                <DropdownItem onClick={this.selectSystem}>Standard</DropdownItem>
                <DropdownItem onClick={this.selectSystem}>Premium</DropdownItem>
                <DropdownItem onClick={this.selectSystem}>Solar+EV</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>

          
          <div className="m2uTextl-small text-center deactive-color">
            <h6>Includes highest quality LG 335w - 400w solar panels; SolarEdge, SMA or Enphase inverter(s); balance of system & installation.</h6>
            <h6>*After 30% Federal ITC, and if loan, applied as down payment on 12 Yr Loan @ 5.49% APR (based on credit).</h6>
          </div>
              
          <div className="saveMoneyBox">
            <div className="row">
              <div className="col-md-8 offset-md-2">
              <h4 className='text-white text-center'>Are you ready to save money?</h4>
                <div className="card border-0 rounded-0 pt-3">
                  <div className="card-body">
                    <div className="text-center mb-4">
                      <p className='light deactive-color m2lBottom-title'>Now Serving San Diego</p>
                    </div>
                    <iframe frameBorder="0" title="zoho_form"  style={{height:"500px",width:"99%",border:"none"}} src='https://forms.zohopublic.com/virtualoffice14340/form/RequestaQuote1/formperma/g7XcWH-f3OwFdAqvPkf_oCC5bGLsBBASE9VXszzu2HE'></iframe>
                    {/* <iframe frameBorder="0" title="zoho_form" style={{height:"500px",width:"99%",border:"none"}} src='https://forms.zohopublic.com/virtualoffice14340/form/SimpleLeadFormLP/formperma/v40aRivAQb2KJooJ-Y46RMJvvdY4TZDKOBB60Tl1ASM'></iframe> */}
    
                    We will not share your data.<span className="readme" id="privacy_icon" onMouseOver={this.privacy_toggle}
                  onMouseOut={this.privacy_toggle}>&nbsp; <img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/>
                  </span>

                    {/* <script type="text/javascript" src="https://forms.zohopublic.com/virtualoffice14340/form/SimpleLeadFormLP/jsperma/v40aRivAQb2KJooJ-Y46RMJvvdY4TZDKOBB60Tl1ASM" id="ZFScript"></script> */}
                    

                    {/* <div className="row">
                      <div className="col-md-6 offset-md-3">
                        <div className="form-group">
                          <input type="email" className="form-control userInput light full-width" placeholder='Full Name' ref={this.nameRef} />
                        </div>
                        <div className="form-group">
                          <input type="email" className="form-control userInput light full-width" placeholder='Email' ref={this.emailRef} />
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control userInput light full-width" placeholder='Phone' ref={this.phoneRef} />
                        </div>
                        <div className="form-group">
                          <input id='autocomplete' onFocus={this.initAutoComplete} type="text" className="form-control userInput light full-width" placeholder='Enter full address' ref={this.addressRef} />
                        </div>
                        <div className="form-group">
                          <input className='btn btn-primary submitButton light' value="Submit" type='submit' onClick={this.submitHandler} />
                          <p text-align="center">Now serving San Diego</p>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

         <section className="payback">
               <div className="row">
                <div className="col-lg-6">

                  <div className="paybackWrapper">
                    <h2 className="payback-heading">High Energy Bill? <span className="text-muted">No Problem!</span></h2>
                    <div className="mt-3">
                      Enter your email above, for a Coupon Code that includes: 
                      <ul>
                        <li>Free Energy Analysis <span className="readme" id="Popover3" onMouseOver={this.toggle3} onMouseOut={this.toggle3}>
                      &nbsp;<sup><img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/></sup></span></li>
                        <li>Simple payback in 1 - 3 years <span className="readme" id="Popover1" onMouseOver={this.toggle1} onMouseOut={this.toggle1}>
                      &nbsp;<sup><img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/></sup></span></li>
                        <li>Systems starting at $5,599 or $53/mo.<span className="readme" id="Popover2" onMouseOver={this.toggle2}
                      onMouseOut={this.toggle2}>&nbsp;<sup> <img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/></sup>
                      </span></li>
                      </ul>
                    </div>

                    <div className="mt-4"></div>
                  </div>
                </div>

                <div className="col-lg-6">

                	<div className="surveyVid">
	                	<div className="embed-responsive embed-responsive-16by9">
                    <iframe width="560" height="315" title="makello_video" src="https://www.youtube.com/embed/gxnCCkjoVPM" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    {/* <iframe className="embed-responsive-item" title="makello_video" src="https://www.youtube.com/embed/kDz-cchV6QA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
	                	</div>
                	</div>

                </div>
              </div>
              <Popover placement="auto" isOpen={this.state.popoverOpen1} target="Popover1" toggle={this.toggle1}>
                <PopoverBody><div className="payback-disclaimer">
                    Simple Payback in 1-3 years is possible for SDGE
                    annual electric utility bills on the Standard Domestic Rate, and ineligible
                    for Medical & Low Income discounts.
                    Actual time to Simple Payback depends on Time-Of-Use interval data for electric
                    consumption, and solar PV production variables.
                  </div></PopoverBody>
              </Popover>

              <Popover placement="auto" isOpen={this.state.popoverOpen2} target="Popover2" toggle={this.toggle2}>
                <PopoverBody><div className="payback-disclaimer">
                  Includes highest quality: LG 335 watt - 400 watt solar panels, SolarEdge, SMA or Enphase IQ7 inverter(s), balance of system and installation. After 30% Federal Income Tax Credit, and if loan, applied as downpayment for 12 Yr Loan @ 5.49% APR. Actual APR based on credit application.
                  </div></PopoverBody>
              </Popover>
              <Popover placement="auto" isOpen={this.state.popoverOpen3} target="Popover3" toggle={this.toggle3}>
                <PopoverBody><div className="payback-disclaimer">
                Makello's Energy Analysis includes:<br></br>

                  &nbsp;&nbsp; -Site survey<br></br>
                  &nbsp;&nbsp; -Shading analysis<br></br>
                  &nbsp;&nbsp; -Cash flow analysis<br></br>
                  &nbsp;&nbsp; -Trade-off study<br></br>
                  &nbsp;&nbsp; -Custom proposal<br></br>
                  <br></br>

                  SDG&E and Home Energy Auditors typically charge between $400-$800.
                  Enter your email in the form above to receive a Coupon Code for a FREE Energy Analysis by our Ethical Energy Efficiency Experts, and a comprehensive report.
                  You may also request access to site survey measurements, shading analysis, and pictures.
                  </div></PopoverBody>
              </Popover> 

              <Popover placement="auto" isOpen={this.state.privacy_popup_open} target="privacy_icon" toggle={this.privacy_toggle} >
                <PopoverBody>
                <div className="payback-disclaimer">
                    Privacy Policy: We won't share your info with Third Parties,
                    except when necessary to complete your order.
                    Makello collects personally identifiable information when you submit it.
                    The information you provide is used to help us better understand your energy efficiency needs.
                    We may retain and use your personal information to let you know about new products or services.
                    Personal information is any information that identifies you or would enable someone to contact you, such as your name, email address, phone number and other
                    non-public information that is associated with the foregoing. This privacy statement applies to the Makello website and any other sites owned and operated by Makello.
                </div>
            </PopoverBody>
        </Popover>
            </section>

      </div>
    );
  }
}
    
export default SecondPart;