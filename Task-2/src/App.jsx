import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter(
  [
    {path:'/', element:<LoginForm/>},
    {path:'/signup', element:<SignupForm/>}
  ]
)

function App() {
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
