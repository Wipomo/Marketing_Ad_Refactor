import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class Chart extends React.Component {
  render() {
   // console.log(this.props.chartData);
    
    const { Baseline, Economy, Intermediate, Premium } = this.props.chartData;

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
        name: "Premium "+ Premium.payback+" Years Payback",
        color: "blue",
        data: Premium.data
      }, {
        name: "Intermediate "+ Intermediate.payback+" Years Payback",
        color: "green",
        data: Intermediate.data
      }, {
        name: "Economy "+ Economy.payback+" Years Payback",
        color: "orchid",
        data: Economy.data
      }, {
        name: "Baseline Energy Cost",
        color: "grey",
        data: Baseline.data
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
