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
        this.onClearFilter = this.onClearFilter.bind(this);
        this.filterByChoice = this.filterByChoice.bind(this);
    }

    componentWillMount() {
        this.fetchTeamMembers();
    }

    fetchTeamMembers() {
        axios.get('http://www.json-generator.com/api/json/get/cecBNngIbS?indent=2')
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
                filteredResults: [],
                filterApplied: false,
            });
        }
    }

    filterByChoice(e) {
        const filterChoice = e.target.value.toLowerCase();

        this.filterResults(filterChoice, 'department');

        // this.setState({
        //     filterApplied: true,
        // })
    }

    onListToFilter(phrase) {
        this.filterResults(phrase.replace( / +/g, ' ' ), 'name');
    }

    filterResults(phrase, filterBy) {
        const {
            teamMembers,
            filteredResults,
        } = this.state;

        let team = [];
        const teamList = filteredResults.length
            ? filteredResults
            : teamMembers;

        teamList.map(item => {
             if (item[filterBy].toLowerCase().includes(phrase)) {
                team.push(item);
            }
        });

        this.setState({
            filteredResults: team,
        })
    }

    renderRadioChoices() {
        const {
            teamMembers,
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
        );
    }

    onClearFilter() {
        const {
            filterApplied,
        } = this.state;

        // if (filterApplied) {

            this.setState({
                filteredResults: [],
                filterApplied: false,
            });

        // }
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
