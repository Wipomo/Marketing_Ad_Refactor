import React from 'react';

class YearMenu extends React.Component {
    render(){
        return(
            <div>
                <select
                    onChange={this.props.setYear}
                >
                    <option value="year">Year...</option>
                    <option value='ninteen'>2019</option>
                    <option value='eighteen'>2018</option>
                    <option value='seventeen'>2017</option>
                    <option value='sixteen'>2016</option>
                    <option value='fifteen'>2015</option>
                    <option value='fourteen'>2014</option>
                    <option value='thirteen'>2013</option>
                    <option value='twelve'>2012</option>
                </select>
            </div>
        );
    }
}

export default YearMenu;