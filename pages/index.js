import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { supabase } from "../utils/supabase";
import WorkoutCard from "../components/WorkoutCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ session }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      setLoading(true);
      fetchWorkouts();
      setLoading(false);
    }
  }, [session]);

  const fetchWorkouts = async () => {
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", user?.id);
      if (error) throw error;
      setData(data);
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando ejericios...</div>;
  }

  const handleDelete = async (id) => {
    try {
      const user = supabase.auth.user();
      const { error } = await supabase
        .from("workouts")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);
      fetchWorkouts();
      toast.success("Eliminación exitosa!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>EjerciDATE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.home}>
        <ToastContainer />
        {!session?.user ? (
          <div>
            <p>
              Welcome to Adrenargy. Kindly Login to your account or sign in for
              a demo
            </p>
          </div>
        ) : (
          <div>
            <p className={styles.workoutHeading}>
              Hola!! <span className={styles.email}>{session.user.email}</span>
            </p>
            {session.user.id === "44436d98-900e-49f3-9b3b-577d8c23aaf4" && (
              <div className={styles.dashboardWrapper}>
                <Link href="/admin/">
                  <button className={styles.button}>Dashboard</button>
                </Link>
              </div>
            )}
            {data?.length === 0 ? (
              <div className={styles.noWorkout}>
                <p>Tu no tienes ejercicios por realizar</p>
                <Link href="/create/">
                  <button className={styles.button}> Crear una tarea</button>
                </Link>
              </div>
            ) : (
              <div className={styles.wrapperWorkoutHeading}>
                <p className={styles.workoutHeading}>
                  Aqui aparecen tus ejericios de hoy
                </p>
                <WorkoutCard data={data} handleDelete={handleDelete} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
