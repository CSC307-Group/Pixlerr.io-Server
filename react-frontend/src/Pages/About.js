import React from "react";
import "./about.scss";

export class About extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">About US</div>
        <div className="content">

          For internet communities who want to collaborate on a large art project
          <br></br>
          Pixlerr.io is a globally interactive art canvas that allows users to coordinate individual pixels to create images.
          <br></br>
          <br></br>
          Unlike r/place, which is only available a few days out of the year, our product  is available all the time.
        </div>
        <div className="footer">

        </div>
      </div>
    );
  }
}