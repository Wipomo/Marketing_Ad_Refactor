import Highcharts from 'highcharts';
const NUMBER_OF_DAYS_IN_YEAR = 365;

export default class MakelloHighChart {
    constructor(chartContainer, data, minimum_year, maximum_year) {
        this.data = data;
        this.minimum_year = minimum_year;
        this.maximum_year = maximum_year;
        this.minimum_date = Date.UTC(minimum_year, 1, 1);
        this.maximum_date = Date.UTC(maximum_year, 1, 1);
        this.chart_container = chartContainer;
        this.createChart(chartContainer, data);
    }

    setData(data) {
        this.chart.series[0].setData(data, true);
        this.chart.xAxis[0].options.plotLines[0].value = this.dateOfBreakEven(data, this.minimum_year);
    }

    indexOfArrayCrossoverToZero(arrayOfData) {
        const [indexOfCrossOver] = arrayOfData.map((element, index) => {
            if (element >= 0 && index > 0) {
                let elementInPreviousIndex = arrayOfData[index - 1];
                if (elementInPreviousIndex < 0) {
                    let elementInPreviousIndexDistanceFromZero = Math.abs(elementInPreviousIndex);
                    return ((index - 1) + elementInPreviousIndexDistanceFromZero / (elementInPreviousIndexDistanceFromZero + element));
                }
            }
        }).filter(x => {
            if (x) {
                return true
            }
        });

        return indexOfCrossOver
    }

    dateOfBreakEven(data, minimum_year) {

        let yearOfCrossOver = minimum_year + this.indexOfArrayCrossoverToZero(data);
        let percentageThroughYear = yearOfCrossOver - Math.floor(yearOfCrossOver);
        let dayInYear = Math.floor(NUMBER_OF_DAYS_IN_YEAR * percentageThroughYear);
        let dateOfCrossover = new Date(Math.floor(yearOfCrossOver), 0);
        dateOfCrossover.setDate(dayInYear);

        return dateOfCrossover
    }

    createChart(containerString, data) {
        // data will be an array of values, [12121, 121212, 13123123...]

        this.chart = Highcharts.chart(containerString, {
            title: {
                text: 'Cumulative Cash Flow'
            },
            chart: {
                type: 'column'
            },
            xAxis: {
                min: this.minimum_date,
                max: this.maximum_date,
                allowDecimals: false,
                type: 'datetime',
                tickInterval: 1000 * 3600 * 24 * 365.24, //one year
                labels: {
                    rotation: 90
                },
                plotLines: [{
                    color: 'green', // Color value
                    id: 'break-even-line',
                    dashStyle: 'longdashdot', // Style of the plot line. Default to solid
                    value: this.dateOfBreakEven(this.data, this.minimum_year), // Value of where the line will appear
                    width: 2, // Width of the line
                    label: {
                        text: '<- Break Even', // Content of the label.
                        align: 'left', // Positioning of the label.
                        rotation: 0,

                        // Default to center.
                        //x: +10 // Amount of pixels the label will be repositioned according to the alignment.
                    }
                }]

            },
            yAxis: {
                title: {
                    text: '',
                    rotation: 0,
                    margin: 0
                },
                labels: {
                    formatter: function() {
                        if (this.value >= 0){
                            return `$${this.value}`;
                        }
                        else{
                            return `-$${(this.value)*(-1)}`
                        }
                    },
                    style: {
                        fontSize: 20
                    }
                }
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: this.minimum_date,
                    pointInterval: 1000 * 3600 * 24 * 365, //one year
                }
            },
            series: [{
                name: 'Cumulative Savings',
                data: this.data
            }],

        });
    }
}