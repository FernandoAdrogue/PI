import styles from './detail.module.css'
import {useParams} from "react-router-dom"
import axios from "axios"
import Error from '../error/error'
import { memo, useEffect, useState } from 'react'

const Detail =() =>{

    const {id} = useParams()

    const [country,setCountry] = useState({})
    const [error, setError]= useState({})

    const getCountry = async() =>{
        try {
            const endpoint = `http://localhost:3001/countries/${id}`
            const {data} = await axios(endpoint)
            setCountry(data)
            setError({})
        }
        catch(error){
            setError({...error,
                status:error.response.status,
                message:error.response.statusText,
                description:error.response.data.error})
        }
    }
   
    useEffect(()=>{
        getCountry()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(<>
        {country.id?
            <div className={styles.detailContainer}>
                <div className={styles.titleDetail}>
                    <h2>CCA3: {country.id}</h2>
                </div>
                <div className={styles.bannerFlag}>
                    <h2>{country.name}</h2>
                    <img className={styles.image} src={country.flag} alt="Flag country"></img>
                </div>
                <div className={styles.contentDetail}>
                    <div>
                        <h4>Continent: {country.continent}</h4>
                        {country.capital&&<h4>Capital: {country.capital.join(" - ")}</h4>}
                    </div>
                    {country.subregion&&<h5>Subregion: {country.subregion}</h5>}
                    {country.area&&<h5>Area: {country.area}</h5>}
                    <h5>Population: {country.population} p</h5>
                    {country.activities.length > 0 &&<h5>Activities: {country.activities.map(activity=>activity.name).join(" - ")}</h5>}
                </div>
            </div>:
            <>
                {error.status&&<Error status={error.status} message={error.message} description={error.description}/>}
            </>
        }
        </>
    )
}

export default memo(Detail)