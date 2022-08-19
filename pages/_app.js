import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/authContext";
import "../styles/globals.css";
import { supabase } from "../utils/supabase";

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <div>
      <AuthProvider>
        <Navbar session={session} />
        <Component {...pageProps} session={session} />
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default MyApp;
