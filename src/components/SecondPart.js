import React from 'react';

class SecondPart extends React.Component {

    nameRef = React.createRef();
    phoneRef = React.createRef();
    addressRef = React.createRef();

    submitHandler = (e) => {
        e.preventDefault();
        let fullName = this.nameRef.current.value;
        let phone = this.phoneRef.current.value;
        let address = this.addressRef.current.value;
        this.props.restOfFormUpdater(fullName, phone, address);
        this.props.hideChanger('showThirdPart');
    }

    render() {
        return(
            <div className='App'>
                <div className='side'></div>
                <div className='main2'>
                    <div className='m2Upper'>
                        <div className='m2uText'>
                            <p className='regular'>You can save</p>
                            <p className='semiBold bigBlue'>$X,XXX</p>
                            <p className='regular'>with 100% clean energy</p>
                        </div>
                        <div className='m2uChart'>
                            <p>(Placeholder for chart)</p>
                        </div>
                    </div>
                    <div className='imageTest2' />
                    <div className='m2Lower'>
                        <div className='m2lTop'>
                            <p  className=''>Are you ready to save money?</p>
                        </div>
                        <div className='m2lBottom'>
                            <p className='light'>Get a custom energy savings report from Makello</p>
                            <input className='userInput light' type='text' placeholder='Full Name*' ref={this.nameRef}/>
                            <input className='userInput light' type='text' placeholder='Phone' ref={this.phoneRef}/>
                            <input className='userInput light' type='text' placeholder='Address*' ref={this.addressRef}/>
                            <input className='submitButton light' type='submit' onClick={this.submitHandler}/>
                        </div>
                    </div>
                </div>
                <div className='side'></div>
            </div>
        );
    }
}

export default SecondPart;