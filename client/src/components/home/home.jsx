import Page from '../page/page'
import styles from './home.module.css'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import { setPage } from '../../redux/actions'
import Error from '../error/error'

const Home = ()=>{
    
    const dispatch = useDispatch()

    const {sortedCountries} = useSelector((state)=>state)
    const {errors} = useSelector(state=>state)
    const {stateError,error} = errors

    const status = error?.response.request.status
    const message = error?.response.statusText
    const decription = error?.response.data.error

    const {pagination} = useSelector(state=>state)
    const {pageCountries,totalPages, pageSelect} = pagination

    const range = (from, to, step = 1) => {
        let i = from;
        const range = [];
      
        while (i <= to) {
          range.push(i);
          i += step;
        }
        return range;
    }
    
     
    const handlePage = (event)=>{
         const {value} = event.target 
         dispatch(setPage(Number(value)))
    }
    
    
    return(<>
        {stateError?
        <>
            <Error status={status} message={message} description={decription} reset={true}/>
        </>:
        <section className={styles.principalContainer}>
            {sortedCountries&&<Page countriesSelect={pageCountries}/>}
            {totalPages ? 
                <div className={styles.pageSelector}>
                    {range(1,totalPages).map((elem,index)=><button className={styles.btnPage} style={pageSelect-1===index?{backgroundColor:'#333b',border:'#333 solid 3px',borderRadius:'3px'}:{}} key={index} onClick={handlePage}value={elem}>{elem}</button>)}
                </div>:
                null}
        </section>
        }
    </>
    )
}

export default Home