import React from "react";
import "./search.css";
import searchIcon from "./search.png";

export default class SearchBar extends React.Component {
    state = {
        query: ""
    };

    searchRequest = (query) => {
        this.setState({
            query
        });
        if (this.state.timer) {
            return;
        }
        const timer = setTimeout(() => {
            this.props.onSearch(this.state.query);
            this.setState({
                timer: null
            })
        }, 1000);
        this.setState({timer});
    };

    resetSearch = () => {
        this.props.onReset();
        this.setState({
            query: ""
        })
    };

    render() {
        let resetClasses = "reset-btn buttons";
        resetClasses += this.state.query ? "" : " hidden";
        return (
            <form className="search-form">
                <input type="text"
                       onChange={(e) => {this.searchRequest(e.target.value)}}
                       onSubmit={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                       }}
                       placeholder="Find Movies" value={this.state.query}/>
                <span className={resetClasses}
                      onClick={this.resetSearch}
                      title="reset search"> </span>
                <img className="buttons" src={searchIcon} alt="search" />
                <span className="buttons right-edge grid-mode" title="change to list"> </span>
            </form>
        )

    }
}