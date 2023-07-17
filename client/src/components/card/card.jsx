import { useNavigate } from 'react-router-dom'
import styles from './card.module.css'

const Card = ({id,image,name,continent}) => {

    const navigate = useNavigate()

    const handleSelect =() =>{
        navigate(`/detail/${id}`)
    }

    return(
        name ?
        <div key={id} onClick={handleSelect} className={styles.cardContainer}>
            <img className={styles.image} src={image} alt="bandera del pais" />
            <h3 className={styles.name}>{name}</h3>
            <h4 className={styles.continent}>{continent}</h4>
        </div>:
        null
    )

}

export default Card