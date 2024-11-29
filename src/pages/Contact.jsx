
import React, { useRef } from 'react'
import emailjs from "@emailjs/browser"



function Contact() {
 const formRef = useRef();


  const handleSubmit =(e) =>{
    e.preventDefault();
    console.log('Form Data:', new FormData(formRef.current));

   emailjs.sendForm(
    process.env.REACT_APP_SERVICE_ID,
    process.env.REACT_APP_TEMPLATE_ID,
    formRef.current,
    process.env.REACT_APP_PUBLIC_KEY,

   ).then(
    (result) => {
      console.log( 'Email Send Successfully',result.text);
      alert('Email Sent Successfully');
    },
    (error) => {
      console.error('Error Sending Email', error);
      alert('Error Sending Email');
    }

   );
   e.target.reset();
    //  formData.preventdefault();
  // console.log(formData.entries());
  // const formInputdata= Object.fromEntries(formData.entries());
  // console.log(formInputdata);
}


  return (
    <section className="section-contact">
      <h2 className="container-title">Contact Us</h2>

      <div className="contact-wrapper container">
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="enter your name"
            name="username"
            required
            autoComplete="off"
          />

          <input
            type="email"
            className="form-control"
            placeholder="Enter you email"
            name="email"
            required
            autoComplete="off"
          />

          <textarea
            className="form-control"
            rows="10"
            placeholder="Enter your message"
            name="message"
            required
            autoComplete="off"
          ></textarea>

          <button type="submit" value="send">
            Send
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact