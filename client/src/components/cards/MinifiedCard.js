import React, { Component } from "react";
import classNames from "classnames";
import LinesEllipsis from "react-lines-ellipsis";
import ReactImageFallback from "react-image-fallback";
import SchoolPlaceholderImage from "../../assets/img/school_placeholder.png";
import "./cards.css";

const defaultFacilityText = "Facilities";

class MinifiedCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      facility: defaultFacilityText
    };
  }

  changeFacilityText = e => {
    this.setState({
      ...this.state,
      facility: e.currentTarget.dataset.facility
    });
  };

  resetFacilityText = () => {
    this.setState({
      ...this.state,
      facility: defaultFacilityText
    });
  };

  render() {
    const { school, theme, handleClick, facilityIcons } = this.props;

    const facilities = school.facilities.map(facility => (
      <span
        className={classNames(
          theme,
          "facility-fab btn-floating btn lighten-2 waves-effect waves-light"
        )}
        key={facility}
        data-facility={facility}
        onMouseEnter={this.changeFacilityText}
        onMouseLeave={this.resetFacilityText}
      >
        <i className={facilityIcons[facility]} />
      </span>
    ));

    return (
      <div className="card hoverable">
        <div className="card-image">
          {/* <img src={school.thumb} className="" /> */}
          <ReactImageFallback
            src={school.thumb}
            fallbackImage={SchoolPlaceholderImage}
            initialImage={SchoolPlaceholderImage}
          />
          <button
            className={classNames(
              theme,
              "card-info-button btn-floating halfway-fab waves-effect waves-light"
            )}
            onClick={handleClick}
            data-pid={school.pid}
          >
            <i className="fas fa-info" />
          </button>
        </div>
        <div className={classNames(theme, "card-content lighten-2 white-text")}>
          {/* <span className="card-title"> */}
          <LinesEllipsis
            className="card-title"
            text={school.name}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
          {/* </span> */}
        </div>
        <div className={classNames(theme, "card-tabs lighten-1")}>
          <ul
            className={classNames(
              theme,
              "tabs lighten-1 white-text tabs-fixed-width"
            )}
          >
            <li className="tab">
              <i className="fas fa-university" />
              &ensp;
              {school.board}
            </li>
            <li className="tab">
              <i className="fas fa-language" />
              &ensp;
              {school.medium}
            </li>
            <li className="tab">
              <i className="fas fa-venus-mars" />
              &ensp;
              {school.gender}
            </li>
          </ul>
        </div>
        <div className="card-content center-align">
          <h6 className="truncate">{this.state.facility}</h6>
          {facilities}
        </div>
      </div>
    );
  }
}

export default MinifiedCard;
