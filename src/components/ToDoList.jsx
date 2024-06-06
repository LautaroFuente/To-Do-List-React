import { useState } from "react";
import ToDoListTasks from "./ToDoListTasks";
import { useEffect } from "react";
import ToDoListForm from "./ToDoListForm";

function ToDoList() {
  const [db, setDb] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);

  const endpoint = "http://localhost:3001/tasks";

  useEffect(() => {
    fetch(endpoint)
      .then((res) => {
        if (res) return res.json();
        else throw Error;
      })
      .then((data) => {
        setDb(data);
      })
      .catch((err) => console.log(`Surgio un error: ${err}`));
  }, []);

  const createTask = (name) => {
    return { id: Date.now().toString(), name: name, complete: false };
  };

  const addTask = (name) => {
    if (name === "") {
      return alert("La tarea a agregar esta vacia");
    }

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createTask(name)),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hubo un error al agregar el dato");
        }
        return response.json();
      })
      .then((data) => {
        setDb([...db, data]);
        console.log("La tarea se agrego con exito:", data);
      })
      .catch((error) => {
        console.error("Error al agregar la tarea:", error);
      });
  };

  const deleteTask = (id) => {
    fetch(`${endpoint}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setDb(db.filter((el) => el.id !== id));
          console.log("La tarea fue eliminada exitosamente.");
        } else {
          console.error("Error al eliminar la tarea");
        }
      })
      .catch((error) => {
        console.error("ocurrio un error al eliminar la tarea:", error);
      });
  };

  const updateTask = (el) => {
    if (el.name === "") {
      return alert("El nombre de la tarea no puede estar vacio");
    }
    let data = { id: el.id, name: el.name, complete: el.complete };
    fetch(`${endpoint}/${el.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          setDb(db.map((el) => (el.id === data.id ? data : el)));
          console.log("La tarea fue actualizada exitosamente");
        } else {
          console.error("Error al actualizar la tarea");
        }
      })
      .catch((error) => {
        console.error("ocurrio un error al actualizar la tarea:", error);
      });
  };

  return (
    <>
      <h1>LISTA DE TAREAS</h1>

      <ToDoListForm
        addTask={addTask}
        dataEdit={dataEdit}
        setDataEdit={setDataEdit}
        updateTask={updateTask}
      />
      <ToDoListTasks
        data={db}
        deleteTask={deleteTask}
        setDataEdit={setDataEdit}
        updateTask={updateTask}
      />
    </>
  );
}

export default ToDoList;
