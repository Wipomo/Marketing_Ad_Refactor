import React from 'react';
import SavingsChart from './SavingsChart';

class Chart extends React.Component {
    render() {
        return(
            <SavingsChart
                monthlyBill={this.props.monthlyBill}
            />
        );
    }
}

export default Chart;