import React, { Component } from 'react';
import axios from 'axios';

class MemerInner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            member: {},
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
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const {
            member: {
                name,
                department,
                image,
            },
        } = this.state;

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

export default MemerInner;
