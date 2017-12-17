import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconRadio from 'react-icons/lib/fa/circle-o';
import IconRadioChecked from 'react-icons/lib/fa/dot-circle-o';

class RadioButton extends Component {
    constructor(props) {
        super(props);

        this.onSelectChoice = this.onSelectChoice.bind(this);
    }

    onSelectChoice() {
        const {
            value,
            onSelect,
        } = this.props;

        onSelect(value);
    }

    render() {
        const {
            checked,
            label,
        } = this.props;

        return (
            <div
                className="radio"
                onClick={ this.onSelectChoice }
                onKeyDown={ this.onSelectChoice }
                role="radio"
                aria-checked={ checked }
                tabIndex={ 0 }
            >

                { checked
                    ? <IconRadioChecked size={ 15 } />
                    : <IconRadio size={ 15 } />
                }

                { label }

            </div>
        );
    }
}

RadioButton.propTypes = {
    value: PropTypes.string,
    onSelect: PropTypes.func,
    checked: PropTypes.bool,
    label: PropTypes.string,
};

export default RadioButton;
