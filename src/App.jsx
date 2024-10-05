import { useState, useRef, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import TodoHeading from "./Components/TodoHeading";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const ref = useRef();

  useEffect(() => {
    document.title = "To-Do App";
  }, []);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleAdd = () => {
    setTodos([...todos, { todo, isCompleted: true }]);
    setTodo("");
  };
  const handleEdit = (i) => {
    setTodos((prev) =>
      prev.map((item, index) =>
        i === index ? { ...item, isCompleted: !item.isCompleted } : item,
      ),
    );
  };
  const handleReplace = (e, index) => {
    setTodos((prev) =>
      prev.map((item, i) =>
        index === i ? { ...item, todo: e.target.value } : item,
      ),
    );
  };
  const updateCheckBox = (e, i) => {
    setTodos((prev) =>
      prev.map((item, index) =>
        i === index ? { ...item, token: !item.token } : item,
      ),
    );
  };
  const handleDelete = (i) => {
    if (confirm("Are you sure ! You want to delete ?") == true) {
      setTodos((prev) => prev.filter((_, index) => index !== i));
    }
  };
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos);
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);
  ``;
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Header />
      <div className="m-auto mb-6 flex w-[600px] px-10 pt-16">
        <input
          onChange={handleChange}
          value={todo}
          // minLength={"3"}
          type="text"
          className="mr-2 max-h-[70px] max-w-[900px] rounded-xl bg-black px-2 text-3xl font-bold text-white"
        />
        <button
          onClick={handleAdd}
          className="h-[70px] w-[100px] rounded-xl border-2 border-black bg-black px-4 text-3xl text-white transition-all hover:bg-white hover:text-black"
        >
          Add
        </button>
      </div>
      <TodoHeading />
      {todos.length === 0 && (
        <div className="m-auto mt-10 flex w-[600px] justify-center text-5xl font-bold text-red-700 line-through">
          {" "}
          !! No todo to display
        </div>
      )}

      {todos.map((item, i) => {
        return (
          <div
            key={i}
            // className=""
            className={`m-auto mt-2 flex h-[60px] w-[600px] items-center justify-between rounded-xl border-black px-3 font-bold shadow-md transition-all hover:scale-105 hover:shadow-2xl `}
          >
            <div>{i + 1}.</div>

            <input
              className="mt-1"
              type="checkbox"
              checked={item.token == true}
              disabled={item.isCompleted == false}
              onChange={(e) => {
                updateCheckBox(e, i);
              }}
            />
            <input
              className={`flex w-[65%] items-center rounded-md bg-white px-1 text-lg ${
                item.token ? " font-light line-through" : ""
              }`}
              value={item.todo}
              onChange={(e) => {
                handleReplace(e, i);
              }}
              type="text"
              disabled={item.isCompleted}
            />
            <div>
              <button
                ref={ref}
                onClick={(e) => {
                  handleEdit(i);
                }}
                className={`mr-2 rounded-xl border-2 border-black bg-black p-2 font-bold text-white transition-all hover:scale-105 hover:bg-white hover:text-black ${
                  item.token
                    ? "cursor-not-allowed bg-slate-900 opacity-50 hover:scale-100 hover:bg-slate-900 hover:text-white"
                    : ""
                }`}
                disabled={item.token}
              >
                {item.isCompleted ? "Edit" : "Save"}
              </button>
              <button
                onClick={() => {
                  handleDelete(i);
                }}
                className="rounded-xl border-2 border-black bg-black p-2 font-bold text-white transition-all hover:scale-105 hover:bg-white hover:text-black"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default App;
