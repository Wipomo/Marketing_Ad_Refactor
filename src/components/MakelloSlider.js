import React from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';



class MakelloSlider extends React.Component {

    componentDidMount = () => {

    }

    render() {
        let {min,max,step,onInput} = this.props;

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
          
        const sliderContainerStyle = {margin: 'auto', top: 0, left: 0, bottom: 0, right: 0, width: 500, height: 100 }
        const sliderStyle = { backgroundColor: 'white', height: 8};




        const Handle = Slider.Handle;

        const handle = (props) => {
            const { value, dragging, index, ...restProps } = props;

            return (
                <Tooltip
                    id="sliderHandle"
                    prefixCls="rc-slider-tooltip"
                    overlay={"$"+value}
                    visible={true}
                    defaultVisible = {true}
                    placement="bottom"
                    key={index}
                >
                    <Handle value={value} {...restProps} />
                </Tooltip>
            );
        };





        return(
            <div style={sliderContainerStyle}>
                <Slider marks={marks} trackStyle={sliderStyle} railStyle={sliderStyle} id="slider" min={min} max={max} defaultValue={this.props.monthlyBill}  handle={handle}  />
            </div>
        )
    }
}

export default MakelloSlider;