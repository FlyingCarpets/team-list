import React, { Component } from 'react';
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
            <div className="radio" onClick={ this.onSelectChoice }>

                { checked
                    ? <IconRadioChecked size={ 15 } />
                    : <IconRadio size={ 15 } />
                }

                { label }

            </div>
        );
    }
}

export default RadioButton;
