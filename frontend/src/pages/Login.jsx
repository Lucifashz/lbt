import React from "react";
import axios from "axios";
import { Link, useNavigate  } from "react-router-dom";
import { Eye, EyeOff, X } from 'lucide-react';
import Input from "../components/Input/Input";


export default function Login() {
   const [post, setPost] = React.useState({
         "email-username-input": "",
         "password": ""
   });
   const [message, setMessage] = React.useState({
      messageError: "",
      passwordError: ""
   });
   const [hidePassword, setHidePassword] = React.useState(true)
   const navigate = useNavigate();

   // Agar axios dapat membaca cookies
   axios.defaults.withCredentials = true;

   const login = async (e) => {
      e.preventDefault();
      await axios.post("https://lbt-api.vercel.app/login", post)
      .then((response) => {
         navigate("/");
      })
      .catch((error) => {
         if (error.response.data.messageError) {
            const messageError = error.response.data.messageError
               setMessage(() => {
                  return {
                     messageError,
                     passwordError: ""
                  }
               });
         } else {
            const passwordError = error.response.data.passwordError
               setMessage(() => {
                  return {
                     messageError: "",
                     passwordError
                  }
               });
         }
      });
   }

   const handleChangeUsername = (e) => {
      const  {name, value} = e.target;
      setPost((post) => {
         return {...post, [name]: value.toLowerCase()}
      });
   }

   const handleChangePassword = (e) => {
      const  {name, value} = e.target;
      setPost((post) => {
         return {...post, [name]: value}
      });
   }


   return (
      <div className="container-fluid flex h-screen justify-center items-center bg-slate-700">
         <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form className="space-y-6" onSubmit={ login }>
               <h5 className="text-xl font-medium text-gray-900 ">Masuk</h5> 
               <Input
                  name="email-username-input"
                  type="text"
                  text="Email atau username"
                  inputValue={post["email-username-input"]}
                  handleChange={handleChangeUsername}
                  message={message.messageError ? message.messageError : ""}
               >
                  {
                     post["email-username-input"] ?
                     <button onClick={() => setPost({...post, ["email-username-input"]: ""})} type="button" className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600">
                        <X className="size-3.5"/>
                     </button> :
                     ""
                  }
               </Input>
               <Input
                  name="password"
                  type={hidePassword ? "password" : "text"}
                  text="Kata sandi"
                  inputValue={post["password"]}
                  handleChange={handleChangePassword}
                  message={message.passwordError ? message.passwordError : ""}
               > 
                  {
                     hidePassword ?
                     <button onClick={() => setHidePassword(false)} type="button" className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600">
                        <EyeOff className="size-3.5"/>
                     </button> :
                     <button onClick={() => setHidePassword(true)} type="button" className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600">
                        <Eye className="size-3.5"/>
                     </button> 
                  }
               </Input>
               <button type="submit" className="w-full text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Masuk</button>
               <Link to={'/'} className="block text-center text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">Kembali</Link>
               <div className="text-sm font-medium text-gray-500 text-center">
                     Belum punya akun? <Link to="/register" className="text-blue-700 hover:underline">Daftar</Link>
               </div>
            </form>
         </div>
      </div>
   )
}
