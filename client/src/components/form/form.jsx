import { useEffect, useState } from 'react'
import styles from './form.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountries } from '../../redux/actions'
import axios from 'axios'


const Form = () => {

    const {countries} = useSelector(state=>state)
    
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
        if (activity.name.length < 3) errors.name = true

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
        const [id,image] = value.split(",")
        setCountryMenu(id)
        if (value !== 'countries') {
            setCountriesSelect(
                [...countriesSelect, [id,image]]
                )
            }
        console.log(countriesSelect);
    }
        
    const handleCreate = (event) => {
        console.log({activity:activity,countries:countriesSelect})
        event.preventDefault()
        const endpoint = 'http://localhost:3001/activities'
        axios.post(endpoint, {activity:activity,countries:countriesSelect.map(element=>element[0])})
        clearForm()
    }
        
    const handleDelete = (event) => {
        const {value} = event.target
        const [id]= value.split(",")
        console.log(value[0]);
        console.log(countriesSelect);
        event.preventDefault()
        setCountriesSelect(
            [...countriesSelect].filter(element => element[0] !== id)
            )
    }
            
    useEffect(() => {
        setError(validateCreate(activity,countriesSelect))
        dispatch(getAllCountries())
    }, [dispatch,activity,countriesSelect])

    return (
    // <div className={styles.container}>
    //      <form className={styles.form} onSubmit={handleCreate} >
    //                 <div className={styles.fields}>
    //                     <h2 className={styles.title}>Create Activity</h2>
    //                     <div className={styles.column}>
    //                         <div className={styles.div}>
    //                             <label className={styles.label} >Name</label>
    //                             <input type="text" name="name" onChange={handleInput} className={styles.input} autoComplete='off' value={activity.name}/>
    //                         </div>
    //                         {error.name && <span className={styles.x} >❌</span>}
    //                     </div>
    //                     <div className={styles.column}>
    //                         <div className={styles.div} >
    //                             <label className={styles.label} >Difficulty</label>
    //                             <select name="difficulty" onChange={handleInput} className={styles.input} value={activity.difficulty}>
    //                                 <option value="">--Select Difficulty--</option>
    //                                 <option value="1">⭐ ☆ ☆ ☆ ☆</option>
    //                                 <option value="2">⭐⭐ ☆ ☆ ☆</option>
    //                                 <option value="3">⭐⭐⭐ ☆ ☆</option>
    //                                 <option value="4">⭐⭐⭐⭐ ☆</option>
    //                                 <option value="5">⭐⭐⭐⭐⭐</option>
    //                             </select>
    //                         </div>
    //                         {error.difficulty && <span className={styles.x} >❌</span>}
    //                     </div>
    //                     <div className={styles.column}>
    //                         <div className={styles.div} >
    //                             <label className={styles.label} >Duration</label>
    //                             <input type="number" name="duration" onChange={handleInput} className={styles.input} min='1' max='100' value={activity.duration}/>
    //                         </div>
    //                         {error.duration && <span className={styles.x} >❌</span>}
    //                     </div>
    //                     <div className={styles.column}>
    //                         <div className={styles.div} >
    //                             <label className={styles.label} >Season</label>
    //                             <select name="season" onChange={handleInput} className={styles.input} value={activity.season}>
    //                                 <option value=''>--Select Season--</option>
    //                                 <option value="Summer">Summer</option>
    //                                 <option value="Autumn">Autumn</option>
    //                                 <option value="Winter">Winter</option>
    //                                 <option value="Spring">Spring</option>
    //                             </select>
    //                         </div>
    //                         {error.season && <span className={styles.x} >❌</span>}
    //                     </div>
    //                     <div className={styles.column}>
    //                         <div className={styles.div}>
    //                             <label className={styles.label} >Countries</label>
    //                             <select name="country" onChange={handleSelect} className={styles.input} value={countryMenu}>
    //                                 <option value='countries' >--Select Countries--</option>
    //                                 {countries?.map((country, index) => <option key={index} value={country.id}>{country.name}</option>)}
    //                             </select>
    //                         </div>
    //                         {error.countries && <span className={styles.x} >❌</span>}
    //                     </div>
    //                     <div className={styles.flagBox}>
    //                         {countriesSelect?.map((element, index) => 
    //                             <span key={index} className={styles.span} value={element}>{element}
    //                                 <button onClick={handleDelete} className={styles.btnDelete} value={element}>x</button>
    //                             </span>)}
    //                     </div>
    //                 </div>
    //                 <div className={styles.btnBox}>
    //                     <button type="submit" className={styles.btn} hidden={Object.entries(error).length ? true : false}  >
    //                         <span className={styles.front}>Create</span>
    //                     </button>
    //                 </div>
    //             </form>
    // </div>
    
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
                    {countries?.map((country, index) => <option key={index} value={[country.id,country.flag]}>{country.name}</option>)}
                </select>
                {error.countries && <span className={styles.x} >❌</span>}
            </div>
        </div>
        <div>
            {countriesSelect?.map((element, index) => 
            <span key={index} className={styles.span} style={{backgroundImage:`url(${element[1]})`, backgroundSize: '62px 28px', backgroundPosition:'left center', backgroundRepeat: 'no-repeat'}} value={element}>{element[0]}
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
    )

}

export default Form 

