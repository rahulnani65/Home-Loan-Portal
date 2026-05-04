import  { useState } from "react";
import { Container, Row, Col, Form, Button, CloseButton, Image } from "react-bootstrap";
import React from 'react';
import signup from "../../assets/signup.png";
import logo from "../../assets/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import '../../Styles/signup.css';
function SignUp({closeModal,openLogin} ) {
     const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
   openLogin();
    
  };
  return (
    <>
    <div className='SignUp'>
        <Container>
            <Row className=" align-items-center   ">
          {/* Left side (optional image / empty) */}
          <Col md={6} className="d-none d-md-flex login-image-wrapper   ">
      <Image
        src={signup}
        alt="Sign Up Illustration"
        className="login-side-image border-radius-16 "
        fluid
      />
    </Col>

          {/* Right side login box */}
          <Col md={6}>

            <div className="login-box  position-relative  ">
           <Button
            type="button"
            className="btn btn-light position-absolute top-0 end-0"
            onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>


            <div className="text-center mb-1  ">
                           <Image src={logo} height={60} className="mb" />
                           <h3 className="fw-bold ">Sign Up</h3>
              <hr/>
              </div>


  
    <Form onSubmit={handleSubmit} className="">

      {/* First Name */}
                
       <div className="name-form-row ">
            <Form.Group className="mb-3 form-group">
                <Form.Label className="heading">First Name</Form.Label>
                <Form.Control type="text" name="firstName" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3 form-group">
                <Form.Label className="heading">Middle Name</Form.Label>
                <Form.Control type="text" name="middleName" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3 form-group">
                <Form.Label className="heading">Last Name</Form.Label>
                <Form.Control type="text" name="lastName" onChange={handleChange} />
            </Form.Group>
        </div>
        

      {/* Email */}
       <Form.Group className="mb-3">
         <Form.Label className="heading">Email</Form.Label>
        <Form.Control
          className="border-0 border-bottom"
          type="email"
          name="email"
          placeholder="Enter email"
          required
          onChange={handleChange}
        />
      </Form.Group>

      {/* Phone */}
        <div className="phone-form-row">
        <Form.Group className="mb-1 form-group country-select ">
            <Form.Label className="heading">Country</Form.Label>
            <Form.Select className="countrycode" name="countryCode" onChange={handleChange} required>
            
            <option value="+1">USA (+1)</option>
            <option value="+91">India (+91)</option>
            <option value="+44">UK (+44)</option>
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-1 form-group">
            <Form.Label className="heading">Phone</Form.Label>
            <Form.Control
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            onChange={handleChange}
            />
        </Form.Group>
        </div>


      {/* Gender */}
      <Form.Group className="mb-3">
        <Form.Label className="heading">Gender</Form.Label>
        <Form.Select
          className="border-0 border-bottom"
          name="gender"
          required
          onChange={handleChange}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Form.Select>
      </Form.Group>

      {/* Password */}
      <div className="password-row">
  <Form.Group className="mb-2 password-group">
    <Form.Label className="heading">Password</Form.Label>
    <Form.Control
      className="border-0 border-bottom"
      type="password"
      name="password"
      placeholder="Enter password"
      required
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb password-group">
    <Form.Label className="heading">Confirm Password</Form.Label>
    <Form.Control
      className="border-0 border-bottom"
      type="password"
      name="confirmPassword"
      placeholder="Confirm password"
      required
      onChange={handleChange}
    />
  </Form.Group>
</div>


      <div className="d-flex flex-column align-items-center">
        <button
        className="hdr-btn hdr-btn--ghost mb-3 blue-color text-white"
        onClick={() => {
            setAuthMode("login");   // 👈 ensure login opens
            setShowLogin(true);     // 👈 open modal
        }}
        >
        Sign In
        </button>
        <p>
        Already have an account?{" "}
        <a
            href="#"
            onClick={(e) => {
            e.preventDefault();
            openLogin();
            }}
        >
            Login
        </a>
        </p>
      </div>

    </Form>




            </div>
          </Col>
        </Row>
            
        </Container>
    </div>
    
    </>
  )
}

export default SignUp;
