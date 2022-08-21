import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/CreateTask.module.css";
import Link from "next/link";

const CreateTask = () => {
  const initialStateUser = {
    id: "",
    email: "",
    name: "",
  };
  const [userSelected, setUserSelected] = useState(initialStateUser);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const userAuth = supabase.auth.user();
    const { data, error } = await supabase.from("users").select("*");
    const resultado = data.filter((user) => {
      return user.id !== userAuth?.id;
    });
    if (error) throw error;
    setUsers(resultado);
    return data;
  };

  const initialState = {
    title: "",
    loads: "",
    reps: "",
    user_id: "",
  };

  const [workoutData, setWorkoutData] = useState(initialState);

  const { title, loads, reps } = workoutData;

  const handleChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  const createWorkout = async () => {
    let msg = "";
    if (title === "") {
      msg = `title, `;
    }
    if (loads === "") {
      msg = `${msg} loads,`;
    }
    if (reps === "") {
      msg = `${msg} reps`;
    }
    if (msg !== "") {
      toast.error(`Complete los campos ${msg}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    await supabase
      .from("workouts")
      .insert({
        title,
        loads,
        reps,
        user_email: userSelected.email,
        user_id: userSelected.id,
      })
      .single();
    toast.success("Creación exitosa!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handlechangeSelect = async (e) => {
    const seleccionado = users.find((user) => {
      return user.id === e.target.value;
    });
    setUserSelected(seleccionado);
  };

  return (
    <>
      {userSelected.id === "" && (
        <div className={styles.containerUsers}>
          <Link href={"/admin/users"}>
            <h1 className={styles.titleUsers}>Usuarios</h1>
          </Link>
          <h1 className={styles.text}>Selecciona un usuario para comenzar</h1>
          <select
            value={userSelected.id}
            name="id"
            onChange={handlechangeSelect}
          >
            <option>Selecciona un usuario</option>
            {users.map((user, index) => {
              return (
                <option key={index} value={user.id}>
                  {user.email}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <ToastContainer />
      {userSelected.id !== "" && (
        <div className={styles.container}>
          <div className={styles.form}>
            <p className={styles.title}>Crear un nuevo ejercicio para</p>
            <div className={styles.email}>{userSelected.name}</div>
            <label className={styles.label}>Ejercicio:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ingresa un ejercicio"
            />
            <label className={styles.label}>Carga (kg):</label>
            <input
              type="text"
              name="loads"
              value={loads}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ingresa un peso de carga"
            />
            <label className={styles.label}>Repeticiones:</label>
            <input
              type="text"
              name="reps"
              value={reps}
              onChange={handleChange}
              className={styles.input}
              placeholder="Ingresa un número de repeticiones"
            />

            <button className={styles.buttonCrear} onClick={createWorkout}>
              Crear Ejercicio
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTask;
