<<<<<<< HEAD
import Layout from "../Layouts/Layouts"
import Products from "../components/Products"

const Home =  () => {
    return (
      <Layout>
        <Products></Products>
      </Layout>
    );
}

export default Home;
=======
import React from "react";
import MatchList from "./MatchList";


export default function Home(props) {

   return (
         <>
            <MatchList matches={props.matches}/>
         </>
   )
}
>>>>>>> bd117058ee4d01e6fc9596bc87d402f7f452659e
