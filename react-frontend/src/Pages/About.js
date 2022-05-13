import React from "react";
import "./about.scss";

export class About extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
          <div className="base-container" ref={this.props.containerRef}>
            <div className="header">About US</div>
            <div className="content">

            </div>
            <div className="footer">
              
            </div>
          </div>
        );
      }
    }