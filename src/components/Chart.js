import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class Chart extends React.Component {
  render() {
   // console.log(this.props.chartData);
    
    const { Baseline, Economy, Intermediate, Premium, Compact, Standard } = this.props.chartData;

    const options = {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Savings Over Time',
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
      
      //colors: ['#6CF', '#39F', '#06C', '#036'],
      //colors: ['#379AE8', '#48C06D', '#F0D149', '#F04E53'],
      //colors: ['#000000', '#F3BE24', '#E4005D', '#76DDF4', '#379AE8', '#48C06D'],
      colors: ['#ff0000','#8B008B','#000000','#ffff00','#379AE8', '#00b050'],

      series: [{
        name: "Baseline Energy Cost",
        data: Baseline.data,
        dashStyle: 'longdash',
        marker: {
          //lineWidth: 2,
          symbol: "triangle-down",
          radius: 6
        },
      },{
        name: "Economy (Payback "+ Economy.payback.toPrecision(2) +" Years)",
        data: Economy.data,
        dashStyle: 'shortdot',
        marker: {
          //lineWidth: 2,
          symbol: "square",
          radius: 4
        },
      }, {
        name: "Compact (Payback "+ Economy.payback.toPrecision(2) +" Years)",
        data: Compact.data,
        dashStyle: 'shortdash',
        marker: {
          //lineWidth: 2,
          symbol: "diamond",
          radius: 6
        }

      }, {
        name: "Intermediate (Payback "+ Intermediate.payback.toPrecision(2) +" Years)",
        data: Intermediate.data,
        dashStyle: 'solid',
        marker: {
          fillColor: '#0000ff',
          //lineWidth: 2,
          symbol: "square",
          radius: 6
        },
      }, {
        name: "Standard (Payback "+ Economy.payback.toPrecision(2) +" Years)",
        data: Standard.data,
        dashStyle: 'longdash',
        marker: {
          //lineWidth: 2,
          symbol: "circle",
          radius: 6
        }
      },{
        name: "Premium (Payback "+ Premium.payback.toPrecision(2) +" Years)",
        data: Premium.data,
        dashStyle: 'shortdot',
        marker: {
          symbol: "triangle",
          radius: 6
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
        itemDistance: 100
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
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    );
  }
}

export default Chart;
