import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MemberBlock extends Component {
    render() {
        const {
            image,
            name,
            department,
        } = this.props;

        return (
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
    }
}

MemberBlock.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    department: PropTypes.string,
};

export default MemberBlock;
