import { supabase } from "../../utils/supabase";
import { useState } from "react";
import styles from "../../styles/Create.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const initialState = {
    title: "",
    loads: "",
    reps: "",
  };

  const [workoutData, setWorkoutData] = useState(initialState);

  const { title, loads, reps } = workoutData;

  const handleChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  const createWorkout = async () => {
    const user = supabase.auth.user();
    await supabase
      .from("workouts")
      .insert({
        title,
        loads,
        reps,
        user_id: user?.id,
        user_email: user.email,
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
    setWorkoutData(initialState);
  };

  return (
    <>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.form}>
          <p className={styles.title}>Crear un nuevo ejercicio</p>
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
    </>
  );
};

export default Create;
