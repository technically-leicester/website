import React, { useEffect, useState } from 'react'
import TitleBar from '../Shared/TitleBar'
import { useForm } from 'react-hook-form'
import './Contact.css'
import directusClient from '../Utils/directusClient'
import { emailValidation, phoneValidation } from '../Utils/validation'
import { useLocation } from 'react-router-dom'

export default () => {
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const query = urlParams.get('q')
  const optionId = urlParams.get('o')
  const { register, handleSubmit, watch, errors } = useForm()
  const [hasSubmitted, setSubmitted] = useState()
  const [defaultMessage, setDefaultMessage] = useState()
  const onSubmit = async data => {
    await directusClient.createItem('messages', {
      ...data
    })
    setSubmitted(true)
  }
  useEffect(() => {
    const fetcher = async () => {
      if (query) {
        switch (query) {
          case 'iphone':
            setDefaultMessage('Device: iPhone')
            return
          case 'ipad':
            setDefaultMessage('Device: iPad')
            return
          case 'android':
            setDefaultMessage('Device: Android device')
            return
          case 'battery':
            setDefaultMessage('Device: Poor battery performance')
            return
          case 'screen':
            setDefaultMessage('Device: Broken or cracked screen')
            return
          case 'software':
            setDefaultMessage('Device: Slow or buggy software')
            return
          default:
            return
        }
      }
      if (optionId) {
        const response = await directusClient.getItem('options', optionId)
        setDefaultMessage((response.data.type === 'device' ? 'Device: ' : 'Repair: ') + response.data.description)
      }
    }
    fetcher()
  }, [optionId, query])
  if (hasSubmitted) {
    return (
      <section className="contact">
        <TitleBar title="Contact us"/>
        <div className="container narrow">
          <h2>Thank you</h2>
          <p>Your message has been sent. One of our agents will be in touch with you shortly.</p>
        </div>
      </section>
    )
  }
  return (
    <section className="contact">
      <TitleBar title="Contact us"/>
      <div className="container narrow">
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
            <label htmlFor="phone">Phone</label>
            {errors.phone && <span className="validation">Please enter a valid phone number</span>}
            <input name="phone" id="phone" ref={register({ required: true, pattern: phoneValidation })}/>
          </div>
          <div className="form-row">
            <label htmlFor="message">Message</label>
            {!watch('message') && <span className="information">Please describe the issue with your device</span>}
            <textarea name="message" id="message" ref={register()}
                      defaultValue={defaultMessage && defaultMessage + '\n\n'}/>
          </div>
          <div className="form-row">
            <input type="submit" value="Send message"/>
            {!!Object.keys(errors).length && <span className="validation">Please correct form errors</span>}
          </div>
        </form>
      </div>
    </section>)
};
