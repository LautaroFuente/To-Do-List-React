import { useRef, useEffect, useState } from "react";

const initialForm = { id: "", name: "", complete: false };

function ToDoListForm({ addTask, dataEdit, setDataEdit, updateTask }) {
  const [form, setForm] = useState(initialForm);

  const inputRef = useRef(null);

  const reset = () => {
    setForm(initialForm);
    setDataEdit(null);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dataEdit) {
      addTask(e.target.name.value);
    } else {
      updateTask(form);
    }
    reset();
  };

  useEffect(() => {
    if (dataEdit) {
      setForm(dataEdit);
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setForm(initialForm);
    }
  }, [dataEdit]);

  return (
    <>
      <div className="container-form">
        {dataEdit ? (
          <h2 className="edit">Editar tarea</h2>
        ) : (
          <h2>Agregar tarea</h2>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nombre</label>
            <input
              name="name"
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Escribe el nombre"
              ref={inputRef}
            />
          </div>
          <div>
            <input type="submit" value={dataEdit ? "Editar" : "Agregar"} />
            <input type="reset" value="Cancelar" onClick={reset} />
          </div>
        </form>
      </div>
    </>
  );
}

export default ToDoListForm;
