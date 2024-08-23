import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
import '../styles/LayoutPage.css'
const HomePage = () => {
  const auth = useAuth();
  return (
    <Layout >
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;