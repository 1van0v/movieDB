import React from "react";
import logo from "./movie_logo.png";
import "./header.css";

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <span>My Movie DB</span>
                </div>
                <nav>
                    <button title="currently doesn't work" className="button">Movies</button>
                    <button title="currently doesn't work" className="button">TV</button>
                    <button title="currently doesn't work" className="button">Actors</button>
                </nav>
            </header>
        )
    }
}