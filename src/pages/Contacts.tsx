import { useNavigate } from "react-router-dom";
import "./Contacts.css";
function Contacts(){
    const navigate = useNavigate();

    function handleSubmit(){
        alert("Сообщение отправленно");
        navigate("/");
    }
    return(
        <div className="page-container">
            <h1>Контакты</h1>
            <p>Почта: test@example.com</p>
            <button className="btn btn-buy" onClick={handleSubmit}>Отправить</button>
        </div>
    );
}
export default Contacts;