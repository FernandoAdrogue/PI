import { useEffect, useState } from 'react'
import styles from './form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountries } from '../../redux/actions'
import axios from 'axios'
import { ERROR } from '../../redux/actions'
import Error from '../error/error'

const Form = () => {

    const {countries} = useSelector(state=>state)
    const {errors} = useSelector(state=>state)
    const {stateError} = errors
    const dispatch = useDispatch()
    const [error, setError] = useState({})
    const [countryMenu,setCountryMenu]= useState('')
    const [activity, setActivity] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
    })

    const [countriesSelect,setCountriesSelect]=useState([])
    
    const clearForm = () => {
        setActivity({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
        })
        setCountriesSelect([])
        setCountryMenu('')
    }

    
    const validateCreate = (activity,countriesSelect) => {
        const errors = {}
        if (activity.name.trim().length < 3) errors.name = true

        if (activity.difficulty === '') errors.difficulty = 'error'
        
        if (activity.duration === '') errors.duration = 'error'
        
        if (activity.season === '') errors.season = 'error'
        
        if (!countriesSelect[0]) errors.countries = 'error'
        
        return errors
    }
    
    const handleInput = (event) => {
        const {name,value} = event.target
        setActivity({
            ...activity,
            [name]: value
        })
    }
    
    const handleSelect = (event) => {
        const {value} = event.target
        const [id,image,name] = value.split(",")
        setCountryMenu(id)
        if (value !== 'countries') {
            if(countriesSelect.filter(element=>element[0]===value.split(",")[0]).length===0){
                setCountriesSelect(
                    [...countriesSelect, [id,image,name]]
                    )    
            }
        }
    }
        
    const handleCreate = (event) => async dispatch=>{
        try{
            event.preventDefault()
            const endpoint = 'http://localhost:3001/activities'
            await axios.post(endpoint, {activity:activity,countries:countriesSelect.map(element=>element[0])})
            clearForm()
        }catch(error){
            dispatch({
                type: ERROR,
                payload : error})
            }
    }
        
        const handleDelete = (event) => {
        const {value} = event.target
        const [id]= value.split(",")
        event.preventDefault()
        setCountriesSelect(
            [...countriesSelect].filter(element => element[0] !== id)
            )
    }
            
    useEffect(() => {
        if(!errors.stateError){
            setError(validateCreate(activity,countriesSelect))
            dispatch(getAllCountries())
        }
    }, [dispatch,activity,countriesSelect,errors])

    return (
    <div className={styles.principalContainer}>
        {stateError?<Error status={"500"} message={errors.error.message} description={"Fallo al crear la actividad"}/>
        :
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <h2 className={styles.title}>Create Activity</h2>
            </div>
            <form className={styles.form} onSubmit={handleCreate}>
                <div className={styles.itemList}>
                    <label className={styles.label} >Name</label>
                    <div className={styles.item}>
                        <input type="text" name="name" onChange={handleInput} className={styles.input} autoComplete='off' value={activity.name}/>
                        {error.name && <span className={styles.x} >❌</span>}
                    </div>
                    <label className={styles.label} >Difficulty</label>
                    <div className={styles.item}>
                        <select name="difficulty" onChange={handleInput} className={styles.input} value={activity.difficulty}>
                            <option value="">--Select Difficulty--</option>
                            <option value="1">⭐ ☆ ☆ ☆ ☆</option>
                            <option value="2">⭐⭐ ☆ ☆ ☆</option>
                            <option value="3">⭐⭐⭐ ☆ ☆</option>
                            <option value="4">⭐⭐⭐⭐ ☆</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                        {error.difficulty && <span className={styles.x} >❌</span>}
                    </div>
                    <label className={styles.label} >Duration</label>
                    <div className={styles.item}>
                        <input type="number" name="duration" onChange={handleInput} className={styles.input} min='1' max='100' value={activity.duration}/>
                        {error.duration && <span className={styles.x} >❌</span>}
                    </div>
                    <label className={styles.label} >Season</label>
                    <div className={styles.item}>
                        <select name="season" onChange={handleInput} className={styles.input} value={activity.season}>
                            <option value=''>--Select Season--</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                        </select>
                        {error.season && <span className={styles.x} >❌</span>}
                    </div>
                    <label className={styles.label} >Countries</label>
                    <div className={styles.item}>
                        <select name="country" onChange={handleSelect} className={styles.input} value={countryMenu}>
                            <option value='countries' >--Select Countries--</option>
                            {countries?.map((country, index) => <option key={index} value={[country.id,country.flag,country.name]}>{country.name}</option>)}
                        </select>
                        {error.countries && <span className={styles.x} >❌</span>}
                    </div>
                </div>
                <div>
                    {countriesSelect?.map((element, index) => 
                    <span key={index} className={styles.span} title={element[2]} style={{backgroundImage:`url(${element[1]})`, backgroundSize: '62px 28px', backgroundPosition:'left center', backgroundRepeat: 'no-repeat'}} value={element}>{element[0]}
                        <button onClick={handleDelete} className={styles.btnDelete} value={element}>x</button>
                    </span>)}
                </div>
                <div>
                    <button type="submit" className={styles.btn} hidden={Object.entries(error).length ? true : false}  >
                        <span className={styles.front}>Create</span>
                    </button>
                </div>
            </form>
        </div>
        }
    </div>
    )
}

export default Form 

