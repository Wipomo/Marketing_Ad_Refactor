import React from 'react';
import Chart from './Chart';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css'; // This only needs to be imported once in your app


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
        photoIndex: 0
      };

      //this.changeSystemTypeDisplayValues = this.changeSystemTypeDisplayValues.bind(this);
      this.selectSystem = this.selectSystem.bind(this);
      this.selectPaymentType = this.selectPaymentType.bind(this);

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
    let email = this.emailRef.currrent.value;
    this.props.clientInfoUpdater(fullName, phone, email, address, this.state.system_to_display, this.state.paymentType);
    this.props.hideChanger('showThirdPart');
  };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
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

  render() {

    const { photoIndex } = this.state;
    console.log("Lightbox open is: "+ this.props.lightboxIsOpen );
    let Email_placeholder = "Email"
    if(this.props.email !== ''){
      Email_placeholder = this.props.email;
      this.emailRef = Email_placeholder;
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
                      <p className='light deactive-color m2lBottom-title'>Get a custom energy savings report from Makello</p>
                    </div>

                    <div className="row">
                      <div className="col-md-6 offset-md-3">
                        <div className="form-group">
                          <input type="email" className="form-control userInput light full-width" placeholder='Full Name' ref={this.nameRef} />
                        </div>
                        <div className="form-group">
                          <input type="email" className="form-control userInput light full-width" placeholder={Email_placeholder} ref={this.emailRef} />
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <section className="blogThumbnails text-center">
          <div className="row no-gutters">
            <div className="col-md-3">
              <div className="thumbnail">
                <a href="https://www.makello.com/blog/quality-in-manufacturing" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                  <img src = "images/blog_thumbnails/Quality_in_Manufacturing.jpg" className="single_blog_thumbnail" alt="Quality in Manufacturing" />
                  <div className="caption">Quality in Manufacturing</div>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="thumbnail">
                <a href="https://www.makello.com/blog/dirty_little_secrets_of_solar" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                  <img src="images/blog_thumbnails/Dirty_Little_Secrets_of_the_Solar_Industry.jpg" className="single_blog_thumbnail" alt="Buyer's Rights for Energy Upgrades" />
                  <div className="caption">Dirty Little Secrets of the Solar Industry</div>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="thumbnail">
                <a href="https://www.makello.com/blog/what-the-competition-does-to-cut-corners" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                  <img src="images/blog_thumbnails/How_the_Competition_Cuts_Corners.JPG" className="single_blog_thumbnail" alt="How_the_Competition_Cuts_Corners" />
                  <div className="caption">How the Competition Cuts Corners</div>
                </a>
              </div>
            </div>
            <div className=" col-md-3">
              <div className="thumbnail">
                <a href="https://www.makello.com/blog/rivian-the-spirit-of-an-adventurer" target="_blank" rel="noopener noreferrer" className="viewBlogContent">
                  <img src="images/blog_thumbnails/Rivian_the_Spirit_of_an_Adventurer.jpg" className="single_blog_thumbnail"alt="Rivian, the Spirit of an Adventurer.jpg" />
                  <div className="caption">Rivian, the Spirit of an Adventurer</div>
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }
}
    
export default SecondPart;