import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Edit.module.css";
import { supabase } from "../../utils/supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const [workout, setWorkout] = useState(null);
  const router = useRouter();

  const { id } = router.query;
  useEffect(() => {
    const getWorkout = async () => {
      if (!id) return;

      const { data } = await supabase
        .from("workouts")
        .select("*")
        .filter("id", "eq", id)
        .single();
      setWorkout(data);
    };
    getWorkout();
  }, [id]);

  const handleOnChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  };

  const updateWorkout = async () => {
    const { title, loads, reps } = workout;
    const user = supabase.auth.user();
    await supabase
      .from("workouts")
      .update({
        title,
        loads,
        reps,
      })
      .eq("id", id)
      .eq("user_id", user?.id);
    toast.success("Actualización exitosa!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    router.push("/");
  };
  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Edit Workout</h1>
        <label className={styles.label}> Title:</label>
        <input
          type="text"
          name="title"
          value={workout?.title}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Load (kg):</label>
        <input
          type="text"
          name="loads"
          value={workout?.loads}
          onChange={handleOnChange}
          className={styles.updateInput}
        />
        <label className={styles.label}> Reps:</label>
        <input
          type="text"
          name="reps"
          value={workout?.reps}
          onChange={handleOnChange}
          className={styles.updateInput}
        />

        <button onClick={updateWorkout} className={styles.updateButton}>
          Update Workout
        </button>
      </div>
    </div>
  );
};

export default Edit;
