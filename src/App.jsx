// import { useState } from "react";
// function Counter(){
//   const [count, setCount] = useState(0);
//   const [step, setStep] = useState(1);
//   return(
//     <div>
//       <p>Счет: {count}</p>
//       <input
//       type="number"
//       value={step}
//       onChange={(e) => setStep(Number(e.target.value))}/>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <button onClick={() => setCount(count - 1)}>-1</button>
//       <button onClick={() => setCount(0)}>Сброс</button>
//       <button onClick={() => setCount(count + step )}>+{step}</button>
//     </div>
//   );
// }

// const { useState } = require("react");

// import { useState } from "react";

// function Card({title, price}){
//   return(
//     <div className="card">
//       <h2>{title}</h2>
//       <p>{price}руб.</p>
//     </div>
//   );
// }

// function App(){
//   const products = [
//     {id: 1, name: "Ноутбук", price: 80000},
//     {id: 2, name: "Мышь", price: 1500},
//     {id: 3, name: "Клавиатура", price: 3000}
//   ];
//   return(
//     <div>
//       <Counter />
//       {products.map(p => (
//         <Card key={p.id} title={p.name} price={p.price}/>
//       ))}
//     </div>
//   );
// }
// export default App;


// import { useState } from "react";
// import "./App.css";
// function TodoList(){
//   const [todos, setTodos] = useState([
//     {id: 1, text: "Выучить React", done: false},
//     {id: 2, text: "Сделать проект", done: false}
//   ]);
//   const [input, setInput] = useState("");
//    const [filter, setFilter] = useState('all');

//   const remaining = todos.filter(t => !t.done).length;
//   const filteredTodos = todos.filter(t => {
//     if(filter === "active") return !t.done;
//     if(filter === "done") return t.done;
//     return true;
//   });
//   function toggleTodo(id){
//     setTodos(todos.map(t => 
//       t.id === id ? {...t, done: !t.done} : t
//     ));
    
//   }

//   function deleteTodo(id){
//     setTodos(todos.filter(t => t.id !== id));
//   }

//   function addTodo(){
//     if (input.trim() === "") return;

//     const newTodo = {
//       id: Date.now(),
//       text: input,
//       done: false
//     }
//     setTodos([...todos, newTodo]);
//     setInput("");
//   }
//   return(
//     <div className="todo-app">
//       <h1>Мои задачи</h1>
//       <div className="todo-input">
//       <input
//       value={input}
//       onChange={(e) => setInput(e.target.value)}
//       placeholder="Новая задача..."/>
//       <button onClick={addTodo}>Добавить</button>
//       </div>
//       <div className="todo-filters">
//         <button onClick={() => setFilter("all")}>Все</button>
//         <button onClick={() => setFilter("active")}>Активные</button>
//         <button onClick={() => setFilter("done")}>Выполненные</button>
//       </div>
//       <p className="remaining">Осталось: {remaining}</p>
//       <ul className="todo-list">
//         {filteredTodos.map(todo => (
//           <li key={todo.id}>
//             <span 
//             className={`todo-text ${todo.done ? "done" : ""}`}
//             onClick={() => toggleTodo(todo.id)}>
//       {todo.text}
//       </span>
//       <button className="todo-delete"
//       onClick={() => deleteTodo(todo.id)}>×</button>
//       </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function App(){
//   return(
//     <div>
//       <TodoList />
//     </div>
//   );
// }
// export default App;

// import { useState } from "react";
// function User({name, age}){
//   return(
//     <div>
//       <p>{name}, {age} лет</p>
//     </div>
//   );
// }

// function Like(){
//   const [likes, setLikes] = useState(0);
//   return(
//     <div>
//       <p>Лайков: {likes}</p>
//       <button onClick={() => setLikes(likes + 1)}>Лайк</button>
//     </div>
//   );
// }

// function App(){
//   return(
//     <div>
//     <User name="Иван" age={25} />
//     <User name="Анна" age={22} />
//     <User name="Олег" age={30} />
//     <Like />
//     </div>
//   );
// }
// export default App; 

// import { useState } from "react";
// function Minitodo(){
//   const [todos, setTodos] = useState([
//     {id: 1, text: "Задача 1"},
//     {id: 2, text: "Задача 2"},
//     {id: 3, text: "Задача 3"}
//   ]);

//   function deleteTodo(id){
//   setTodos(todos.filter(t => t.id !== id));
// }

// function addTodo(){
//   const newTodo = {
//     id: Date.now(),
//     text: "Новая задача",
//   };
//   setTodos([...todos, newTodo]);
// }
//   return(
//   <div>
//     <h2>Мини-Todo</h2>
//     <button onClick={(addTodo)}>Добавить</button>
//     <ul>
//       {todos.map(todo => (
//     <li key={todo.id}>
//       {todo.text}
//       <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
//     </li>
//     ))}
//     </ul>
    
//   </div>
// );

// }

// function App(){
//   return(
//     <div>
//       <Minitodo />
//     </div>
//   );
// }
// export default App;


// import {Routes, Route, Link} from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contacts from "./pages/Contacts";
// import NotFound from "./pages/Notfound";
// import User from "./pages/User";
// function App(){
//   return(
//     <div>
//       <nav>
//         <Link to="/">Главная</Link>{" | "}
//         <Link to="/about">О нас</Link>{" | "}
//         <Link to="/contacts">Контакты</Link>
//       </nav>
//       <hr />
//       <Routes>
//         <Route path="/" element={<Home />}/>
//         <Route path="/about" element={<About />}/>
//         <Route path="/contacts" element={<Contacts/>}/>
//         <Route path="/notFound" element={<NotFound />} />
//         <Route path="/user" element={<User />}/>
//       </Routes>
//       </div>
//   );
// }
// export default App;

import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import "./App.css";

function App() {
  return (
    <div>
      <nav className="nav">
        <Link to="/">Магазин</Link>{" | "}
        <Link to="/about">О магазине</Link>{" | "}
        <Link to="/contacts">Контакты</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </div>
  );
}

export default App;