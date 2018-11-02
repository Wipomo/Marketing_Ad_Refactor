import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class Chart extends React.Component {
  render() {

    const { annual, eco, inter, prem } = this.props.chartData;

    const options = {
      chart: {
        type: 'line'
      },
      yAxis: {
        min: 50,
        max: 15000,
        tickPositions: [5000, 20000, 45000, 70000, 95000, 120000, 145000],
        labels: {
          formatter: function () {
            if (this.value < 1000) {
              return this.value
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
        y: 30
      },
      series: [{
        name: "Premium",
        color: "blue",
        data: prem.data
      }, {
        name: "Intermediate",
        color: "green",
        data: inter.data
      }, {
        name: "Economy",
        color: "orchid",
        data: eco.data
      }, {
        name: "Baseline",
        color: "grey",
        data: [
          -annual,
          -annual * 2,
          -annual * 3,
          -annual * 4,
          -annual * 5,
          -annual * 6,
          -annual * 7,
          -annual * 8,
          -annual * 9,
          -annual * 10,
          -annual * 11,
          -annual * 12,
          -annual * 13,
          -annual * 14,
          -annual * 15,
        ]
      }],
      plotOptions: {
        line: {
          enableMouseTracking: true
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginBottom: 20,
        itemStyle: {
          fontSize: '20px',
        }
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