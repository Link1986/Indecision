import React from 'react';

class AddOption extends React.Component {

    state = {
        error: undefined
    };

    handleAddOption = (e) => {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();

        const { handleAddOption } = this.props;
        const error = handleAddOption(option);
        
        this.setState({ error })
        
        if(!error) {
            e.target.elements.option.value = '';
        }
    }

    render() {
        const { error } = this.state;
        return (            
            <React.Fragment>
                {error && <p className="add-option-error">{error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="option" />
                    <button type="submit" className="button" >Add Option</button>
                </form>
            </React.Fragment>
        );
    }
}

export default AddOption;