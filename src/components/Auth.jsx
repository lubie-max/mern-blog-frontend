import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { userLogin, userSignUp } from '../StateManagement/Slices/authSlice';
import Alert from 'react-bootstrap/Alert';



const Auth = () => {
  const [signUp, setSignUp ] = useState(false)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const isLoggedIn = useSelector((state)=> state)
  console.log('auth State', isLoggedIn)


  const submitForm=(e)=>{
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    console.log('form', name, email, password)

    if (!signUp){
      let data = {
        email : email,
        password: password

      }
      dispatch(userLogin(data))
      navigate("/")
      console.log(data)
    }

    if(signUp){
      let data = {
        name : name,
        email : email,
        password: password

      }
      dispatch(userSignUp(data))


    }
  }

 

  return (
<>
    {/* <div className="fluid">
        {
          !isLoggedIn ? (<>
            <Alert variant="info">
              <h4> Logged in Successfully ! </h4>
            </Alert>
          </>) : null
        }
      </div> */}
    <div style={{width:'55%', margin:'20px', marginTop:'6%', padding:'30px'}} className="shadow rounded ">



      <h2 className="text-center my-2 mb-3">{ signUp ?<> Sign Up </>:<>Log In </> }</h2>

       <form  onSubmit={(e) => (submitForm(e))} >
{
  signUp && <>
       <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
        <Form.Control name='name' type="text" placeholder="Your name!" />
      </Form.Group>
  
  </>
}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" />
      </Form.Group>

   <div style={{display:'flex', justifyContent:'center'}}>
      <Button  variant="primary" type="submit" className='col-4'>
        SUBMIT
      </Button>
    
      <Button onClick={(e)=> setSignUp(!signUp)} variant="dark" className="mx-4 col-4">
       {signUp?<>LOGIN</>:<>SIGNUP</>}
      </Button>
   </div>

    </form>
</div>

</>
  )
}

export default Auth