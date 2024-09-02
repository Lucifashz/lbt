import React from "react";
import axios from "axios";
import { Link, redirect } from "react-router-dom";


export default function Login() {
   const [post, setPost] = React.useState({
         "email-username-input": "",
         "password": ""
   });

   const [message, setMessage] = React.useState("")

   React.useEffect(() => {
      login;
      loginPassword;
   }, [message])

   const login = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:3000/login", post)
      .then((response) => {
         setMessage(response.data.message);
      }).catch((error) => {
         setMessage(error.response.data.message);
      })
   }

   const loginPassword = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:3000/login-password", post)
      .then((response) => {
         console.log(response.data);
         redirect('/')
      }).catch((error) => {
         setMessage(error.response.data.message);
      })
   }

   const handleChange = (e) => {
      setPost({ ...post, [e.target.name]: e.target.value });
   };

   return (
      <>
         {message !== "berhasil" ?  
         <div className="container-fluid flex h-screen justify-center items-center bg-slate-700">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
               <form className="mb-5 space-y-6" onSubmit={ login }>
                  <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5> 
                  <div>
                     <div className="relative z-0" >
                        <input type="text" id="email-username-input" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="email-username-input" onChange={(e) => setPost({...post, [e.target.name]: e.target.value})} required/>
                        <label htmlFor="email-username-input" className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 ${post["email-username-input"] ? "z-10" : "-z-10"} origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:z-10 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}  >Email atau username</label>
                     </div>
                     {post["email-username-input"] || message ? <p id="outlined_success_help" className="ml-2 text-xs text-gray-500 dark:text-gray-400">{message}</p> : ''}
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
               </form>
               <Link to={'/'} className="block text-center text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Kembali</Link>
               <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                     Not registered? <Link  to={'/register'} className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
               </div>
            </div>
         </div> : 
         <div className="container-fluid flex h-screen justify-center items-center bg-slate-700">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
               <form className="mb-5 space-y-6" onSubmit={ loginPassword }>
                  <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign</h5> 
                  <div>
                     <div className="relative z-0" >
                        <input type="text" id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="password" onChange={handleChange} value={post.password} required/>
                        <label htmlFor="password" className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 ${post["password"] ? "z-10" : "-z-10"} origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:z-10 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}  >Masukkan kata sandi</label>
                     </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
               </form>
               <Link to={'/'} className="block text-center text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Kembali</Link>
               <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
                     Not registered? <Link  to={'/register'} className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
               </div>
            </div>
         </div>}
      </>
   )
}
