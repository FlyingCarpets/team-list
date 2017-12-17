import React from 'react';
import PropTypes from 'prop-types';

import './Heading.scss';

const Heading = ({ heading }) => (
    <div className="heading">
        <h1>{ heading }</h1>
    </div>
);

Heading.propTypes = {
    heading: PropTypes.string,
};

export default Heading;
