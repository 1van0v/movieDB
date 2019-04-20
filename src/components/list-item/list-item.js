import React from "react";
import ItemPreview from "../item-preview";
import MovieDb from "../../services/moviedb.js";

import "./main-list.css";

export default class ListItem extends React.Component {

    state = {
        ListItem: null
    };

    componentDidMount() {
        const api = new MovieDb("6894e1c0f5ba77055a8cfe46ddf13cec");
        api.getTrending()
            .then((result) => {
                console.log(result)
                this.setState({
                    ListItem: result
                })
            })
    }
    render() {
        console.log("I am rendering ListItem");
        if (!this.state.ListItem) {
            return null;
        }
        const items = this.state.ListItem.map((item) => {
            return <ItemPreview item={item} key={item.id}/>
        });
        console.log(items);
        return (
            <div className="main-list">
                {items}
            </div>
        )
    }
}