import { SET_PAGE, ERROR,RESET_ERROR, GET_ALL_COUNTRIES, GET_COUNTRIES,GET_ACTIVITIES, GET_CONTINENTS, ORDER_ALFABETICO_ASC,ORDER_ALFABETICO_DES,ORDER_POPULATION_ASC,ORDER_POPULATION_DES,FILTER_ACTIVITIES,FILTER_CONTINENT,RESET_FILTER } from "./actions"

const initialState =  {
    countries:[],
    sortedCountries:[],
    activities:[],
    continents: [],
    errors: {
        stateError: false,
        error: null
    },
    pagination:{
        totalPages: 0,
        pageSelect : 1,
        pageCountries:[]
    }
}

export const reducer = (state = initialState,action)=>{
    switch (action.type) {
        case ERROR : return {
            ...state,
            errors:{
                stateError: true,
                error: action.payload
            }
        }
        case RESET_ERROR : return {
            ...state,
            errors:{
                stateError: false,
                error: null,
            }
        }
        case GET_ALL_COUNTRIES : return {
            ...state,
            countries: action.payload,
            sortedCountries: action.payload,
            pagination: {
                ...state.pagination,
                pageSelect:1,
                totalPages:Math.ceil(state.sortedCountries.length / 10),
                pageCountries: state.sortedCountries.slice(0,10)
            }
        }
        case GET_COUNTRIES : return {
            ...state,
            countries: action.payload,
            sortedCountries: action.payload,
            pagination: {
                ...state.pagination,
                pageSelect:1,
                totalPages:Math.ceil(state.sortedCountries.length / 10),
                pageCountries: state.sortedCountries.slice(0,10)
            }
        }
        case SET_PAGE : return {
            ...state,
            pagination: {
                ...state.pagination,
                pageSelect: action.payload,
                totalPages:Math.ceil(state.sortedCountries.length / 10),
                pageCountries: state.sortedCountries.slice((action.payload*10)-10,action.payload*10)
            }

        }
        case GET_ACTIVITIES : return {
            ...state,
            activities: action.payload
        }
        case GET_CONTINENTS : return {
            ...state,
            continents: [...new Set([...state.countries].map(country=>country.continent))]
        }

        case ORDER_ALFABETICO_ASC : return {
            ...state,
            countries: [...state.countries],
            sortedCountries: [...state.sortedCountries].sort((country,next)=>country.name.localeCompare(next.name)),
            pagination: {
                ...state.pagination,
                pageSelect:1,
                totalPages:Math.ceil(state.sortedCountries.length / 10),
                pageCountries: state.sortedCountries.slice(0,10)
            }
        }
        case ORDER_ALFABETICO_DES : return {
            ...state,
            countries: [...state.countries],
            sortedCountries: [...state.sortedCountries].sort((country,next)=>next.name.localeCompare(country.name)),
            pagination: {
                ...state.pagination,
                pageSelect:1,
                totalPages:Math.ceil(state.sortedCountries.length / 10),
                pageCountries: state.sortedCountries.slice(0,10)
            }
        }
        case ORDER_POPULATION_ASC : return {
            ...state,
            countries: [...state.countries],
            sortedCountries: [...state.sortedCountries].sort((country,next)=>country.population - next.population),
            pagination: {
                ...state.pagination,
                pageSelect:1,
                totalPages:Math.ceil(state.sortedCountries.length / 10),
                pageCountries: state.sortedCountries.slice(0,10)
            }
        }
        case ORDER_POPULATION_DES : return {
            ...state,
            countries: [...state.countries],
            sortedCountries: [...state.sortedCountries].sort((country,next)=>next.population - country.population),
            pagination: {
                ...state.pagination,
                pageSelect:1,
                totalPages:Math.ceil(state.sortedCountries.length / 10),
                pageCountries: state.sortedCountries.slice(0,10)
            }
        }

        case FILTER_CONTINENT : return {
            ...state,
            countries: [...state.countries],
            sortedCountries: [...state.sortedCountries]
                .filter( country => country.continent === action.payload),
            pagination: {
                ...state.pagination,
                pageSelect:1,
                totalPages:Math.ceil(state.sortedCountries.length / 10),
                pageCountries: state.sortedCountries.slice(0,10)
            }
        }
        
        case FILTER_ACTIVITIES : return {
            ...state,
            countries: [...state.countries],
            sortedCountries: [...state.sortedCountries]
                .filter( country =>country.activities.map(
                    activity=>activity.name
                    ).includes(action.payload)),
            pagination: {
                ...state.pagination,
                pageSelect:1,
                totalPages:Math.ceil(state.sortedCountries.length / 10),
                pageCountries: state.sortedCountries.slice(0,10)
            }
        }

        case RESET_FILTER :return {
            ...state,
            countries: [...state.countries],
            sortedCountries: [...state.countries],
            pagination: {
                ...state.pagination,
                pageSelect:1,
                totalPages:Math.ceil(state.sortedCountries.length / 10),
                pageCountries: state.sortedCountries.slice(0,10)
            }
        }

        default : return {
            ...state
        }
    }
}