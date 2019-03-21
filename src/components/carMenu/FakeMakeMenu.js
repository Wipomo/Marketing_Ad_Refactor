import React from 'react';

class FakeMakeMenu extends React.Component {
    render(){
        return(
            <div>
                <select className="form-control" disabled>
                    <option value='make'>Make...</option>
                </select>
            </div>
        );
    }
}

export default FakeMakeMenu;