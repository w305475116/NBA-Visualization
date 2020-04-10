import React, {Component} from 'react';
import ShotChart from './ShotChart';
import CounterSlider from "./CounterSlider"
import _ from 'lodash'
import { Radio, Row, Col, Switch} from 'antd';
class DataViewContainer extends Component {
    state = {
        minCount : 2,
        chartType : 'hexbin',
        displayToolTips : true
    }

    // function for child to pass its slider value
    onCountSliderChange = (count) => {
        console.log(count);
        this.setState({
            minCount : count
        });
        //every time mincount is changed, it will call render
    }
    onChartTypeChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            chartType: e.target.value,
        });
    };
    onSwitchChange = (checked) => {
        console.log(`switch to ${checked}`);// true or false
        this.setState({
            displayToolTips : checked
        });
    }
    render() {
        return (
            <div className="data-view">
                <ShotChart playerId= { this.props.playerId }
                           minCount={ this.state.minCount }
                           chartType = {this.state.chartType}
                           displayToolTips={ this.state.displayToolTips}

                />

                <div className = "filters">
                    {/*pass the function to the counterslider so that child can use*/}
                    {this.state.chartType === 'hexbin' ? <CounterSlider
                        value = {this.state.minCount}
                        onCountSliderChange = {_.debounce(this.onCountSliderChange, 500)}
                    /> : null}

                    <br/>
                    <Row>
                        <Col span = {12}>
                            <Radio.Group
                                onChange={this.onChartTypeChange}
                                value={this.state.chartType}>
                                <Radio value= "hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </Radio.Group>
                        </Col>
                        <Col span={5}>
                            <Switch
                                checkedChildren="On"
                                unCheckedChildren="Off"
                                defaultChecked
                                onChange={this.onSwitchChange}
                            />
                        </Col>

                    </Row>


                </div>


            </div>
        );
    }
}

export default DataViewContainer;