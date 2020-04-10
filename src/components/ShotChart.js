import React, {Component} from 'react';
import * as d3 from 'd3';
import nba from '../nba-client'
import { hexbin } from 'd3-hexbin';
import { court, shots } from 'd3-shotchart';
import PropTypes from 'prop-types';

window.d3_hexbin = {hexbin : hexbin};

class ShotChart extends Component {

    static propTypes ={
        playerId: PropTypes.number,
        minCount: PropTypes.number,
        chartType: PropTypes.string,
        displayToolTips: PropTypes.bool,
    }

    componentDidUpdate() {
        nba.stats.shots({
            PlayerID: this.props.playerId
        }).then((response)=>{// map: iterate through every object in the response
           const final_shots = response.shot_Chart_Detail.map(shot =>({
               x : (shot.locX + 250) / 10,
               y : (shot.locY + 50) / 10,
               action_type: shot.actionType,
               shot_distance: shot.shotDistance,
               shot_made_flag: shot.shotMadeFlag,
           }));
            const courtSelection = d3.select("#shot-chart");
            const chart_court = court().width(500);
            // console.log("mincount is %d", this.props.minCount);
            courtSelection.html('');
            const {minCount, displayToolTips, chartType } = this.props
            const chart_shots = shots().shotRenderThreshold(minCount).displayToolTips(displayToolTips).displayType(chartType);
            courtSelection.call(chart_court);
            courtSelection.datum(final_shots).call(chart_shots);

        });
    }

    render() {
        return (
            <div id="shot-chart"></div>
        );
    }
}

export default ShotChart;