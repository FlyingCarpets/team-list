import React, { Component } from 'react';
import axios from 'axios';

import PageNotFound from '../../containers/PageNotFound/PageNotFound';

class MemberInner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            member: {},
            error: false,
            editMode: false,
        };

        this.handleEditMode = this.handleEditMode.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSaveUpdates = this.handleSaveUpdates.bind(this);
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

    handleEditMode() {
        this.setState({
            editMode: !this.state.editMode,
        });
    }

    handleInputChange(e) {
        this.setState({
            member: {
                ...this.state.member,
                [e.target.name]: e.target.value,
            }
        });
    }

    handleSaveUpdates() {
        const {
            member: {
                link,
            },
        } = this.state;

        axios.put(`/api/member/${link}?name=aaa`)
            .then(({ data }) => {
                this.setState({
                    member: data,
                    editMode: false,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderInputList() {
        const {
            member: {
                name,
                department,
            },
        } = this.state;

        return (
            <ul>
                <li>
                    <label>Name: </label>
                    <input
                        onChange={ this.handleInputChange }
                        value={ name }
                        name="name"
                        type="text"
                    />
                </li>
                <li>
                    <label>Department: </label>
                    <input
                        onChange={ this.handleInputChange }
                        value={ department }
                        name="department"
                        type="text"
                    />
                </li>
            </ul>
        )
    }

    renderPlainList() {
        const {
            member: {
                name,
                department,
            },
        } = this.state;

        return (
            <ul>
                <li>Name: { name }</li>
                <li>Department: { department }</li>
            </ul>
        )
    }

    render() {
        const {
            member: {
                name,
                image,
            },
            error,
            editMode,
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
                    { editMode
                        ? this.renderInputList()
                        : this.renderPlainList()
                    }

                    <button
                        onClick={ this.handleEditMode }
                        type="button"
                    >
                        Edit
                    </button>

                    <button
                        onClick={ this.handleSaveUpdates }
                        type="button"
                    >
                        Save
                    </button>
                </div>
            </div>
        )
    }
}

export default MemberInner;
