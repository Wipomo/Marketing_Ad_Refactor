import React from "react";
import MakelloHighChart from './MakelloHighChart';

const MIN_YEAR = 2018;
const MAX_YEAR = 2026;
var chart;

var systemSizeToSystemDescriptionMap = new Map([
    ["1", "Economy"],
    ["3", "Intermediate"],
    ["5", "Premium"]
]);

// var system_size = 1;
// var bucket_savings= "$0";

class SavingsChart extends React.Component{

    //  componentWillMount=()=>{
    //  }
    constructor(props){
        super(props);
        this.state={
            system_size: 1,
            bucket_savings: "$0"
        }
    }

    handleSystemSizeChange=(event)=>{
        // this.setState({
        //     system_size: event.target.value
        // })
        this.setState({system_size : event.target.value});
        console.log("System size changed to: " + this.state.system_size);
        get_system_size_data(this.props.monthlyBillingAmount, this.state.system_size);
    }


    render() {
        const {monthlyBillingAmount} = this.props;
        const {system_size, bucket_savings} = this.state;
        // this.update_max_bucket_savings(monthlyBillingAmount);
        return (
            <div>
                {/* THIS div should have a grey background */}
                <div>

                    {/* <MonthlyBill amount={monthlyBillingAmount}/> */}
                    <p>&nbsp;</p>
                    You can save
                    <p>&nbsp;</p>
                    <BucketSavings monthlyBill={monthlyBillingAmount}/>
                    <p>&nbsp;</p>
                    annual with 100% Clean Energy

                </div>
                <div id="chartContainer">
                    {/* This div should have a white background */}
                    <Chart monthlyBillings={monthlyBillingAmount} system_size={system_size}/>
                </div>

                <Slider handleChange={this.handleSystemSizeChange}/>
                <SliderText system_size={system_size}/>
                <hr/>

            </div>
        )
    }
};

class Slider extends React.Component{
    render() {
        return (
            <input min= "1" max="5" defaultValue="1" onChange={this.props.handleChange} step="2" type="range"/>
        )
    }
};

class SliderText extends React.Component{
    render(){
        //return Choose A System Size!;
        var text = systemSizeToSystemDescriptionMap.get(this.props.system_size);
        if(!text){
            text = "Choose a System Size";
        }

        return <p id="sliderText"> {text} </p>
    }
};


class MonthlyBill extends React.Component{
    render=()=> {
        console.log("Gets in monthly bill: "+ this.props.amount);
        return <div id= 'monthly-bill-input'> {this.props.amount} </div>;
    }
};

class BucketSavings extends React.Component{
    get_max_bucket_savings=(monthlyBillings)=>{
        console.log("MONTHLY BILL FOR BUCKET SAVINGS: "+ monthlyBillings);
        var annualBill = monthlyBillings * 12;
        var bucket;
        var bucketSavingsString = "$0";
        if (annualBill < 1000){
            bucket = 500;
        }
        else{
            bucket = Math.floor(annualBill / 1000) * 1000;
        }
        console.log("bucket is: "+bucket);

        const url = "https://wipomo-zoho-database.herokuapp.com/db/" + bucket;

        const myFetch = fetch(url);


        myFetch.then((response)=>{
            response.text().then((text)=> {
                console.log("fetch return value: "+ text);
                return JSON.parse(text);
            })
                .then((data)=>{
                    const text = document.getElementById("bucket_savings");
                    var percentage = data[0]["max_discount_percentage"];
                    var bucketSavings = bucket * percentage;
                    //this.setState({bucket_savings: bucketSavings});
                    bucketSavingsString = "$" + bucketSavings;
                    text.innerText = bucketSavingsString;

                    console.log("last string" + bucketSavingsString);
                    //return bucketSavingsString;
                })
            // .then(response => {return response} )
            // console.log("LAst String: "+ val)
        });

        //return bucketSavingsString;
    }
    render=()=>{
        this.get_max_bucket_savings(this.props.monthlyBill);
        return <div id="bucket_savings"> </div>
    }
};



var get_system_size_data = function (monthlyBillings, system_size) {
    //var numberOfMonthsInAYear = 12;
    //var down_payment = 18000;
    // var system_size_percentages = [];
    // var fixed_cost_savings_amt = 0;
    var cost_savings_data;

    //let buckets = Object.keys(annualElectricBillToMaxSavingsPercent);

    var bill_input = monthlyBillings;
    var annual_bill = bill_input * 12;
    var bucket;
    if (annual_bill < 1000)
        bucket = 500;
    else
        bucket = Math.floor(annual_bill / 1000) * 1000;
    //var sys_size_input = system_size;
    console.log("Here is the bucket: ");
    console.log(bucket);
    console.log("Here is the system size: ");
    console.log(system_size);
    var url = "https://wipomo-zoho-database.herokuapp.com/db/" + bucket + "/" + system_size;
    var myFetch = fetch(url);

    myFetch.then(function (response) {
        response.text().then(
            function (text) {
                let dataToReturn = [];
                console.log(text);
                cost_savings_data = JSON.parse(text);
                console.log("This is the text in the fetch function")
                console.log(text);
                [...Array(10).keys()].map(key => {
                    let ending_number_string = String(key + 1);
                    // console.log("Cost Savings Data:");
                    // console.log(cost_savings_data);
                    dataToReturn.push(cost_savings_data[0][`yr${ending_number_string}`])
                })
                // console.log("Here is the data being returned:")
                // console.log(dataToReturn);
                if (chart) {
                    chart.setData(dataToReturn);
                } else {
                    chart = new MakelloHighChart('chartContainer', dataToReturn, MIN_YEAR, MAX_YEAR);
                }
            }
        );
    });
}

class Chart extends React.Component{

    componentDidMount() {
        //console.log("Component did mount!");
        if (this.props.monthlyBillings && this.props.system_size) {
            //console.log("here is the monthly billings: ");
            //console.log(this.props.monthlyBillings);
            //console.log("Here is the system size: ")
            //console.log(this.props.system_size);
            get_system_size_data(this.props.monthlyBillings, this.props.system_size)

        }
    }

    render() {
        if (chart) {
            //console.log("Hey we got a chart!");
            if (this.props.monthlyBillings && this.props.system_size) {
                // console.log("Here is the monthly billings: ");
                // console.log(this.props.monthlyBillings);
                // console.log("Here is the system size: ");
                console.log(this.props.system_size);
            }
        }

        return null;
    }
};

export default SavingsChart;