import styles from './page.module.css'
import Card from '../card/card'

const Page = ({countriesSelect}) => {

    return (
        <>
            {countriesSelect ?
            <div className={styles.cardsContainer}>
                {countriesSelect.map((elem,index)=>
                    <Card key={index} id={elem.id} name={`Pais: ${elem.name}`} continent={`Continente: ${elem.continent}`} image={elem.flag}/>
                )}
            </div>:
            null}
        </>
    )
}

export default Page