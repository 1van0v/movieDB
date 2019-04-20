import React from "react";
import "./item-preview.css";

const ItemPreview = ({item}) => {
    const {id, title, poster, releaseDate,
        overview, genres, rating, voters } = item;
    return (
        <div className="preview-item">
            <div className="poster-container">
                <img src={poster} alt="poster" />
            </div>
            <h2>{title}</h2>
            <span title={`${rating} based on ${voters} user ratings`}>{rating}</span>
            <div>Release Date: <span>{releaseDate}</span></div>
            <p>{overview}</p>
        </div>
    )
};

export default ItemPreview;