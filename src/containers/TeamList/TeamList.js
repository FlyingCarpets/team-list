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
            filterApplied: false,
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.getTeamList = this.getTeamList.bind(this);
        this.renderRadioChoices = this.renderRadioChoices.bind(this);
        this.filterByChoice = this.filterByChoice.bind(this);
    }

    componentWillMount() {
        this.fetchTeamMembers();
    }

    fetchTeamMembers() {
        axios.get('http://www.json-generator.com/api/json/get/cfPvRvzUCW?indent=2')
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
        const startFilterAt = 2;

        if (searchPhrase.length > startFilterAt) {
            this.onListToFilter(searchPhrase);
        } else {
            this.setState({
                filteredResults: []
            })
        }
    }

    filterByChoice(e) {
        const filterChoice = e.target.value.toLowerCase();

        this.filterResults(filterChoice, this.state.teamMembers);
    }

    onListToFilter(phrase) {
        const {
            teamMembers,
            filteredResults,
        } = this.state;

        if (!this.state.filterApplied) {
            this.filterResults(phrase.replace( / +/g, ' ' ), teamMembers);
        } else {
            this.filterResults(phrase.replace( / +/g, ' ' ), filteredResults);
        }
    }

    filterResults(phrase, teamList) {
        let team = [];

        // TODO: enable seearch and radion button filtering work together
        // this.setState({
        //     filterApplied: true,
        // });

        teamList.map(item => {
            Object.values(item).reduce((obj, value) => {
                if (value.toLowerCase().includes(phrase)) {
                    team.push(item)
                }
            }, {})
        });

        this.setState({
            filteredResults: team,
        })
    }

    renderRadioChoices() {
        const {
            teamMembers,
        } = this.state;

        return (
            <div>
                <div>Filter by department:</div>
                { teamMembers.map(({ department }) =>
                    <div className="radio" key={ department } >
                        <label>
                            <input
                                onClick={ this.filterByChoice }
                                value={ department }
                                type="radio"
                                name="radioChoices"
                            />
                            { department }
                        </label>
                    </div>
                )}
            </div>
        )
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

    render() {
        return (
            <div className="container">
                <div className="team-list">
                    <Heading heading="Team"/>
                    <div>Search by name:</div>
                    <input type="text" placeholder="Type name" onChange={ this.handleSearch } />

                    { this.renderRadioChoices() }

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
