import React from "react";
import Header from "../header/header.js";
import ListItem from "../list-item";

import "./App.css";

export default class App extends React.Component {


    render() {
        return (
            <div>
                <Header />
                <ListItem />
            </div>
        )
    }
}