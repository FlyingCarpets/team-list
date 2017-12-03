import React, { Component } from 'react';
import axios from 'axios';

import Heading from '../../components/Heading/Heading';
import MemberBlock from '../../components/MemberBlock/MemberBlock';

class TeamList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamMembers: [],
            filteredResults: [],
            filteredByCategory: '',
            searchPhrase: '',
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.getTeamList = this.getTeamList.bind(this);
        this.renderRadioChoices = this.renderRadioChoices.bind(this);
        this.onClearFilter = this.onClearFilter.bind(this);
        this.handleFilterByChoice = this.handleFilterByChoice.bind(this);
    }

    componentWillMount() {
        this.fetchTeamMembers();
    }

    fetchTeamMembers() {
        // axios.get('http://www.json-generator.com/api/json/get/cecBNngIbS?indent=2')
        axios.get('http://www.json-generator.com/api/json/get/ceguUtQmWa?indent=2')
            .then(response => {
                this.setState({
                    teamMembers: this.state.teamMembers.concat(response.data.team)
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleSearch(e) {
        const searchPhrase = e.target.value.trim();

        this.setState({
            searchPhrase
        });

        if ((searchPhrase.length < this.state.searchPhrase.length) && searchPhrase.length < 3) {
            this.setState({
                filteredResults: [],
            });
        } else {
            this.filterResults(searchPhrase.replace( / +/g, ' ' ), 'name');
        }
    }

    handleFilterByChoice(e) {
        const filterChoice = e.target.value.toLowerCase();

        this.setState({
            filteredByCategory: filterChoice,
        });

        this.filterResults(filterChoice, 'department');
    }

    filterResults(phrase, filterBy) {
        const {
            teamMembers,
            filteredResults,
            filteredByCategory,
        } = this.state;

        const teamList = filteredResults.length && filteredByCategory.length
            ? filteredResults
            : teamMembers;

        let team = [];

        teamList.map(item => {
            if (item[filterBy].toLowerCase().includes(phrase)) {
                team.push(item);
            }
        });

        this.setState({
            filteredResults: team,
        })
    }

    onClearFilter() {
        this.setState({
            filteredResults: [],
            filteredByCategory: '',
            searchPhrase: '',
        });
    }

    getTeamList() {
        const {
            teamMembers,
            filteredResults,
        } = this.state;

        if (filteredResults.length === 0) {
            return teamMembers;
        }

        return filteredResults;
    }

    renderRadioChoices() {
        const {
            teamMembers,
            filteredByCategory,
        } = this.state;

        const radioChoices = Array.from(
            new Set(teamMembers.map(({ department }) => department))
        );

        return (
            <div>
                <div>Filter by department:</div>
                { radioChoices.map(department =>
                    <div className="radio" key={ department } >
                        <label>
                            <input
                                onChange={ this.handleFilterByChoice }
                                value={ department }
                                checked={ filteredByCategory === department.toLowerCase() }
                                type="radio"
                                name="radioChoices"
                            />
                            { department }
                        </label>
                    </div>
                )}
            </div>
        );
    }

    render() {
        const {
            searchPhrase,
        } = this.state;

        return (
            <div className="container">
                <div className="team-list">
                    <Heading heading="Team"/>
                    <div>Search by name:</div>
                    <input
                        onChange={ this.handleSearch }
                        value={ searchPhrase }
                        type="text"
                        placeholder="Type name"
                    />

                    { this.renderRadioChoices() }

                    <button
                        type="text"
                        className="btn btn-default"
                        onClick={ this.onClearFilter }
                    >
                        Clear filter
                    </button>

                    <div className="row">
                        { this.getTeamList().map(item => {
                            return (
                                <div className="col-sm-3" key={ item.name }>
                                    <MemberBlock
                                        name={ item.name }
                                        department={ item.department }
                                        image={ item.image }
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamList;
