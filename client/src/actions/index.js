import axios from 'axios';

export const SET_DOGS = 'SET_DOGS';
export const SET_DETAIL = 'SET_DETAIL';
export const SET_TEMPERAMENTS = 'SET_TEMPERAMENTS';

export function getDogs(name, orderby, what) {
    if (name instanceof Array) {
        return (dispatch) => {
            axios
                .get(`http://localhost:3001/dogs?temps=${name}`)
                .then((response) => dispatch({type: SET_DOGS, payload: response.data}))
                .catch((err) => console.log('error get 1'));
        };
    } else if (name) {
        return (dispatch) => {
            axios
                .get(`http://localhost:3001/dogs?name=${name}`)
                .then((response) => dispatch({type: SET_DOGS, payload: response.data}))
                .catch((err) => console.log('error get 2'));
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

//GET
////////////////////////////////////////////////////////////////////////////////////////////////////////
//POST

export function createDog(dog) {
    axios.post(`http://localhost:3001/dogs`, dog);
}
