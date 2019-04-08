import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import MinifiedCard from "../cards/MinifiedCard";
import DetailedCard from "../cards/DetailedCard";

const multiplier = 20;
const facilityIcons = {
  Library: "fas fa-book",
  Cafeteria: "fas fa-mug-hot",
  Hostel: "fas fa-hotel",
  "Sports Complex": "fas fa-table-tennis",
  Gym: "fas fa-dumbbell",
  "Hospital / Medical Facilities": "fas fa-stethoscope",
  "Shuttle Service": "fas fa-shuttle-van",
  Auditorium: "fas fa-american-sign-language-interpreting",
  "Convenience Store": "fas fa-store-alt",
  Labs: "fas fa-flask"
};

class SchoolList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      schools: this.props.schools,
      schoolModal: null,
      currentSchoolInModal: null,
      currentSchools: this.props.schools.slice(0, multiplier)
    };
  }

  loadSchools = page => {
    const { schools, currentSchools } = this.state;

    const schoolsAddition = schools
      ? schools.slice(page * multiplier, (page + 1) * multiplier)
      : [];

    const newCurrentSchools = currentSchools
      ? currentSchools.concat(schoolsAddition)
      : schoolsAddition;

    console.log("loadSchools", page);

    this.setState({
      ...this.state,
      currentSchools: newCurrentSchools
    });
  };

  static getDerivedStateFromProps(props, current_state) {
    return current_state.schools !== props.schools
      ? {
          ...current_state,
          schools: props.schools,
          currentSchools: props.schools.slice(0, multiplier)
        }
      : null;
  }

  handleClick = e => {
    console.log(e.currentTarget.dataset.pid);

    this.setState({
      ...this.state,
      currentSchoolInModal: this.state.schools.filter(
        school => parseInt(school.pid) === parseInt(e.currentTarget.dataset.pid)
      )[0]
    });

    this.state.schoolModal.open();
  };

  componentDidMount() {
    let schoolModalElement = window.document.querySelector(".school-modal");
    window.M.Modal.init(schoolModalElement, {});
    let schoolModal = window.M.Modal.getInstance(schoolModalElement);

    window.M.Materialbox.init(
      window.document.querySelectorAll(".materialboxed"),
      {}
    );

    this.setState({
      ...this.state,
      schoolModal
    });
  }

  render() {
    const { handleClick } = this;
    const { theme } = this.props;
    const { schools, currentSchools, currentSchoolInModal } = this.state;

    const schoolList = currentSchools.map(school => (
      <div className="col s12 m6 xl4" key={school.pid}>
        <MinifiedCard {...{ school, theme, handleClick, facilityIcons }} />
      </div>
    ));

    return (
      <div className="row">
        <InfiniteScroll
          pageStart={0}
          hasMore={
            schools &&
            currentSchools &&
            schools.length !== currentSchools.length
          }
          loadMore={this.loadSchools}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {schoolList}
        </InfiniteScroll>
        <DetailedCard
          school={currentSchoolInModal}
          {...{ theme, facilityIcons }}
        />
      </div>
    );
  }
}

export default SchoolList;
