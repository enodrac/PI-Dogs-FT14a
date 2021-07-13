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

export function handleSearch(e,dogsStore, setSelected){
    if(e.target.value.length){
        setSelected([...dogsStore.filter((dog) => dog.name.includes(e.target.value))])
    }
}

export function handleSelected(e, dogsStore, setSelected) {
    let aux;
    if (e.target.value !== 'All') {
        aux = dogsStore.filter((d) => d.created === e.target.value);
        setSelected([...aux]);
    } else {
        setSelected([...dogsStore]);
    }
}

export function handleAddTemp(e, temperament, dispatch, getDogs) {
    if (!temperament.includes(e.target.value) && e.target.value !== 'x') {
        let aux = temperament;
        aux.push(e.target.value);
        if (temperament.length) {
            dispatch(getDogs(temperament));
        }
    }
}

export function removeTemp(t, temperament, setTemperament, dispatch, getDogs) {
    let aux = temperament;
    let index = aux.indexOf(t);
    aux.splice(index, 1);
    setTemperament([...aux]);
    if (temperament.length) {
        dispatch(getDogs(temperament));
    } else {
        dispatch(getDogs('', 'ASC', 'name'));
    }
}

export function handleOrder(e, dispatch, getDogs) {
    let orderby = e.target.value;
    let what = 'name';
    if (e.target.value === 'weight_min') {
        what = e.target.value;
        orderby = 'ASC';
    } else if (e.target.value === 'weight_max') {
        what = e.target.value;
        orderby = 'DESC';
    }
    dispatch(getDogs('', orderby, what));
}

export function handleChangeItems(e, selected, setPag, pag) {
    let aux = pageCount(parseInt(e.target.value), selected);
    handlePages(1, parseInt(e.target.value), aux, selected, setPag, pag);
}

export function handlePages(what, items, aux, selected, setPag, pag) {
    let pageNumber;
    if (what === '-') pageNumber = pag.n - 1;
    else if (what === '+') pageNumber = pag.n + 1;
    else {
        pageNumber = what;
    }
    let end = items * pageNumber;
    let start = end - items;
    let page = selected.slice(start, end);
    if (page.length) setPag({...pag, pages: [...page], n: pageNumber, items, max: [...aux]});
}