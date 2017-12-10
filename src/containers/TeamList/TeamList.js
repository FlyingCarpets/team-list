import React, { Component } from 'react';
import axios from 'axios';

import Heading from '../../components/Heading/Heading';
import MemberBlock from '../../components/MemberBlock/MemberBlock';

class TeamList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamMembers: [],
            filterByType: [],
            filterByCategory: '',
            searchPhrase: '',
        };

        this.getTeamList = this.getTeamList.bind(this);
        this.handleCategorySearch = this.handleCategorySearch.bind(this);
        this.handleKeywordSearch = this.handleKeywordSearch.bind(this);
        this.clearCategories = this.clearCategories.bind(this);
        this.clearAllFilters = this.clearAllFilters.bind(this);
        this.renderRadioChoices = this.renderRadioChoices.bind(this);
        this.renderTeamList = this.renderTeamList.bind(this);
    }

    componentDidMount() {
        this.fetchTeamMembers();
    }

    fetchTeamMembers() {
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

    handleCategorySearch(e) {
        let filters = this.state.filterByType;

        if (!filters.includes('department')) {
            filters.push('department');
        }

        this.setState({
            filterByCategory: e.target.value.toLowerCase(),
            filterByType: filters,
        });
    }

    handleKeywordSearch(e) {
        let filters = this.state.filterByType;

        if (!filters.includes('name')) {
            filters.push('name');
        }

        if (e.target.value === 0) {
            filters = filters.filter(value => value !== 'name');
        }

        this.setState({
            searchPhrase: e.target.value.toLowerCase(),
            filterByType: filters,
        });
    }

    getTeamList() {
        const {
            filterByType,
            filterByCategory,
            teamMembers,
            searchPhrase,
        } =this.state;

        switch (filterByType.length) {
            case(1):
                return teamMembers
                    .filter(member => member[filterByType]
                        .toLowerCase()
                        .includes(searchPhrase.length ? searchPhrase : filterByCategory));
            case(2):
                return teamMembers
                    .filter(member => member.department.toLowerCase() === filterByCategory)
                    .filter(member => member.name.toLowerCase().includes(searchPhrase));
            default: return teamMembers;
        }
    }

    clearCategories() {
        let filterTypes = this.state.filterByType;
        filterTypes = filterTypes.filter(item => item !== 'department');

        this.setState({
            filterByType: filterTypes,
            filterByCategory: '',
        });
    }

    clearAllFilters() {
        this.setState({
            filterByType: [],
            filterByCategory: '',
            searchPhrase: '',
        });
    }

    renderTeamList() {
        return (
            <div className="row">
                { this.getTeamList().length
                    ?
                    this.getTeamList().map(member => {
                        return (
                            <div className="col-sm-3" key={ member.name }>
                                <MemberBlock
                                    name={ member.name }
                                    department={ member.department }
                                    image={ member.image }
                                />
                            </div>
                        )
                    })
                    : <strong>No results</strong>
                }
            </div>
        )
    }

    renderRadioChoices() {
        const {
            teamMembers,
            filterByCategory,
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
                                onChange={ this.handleCategorySearch }
                                value={ department }
                                checked={ filterByCategory === department.toLowerCase() }
                                type="radio"
                                name="radioChoices"
                            />
                            { department }
                        </label>
                    </div>
                )}
                <div className="radio">
                    <label>
                        <input
                            onChange={ this.clearCategories }
                            type="radio"
                            checked={ !filterByCategory.length }
                        />
                        All
                    </label>
                </div>
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
                        onChange={ this.handleKeywordSearch }
                        value={ searchPhrase }
                        type="text"
                        placeholder="Type name"
                    />

                    { this.renderRadioChoices() }

                    <button
                        type="text"
                        className="btn btn-default"
                        onClick={ this.clearAllFilters }
                    >
                        Clear all filters
                    </button>

                    { this.renderTeamList() }

                </div>
            </div>
        )
    }
}

export default TeamList;
