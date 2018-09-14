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

class SavingsChart extends React.Component {

    constructor(props){
        super(props);
        this.state={
            system_size: 1,
            bucket_savings: "$0"
        }
    }

    handleSystemSizeChange= (event) => {
        this.setState({system_size : event.target.value});
        console.log("System size changed to: " + this.state.system_size);
        get_system_size_data(this.props.monthlyBill, this.state.system_size);
    };

    render() {
        const {system_size, bucket_savings} = this.state;
        return (
            <div>
                <div>
                    <br />
                    <p className='regular'>You can save</p>
                    <BucketSavings
                        monthlyBill={this.props.monthlyBill}
                    />
                    <p className='regular'>annually with 100% Clean Energy</p>
                    <br />
                </div>
                <div id="chartContainer">
                    <Chart monthlyBill={this.props.monthlyBill} system_size={system_size} />
                </div>
                <Slider system_size={system_size} handleChange={this.handleSystemSizeChange}/>
            </div>
        )
    }
};

class Slider extends React.Component{
    render() {
        return (
            <div  style={{background: '#ffffff'}}>
            <input min= "1" max="5" defaultValue="1" onChange={this.props.handleChange} step="2" type="range"/>
            <SliderText system_size={this.props.system_size}/>
            </div>
        )
    }
};

class SliderText extends React.Component{
    render(){
        var text = systemSizeToSystemDescriptionMap.get(this.props.system_size);
        if(!text){
            text = "Choose a System Size";
        }

        return <p id="sliderText"> {text} </p>
    }
};

class BucketSavings extends React.Component {

    get_max_bucket_savings = (monthlyBillings) => {

        var annualBill = monthlyBillings * 12;
        var bucket;
        var bucketSavingsString = "$0";
        if (annualBill < 1000){
            bucket = 500;
        }
        else{
            bucket = Math.floor(annualBill / 1000) * 1000;
        }

        const url = "https://wipomo-zoho-database.herokuapp.com/db/" + bucket;

        const myFetch = fetch(url);

        myFetch.then((response)=>{
            response.text().then((text)=> {
                return JSON.parse(text);
            })
                .then((data)=>{
                    const text = document.getElementById("bucket_savings");
                    var percentage = data[0]["max_discount_percentage"];
                    var bucketSavings = bucket * percentage;
                    bucketSavingsString = "$" + bucketSavings;
                    text.innerText = bucketSavingsString;
                })
        });


    };


    render = () => {
        this.get_max_bucket_savings(this.props.monthlyBill);
        return <div className='semiBold bigBlue' id="bucket_savings"> </div>
    }
};

var get_system_size_data = function (monthlyBillings, system_size) {

    var cost_savings_data;

    var bill_input = monthlyBillings;
    var annual_bill = bill_input * 12;
    var bucket;
    if (annual_bill < 1000)
        bucket = 500;
    else
        bucket = Math.floor(annual_bill / 1000) * 1000;
    var url = "https://wipomo-zoho-database.herokuapp.com/db/" + bucket + "/" + system_size;
    var myFetch = fetch(url);

    myFetch.then(function (response) {
        response.text().then(
            function (text) {
                let dataToReturn = [];
                cost_savings_data = JSON.parse(text);
                [...Array(10).keys()].map(key => {
                    let ending_number_string = String(key + 1);
                    dataToReturn.push(cost_savings_data[0][`yr${ending_number_string}`])
                });
                if (chart) {
                    chart.setData(dataToReturn);
                } else {
                    chart = new MakelloHighChart('chartContainer', dataToReturn, MIN_YEAR, MAX_YEAR);
                }
            }
        );
    });
};

class Chart extends React.Component{

    componentDidMount() {
        if (this.props.monthlyBill && this.props.system_size) {
            get_system_size_data(this.props.monthlyBill, this.props.system_size)
        }
    }

    render() {
        if (chart) {
            if (this.props.monthlyBill && this.props.system_size) {
            }
        }

        return null;
    }
};

export default SavingsChart;