import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MemberListItem = ({ image, name, department, link }) => (
    <div>
        <Link to={ `/member/${link}` }>
            <img
                src={ image }
                alt={ name }
                className="img-responsive"
            />
            <div>{ name }</div>
            <div>{ department }</div>
        </Link>
    </div>
);

MemberListItem.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
    link: PropTypes.string,
};

export default MemberListItem;
