import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import * as userElementsReducer from '../../store/reducers/userElements';
import styles from './ElementsForm.module.css';
import Section from '../UI/Section';
//Wlasciciele nieruchomosci maja obowiazek:
//1) przylaczyc nieruchomosc do sieci kanalizacyjnej albo 
//2) wyposazyc nieruchomosc w zbiornik bezodplywowy lub przydomową oczyszczlanię ścieków
//3) udokumentować w formie umowy lub dowodów uiszczania opłat właściwe pozbywanie sie nieczystosci ciekłych z nieruchomosci

class ElementsForm extends Component {
    render() {
        return (
            <div className={styles.ElementsForm}>
                <Section>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        this.props.onAddElement(this.props.title, this.props.amount);
                    }}>
                        <div>
                            <label className={styles.ElementsFormLabel}>Title</label>
                            <input
                                className={styles.ElementsFormInput}
                                type="text"
                                id="title"
                                onChange={event => {
                                    this.props.onEnteredTitle(event.target.value);
                                }}></input>
                        </div>
                        <div>
                            <label className={styles.ElementsFormLabel}>Amount</label>
                            <input
                                className={styles.ElementsFormInput}
                                type="number"
                                id="amount"
                                onChange={event => {
                                    this.props.onEnteredAmount(event.target.value);
                                }}></input>
                        </div>
                        <button
                            className={styles.ElementsFormButton}
                            type="submit">Add element</button>
                    </form>
                </Section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        title: state.frmEl.enteredTitle,
        amount: state.frmEl.enteredAmount
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEnteredTitle: (text) => dispatch({ type: actionTypes.TYPE_TITLE, enteredTitle: text }),
        onEnteredAmount: (text) => dispatch({ type: actionTypes.TYPE_AMOUNT, enteredAmount: text }),
        onAddElement: (title, amount) => dispatch(userElementsReducer.addElementToDatabase({ title: title, amount: amount }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementsForm);