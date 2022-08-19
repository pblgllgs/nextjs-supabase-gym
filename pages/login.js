import { useRouter } from "next/router";
import { useContext, useState } from "react";
import styles from "../styles/Login.module.css";
import { supabase } from "../utils/supabase";
import Swal from "sweetalert2";
import { ACTION_TYPE, Authcontext } from "../context/authContext";

const Login = () => {
  const { dispatch } = useContext(Authcontext);
  const initialState = {
    email: "pablogallegosgonzalez@gmail.com",
    password: "123456",
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
        Swal.fire("error", error.message);
      }
    } catch (error) {
      console.log(error);
      Swal.fire("error", error.message);
    }
    // push to home page
    router.push("/");
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
          placeholder="Enter your email"
        />
        <input
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter your password"
        />
        <button onClick={handleLogin} className={styles.button}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
