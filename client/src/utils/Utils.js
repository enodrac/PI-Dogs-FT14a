/* eslint-disable array-callback-return */
export function pageCount(items, selected) {
    let aux = [];
    let count = 0;
    let page = [1];
    while (page.length) {
        if (!count) count = 1;
        let end = items * count;
        let start = end - items;
        page = selected.slice(start, end);
        aux.push(count);
        count++;
    }
    aux.pop();
    return aux;
}

export function handleSearch(e, dogsStore, selected, dispatch, pag) {
    if (e.target.value.length) {
        dispatch({type: 'SET_SELECTED', payload: selected.filter((dog) => dog.name.toLowerCase().includes(e.target.value.toLowerCase()))});
        dispatch({type: 'SET_PAG', payload: {...pag, c: 2, render: true}});
    } else {
        dispatch({type: 'SET_SELECTED', payload: dogsStore});
        dispatch({type: 'SET_PAG', payload: {...pag, c: 2, render: true}});
    }
}

export function handleAddTemp(e, temperament, dispatch, selected, pag) {
    if (!temperament.includes(e.target.value) && e.target.value !== 'x') {
        let aux = temperament;
        aux.push(e.target.value);
        if (temperament.length) {
            dispatch({
                type: 'SET_SELECTED',
                payload: selected.filter((dog) => {
                    let aux = dog.Temperaments.map((temp) => temp.name);
                    if (temperament.every((e) => aux.includes(e))) return dog;
                }),
            });
            dispatch({type: 'SET_PAG', payload: {...pag, c: 2, render: true}});
        }
    }
}

export function handleRemoveTemp(t, temperament, setTemperament, dispatch, dogsStore, pag) {
    let aux = temperament;
    let index = aux.indexOf(t);
    aux.splice(index, 1);
    setTemperament([...aux]);
    if (temperament.length) {
        dispatch({
            type: 'SET_SELECTED',
            payload: dogsStore.filter((dog) => {
                let aux = dog.Temperaments.map((temp) => temp.name);
                if (temperament.every((e) => aux.includes(e))) return dog;
            }),
        });
        dispatch({type: 'SET_PAG', payload: {...pag, c: 2, render: true}});
    } else {
        dispatch({type: 'SET_SELECTED', payload: dogsStore});
        dispatch({type: 'SET_PAG', payload: {...pag, c: 2, render: true}});
    }
}

export function handleSelected(e, dogsStore, dispatch, pag) {
    let aux;
    if (e.target.value !== 'All') {
        aux = dogsStore.filter((d) => d.created === e.target.value);
        dispatch({type: 'SET_SELECTED', payload: aux});
        dispatch({type: 'SET_PAG', payload: {...pag, c: 2, render: true}});
    } else {
        dispatch({type: 'SET_SELECTED', payload: dogsStore});
        dispatch({type: 'SET_PAG', payload: {...pag, c: 2, render: true}});
    }
}

export function handleOrder(e, dispatch, getSomething, pag) {
    if (e.target.value !== 'x') {
        let how = e.target.value;
        let what = 'name';
        if (e.target.value === 'weight_min') {
            what = e.target.value;
            how = 'ASC';
        } else if (e.target.value === 'weight_max') {
            what = e.target.value;
            how = 'DESC';
        }
        dispatch(getSomething('', how, what));
        dispatch({type: 'SET_PAG', payload: {...pag, c: 2, render: true}});
    }
}

export function handleChangeItems(e, selected, dispatch, pag) {
    let aux = pageCount(parseInt(e.target.value), selected);
    handlePages(1, parseInt(e.target.value), aux, selected, dispatch, pag);
}

export function handlePages(what, items, aux, selected, dispatch, pag) {
    let pageNumber;
    if (what === '-') pageNumber = pag.n - 1;
    else if (what === '+') pageNumber = pag.n + 1;
    else {
        pageNumber = what;
    }
    let end = items * pageNumber;
    let start = end - items;
    let page = selected.slice(start, end);
    if (page.length) dispatch({type: 'SET_PAG', payload: {...pag, pages: [...page], n: pageNumber, items, max: [...aux]}});
}

export function authenticate(history) {
    let user = sessionStorage.getItem('userName');
    if (user === null) {
        history.push('/home');
    }
}

export function notAuthenticate(history) {
    let user = sessionStorage.getItem('userName');
    if (user !== null) {
        history.push('/home');
    }
}
