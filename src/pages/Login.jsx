import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login(){
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (login === "admin" && password === "123"){
            localStorage.setItem("isAdmin", "true");
            window.location.href = "/";
        }else{
            setError("Неверный логин или пароль")
        }
    }
    
    return(
        <div className="login-container">
        <h3>Вход для администратора</h3>  

        <form onSubmit={handleLogin} className="login-form">
            <input 
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            />
            
            <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Войти</button>
        </form>  
            {error && <p className="login-error">{error}</p>}
        </div>
    );
}
export default Login;