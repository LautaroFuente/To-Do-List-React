import { useRef } from "react";

function ToDoListItem({ deleteTask, element, setDataEdit, updateTask }) {
  const refTask = useRef(null);

  const handleCompleteButton = () => {
    const divTask = refTask.current;

    if (element.complete) {
      element.complete = false;

      if (divTask) {
        divTask.classList.remove("complete");
        divTask.style.animation =
          "uncompleteAnimation 0.8s ease 0s 1 normal forwards";
      }
    } else {
      element.complete = true;
      if (divTask) {
        divTask.style.animation =
          "completeAnimation 1s ease 0s 1 normal forwards";
        divTask.classList.add("complete");
      }
    }
    updateTask(element);
  };

  const handleDeleteButton = () => {
    deleteTask(element.id);
  };

  const handleUpdateButton = () => {
    setDataEdit(element);
  };
  return (
    <>
      <div
        className={element.complete ? "task complete" : "task"}
        ref={refTask}
      >
        <div style={{ display: "flex" }}>
          <b>{element.name}</b>

          <button onClick={handleCompleteButton}>
            {element.complete ? "✔️" : "❌"}
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <button onClick={handleDeleteButton}>Eliminar</button>
          <button onClick={handleUpdateButton}>Editar</button>
        </div>
      </div>
    </>
  );
}

export default ToDoListItem;
