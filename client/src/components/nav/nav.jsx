import styles from './nav.module.css'
import { useLocation, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getActivities, getAllCountries, getContinents, orderCountryAlf, orderCountryPop, setPage} from "../../redux/actions"
import {getCountries, filterByActivities, filterByContinent, resetFilter } from '../../redux/actions'
import { memo, useEffect, useState } from 'react'

const Nav =()=> {
    const location = useLocation().pathname
    const dispatch = useDispatch()
    
    const navigate = useNavigate()

    const [valorSelect, setValorSelect] = useState({
        selectContinent:'',
        selectActivity:''
    })
    const [valueInput, setValueInput] = useState('')
    const [criterio, setCriterio] = useState({})
    const [cheked,setCheked] = useState(true)

    const {continents} = useSelector((state)=>state)
    const {activities} = useSelector((state)=>state)
    const {countries} = useSelector((state)=>state)

    const activitiesMenu = [...new Set([...activities.map(activity=>activity.name)])]
    
    
    const handleOrderALf = () =>{
        dispatch(orderCountryAlf(criterio.criterio))
    }

    const handleOrderPop = () =>{
        dispatch(orderCountryPop(criterio.criterio))
    }

    const handleFilterContinent = (event) =>{
        dispatch(resetFilter())
        const {value} = event.target
        setValorSelect({...valorSelect,
            selectContinent:value,
            selectActivity:''
        })
        dispatch(filterByContinent(value))
    }

    const handleFilterActivities = (event) =>{
        dispatch(resetFilter())
        const {value} = event.target
        setValorSelect({...valorSelect,
            selectContinent:'',
            selectActivity: value
            })
            dispatch(filterByActivities(value))
    }
    const handleresetFilter = () => {
        setValorSelect({
            selectContinent:'',
            selectActivity:'',
            selecOrderDesc:false
        })
        dispatch(resetFilter())
        dispatch(getAllCountries())
        dispatch(getActivities())
    }

    const handleInputSerch =(event) => {
        const {value} = event.target    
        setValueInput(value)
    }

    const handleSerch = () => {
        dispatch(getCountries(valueInput))
        setValueInput('')
    }

    const handleselectCriterio = (event)=>{
        const {name,value} = event.target
        value === "ASC" ? setCheked(true) : setCheked(false) 
        setCriterio({
            [name]:value
        })
    }

    const handleGoToHome = ()=>{
        dispatch(getAllCountries())
        dispatch(getActivities())
        dispatch(getContinents())
        dispatch(setPage(1))
        setValorSelect({
            selectContinent:'',
            selectActivity:'',
            selecOrderDesc:false
        })
        navigate("/home")
    }

    useEffect(()=>{
        dispatch(getContinents())
        dispatch(getActivities())
        dispatch(setPage(1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[countries,criterio])
    
    return( location !== '/' ?
    <>
        <header className={styles.headerContainer}>
	        <h1>Paises del Mundo</h1>
            <nav className={styles.navBar}>
                <span onClick={handleGoToHome} className={styles.goToHome}>Inicio</span>
                {location === '/home' ?<>
                    <span onClick={()=>(navigate("/activities"))} className={styles.goToActivities}>Activities</span>
                    <input type="text" onChange={handleInputSerch} placeholder='País ?'value={valueInput}/>
                    <button onClick={handleSerch} className={styles.findCountry}>Buscar</button>
                </>
                :null}
                
            </nav>
        </header>
        {location === '/home' ?
        <div className={styles.menuContainer}>
            <aside className={styles.menuOrder}>
                <div className={styles.menuTitle}>
                    <h2>Order</h2>
                </div>
                <div>
                    <button onClick={handleOrderALf}>Alfabetico</button>
                </div>
                <div>
                    <button onClick={handleOrderPop}>Población</button>
                </div>
                <div className={styles.criterioConainer}>
                    <div>
                        <label for={"Ascendente"}>Ascendente</label>
                        <input checked={cheked} type="radio" name="criterio" id="Ascendente" onChange={handleselectCriterio} value="ASC"/>
                    </div>
                    <div>
                        <label for={"Descendente"}>Descendente</label>
                        <input type="radio" name="criterio" id="Descendente" onChange={handleselectCriterio} value="DES"/>
                    </div>
                </div>
            </aside>

            <aside className={styles.menuFilter}>
	            <div className={styles.menuTitle}>
                    <h2>Filter</h2>
                </div>
	            <select name="selectContinent" onChange={handleFilterContinent} defaultValue={''} value={valorSelect.selectContinent}>
                    <option value='' selected disabled>Filter by Continent</option>
                    {continents?.map(((continent,index)=><option key={index} value={continent}>{continent}</option>))}
                </select>
                <select name="selectActivity" onChange={handleFilterActivities} defaultValue={''} value={valorSelect.selectActivity}>
                    <option value="" selected disabled>Filter by Activities</option>
                    {activitiesMenu?.map(((activity,index)=><option key={index} value={activity}>{activity}</option>))}
                </select>
                <button onClick={handleresetFilter}>Quitar filtros</button>
            </aside>
        </div>
        :null}
    </>
    :null
    )
}

export default memo(Nav)