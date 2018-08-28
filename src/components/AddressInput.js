import React, {Component} from 'react';

// var autocomplete;
var initAuto = false;

// Create a new session token.
// var sessionToken = new google.maps.places.AutocompleteSessionToken();

class AddressInput extends Component{
    initAutoComplete=()=>{
        var input = document.getElementById('autocomplete');
        if(initAuto=== false){
            console.log("initializes autocomplete once only");
            var autocomplete = new window.google.maps.places.Autocomplete(
                input,
                {types: ['address'], placeIdOnly:true}
            );
            initAuto = true;
        }

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        // autocomplete.addListener('place_changed', function(){
        //   var place = autocomplete.getPlace();
        //   console.log(place);
        // });

    }

    render(){

        return <input  className='userInput light' id='autocomplete' placeholder="Enter full address*" onFocus={this.initAutoComplete} value={this.props.fullAddress} onChange={this.props.fullAddressStateHandler} />
    }

}
export default AddressInput;