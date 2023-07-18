import axios from "axios"
export const GET_COUNTRIES = "GET_COUNTRIES"
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES"
export const GET_ACTIVITIES = "GET_ACTIVITIES"
export const GET_CONTINENTS = "GET_CONTINENTS"
export const FILTER_CONTINENT = "FILTER_CONTINENT"
export const FILTER_ACTIVITIES = "FILTER_ACTIVITIES"
export const ORDER_ALFABETICO_ASC="ORDER_ALFABETICO_ASC"
export const ORDER_ALFABETICO_DES="ORDER_ALFABETICO_DES"
export const ORDER_POPULATION_ASC="ORDER_POPULATION_ASC"
export const ORDER_POPULATION_DES="ORDER_POPULATION_DES"
export const RESET_FILTER = "RESET_FILTER"
export const ERROR = "ERROR"
export const RESET_ERROR = "RESET_ERROR"
export const SET_PAGE = "SET_PAGE"

export const getAllCountries = ()=> async dispatch => {
    const endpoint = 'http://localhost:3001/countries'
    try {
            const {data} = await axios(endpoint)
            return dispatch({
                type: GET_ALL_COUNTRIES,
                payload: data,
           })
    } catch (error) {
        return dispatch({
            type: ERROR,
            payload : error
       })
    }
}

export const getActivities = ()=> async dispatch =>{
    const endpoint = 'http://localhost:3001/activities'
    try {
            const {data} = await axios(endpoint)
            return dispatch({
                type: GET_ACTIVITIES,
                payload: data,
            })
    // eslint-disable-next-line no-unreachable
    } catch (error) {
        return dispatch({
            type: ERROR,
            payload : error
       })
    }
}

export const getCountries = (criterio) => async dispatch => {
    try {
        const endpoint = `http://localhost:3001/countries?name=${criterio}`
        const {data} = await axios(endpoint)
        return dispatch({
                type: GET_COUNTRIES,
                payload: data
            })
        }
    catch(error){
        return dispatch({
             type: ERROR,
             payload : error
        })
    }
}

export const setPage = (page) =>{
    return {
        type: SET_PAGE,
        payload: page
    }
}
    
export const resetError =() => {
    return {
        type: RESET_ERROR
    }
}

export const getContinents = () => {
    return {
        type: GET_CONTINENTS
    }
}

export const orderCountryAlf = (criterio) => {
    if(criterio === "DES") return {type: ORDER_ALFABETICO_DES}
    return {type: ORDER_ALFABETICO_ASC}

}
export const orderCountryPop = (criterio) => {
    if(criterio=== "DES") return {type: ORDER_POPULATION_DES}
    return {type: ORDER_POPULATION_ASC}

}

export const filterByContinent = (continent)=> {
    return {
        type: FILTER_CONTINENT,
        payload: continent
    }
}

export const filterByActivities = (activity)=> {
    return {
        type: FILTER_ACTIVITIES,
        payload: activity
    }
}

export const resetFilter = () => {
    return {
        type: RESET_FILTER
    }
}