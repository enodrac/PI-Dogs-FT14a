import {SET_DETAIL, SET_DOGS, SET_TEMPERAMENTS, RESET_DETAIL, SET_USER, SET_FAVORITES} from '../actions';

const initialState = {
    dogs: [],
    detail: {},
    temperaments: [],
    user: {},
    favorites: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DOGS:
            return {...state, dogs: action.payload};
        case SET_TEMPERAMENTS:
            return {...state, temperaments: action.payload};
        case SET_DETAIL:
            return {...state, detail: action.payload};
        case RESET_DETAIL:
            return {...state, detail: action.payload};
        case SET_USER:
            return {...state, user: action.payload};
        case SET_FAVORITES:
            return {...state, favorites: action.payload};
        default:
            return {...state};
    }
}
