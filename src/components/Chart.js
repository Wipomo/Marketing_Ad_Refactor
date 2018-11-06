import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class Chart extends React.Component {
  render() {
    console.log(this.props.chartData);
    
    const { baseline, eco, inter, prem } = this.props.chartData;

    const options = {
      chart: {
        type: 'line'
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
            "fontSize": "20px",
          }
        },
        title: {
          style: {
            "font-size": '18',
            "color": "black"
          },
          text: ''
        }
      },
      xAxis: {
        max: 14,
        tickInterval: 1,
        labels: {
          style: {
            fontSize: '30px',
          }
        },
        title: {
          style: {
            "font-size": '40',
            "color": "black",
          },
          text: 'Years',
          y: 15,
        }
      },
      title: {
        text: 'Cumulative Cash Flow',
        style: {
          "fontSize": "30px",
          "paddingTop": "5px !important",
        },
        y: 20,
        floating: false
      },
      series: [{
        name: "Premium "+ prem.payback+" Years Payback",
        color: "blue",
        data: prem.data
      }, {
        name: "Intermediate "+ inter.payback+" Years Payback",
        color: "green",
        data: inter.data
      }, {
        name: "Economy "+ eco.payback+" Years Payback",
        color: "orchid",
        data: eco.data
      }, {
        name: "Baseline Energy Cost",
        color: "grey",
        data: baseline.data
      }],
      plotOptions: {
        line: {
          enableMouseTracking: true
        },
      },
      legend: {
        layout: 'vertical',
        align: 'center',
        floating: true,
        verticalAlign: 'top',
        itemMarginBottom: 2,
        itemStyle: {
          fontSize: '18px',
        },
        y:20
      }
    };

    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    );
  }
}

export default Chart;