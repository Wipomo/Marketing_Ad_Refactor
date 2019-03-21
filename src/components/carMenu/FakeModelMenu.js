import React from 'react';

class FakeModelMenu extends React.Component {
    render() {
        return(
            <div>
                <select className="form-control" disabled>
                    <option>Model...</option>
                </select>
            </div>
        );
    }
}

export default FakeModelMenu;