import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class Chart extends React.Component {

  state = {
    loanDataNeeded: false,
    cashPaymentClicked: false,
    loanPaymentClicked: false
  }

  switchPaymentSeriesType = (event)=>{
    if(event.target.value === "cash"){
      this.props.updatePaymentType("cash");
      this.setState({loanDataNeeded: false});
      this.setState({cashPaymentClicked: true});
      this.setState({loanPaymentClicked: false});
    }
    else if(event.target.value === "loan"){
      this.props.updatePaymentType("loan");
      this.setState({loanDataNeeded: true});
      this.setState({cashPaymentClicked: false});
      this.setState({loanPaymentClicked: true});
    }
  }

  componentDidMount(){
  }
  
  defaultCheckedRadioButtons=()=>{
    if(this.props.chartData.Optimal.cashorloan === "(loan)"){
      return (
        <form className="pt-3 text-center">
          <strong>Selected Payment Type:</strong> &nbsp;
          <label htmlFor="inputRadio1">Cash</label> <input id="inputRadio1" type="radio" name="paymentType" value="cash" onClick={this.switchPaymentSeriesType}></input> &nbsp;&nbsp;&nbsp;&nbsp; 
          <label htmlFor="inputRadio2">Loan</label> <input id="inputRadio2" type="radio" name="paymentType" value="loan" onClick={this.switchPaymentSeriesType} defaultChecked></input> 
        </form>
      );
    }
    else if(this.props.chartData.Optimal.cashorloan === "(cash)"){
      return (
        <form className="pt-3 text-center">
          <strong>Selected Payment Type:</strong> &nbsp;
          <label htmlFor="inputRadio11">Cash</label> <input id="inputRadio11" type="radio" name="paymentType" value="cash" onClick={this.switchPaymentSeriesType} defaultChecked></input> &nbsp;&nbsp;&nbsp;&nbsp; 
          <label htmlFor="inputRadio22">Loan</label> <input id="inputRadio22" type="radio" name="paymentType" value="loan" onClick={this.switchPaymentSeriesType}></input> 
        </form>
      );
    }
    else{
      return (
        <p className="pt-3 text-center"><span className="badge badge-warning">Your personalized chart is loading...</span></p>
      );
    }

  };

  render() {
    
    const { Baseline, Economy, Compact, Intermediate, Standard, Premium} = this.props.chartData;
    var system_type_payback = [];
    let loanDataNeeded = this.state.loanDataNeeded;
    // let loanDataNeeded = this.props.Optimal.cashorloan;
    system_type_payback.push(Baseline.payback);
    system_type_payback.push(Economy.payback);
    system_type_payback.push(Compact.payback);
    system_type_payback.push(Intermediate.payback);
    system_type_payback.push(Standard.payback);
    system_type_payback.push(Premium.payback);

    // sort numbers in order rather than lexographically
    system_type_payback.sort(function(a, b){return a-b});
    //console.log(system_type_payback);

    // pick lowest 4 systems to be defaultly visible on chart
    system_type_payback = system_type_payback.slice(0,4);

    // determine to display cash or loan data
    var system_type_payback_without_baseline = system_type_payback.slice(1);
    if(system_type_payback_without_baseline.every(isBelowThreshold) && this.state.cashPaymentClicked === false){
      //update data to loan data
      // console.log("updating chart to loan data");
      // console.log(system_type_payback);
      loanDataNeeded = true;
    }

    function isBelowThreshold(currentValue) {
      return currentValue >= 4;
    }



    const options = {
      chart: {
        type: 'line'
      },
      title: {
        text: loanDataNeeded ? 'Loan Savings Over Time' : 'Savings Over Time',
        style: {
          fontSize: '24px', 
          fontWeight:'bold',
        },
      },
      yAxis: {
        labels: {
          formatter: function () {
            if (this.value < 1000 && this.value > -1000) {
              return '$' +this.value
            }
            return '$' + this.value / 1000 + 'k'
          },
          style: {
            fontSize: '14px',
            fontWeight:'bold',
          }
        },
        title: {
          style: {
            
          },
          text: ''
        }
      },
      xAxis: {
        max: 29,
        tickInterval: 1,
        labels: {
          style: {
           fontSize: '14px',
           fontWeight:'bold',
          }
        },
        title: {
          style: {
           fontSize: '16px', 
           fontWeight:'bold',
          },
          text: 'Years',
        }
      },
      
      colors: ['#ff0000','#8B008B','#000000','#ffff00','#379AE8', '#00b050'],

      series: [{
        name: "Baseline Energy Cost",
        data: loanDataNeeded ? Baseline.loanData : Baseline.data,
        dashStyle: 'longdash',
        visible: system_type_payback.includes(Baseline.payback),
        marker: {
          //lineWidth: 2,
          symbol: "triangle-down",
          radius: 5
        },
      },{
        name: loanDataNeeded ? "Economy (Loan Payback "+ Economy.loan_payback.toPrecision(2) +" Years)" : "Economy (Payback "+ Economy.payback.toPrecision(2) +" Years)",
        data: loanDataNeeded ? Economy.loanData : Economy.data,
        dashStyle: 'shortdot',
        visible: system_type_payback.includes(Economy.payback),
        marker: {
          //lineWidth: 2,
          symbol: "square",
          radius: 4
        },
      }, {
        name: loanDataNeeded ? "Compact (Loan Payback "+ Compact.loan_payback.toPrecision(2) +" Years)" : "Compact (Payback "+ Compact.payback.toPrecision(2) +" Years)",
        data: loanDataNeeded ? Compact.loanData : Compact.data,
        dashStyle: 'shortdash',
        visible: system_type_payback.includes(Compact.payback),
        marker: {
          //lineWidth: 2,
          symbol: "diamond",
          radius: 5
        }

      }, {
        name: loanDataNeeded ? "Intermediate (Loan Payback "+ Intermediate.loan_payback.toPrecision(2) +" Years)" : "Intermediate (Payback "+ Intermediate.payback.toPrecision(2) +" Years)",
        data: loanDataNeeded ? Intermediate.loanData : Intermediate.data,
        dashStyle: 'solid',
        visible: system_type_payback.includes(Intermediate.payback),
        marker: {
          fillColor: '#0000ff',
          //lineWidth: 2,
          symbol: "square",
          radius: 5
        },
      }, {
        name: loanDataNeeded ? "Standard (Loan Payback "+ Standard.loan_payback.toPrecision(2) +" Years)" : "Standard (Payback "+ Standard.payback.toPrecision(2) +" Years)",
        data: loanDataNeeded ? Standard.loanData : Standard.data,
        dashStyle: 'longdash',
        visible: system_type_payback.includes(Standard.payback),
        marker: {
          //lineWidth: 2,
          symbol: "circle",
          radius: 5
        }
      },{
        name: loanDataNeeded ? "Premium (Loan Payback "+ Premium.loan_payback.toPrecision(2) +" Years)" : "Premium (Payback "+ Premium.payback.toPrecision(2) +" Years)",
        data: loanDataNeeded ? Premium.loanData : Premium.data,
        dashStyle: 'shortdot',
        visible: system_type_payback.includes(Premium.payback),
        marker: {
          symbol: "triangle",
          radius: 5
        },
      }],
      tooltip: {
        //pointFormat:' {series.name} </n> '
        formatter: function () {
            return '<b>' + this.x + ' Years</b><br/>' + this.series.name + ': <b>$' +
             (this.y).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) + '</b>';
        }
    },
      plotOptions: {
        line: {
          enableMouseTracking: true
        },
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        itemStyle: {
          fontSize: '16px',
        },
        itemDistance: 100,
        title: {
            text: 'Click any package below to show or hide',
            style: {
                fontStyle: 'italic'
            }
        },
      },

      responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

    };

    return (
      <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
      
      {this.defaultCheckedRadioButtons()}
      
      {/* <input type="radio" onClick={this.switchPaymentSeriesType}>Switch payment types </input> */}
      </div>
    );
  }
}

export default Chart;
