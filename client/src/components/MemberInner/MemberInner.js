import React, { Component } from 'react';
import axios from 'axios';

import PageNotFound from '../../containers/PageNotFound/PageNotFound';

class MemberInner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            member: {},
            error: false,
        };
    }

    componentDidMount() {
        const {
            match: {
                params: {
                    name,
                }
            },
        } = this.props;

        axios.get(`/api/member/${name}`)
            .then(({ data }) => {
                this.setState({
                    member: data,
                });
            })
            .catch(() => {
                this.setState({
                    error: true,
                });
            })
    }

    render() {
        const {
            member: {
                name,
                department,
                image,
            },
            error,
        } = this.state;

        if (error) {
            return <PageNotFound />
        }

        return(
            <div className="row">
                <div className="col-sm-4">
                    <img src={ image } className="img-responsive" alt={ name }/>
                </div>
                <div className="col-sm-8">
                    <ul>
                        <li>Name: { name }</li>
                        <li>Department: { department }</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default MemberInner;
