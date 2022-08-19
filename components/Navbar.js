import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { supabase } from "../utils/supabase";
import Swal from "sweetalert2";
import { useContext } from "react";
import { ACTION_TYPE, Authcontext } from "../context/authContext";

const Navbar = ({ session }) => {
  const { dispatch } = useContext(Authcontext);

  const handleLogout = async () => {
    try {
      dispatch({
        type: ACTION_TYPE.LOGOUT,
        payload: false,
      });
      localStorage.removeItem("isAuthenticated");
      Swal.fire("Cerraste Sessión", "Te esperamos de vuelta", "success");
      await supabase.auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>Adrenargy</p>
      </div>
      {session?.user ? (
        <ul className={styles.navContent}>
          <Link href="/">
            <li className={styles.name}>Home</li>
          </Link>

          <button className={styles.buttons} onClick={handleLogout}>
            Logout
          </button>
          <Link href="/create">
            <button className={styles.buttons}>Create New Workout</button>
          </Link>
        </ul>
      ) : (
        <ul className={styles.navContent}>
          <Link href="/login">
            <li className={styles.buttons}>Login</li>
          </Link>
          <Link href="/signup">
            <li className={styles.buttons}>Signup</li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
