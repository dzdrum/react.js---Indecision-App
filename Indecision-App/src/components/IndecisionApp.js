import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }

    handleSelectedOption = () => {
        this.setState(() => ({
            selectedOption: undefined
        }));
    }

    handleDeleteOptions = () => {
        this.setState(() => ({options: []}));
    };
    //use the .filter option so that we essentially check if that particular option
    //is in the array and if it is reverse that value (so its false) and that
    //therefore takes it out of the new array options
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    };

    handlePick =  () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
        }));
    };
    handleAddOption =  (option) => {
        if(!option) {
            return 'Enter valid value to add item';
        }
        else if(this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({options: prevState.options.concat([option])}));
    };
    

    componentDidMount() {
    //this is to catch an error where something invalid is typed into the options array and this
    //will keep the program from crashing
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

          if(options) {
            this.setState(() => ({options: options}));
          }
        } catch(e) {
        // do nothing at all
        }   
    }

    componentDidUpdate(preProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
    console.log('componentWillUnmount')
    }

    
    render() {
    const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle = {subtitle}/>
                <div className='container'>
                    <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                    />
                    <div className='widget'>
                        <Options 
                        options = {this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption 
                        handleAddOption = {this.handleAddOption}
                        />
                    </div>
                </div>

                <OptionModal 
                    selectedOption= {this.state.selectedOption}
                    handleSelectedOption = {this.handleSelectedOption}
                />
            </div>
        );
    }
}