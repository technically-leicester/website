import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import './Contact.css'
import { emailValidation } from '../Utils/validation'

export default ({ heading, privacy }) => {
  const { register, handleSubmit, errors } = useForm()
  const [hasSubmitted, setSubmitted] = useState()
  const onSubmit = async data => {
    await axios.post('/api/feedback', {
      ...data
    })
    setSubmitted(true)
  }
  if (hasSubmitted) {
    return (
      <section className="contact">
        <div className="container narrow">
          <h2>Thank you</h2>
          <p>Your feedback has been sent.</p>
        </div>
      </section>
    )
  }
  return (
    <section className="contact">
      <div className="container narrow">
        <h2>{ heading }</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input name="name" id="name" ref={register()}/>
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            {errors.email && <span className="validation">Please enter a valid email</span>}
            <input name="email" id="email" ref={register({ required: true, pattern: emailValidation })}/>
          </div>
          <div className="form-row">
            <label htmlFor="message">Message</label>
            {errors.message && <span className="information">Please add some feedback</span>}
            <textarea name="message" id="message" ref={register({ required: true })}/>
          </div>
          <div className="form-row">
            <p>{ privacy }</p>
          </div>
          <div className="form-row">
            <input type="submit" value="Send message"/>
            {!!Object.keys(errors).length && <span className="validation">Please correct form errors</span>}
          </div>
        </form>
      </div>
    </section>)
};
