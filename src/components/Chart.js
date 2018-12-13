import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class Chart extends React.Component {

  state = {
    loanDataNeeded: false
  }
  switchPaymentSeriesType = (event)=>{
    console.log("Switching type :): "+this.state.loanDataNeeded);
    this.setState({loanDataNeeded: !this.state.loanDataNeeded});
    //this.loanDataNeeded = !this.loanDataNeeded;
    //event.preventDefault();
  }
  render() {
   // console.log(this.props.chartData);
    
    const { Baseline, Economy, Compact, Intermediate, Standard, Premium } = this.props.chartData;
    var system_type_payback = [];
    let loanDataNeeded = this.state.loanDataNeeded;
    system_type_payback.push(Baseline.payback);
    //console.log(typeof(Baseline.payback));
    system_type_payback.push(Economy.payback);
    //console.log(typeof(Economy.payback));
    system_type_payback.push(Compact.payback);
    //console.log(typeof(Compact.payback));
    system_type_payback.push(Intermediate.payback);
    //console.log(typeof(Intermediate.payback));
    system_type_payback.push(Standard.payback);
    //console.log(typeof(Standard.payback));
    system_type_payback.push(Premium.payback);
    //console.log(typeof(Premium.payback));

    console.log(system_type_payback);
    // sort numbers in order rather than lexographically
    system_type_payback.sort(function(a, b){return a-b});
    console.log(system_type_payback);


    system_type_payback = system_type_payback.slice(0,4);
    console.log("Determining best paybacks");
    console.log(system_type_payback);

    var system_type_payback_without_baseline = system_type_payback.slice(1);
    if(system_type_payback_without_baseline.every(isBelowThreshold)){
      //update data to loan data
      console.log("updating chart to loan data");
      console.log(system_type_payback);
      loanDataNeeded = true;
      this.setState({loanDataNeeded: true});

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
        max: 14,
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
            text: 'Available Packages<br/><span style="font-size: 9px; color: #666; font-weight: normal">(Click to show/hide)</span>',
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
      <button id="button" onClick={this.switchPaymentSeriesType}>Switch payment types</button>
      </div>
    );
  }
}

export default Chart;
