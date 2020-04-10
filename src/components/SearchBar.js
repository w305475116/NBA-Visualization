import React, {Component} from 'react';
import nba from "../nba-client";
import {Input, AutoComplete, Icon} from 'antd';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

const Option = AutoComplete.Option;

class SearchBar extends Component {
    state = {
        dataSource: [],
    }

    handleSearch = (value) =>{
        console.log(value);
        const players = nba.searchPlayers(value);
        console.log(players);
        this.setState({
            dataSource : !value ? [] : nba.searchPlayers(value).map(
                player => ({
                    fullName : player.fullName,
                    playerId : player.playerId
                })
            )
        })
    }

    onSelect = (value) => {
        this.props.handleSelectPlayer(value);
    }
    render() {
        const {dataSource} = this.state;
        const options = dataSource.map( (player) => (
            <Option key = {player.fullName} value = {player.fullName} className="player-option">
                <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`} alt="player-img"/>
                <span className="player-option-label">{player.fullName}</span>
            </Option>
            ));

        return (
            // onSearch is called every time a new char is typed,
            // in order to check what the input is at the moment
            // which fulfills autocomplete characteristics
            <AutoComplete
                className = "search-bar"
                dataSource={options}
                onSearch = {this.handleSearch}
                onSelect={this.onSelect}
                placeholder="Search NBA Player"
                size="large"
                optionLabelProp="value"
            >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        );
    }
}

export default SearchBar;