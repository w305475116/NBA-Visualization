import React, {Component} from 'react';
import Profile from "./Profile"
import SearchBar from './SearchBar'

import nba from "../nba-client"
import DataViewContainer from "./DataViewContainer"
import {DEFAULT_PLAYER_INFO} from "../constants"

class Main extends Component {
    constructor(){
        super();
        this.state = {
            playerInfo : DEFAULT_PLAYER_INFO,
            // playerId : 201939
        }
    }


    componentDidMount() {
        window.nba = nba;
        this.loadPlayerInfo("Stephen Curry")
    }

    handleSelectPlayer = (playerName) =>{
        this.loadPlayerInfo(playerName);
    }

    loadPlayerInfo = (playerName) =>{
        nba.stats.playerInfo({ PlayerID: nba.findPlayer(playerName).playerId})
            .then((info) => {
                console.log(info);
                const playInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
                console.log(playInfo);
                this.setState({ playerInfo: playInfo });
            })
    }
    render() {
        return (
            <div className="main">
                <SearchBar handleSelectPlayer = {this.handleSelectPlayer} />
                <div className="player">
                    <Profile playerInfo = {this.state.playerInfo}/>
                    <DataViewContainer playerId = {this.state.playerInfo.playerId}/>
                </div>
            </div>
        );
    }
}

export default Main;