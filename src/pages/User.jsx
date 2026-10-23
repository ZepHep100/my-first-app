import { useParams, Link} from "react-router-dom";
function User(){
    const {id} = useParams();
    return(
        <div>
            <h1>Профиль пользователя №{id}</h1>
            <p>Это страница пользователь с ID = {id}</p>
            <Link to="/">На главную</Link>
        </div>
    );
}
export default User;