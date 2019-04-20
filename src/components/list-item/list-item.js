import React from "react";
import ItemPreview from "../item-preview";
import MovieDb from "../../services/moviedb.js";

import "./main-list.css";

export default class ListItem extends React.Component {

    state = {
        ListItem: null
    };

    api = new MovieDb("6894e1c0f5ba77055a8cfe46ddf13cec");

    updateList = (page=1) => {
        if (this.state.requestSent) {
            return;
        }
        this.setState({
            requestSent: true
        });
        this.api.getTrending(page)
            .then((result) => {
                const oldList = this.state.ListItem;
                const newList = oldList ? [...oldList, ...result.results] : result.results;
                this.setState({
                    ListItem: newList,
                    page: result.page,
                    requestSent: false
                })
            })
    };

    loadMore = (e) => {
        const list = document.querySelector(".main-list");
        const progress = window.scrollY / list.clientHeight;
        if ( progress >= 0.9) {
            this.updateList(this.state.page+1);
        }
    };

    componentDidMount() {
        this.updateList();
        window.addEventListener("scroll", this.loadMore, false);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.loadMore, false);
    }
    render() {
        if (!this.state.ListItem) {
            return null;
        }
        const items = this.state.ListItem.map((item) => {
            return <ItemPreview item={item} key={item.id}/>
        });
        return (
            <div className="main-list">
                {items}
            </div>
        )
    }
}