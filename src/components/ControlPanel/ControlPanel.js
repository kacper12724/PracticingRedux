import React, { Component } from 'react';
import { connect } from 'react-redux';
import ElementsList from '../ElementsList/ElementsList';
import * as actionTypes from '../../store/actions/actionTypes';
import Search from '../Search/Search';
import ElementsForm from '../ElementsForm/ElementsForm';

class ControlPanel extends Component {
    render() {
        return (
            <div>
                <ElementsForm />
                <ElementsList />
                <Search />
            </div>
        );
    }
}

export default ControlPanel;