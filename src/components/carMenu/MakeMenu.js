import React from 'react';
import MakeOption from './MakeOption';

class MakeMenu extends React.Component {
    render(){
        return(
            <div>
                <select onChange={this.props.setMake} >
                    <option value='make'>Make...</option>
                    {Object.keys(this.props.makeMenu).map(key => <MakeOption
                        key={key}
                        value={key}
                    />)}
                </select>
            </div>
        );
    }
}

export default MakeMenu;