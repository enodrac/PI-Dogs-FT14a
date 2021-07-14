import axios from 'axios';

export const SET_DOGS = 'SET_DOGS';
export const SET_DETAIL = 'SET_DETAIL';
export const SET_TEMPERAMENTS = 'SET_TEMPERAMENTS';
export const RESET_DETAIL = 'RESET_DETAIL';
export const SET_USER = 'SET_USER';

export function getDogs(temps, orderby, what) {
    if (temps instanceof Array) {
        return (dispatch) => {
            axios
                .get(`http://localhost:3001/dogs?temps=${temps}`)
                .then((response) => dispatch({type: SET_DOGS, payload: response.data}))
                .catch((err) => console.log('error get 1'));
        };
    } else {
        return (dispatch) => {
            axios
                .get(`http://localhost:3001/dogs?orderby=${orderby}&what=${what}`)
                .then((response) => dispatch({type: SET_DOGS, payload: response.data}))
                .catch((err) => console.log('error get 2'));
        };
    }
}

export function getDetail(breedId) {
    return (dispatch) => {
        axios
            .get(`http://localhost:3001/dogs/${breedId}`)
            .then((response) => dispatch({type: SET_DETAIL, payload: response.data}))
            .catch((err) => console.log('error get 3'));
    };
}

export function getTemperaments() {
    return (dispatch) => {
        axios
            .get(`http://localhost:3001/temperament`)
            .then((response) => dispatch({type: SET_TEMPERAMENTS, payload: response.data}))
            .catch((err) => console.log('error get 4'));
    };
}

export function resetDetail() {
    return (dispatch) => {
        dispatch({type: RESET_DETAIL, payload: {}});
    };
}

export function getUser({email, password}) {
    return (dispatch) => {
        axios
            .get(`http://localhost:3001/user?email=${email}&password=${password}`)
            .then((response) => dispatch({type: SET_USER, payload: response.data}))
            .catch((err) => console.log('error get 3'));
    };
}

//GET
////////////////////////////////////////////////////////////////////////////////////////////////////////
//POST

export function createDog(dog) {
    axios.post(`http://localhost:3001/dogs`, dog);
}

export function createUser(user) {
    console.log('ACTION', user);
    axios.post(`http://localhost:3001/user`, user);
}

//POST
////////////////////////////////////////////////////////////////////////////////////////////////////////
//PUT

export function updateDog() {}

//PUT
////////////////////////////////////////////////////////////////////////////////////////////////////////
//DELETE

export function deleteDog(breedId) {
    axios.delete(`http://localhost:3001/dogs/${breedId}`);
}
