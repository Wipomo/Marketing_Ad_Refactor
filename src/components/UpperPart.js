import React from 'react';

class UpperPart extends React.Component {
    render() {
        return(
            <div className="UpperPart">
                <div className="textHolder">
                <p>You can save</p>
                <h1>$X,XXX</h1>
                <p>with 100% Clean Energy</p>
                </div>
                <div className="chartHolder">
                    <p>(placeholder for chart)</p>
                </div>
            </div>
        );
    }
}

export default UpperPart;