import React from "react";
import ItemPreview from "../item-preview";

import "./main-list.css";

export default class ListItem extends React.Component {

    state = {
        ListItem: null
    };

    updateList = (page=1) => {
        if (this.state.requestSent) {
            return;
        }
        window.addEventListener("scroll", this.loadMore, false);
        this.setState({
            requestSent: true
        });
        //to clear previously stored data while changing the view
        if (page === 1) {
            this.setState({
                ListItem: null
            })
        }
        this.props.getData(page)
            .then((result) => {
                const oldList = this.state.ListItem;
                const newList = oldList ? [...oldList, ...result.results] : result.results;
                this.setState({
                    ListItem: newList,
                    page: result.page,
                    requestSent: false,
                    pages: result.total_pages
                })
            })
    };

    loadMore = (e) => {
        const {page, pages} = this.state;
        const progress = document.body.clientHeight - window.scrollY - window.innerHeight;
        if ( progress <= 200 && page < pages) {
            this.updateList(this.state.page+1);
        }
    };

    componentDidMount() {
        this.updateList();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.loadMore, false);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.query !== this.props.query) {
            this.updateList();
        }
    }

    render() {
        const {ListItem} = this.state;
        const {viewMode} = this.props;
        let listClass = viewMode === "list" ? "main-list-view" : "main-list-grid";
        if (!ListItem) {
            return null;
        }
        const items = ListItem.map((item) => {
            return <ItemPreview item={item} key={item.id} mode={viewMode}/>
        });
        return (
            <div className={listClass}>
                {items}
            </div>
        )
    }
}