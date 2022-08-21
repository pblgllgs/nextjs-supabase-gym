import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import styles from "../../styles/Users.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const UserPage = (props) => {
  const { data } = props;

  const user = data[0];

  const initialState = {
    name: user.name,
    id: user.id,
    email: user.email,
  };

  useEffect(() => {
    const getUser = async () => {
      if (!user.id) return;
      const { data } = await supabase
        .from("users")
        .select("*")
        .filter("id", "eq", user.id)
        .single();
      setUserData(data);
    };
    getUser();
  }, [user.id]);

  const [userData, setUserData] = useState(initialState);

  const { name, id, email } = userData;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const updateUser = async () => {
    const updatedUser = await supabase
      .from("users")
      .update({
        name,
        id,
        email,
      })
      .eq("id", id);
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
    setUserData(updatedUser.data[0]);
  };
  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.form}>
        <p className={styles.title}>
          Datos de usuario: <p className={styles.text}>{user.name}</p>
        </p>
        <label className={styles.label}>Nombre:</label>
        <input
          type="text"
          name="name"
          value={name ?? ""}
          onChange={handleChange}
          className={styles.input}
          placeholder="Ingresa un ejercicio"
        />
        <label className={styles.label}>ID :</label>
        <input
          disabled
          type="text"
          name="id"
          value={id ?? ""}
          onChange={handleChange}
          className={styles.input}
          placeholder="Ingresa un id"
        />
        <label className={styles.label}>Email:</label>
        <input
          type="text"
          name="email"
          value={email ?? ""}
          onChange={handleChange}
          className={styles.input}
          placeholder="Ingresa un número de repeticiones"
        />
        <div className={styles.opciones}>
          <button className={styles.buttonCrear} onClick={updateUser}>
            Actualizar datos
          </button>
          <Link href="/admin/users">
            <button className={styles.buttonCrear}>Volver</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ params }) => {
  const { id } = params;
  const { data, error } = await supabase.from("users").select("*").eq("id", id);
  if (error) console.log(error);
  return {
    props: {
      data,
    },
  };
};
