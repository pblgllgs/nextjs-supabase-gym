import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { supabase } from "../utils/supabase";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ACTION_TYPE, Authcontext } from "../context/authContext";
import { useRouter } from "next/router";
import Image from "next/image";

const Navbar = ({ session }) => {
  const { dispatch } = useContext(Authcontext);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      dispatch({
        type: ACTION_TYPE.LOGOUT,
        payload: false,
      });
      localStorage.removeItem("isAuthenticated");
      Swal.fire("Cerraste Sessión", "Te esperamos de vuelta", "success");
      router.push("/login");
      await supabase.auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Image src="/static/gym-time.webp" alt="img" width={60} height={60} />
      </div>
      {session?.user ? (
        <ul className={styles.navContent}>
          <button className={styles.btnLoginLogout} onClick={handleLogout}>
            Salir
          </button>
          <Link href="/create">
            <button className={styles.btnSignup}>Crear ejericio</button>
          </Link>
        </ul>
      ) : (
        <ul className={styles.navContent}>
          <Link href="/login">
            <li className={styles.btnLoginLogout}>Entrar</li>
          </Link>
          <Link href="/signup">
            <li className={styles.btnSignup}>Registrarse</li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
