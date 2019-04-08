import React, { Component } from "react";
import axios from "axios";
import SchoolList from "./SchoolList";

class SchoolFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: null,
      board: null,
      board: null,
      board: null
    };
  }

  fetchAllSchools = () => {
    axios
      .get(api_url)
      .then(res => {
        this.setState({
          ...this.state,
          schools: res.data
        });
        console.log("updated schools");
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchAllSchools();
  }

  render() {
    const { schools } = this.state;

    return (
      <section className="section container">
        <SchoolList {...{ schools }} />
      </section>
    );
  }
}

export default SchoolFilter;
