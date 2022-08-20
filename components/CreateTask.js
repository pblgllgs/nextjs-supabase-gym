import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/CreateTask.module.css";

const CreateTask = () => {
  const [isSelected, setIsSelected] = useState(null);
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
    await supabase
      .from("workouts")
      .insert({
        title,
        loads,
        reps,
        user_id: isSelected,
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
      theme: "dark",
    });
  };

  const handleUser = ({ id }) => {
    setIsSelected(id);
  };

  return (
    <>
      <div className={styles.containerUsers}>
        <h1 className={styles.titleUsers}>Usuarios</h1>
        <ul>
          {users.map((user) => {
            return (
              <li key={user.id}>
                <button onClick={() => handleUser(user)}>{user.email}</button>
              </li>
            );
          })}
        </ul>
      </div>
      <ToastContainer />
      {isSelected && (
        <div className={styles.container}>
          <div className={styles.form}>
            <p className={styles.title}>
              Crear un nuevo ejercicio para {isSelected.email}
            </p>
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

            <button className={styles.button} onClick={createWorkout}>
              Crear Ejercicio
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTask;
