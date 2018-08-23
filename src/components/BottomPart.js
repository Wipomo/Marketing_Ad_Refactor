import React from 'react';

class BottomPart extends React.Component {
    render() {
        return(
            <div className="bottomPart">
                <h2>Interested to see how much an electric car can increase savings?</h2>
                <div className="carMenus">
                <div className="carLeft">
                    <p>What is your weekly commute in miles?</p>
                    <input type="text" />
                    <p>How much MPG?</p>
                    <input type="text" />
                </div>
                <div className="carRight">
                    <p>Vehicle Type</p>
                    <select>
                        <option>Year</option>
                    </select>
                    <select>
                        <option>Make</option>
                    </select>
                    <select>
                        <option>Model</option>
                    </select>
                </div>
                </div>
                <button onClick={() => this.props.hideChanger('showThirdPart')}>Submit</button>
            </div>
        );
    }
}

export default BottomPart;