import React from 'react';
import PropTypes from 'prop-types';

const MemberBlock = ({ image, name, department }) => (
    <div>
        <img
            src={ image }
            alt={ name }
            className="img-responsive"
        />
        <div>{ name }</div>
        <div>{ department }</div>
    </div>
);

MemberBlock.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
};

export default MemberBlock;
