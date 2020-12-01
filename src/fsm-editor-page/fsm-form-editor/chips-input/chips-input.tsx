import React from 'react';

interface IChipsInputProps {
    placeholder?: string;
    items?: string[];
    onDelete?: (item: string) => void;
    onAdd?: (item: string) => void;
}

class ChipsInput extends React.Component<IChipsInputProps> {
    state = {
        placeholder: this.props.placeholder,
        items: this.props.items || [] as string[],
        value: '',
        error: null
    };

    handleKeyDown = (evt: any) => {
        if (['Enter', 'Tab', ','].includes(evt.key)) {
            evt.preventDefault();

            var value = this.state.value.trim();

            if (value && this.isValid(value)) {
                this.setState({
                    items: [...this.state.items, this.state.value],
                    value: ''
                });
                if (this.props.onAdd) this.props.onAdd(this.state.value);
            }
        }
    };

    handleChange = (evt: any) => {
        this.setState({
            value: evt.target.value,
            error: null
        });
    };

    handleDelete = (item: string) => {
        this.setState({
            items: this.state.items.filter(i => i !== item)
        });
        if (this.props.onDelete) this.props.onDelete(item);
    };

    handlePaste = (evt: any) => {
        evt.preventDefault();

        var paste = evt.clipboardData.getData('text');
        var chips = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

        if (chips) {
            var toBeAdded = chips.filter((chip: string) => !this.isInList(chip));

            this.setState({
                items: [...this.state.items, ...toBeAdded]
            });
        }
    };

    isValid(chip: string) {
        let error = null;

        if (this.isInList(chip)) {
            error = `${chip} has already been added.`;
        }

        if (error) {
            this.setState({ error });

            return false;
        }

        return true;
    }

    isInList(chip: string) {
        return this.state.items.includes(chip);
    }

    render() {
        return (
            <>
                {this.state.items.map(item => (
                    <div className='chips-item unselectable' key={item}>
                        {item}
                        <button
                            type='button'
                            className='button'
                            onClick={() => this.handleDelete(item)}
                        >
                            &times;
                        </button>
                    </div>
                ))}

                <input
                    className={'chips-input ' + (this.state.error && ' has-error')}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                    onPaste={this.handlePaste}
                />

                {this.state.error && <p className='error'>{this.state.error}</p>}
            </>
        );
    }
}

export default ChipsInput;