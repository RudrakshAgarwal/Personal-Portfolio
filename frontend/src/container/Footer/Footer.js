import React, { useState, useEffect } from 'react'

import { images } from '../../constants'
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client'

import './Footer.scss'

const Footer = () => {
  const [formData, setFormData] = useState({ username: '', email: '', message: '' })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [contactInfo, setContactInfo] = useState({})

  const { username, email, message } = formData;

  useEffect(() => {
    const query = '*[_type == "contactInfo"][0]'

    const fetchContactInfo = async () => {
      try {
        const data = await client.fetch(query)

        if(data) {
          setContactInfo(data)
        }
      } catch (err) {
        console.log('Error fetching contact information: ', err)
      }
    }

    fetchContactInfo()
  }, [])



  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {

    // Remove this code
    if (!username.trim() || !email.trim() || !message.trim()) {
      setFormData(prevState => ({
        ...prevState,
        username: prevState.username.trim(),
        email: prevState.email.trim(),
        message: prevState.message.trim(),
      }))
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setLoading(true)

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client.create(contact)
      .then(() => {
        setLoading(false)
        setIsFormSubmitted(true)
      })
      .catch((err) => console.log('Error', err))
  };

  // remove this code
  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setFormData(prevState => ({
        ...prevState,
        [name]: value.trim(),
      }));
    }
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href={ `mailto:${ contactInfo.email }` } className="p-text">{ contactInfo.email }</a>
        </div>

        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href={ `tel:${ contactInfo.phoneNumber }` } className="p-text">{ contactInfo.phoneNumber }</a>
        </div>
      </div>

      { !isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            {/* remove this */}
            <input className={`p-text invalid-input ${(!username.trim() && username) ? 'invalid-input' : ''}`} type="text" placeholder="Your Name" name="username" value={ username } onChange={ handleChangeInput } onBlur={ handleInputBlur } />
          </div>
          
          <div className="app__flex">
            {/* remove this */}
            <input className={`p-text .invalid-input ${(!email.trim() && email) ? 'invalid-input' : ''}`} type="email" placeholder="Your Email" name="email" value={ email } onChange={ handleChangeInput  } onBlur={ handleInputBlur } />
          </div>

          <div>
            <textarea
            // remove this
              className={`p-text .invalid-input ${(!message.trim() && message) ? 'invalid-input' : ''}`}
              placeholder="Your Message"
              value={ message }
              name="message"
              onChange={ handleChangeInput }
              onBlur={ handleInputBlur }
            />
          </div>
          <button type="button" className="p-text" onClick={ handleSubmit }>{!loading ? 'Send Message' : 'Sending...'}</button>

          {/* remove this */}
          { errorMessage && <p className = "error-message">{ errorMessage }</p> }
          
        </div>
      ) : (
        <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);