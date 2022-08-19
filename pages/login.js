import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styles from "../styles/Login.module.css";
import { supabase } from "../utils/supabase";
import Swal from "sweetalert2";
import { ACTION_TYPE, Authcontext } from "../context/authContext";

const Login = () => {
  const { dispatch } = useContext(Authcontext);
  const initialState = {
    email: "",
    password: "",
  };

  const router = useRouter();

  const [form, setForm] = useState(initialState);

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signIn({
        email,
        password,
      });
      dispatch({
        type: ACTION_TYPE.LOGIN,
        payload: true,
      });
      localStorage.setItem("isAuthenticated", true);
      Swal.fire("Bienvenido", "Entrena muy constante", "success");
      if (error) {
        Swal.fire("Error", "Credenciales incorrectas", "error");
        router.push("/login");
        return;
      }
      router.push("/");
    } catch (error) {
      console.log(error);
      Swal.fire("error", error.message);
      router.push("/login");
    }
    // push to home page
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <input
          type="text"
          value={email}
          name="email"
          onChange={handleChange}
          className={styles.input}
          placeholder="Ingresa tu email"
        />
        <input
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
          className={styles.input}
          placeholder="Ingresa tu password"
        />
        <button onClick={handleLogin} className={styles.button}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default Login;
