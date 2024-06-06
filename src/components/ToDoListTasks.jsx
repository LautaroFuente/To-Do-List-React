import ToDoListItem from "./ToDoListItem";

function ToDoListTasks({ data, deleteTask, setDataEdit, updateTask }) {
  return (
    <>
      <div className="container-tasks">
        <h3>Lista de tareas:</h3>
        {data && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {data.map((el, index) => (
              <ToDoListItem
                key={index}
                deleteTask={deleteTask}
                element={el}
                setDataEdit={setDataEdit}
                updateTask={updateTask}
              />
            ))}
          </div>
        )}
        {JSON.stringify(data) === JSON.stringify([]) && (
          <p>No tienes tareas por hacer!</p>
        )}
      </div>
    </>
  );
}

export default ToDoListTasks;
