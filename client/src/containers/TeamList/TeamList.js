import React, { Component } from 'react';
import axios from 'axios';

import Heading from '../../components/Heading/Heading';
import SearchControls from '../SearchControls/SearchControls';
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
        this.renderTeamList = this.renderTeamList.bind(this);
    }

    componentDidMount() {
        this.fetchTeamMembers();
        // TODO: remove
        // axios.get('/api/dogs')
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

        //    TODO:remove
        // axios.put('api/dogs/1?height=updatedHeight')
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }

    fetchTeamMembers() {
        axios.get('/api/team')
            .then(response => {
                console.log(response);
                this.setState({
                    teamMembers: this.state.teamMembers.concat(response.data),
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleCategorySearch(value) {
        const filters = this.state.filterByType;

        if (!filters.includes('department')) {
            filters.push('department');
        }

        this.setState({
            filterByCategory: value.toLowerCase(),
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
        } = this.state;

        switch (filterByType.length) {
            case (1):
                return teamMembers
                    .filter(member => member[filterByType]
                        .toLowerCase()
                        .includes(searchPhrase.length ? searchPhrase : filterByCategory));
            case (2):
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
                                    link={ member.link }
                                />
                            </div>
                        );
                    })
                    : <strong>No results</strong>
                }
            </div>
        );
    }

    render() {
        const {
            searchPhrase,
            teamMembers,
            filterByCategory,
        } = this.state;

        return (
            <div className="container">
                <div className="team-list">

                    <Heading heading="Team" />

                    <SearchControls
                        searchPhrase={ searchPhrase }
                        teamMembers={ teamMembers }
                        filterByCategory={ filterByCategory }
                        handleCategorySearch={ this.handleCategorySearch }
                        onClearCategories={ this.clearCategories }
                        handleKeywordSearch={ this.handleKeywordSearch }
                        clearAllFilters={ this.clearAllFilters }
                    />

                    { this.renderTeamList() }

                </div>
            </div>
        );
    }
}

export default TeamList;
