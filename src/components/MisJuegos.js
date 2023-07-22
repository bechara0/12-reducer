import React, { useEffect, useReducer } from "react";
import { juegoReducer } from "../reducers/juegoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("juegos")) || [];
};

export const MisJuegos = () => {
  const [juegos, dispatch] = useReducer(juegoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("juegos", JSON.stringify(juegos));
  }, [juegos]);

  const conseguirDatosForm = (e) => {
    e.preventDefault();

    let juego = {
      id: new Date().getTime(),
      titulo: e.target.titulo.value,
      descripcion: e.target.descripcion.value,
    };
    const accion = {
      type: "crear",
      payload: juego,
    };
    dispatch(accion);

    console.log(juegos);
  };

  const borramelo = (id) => {
    const action = {
      type: "borrar",
      payload: id,
    };
    dispatch(action);
  };

  const editar = (e, id) => {
    let juego = {
      id,
      titulo: e.target.value,
      descripcion: e.target.value,
    };
    const action = {
      type: "editar",
      payload: juego,
    };
    dispatch(action);
  };

  return (
    <div>
      <h1>Estos son mis video Juegos</h1>
      <p>Número de video juegos: {juegos.length}</p>
      <ul>
        {juegos.map((juego) => (
          <li key={juego.id}>
            {juego.titulo}
            &nbsp;
            <button onClick={(e) => borramelo(juego.id)}>X</button>
            <input type="text" onBlur={(e) => editar(e, juego.id)} />
          </li>
        ))}
      </ul>
      <h2>Agregar Juegos</h2>
      <form onSubmit={conseguirDatosForm}>
        <input type="text" name="titulo" placeholder="Título" />
        <textarea name="descripcion" placeholder="Descripción" />
        <input type="submit" value="guardar" />
      </form>
    </div>
  );
};
