import React, { Component } from 'react';

class MemberBlock extends Component {
    render() {
        return (
            <div>
                <img src={ this.props.image } alt={ this.props.name } />
                <div>{ this.props.name }</div>
                <div>{ this.props.department }</div>
            </div>
        )
    }
}

export default MemberBlock;
