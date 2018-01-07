import React from 'react';
import PropTypes from 'prop-types';

const MemberBlock = ({ image, name, department, link }) => (
    <a href={ `/${link}` }>
        <img
            src={ image }
            alt={ name }
            className="img-responsive"
        />
        <div>{ name }</div>
        <div>{ department }</div>
    </a>
);

MemberBlock.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
    link: PropTypes.string,
};

export default MemberBlock;
