import React from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


export default function Register() {
   const [post, setPost] = React.useState({
      "name": "",
      "username": "",
      "email": "",
      "password": "",
      "confirm-password": ""
   });

   const [message, setMessage] = React.useState({})

   const navigate = useNavigate()

   const register = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:3000/register", post)
      .then((response) => {
         navigate("/login")
         setMessage('')
      }).catch((error) => {
         console.log(error.response.data);
         
         setMessage(error.response.data);
      })
   }


   return (
      <div className="container-fluid flex h-screen justify-center items-center bg-slate-700">
         <div className="w-full max-w-lg p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form className="mb-5 space-y-6" onSubmit={ register }>
               <h5 className="text-xl font-medium text-gray-900">Daftar Sekarang</h5>
               <div className="relative z-0" >
                  <input type="text" id="name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="name" onChange={(e) => setPost({...post, [e.target.name]: e.target.value})} required/>
                  <label htmlFor="name" className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 ${post["name"] ? "z-10" : "-z-10"} origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:z-10 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}  >Nama</label>
                  {post["name"] || message.nameError ? <p id="outlined_success_help" className="ml-2 text-xs text-red-500">{message.nameError}</p> : ''}
               </div>
               <div>
                  <div className="relative z-0" >
                     <input type="text" id="username" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="username" value={post.username} onChange={(e) => setPost({...post, [e.target.name]: e.target.value.toLocaleLowerCase()})} required/>
                     <label htmlFor="username" className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 ${post["username"] ? "z-10" : "-z-10"} origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:z-10 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}  >Username</label>
                  </div>
                  {post["username"] || message.usernameError || message.usernameValidError ? <p id="outlined_success_help" className="ml-2 text-xs text-red-500">{message.usernameError} {message.usernameValidError} {message.usernameLowerCaseError}</p> : ''}
               </div>
               <div>
                  <div className="relative z-0" >
                     <input type="email" id="email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="email" value={post.email} onChange={(e) => setPost({...post, [e.target.name]: e.target.value.toLocaleLowerCase()})} required/>
                     <label htmlFor="email" className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 ${post["email"] ? "z-10" : "-z-10"} origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:z-10 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}  >Email</label>
                  </div>
                  {post["email"] || message.emailError ? <p id="outlined_success_help" className="ml-2 text-xs text-red-500">{message.emailError || message.emailValid}</p> : ''}
               </div>
               <div className="relative z-0" >
                  <input type="password" id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="password" onChange={(e) => setPost({...post, [e.target.name]: e.target.value})} required/>
                  <label htmlFor="password" className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 ${post["password"] ? "z-10" : "-z-10"} origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:z-10 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}  >Kata sandi</label>
               </div>
               <div>
                  <div className="relative z-0" >
                     <input type="password" id="confirm-password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " name="confirm-password" onChange={(e) => setPost({...post, [e.target.name]: e.target.value})} required/>
                     <label htmlFor="confirm-password" className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 ${post["confirm-password"] ? "z-10" : "-z-10"} origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:z-10 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}  >Konfirmasi kata sandi</label>
                  </div>
                  {post["confirm-password"] || message.passwordMatchError ? <p id="outlined_success_help" className="ml-2 text-xs text-red-500">{message.passwordMatchError}</p> : ''}
               </div>
               <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Buat akun</button>
            </form>
               <Link to={'/'} className="block text-center text-blue-700 border border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Kembali</Link>
               <div className="text-sm font-medium text-gray-500 text-center">
                     Sudah punya akun? <Link  to={'/login'} className="text-blue-700 hover:underline">Masuk</Link>
               </div>
         </div>
      </div>
   )
}
