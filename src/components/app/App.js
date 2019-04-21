import React from "react";
import Header from "../header/header.js";
import ListItem from "../list-item";
import SearchBar from "../search/search.js";

import "./App.css";
import MovieDb from "../../services/moviedb";

export default class App extends React.Component {

    state = {
        activeView: "trending"
    };

    api = new MovieDb("6894e1c0f5ba77055a8cfe46ddf13cec");

    getData = (...args) => {
        let selectedFun;
        const {activeView} = this.state;
        switch (activeView) {
            case "trending":
                selectedFun = this.api.getTrending;
                break;
            case "search":
                selectedFun = (...args) => {
                    const {query} = this.state;
                    return this.api.searchMovie(query, [...args])
                };
                break;
            default:
                selectedFun = this.api.getTrending;
        }
        return selectedFun([...args]);
    };

    onSearch = (query) => {
        this.setState({
            activeView: "search",
            query
        })
    };

    render() {
        return (
            <div>
                <Header />
                <SearchBar onSearch={this.onSearch} />
                <ListItem getData={this.getData} query={this.state.query} />
            </div>
        )
    }
}