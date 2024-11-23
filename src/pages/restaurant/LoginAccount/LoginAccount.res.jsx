//src/pages/restaurant/CreateAccount/LoginAccount.res.jsx

import React from 'react'
import { Link } from "react-router-dom"
import RegisterComponent from '../../../components/register/Register.comp.jsx'
import BtnComponent from '../../../components/Btns/Btn.comp.jsx'
import "./LoginAccount.res.css"
const RestaurantLoginAccount = () => {
  return (
    <>
      <head>
        <title>
          Ommitus | Login Account
        </title>
      </head>
      <main className='main-registration-area'>

        <section className='reg-form-parent'>
          <img src="/ommitus-logo.png" className='reg-form-parent-img' />
          <h1>Login Your Restaurant With Us...</h1>
          <br />
          <RegisterComponent
            displayOwnerName={"none"}
            parentWidth={"65%"}
            parentHeight={"40vh"}
            btnTxt={"Sign-In"}
          />
          <p className='already-have-account'>Don't have an account? <Link to={"/restaurant/create-account"}>Register</Link> </p>
          <br />
          <h2>OR</h2>
          <br />
          <BtnComponent
            backgroundColor={"#fff"}
            color={"#000"}
            text={"Sign-In with GOOGLE"}
            width={"65%"}
            border={"1px solid black"}
            fontSize={"18px"}
            letterSpacing={"3px"}
            borderRadius={"8px"}
          />
        </section>

        <aside className='reg-text-parent'>
          <img src="/ommitus-logo.png" />
          <h1>
            WELCOME BACK TO <b>OMMITUS MANAGEMENT</b> THE BEST RMS PROVIDER IN INDIA...
          </h1>
          <p>Conntinue by Sign-In back and open new opportunities</p>
          <button>ABOUT US</button>
        </aside>
      </main>
    </>
  )
}

export default RestaurantLoginAccount
