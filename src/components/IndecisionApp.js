import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {

    state = {
        options: [],
        selectedOption: undefined
    };

    componentDidMount() {
        try {
            const readOptions = localStorage.getItem('options');
            const options = JSON.parse(readOptions);
    
            if(options) {
                this.setState(() => ({ options }))
            } 
        } catch (error) {
            return error.message;    
        }
                
    }

    componentDidUpdate(prevProps, prevState) {
        const { options } = this.state;
        if (prevState.options.length !== options.length) {
            const json = JSON.stringify(options);
            localStorage.setItem('options', json);
        }
    }

    handleClearSelectedOption = () => {
        this.setState({ selectedOption: undefined });
    }

    handleDeleteOptions = () => {
        this.setState({ options: [] });
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState(prevState => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            }) 
        }))
    }

    handlePick = () => {
        const {options} = this.state;
        const randomNum = Math.floor(Math.random() * options.length);
        const option = options[randomNum];
        this.setState({
            selectedOption: option
        })
    }

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }))
            
    }

    render() {
        const title = "Indecision";
        const subtitle = "Put your life in the hands of a computer";
        const { options, selectedOption } = this.state;
        return (
            <React.Fragment>
                <Header title={title} subtitle={subtitle} />
                <div className="container">
                    <Action 
                        hasOptions={options.length > 0}
                        handlePick={this.handlePick} 
                    />
                    <div className="widget">
                        <Options 
                            options={options}
                            handleDeleteOptions={this.handleDeleteOptions} 
                            handleDeleteOption={this.handleDeleteOption} 
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>                
                <OptionModal 
                    selectedOption={selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </React.Fragment>
        );
    }
}

export default IndecisionApp;