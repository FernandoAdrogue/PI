import { useDispatch, useSelector } from "react-redux"
import { resetError } from "../../redux/actions"
import styles from "../error/error.module.css"
import { useNavigate } from "react-router-dom"


const Error = ({status,message,description,reset}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {errors} = useSelector(state=>state)
    const {stateError} = errors
    const handleReset = () => {
        dispatch(resetError())
        navigate("/home")
    }

    return (
        <div className={stateError ? styles.errorContainer:styles.noErrorContainer}>
            <div className={styles.cardError}>
                <div>
                    {message?<h2>{message}</h2>:<h2>Not Found!</h2>}
                </div>
                <div>
                    {status?<h1>{status}</h1>:<h1>404</h1>}
                </div>
                <div>
                    {description?<h3>{description}</h3>:null}
                </div>
                <div>
                    {reset&&<button onClick={handleReset}>Cerrar</button>}
                </div>
            </div> 
        </div>
    )
}

export default Error