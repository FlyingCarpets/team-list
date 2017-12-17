import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RadioButton from '../../components/RadioButton/RadioButton';

class SearchControls extends Component {
    constructor(props) {
        super(props);

        this.renderRadioChoices = this.renderRadioChoices.bind(this);
        this.onCategorySearch = this.onCategorySearch.bind(this);
    }

    onCategorySearch(value) {
        const {
            handleCategorySearch,
        } = this.props;

        handleCategorySearch(value);
    }

    renderRadioChoices() {
        const {
            teamMembers,
            filterByCategory,
            onClearCategories,
        } = this.props;

        const radioChoices = Array.from(
            new Set(teamMembers.map(({ department }) => department)),
        );

        return (
            <div>
                <div>Filter by department:</div>
                <div>
                    { radioChoices.map(department =>
                        <RadioButton
                            label={ department }
                            value={ department }
                            onSelect={ this.onCategorySearch }
                            checked={ filterByCategory === department.toLowerCase() }
                            key={ department }
                        />,
                    )}
                    <RadioButton
                        onSelect={ onClearCategories }
                        checked={ !filterByCategory.length }
                        label="All"
                    />
                </div>
            </div>
        );
    }

    render() {
        const {
            searchPhrase,
            handleKeywordSearch,
            clearAllFilters,
        } = this.props;

        return (
            <div>
                <div>Search by name:</div>
                <input
                    onChange={ handleKeywordSearch }
                    value={ searchPhrase }
                    type="text"
                    placeholder="Type name"
                />

                { this.renderRadioChoices() }

                <button
                    type="text"
                    className="btn btn-default"
                    onClick={ clearAllFilters }
                >
                    Clear all filters
                </button>
            </div>
        );
    }
}

SearchControls.propTypes = {
    handleCategorySearch: PropTypes.func,
    teamMembers: PropTypes.array,
    filterByCategory: PropTypes.string,
    onClearCategories: PropTypes.func,
    searchPhrase: PropTypes.string,
    handleKeywordSearch: PropTypes.func,
    clearAllFilters: PropTypes.func,
};

export default SearchControls;
