import React from 'react';

class YearMenu extends React.Component {
    render(){
        return(
            <div>
                <select onChange={this.props.setYear}>
                    <option value="year">Year...</option>
                    <option value='2019'>2019</option>
                    <option value='2018'>2018</option>
                    <option value='2017'>2017</option>
                    <option value='2016'>2016</option>
                    <option value='2015'>2015</option>
                    <option value='2014'>2014</option>
                    <option value='2013'>2013</option>
                    <option value='2012'>2012</option>
                </select>
            </div>
        );
    }
}

export default YearMenu;