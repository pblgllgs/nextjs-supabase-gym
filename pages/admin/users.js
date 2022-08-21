import { useRouter } from "next/router";
import styles from "../../styles/Users.module.css";
import { supabase } from "../../utils/supabase";

const Users = (props) => {
  const router = useRouter();
  const handleUser = (user) => {
    router.push(`/users/${user.id}`);
  };
  return (
    <div className={styles.containerUsersPage}>
      <div className={styles.users}>
        <h1 className={styles.text}>USUARIOS</h1>
        {
          <ul>
            {props.data.map((user, idx) => {
              return (
                <li key={idx} className={styles.li}>
                  <button
                    className={styles.button}
                    onClick={() => handleUser(user)}
                  >
                    {user.email}
                  </button>
                </li>
              );
            })}
          </ul>
        }
      </div>
    </div>
  );
};

export default Users;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return {
    props: {
      data,
    },
  };
};
