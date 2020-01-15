import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userElementsReducer from '../../store/reducers/userElements';
import styles from './ElementsList.module.css';

class ElementsList extends Component {
    componentDidMount() {
        this.props.onLoadElements();
    }

    render() {
        console.log("xd + " + this.props.userElements)
        return (
            <section>
                <h2>Loaded elements!</h2>
                <ul className={styles.ElementsListUl}>
                    {this.props.userElements.map(el => (
                        <li
                            className={styles.ElementsListLi}
                            key={el.id} onClick={() => this.props.onDeleteElement(el.id)}>
                            <span>{el.title}</span>
                            <br />
                            <span>{el.amount}</span>
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}


const mapStateToProps = state => {
    return {
        userElements: state.usrEl.elements
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadElements: () => dispatch(userElementsReducer.loadIngredientsFromDatabase()),
        onDeleteElement: (id) => dispatch(userElementsReducer.removeElementFromDatabase(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ElementsList);