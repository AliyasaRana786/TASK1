import { useState } from "react";
import './Todo.css';  

export default function Todo() {
    const [inputval, setInputval] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentid] = useState(null);

    const handlesubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            setTodos(todos.map((todo) =>
                todo.id === currentId ? { ...todo, text: inputval } : todo
            ));
            setIsEditing(false);
            setCurrentid(null);
            setInputval("");
        } else {
            const NewTodo = {
                id: Date.now(),
                text: inputval
            };

            setTodos([...todos, NewTodo]);
            setInputval("");
        }
    };

    const handledeletetodo = (id) => {
        const deleteTodo = todos.filter((todo) => todo.id !== id);
        setTodos(deleteTodo);
    };

    const handleEditTodo = (id) => {
        const editTodo = todos.find((todo) => todo.id === id);
        setInputval(editTodo.text);
        setCurrentid(id);
        setIsEditing(true);
    };

    return (
        <div className="todolist">
            <form onSubmit={handlesubmit} className="todoform">
                <input
                    type="text"
                    value={inputval}
                    onChange={(e) => setInputval(e.target.value)}
                    placeholder="Enter your todo..."
                    className="forminput"
                />
                <button className="formbtn">
                    {isEditing ? "Update Todo" : "submit"}
                </button>
            </form>

            <ul className="todolist">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        <span>{todo.text}</span>
                        <button onClick={() => handledeletetodo(todo.id)} className="todobttn">Delete</button>
                        <button onClick={() => handleEditTodo(todo.id)} className="todobttn">Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
