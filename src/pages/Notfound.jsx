import { Link } from "react-router-dom";
function NotFound(){
    return(
        <div>
            <h1>404 - Страница не найдена</h1>
            <p>Такой страницы не существует.</p>
            <Link to="/">Вернуться на главную</Link>
        </div>
    );
}
export default NotFound;