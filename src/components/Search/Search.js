import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as reducerTypes from '../../store/reducers/userElements';
import styles from './Search.module.css';
import Section from '../UI/Section';

class Search extends Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    render() {
        console.log(this.inputRef)
        return (
            <div className={styles.Search}>
                <Section>
                    <label className={styles.SearchLabel}>Filter by Title</label>
                    <input
                        className={styles.SearchInput}
                        ref={this.inputRef}
                        type="text"
                        value={this.inputRef.value}
                        onChange={event => this.props.onTextEntered(event.target.value)} />
                </Section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        enteredFilter: state.usrEl.enteredFilterText
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTextEntered: (text) => dispatch(reducerTypes.loadFilteredElementsFromDatabase(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);