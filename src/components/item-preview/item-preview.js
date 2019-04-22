import React from "react";
import "./item-preview.css";
import star from "./star.jpg";

const ItemPreview = ({item, mode}) => {
    const {title, poster, releaseDate,
        overview, rating, voters } = item;
    let previewClasses = "preview-item";
    previewClasses += mode === "list" ? " list-preview" : "";

    return (
        <div className={previewClasses}>
            <div className="poster-container">
                <img src={poster} alt="poster" />
            </div>
            <div>
                <h2>{title}</h2>
                <div className="release-date">
                <div className="rating" title={`${rating} based on ${voters} user ratings`}>
                    <img src={star} alt="star" />
                    <p>{rating}</p>
                </div>
                <div><b>Released:</b> <span>{releaseDate}</span></div>
                </div>
                <p>{overview}</p>
            </div>
        </div>
    )
};

export default ItemPreview;