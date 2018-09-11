import React from 'react';
import SavingsChart from './SavingsChart';

// import SavingsChart from "./components/landing_savings_page_top_section/landing_savings";

class Chart extends React.Component {
    render() {
        return(
            <SavingsChart monthlyBillingAmount={this.props.monthlyBillingAmount} />
        );
    }
}

export default Chart;