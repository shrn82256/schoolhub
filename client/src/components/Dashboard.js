import React, { Component } from "react";
import axios from "axios";
import classNames from "classnames";
import SchoolList from "./school/SchoolList";
import SchoolSearch from "./school/SchoolSearch";
import "./Dashboard.css";

const api_url = "http://schoolhub-heroku.herokuapp.com/";
// const api_url = "http://localhost:5000/";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schools: null,
      filteredSchools: null,
      theme: "teal"
    };
  }

  updateSchools = filteredSchools => {
    this.setState({
      ...this.state,
      filteredSchools
    });
    console.log("updated schools");
  };

  componentDidMount() {
    axios
      .get(api_url)
      .then(res => {
        const schools = res.data;
        console.log("done");
        this.setState({
          ...this.state,
          schools,
          filteredSchools: schools
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { schools, filteredSchools, theme } = this.state;

    return schools ? (
      <div>
        <section className="section container">
          <SchoolSearch
            schools={schools}
            updateSchools={this.updateSchools}
            {...{ theme }}
          />
          <SchoolList {...{ schools: filteredSchools, theme }} />
        </section>
      </div>
    ) : (
      <div
        id="loader-parent"
        style={{ height: window.innerHeight }}
        className=""
      >
        <div className="preloader-wrapper big active">
          <div className={classNames(`spinner-${theme}-only`, "spinner-layer")}>
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
