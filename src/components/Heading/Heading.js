import React, { Component } from 'react';

import './Heading.scss';

class Heading extends Component {
    render() {
        return (
            <div className="heading">
                <h1>{ this.props.heading }</h1>
            </div>
        )
    }
}

export default Heading;
