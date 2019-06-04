import React from 'react';
// import { Popover, PopoverBody } from 'reactstrap';

class FooterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.privacy_toggle = this.privacy_toggle.bind(this);

        this.state = {
            privacy_popup_open: false
        };
    }

    privacy_toggle(){
        this.setState({ privacy_popup_open: !this.state.privacy_popup_open });
    }

  render() {

    console.log("Show header is: "+ this.props.showHeader);

    var StyleDisplay = {};

    if(!this.props.showHeader){
      StyleDisplay = {
        display: "none"
      };
    }

    return (
      <div>
        <div className="footer">
          <div className="footerText" style={StyleDisplay}>
            &copy; Copyright 2019 Makello
            {/* &nbsp;&nbsp;|&nbsp;&nbsp;We will not share your data.<span className="readme" id="footer_privacy_icon" onMouseOver={this.privacy_toggle}
                    onMouseOut={this.privacy_toggle}>&nbsp; <img src="/images/info_icon.png" alt="info" style={{width:'13px', height:'13px'}}/>
                    </span> */}
          </div>
        </div>
        {/* <Popover placement="auto" isOpen={this.state.privacy_popup_open} target="footer_privacy_icon" toggle={this.privacy_toggle} >
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
        </Popover> */}
      </div>

    );
  }
}

export default FooterComponent;