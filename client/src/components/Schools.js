import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
// import Pagination from "react-js-pagination";
// import InfiniteScroll from 'react-infinite-scroller';


class Schools extends Component {
    state = {
        data: [],
        // activePage: 1,
    }

    // handlePageChange(PageNumber) {
    //     console.log(`active page is ${PageNumber}`);
    //     this.setState({
    //         activePage: PageNumber,
    //     })
    //     fetch("http://schoolhub-heroku.herokuapp.com/").then(res => res.json()).then(data =>
    //         this.setState({
    //             data: data.slice(PageNumber * 10 - 10, PageNumber * 10),
    //         })
    //     )
    // }
    componentDidMount() {
        fetch("http://schoolhub-heroku.herokuapp.com/").then(res => res.json()).then(data =>
            this.setState({
                data,
            })
        )
    }
    // loadFunc=()=>{
    //     console.log("loading")
    //     if(!this.state.flag){
    //         this.setState({
    //             loaded:this.state.data.slice(0,10),
    //         })
    //     }
    // }
    
    handleSearch(e){
        let curruntList = [];
        let newList =[];
        if(e.target.value !== ""){
            curruntList = this.state.data;
            newList = curruntList.filter(items=>{
                const cl = items.name.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return cl.includes(filter);
            })
        }else{
            newList = this.state.data;
        }
        this.setState({
            data:newList
        })
    }
    render() {
        console.log(this.props)
        const schoolList = this.state.data.map(res => {
            return (
                <div className="data" key={res.pid}>
                    <ul className="collections">
                        <li className="collections-item">
                            <div className="card horizontal">
                                <div className="card-image">
                                    <img src={res.thumb} alt="" />
                                </div>
                                <div className="card-stacked card-body">
                                    <div className="card-content">
                                        <div className="card-title">
                                            <NavLink to={'/SchoolDetails/' + res.id} >{res.name}</NavLink>
                                        </div>
                                        <p>{res.board}</p>
                                        <p>{res.medium}</p>
                                        <p>{res.gender}</p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            )
        })
        return (
            <div className="schools">
            <form action="">
                    <div className="input-field">
                    <label htmlFor="search" className="label-icon"><i class="material-icons">search</i></label>
                        <input type="search" id="search" onChange = {this.handleSearch.bind(this)}/>
                        <i class="material-icons">close</i>
                    </div>
                </form>
                {/* <InfiniteScroll
                    pageStart={0}
                    onClick={this.loadFunc}
                    hasMore={true || false}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                </InfiniteScroll> */}
                {schoolList}

                {/* <div className="center">
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                />
                </div> */}

            </div>

        )
    }
}
export default Schools;
