import React, { Component } from "react";
import Fuse from "fuse.js";
import { debounce } from "lodash";

class SchoolSearch extends Component {
  constructor(props) {
    super(props);

    this.fuse = new Fuse(this.props.schools, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      minMatchCharLength: 1,
      keys: [
        "name",
        "board",
        "medium",
        "gender",
        // "facilities",
        // "about",
        "address",
        "contact"
      ]
    });

    this.state = {
      searchSchool: ""
    };
  }

  raiseDoSearchWhenUserStoppedTyping = debounce(() => {
    const { schools, updateSchools } = this.props;
    const { searchSchool } = this.state;

    const result = this.fuse.search(searchSchool);

    updateSchools(searchSchool ? result : schools);
  }, 700);

  handleChange = e => {
    this.setState(
      {
        ...this.state,
        searchSchool: e.currentTarget.value
      },
      () => {
        this.raiseDoSearchWhenUserStoppedTyping();
      }
    );
  };

  render() {
    const { searchSchool } = this.state;
    // const { theme } = this.props;

    return (
      <div className="row">
        <div className="input-field col s12">
          <i className="fas fa-search prefix" />
          <input
            id="searchSchool"
            type="text"
            name="searchSchool"
            value={searchSchool}
            onChange={this.handleChange}
            className=""
          />
          <label htmlFor="searchSchool" className="">
            Search Schools...
          </label>
        </div>
      </div>
    );
  }
}

export default SchoolSearch;
