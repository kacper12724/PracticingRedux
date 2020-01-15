import * as actionTypes from '../actions/actionTypes';

const initialState = {
    elements: [],
    enteredFilterText: ''
}

const loadElementsSYNC = (loadedElements) => {
    return {
        type: actionTypes.LOAD, loadedElements: loadedElements
    };
}

export const loadIngredientsFromDatabase = () => {
    return (dispatch, getState) => {
        fetch('https://react-udemy-hooks.firebaseio.com/ingredients.json', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            let loadedElements = [...getState().usrEl.elements];
            for (const key in responseData) {
                loadedElements.push({ id: key, title: responseData[key].title, amount: responseData[key].amount })
            }
            dispatch(loadElementsSYNC(loadedElements));
        })
    }
}

const loadFilteredElementsSYNC = (loadedElements, enteredText) => {
    return {
        type: actionTypes.LOAD_FILTER, loadedElements: loadedElements, enteredFilterText: enteredText
    };
}

let timer = setTimeout(() => { });

export const loadFilteredElementsFromDatabase = (enteredText) => {
    clearTimeout(timer);
    return (dispatch, getState) => {
        timer = setTimeout(() => {
            const query = enteredText.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredText}"`;
            fetch('https://react-udemy-hooks.firebaseio.com/ingredients.json' + query)
                .then(response => response.json())
                .then(responseData => {
                    const loadedIngredients = [];
                    for (const key in responseData) {
                        loadedIngredients.push({
                            id: key,
                            title: responseData[key].title,
                            amount: responseData[key].amount
                        });
                    }
                    dispatch(loadFilteredElementsSYNC(loadedIngredients, enteredText));
                })
        }, 500)
    }
}

const removeElementSYNC = (newElements) => {
    return {
        type: actionTypes.DELETE, newElements: newElements
    }
}

export const removeElementFromDatabase = (id) => {
    return (dispatch, getState) => {
        fetch(`https://react-udemy-hooks.firebaseio.com/ingredients/${id}.json`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        }).then(response => response.json()
        ).then(responseData => {
            let newElements = getState().usrEl.elements.filter(element => element.id !== id)
            dispatch(removeElementSYNC(newElements));
        })
    }
}

const addElementToDatabaseSYNC = (element, id) => {
    return {
        type: actionTypes.ADD, newElement: { id: id, ...element }
    }
}

export const addElementToDatabase = (newElement) => {
    return (dispatch, getState) => {
        fetch('https://react-udemy-hooks.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(newElement),
            headers: { 'Content-type': 'application/json' }
        }).then(response => response.json()
        ).then(responseData => {
            dispatch(addElementToDatabaseSYNC(newElement, responseData.name))
        })
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD:
            return {
                ...state,
                elements: action.loadedElements
            }
        case actionTypes.DELETE:
            return {
                ...state,
                elements: action.newElements
            }
        case actionTypes.LOAD_FILTER:
            return {
                ...state,
                enteredFilterText: action.enteredFilterText,
                elements: action.loadedElements
            }
        case actionTypes.ADD:
            return {
                ...state,
                elements: [...state.elements, action.newElement]
            }

    }
    return state;
}
export default reducer;