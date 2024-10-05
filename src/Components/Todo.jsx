import React from "react";
// import { MdDelete, MdModeEditOutline } from "react-icons/md";

const Todo = ({ todos, setTodos }) => {
  const handleEdit = (i) => {
    setTodos((prev) =>
      prev.map((item, index) =>
        i === index ? { ...item, isUpdated: !item.isUpdated } : item,
      ),
    );
  };

  const handleEditValue = (e, index) => {
    // console.log(e.target.value);
    setTodos((prev) =>
      prev.map((item, i) =>
        index === i ? { ...item, text: e.target.value } : item,
      ),
    );
  };

  const handleDelete = (i) => {
    setTodos((prev) => prev.filter((_, index) => index !== i));
  };

  return (
    <div>
      {todos.length > 0 &&
        todos.map((item, i) => (
          <div className="flex items-center gap-3" key={i}>
            <input
              type="text"
              value={item.text}
              onChange={(e) => handleEditValue(e, i)}
              disabled={item.isUpdated}
            />
            <button onClick={() => handleEdit(i)}>
              {/* <MdModeEditOutline size={20} /> */}
              Edit
            </button>
            <button onClick={() => handleDelete(i)}>
              {/* <MdDelete size={20} /> */}
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default Todo;
