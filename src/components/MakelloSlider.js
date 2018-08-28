import React from 'react';
import Slider from 'rc-slider';

class MakelloSlider extends React.Component {

    render() {
        let {min,max,step, onInput} = this.props;
        //console.log(onInput);
        min = parseInt(min, 10);
        max = parseInt(max, 10);
        step = parseInt(step, 10);
        const marksStyle = {
            fontFamily: 'Montserrat',
            color: '#1b30a5',
            fontSize: 16
          }; 
        const marks = {
            [min]: {
              style: marksStyle,
              label: <div>${min}</div>,
            },
            [max]: {
                style: marksStyle,
                label: <div>${max}</div>,
              }
          };
        const sliderContainerStyle = {margin: 'auto', top: 0, left: 0, bottom: 0, right: 0, width: 500 }
        const sliderStyle = { backgroundColor: 'white', height: 8};


        return(
            <div style={sliderContainerStyle}>
            <Slider marks={marks} trackStyle={sliderStyle} railStyle={sliderStyle} id="landing_p_slider" min={min} max={max} defaultValue={this.props.monthlyBill} step={step} handle={handle} onChange={onInput} />
            </div>
        )
    }
}

export default MakelloSlider;