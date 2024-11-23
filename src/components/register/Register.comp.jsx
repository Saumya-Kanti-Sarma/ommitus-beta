import React from 'react'
import BtnComponent from "../Btns/Btn.comp.jsx"
import "./Register.comp.css"
const RegisterComponent = ({
  parentWidth, parentHeight,
  displayName, displayOwnerName, displayPassword, btnTxt
}) => {
  return (
    <>
      <div className='register-component-main'
        style={{
          width: parentWidth,
          height: parentHeight,
        }}
      >
        <section className='filed-area'
          style={{
            display: displayName
          }}
        >
          <p>NAME OF RESTAURANT:</p>
          <input
            type="text"
            value=""
            onChange=""
            onKeyDown={''}
            placeholder='Eg: Gourmate Heavens'
          />
        </section>
        <section className='filed-area'
          style={{
            display: displayOwnerName
          }}
        >
          <p>OWNER NAME:</p>
          <input
            type="text"
            value=""
            onChange=""
            onKeyDown={''}
            placeholder='Eg: Saumya Kanti Sarma'
          />
        </section>
        <section className='filed-area password-filed'
          style={{
            display: displayPassword
          }}
        >
          <p>PASSWORD:</p>
          <input
            type="text"
            value=""
            onChange=""
            onKeyDown={''}
            placeholder='•••••••••'
          />
          <img src="/close-eye.svg" alt="" />
        </section>


        <BtnComponent
          backgroundColor={"#fff"}
          color={"#000"}
          padding={"20px 60px"}
          borderRadius={"16px"}
          border={"none"}
          text={btnTxt || "Continue"}
        />
      </div>
    </>
  )
}

export default RegisterComponent
