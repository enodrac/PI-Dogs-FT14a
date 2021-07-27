import axios from 'axios';

export const SET_DOGS = 'SET_DOGS';
export const SET_DETAIL = 'SET_DETAIL';
export const SET_TEMPERAMENTS = 'SET_TEMPERAMENTS';
export const RESET_DETAIL = 'RESET_DETAIL';
export const SET_FAVORITES = 'SET_FAVORITES';

export function trick(dispatch, pag) {
    setTimeout(() => {
        dispatch({type: 'SET_PAG', payload: {...pag, c: 2, render: true}});
    }, 10);
}

export function getDogs(temps, how, what) {
    if (temps instanceof Array) {
        return (dispatch) => {
            axios
                .get(`/dogs?temps=${temps}`)
                .then((response) => dispatch({type: SET_DOGS, payload: response.data}))
                .catch((err) => console.log('error get 1', err));
        };
    } else {
        console.log('AAAAAAAAAAAAAAAA', how, what);
        return (dispatch) => {
            axios
                .get(`/dogs?how=${how}&what=${what}`)
                .then((response) => dispatch({type: SET_DOGS, payload: response.data}))
                .catch((err) => console.log('error get 2', err));
        };
    }
}

export function getDetail(breedId) {
    return (dispatch) => {
        axios
            .get(`/dogs/${breedId}`)
            .then((response) => dispatch({type: SET_DETAIL, payload: response.data}))
            .catch((err) => console.log('error get 3', err));
    };
}

export function getTemperaments() {
    return (dispatch) => {
        axios
            .get(`/temperament`)
            .then((response) => dispatch({type: SET_TEMPERAMENTS, payload: response.data}))
            .catch((err) => console.log('error get 4', err));
    };
}

export function resetDetail() {
    return (dispatch) => {
        dispatch({type: RESET_DETAIL, payload: {}});
    };
}

export async function getUser({email, password}) {
    return axios.get(`/user?email=${email}&password=${password}`);
}

export function getFavorites(name) {
    return (dispatch) => {
        axios
            .get(`/user/favorites?name=${name}`)
            .then((response) => dispatch({type: SET_FAVORITES, payload: response.data}))
            .catch((err) => console.log('error get 5', err));
    };
}

//GET
////////////////////////////////////////////////////////////////////////////////////////////////////////
//POST

export async function createDog(dog) {
    return axios.post(`/dogs`, dog);
}

export async function createUser(user) {
    return axios.post(`/user`, user);
}

export function addFavorite(breedId, name) {
    axios.post(`/user/add`, {breedId, name});
}

//POST
////////////////////////////////////////////////////////////////////////////////////////////////////////
//PUT

export function updateDog() {}

//PUT
////////////////////////////////////////////////////////////////////////////////////////////////////////
//DELETE

export function deleteDog(breedId) {
    axios.delete(`/dogs/${breedId}`);
}
