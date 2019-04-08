import React from "react";
import classNames from "classnames";
import "./cards.css";

const DetailedCard = ({ school, theme, facilityIcons }) => {
  console.log(school);

  return school ? (
    <div className="school-modal modal modal-fixed-footer">
      <div className="modal-content">
        <img className="materialboxed" width="100%" src={school.banner} />
        <br />
        <h4 className="center-align">{school.name}</h4>
        <p className="text-justify">{school.about}</p>
        <div className="row">
          <div className="col s12 m12">
            <h5 className="center-align">Facilities</h5>
            <div className="row">
              <div className="col s12 m6">
                <ul className="collection">
                  {school.facilities
                    .slice(0, Math.ceil(school.facilities.length / 2))
                    .map((facility, i) => (
                      <li className="collection-item" key={i}>
                        <i className={facilityIcons[facility]} />
                        &emsp;
                        {facility}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="col s12 m6">
                <ul className="collection">
                  {school.facilities
                    .slice(
                      Math.ceil(school.facilities.length / 2),
                      school.facilities.length
                    )
                    .map((facility, i) => (
                      <li className="collection-item" key={i}>
                        <i className={facilityIcons[facility]} />
                        &emsp;
                        {facility}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col s12 m6">
            <h5 className="center-align">Address Details</h5>
            <ul className="collection">
              <li className="collection-item">
                <i className="fas fa-map-marker-alt" />
                &emsp;
                {school.address}
              </li>
            </ul>
          </div>
          <div className="col s12 m6">
            <h5 className="center-align">Contact Details</h5>
            <ul className="collection">
              {school.contact.map((item, i) => (
                <li className="collection-item" key={i}>
                  <i className="fas fa-phone" />
                  &emsp;
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          className={classNames("waves-" + theme, "waves-effect btn-flat")}
        >
          <i className="fas fa-university" />
          &ensp;
          {school.board}
        </button>
        <button
          className={classNames("waves-" + theme, "waves-effect btn-flat")}
        >
          <i className="fas fa-language" />
          &ensp;
          {school.medium}
        </button>
        <button
          className={classNames("waves-" + theme, "waves-effect btn-flat")}
        >
          <i className="fas fa-venus-mars" />
          &ensp;
          {school.gender}
        </button>
      </div>
    </div>
  ) : (
    <div className="school-modal modal">
      <div className="modal-content">
        <img className="materialboxed" width="0" />
        Select a school
      </div>
    </div>
  );
};

export default DetailedCard;
