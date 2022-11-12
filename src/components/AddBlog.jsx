import React from 'react'
//
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { addPost } from '../StateManagement/Slices/postSlice';
import Alert from 'react-bootstrap/Alert';

const AddBlog = () => {

  // const navigate = useNavigate()
  const actionCompleted = useSelector((state) => state.posts.isLoading)
  console.log(">>", actionCompleted)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  // console.log(isLoggedIn)
  const dispatch = useDispatch()
  let id = localStorage.getItem('userId')


  const submitData = (e) => {
    e.preventDefault()
    const data = {
      title: e.target.title.value,
      content: e.target.content.value,
      image: e.target.image.value,
      user: id
    }
    dispatch(addPost(data))
    // then( navigate('/my-blogs'))
   
  }

  return (<>

    <div style={{ width: '70%', margin: '20px' }}>
      <div className="fluid">
        {
          actionCompleted && isLoggedIn ? (<>
            <Alert variant="info">
              <h4> Post Added Successfully ! </h4>
            </Alert>
          </>) : null
        }
      </div>
      {
        isLoggedIn ? (<>
          <Form onSubmit={(e) => submitData(e)}>
            <Form.Group className="mb-3" >
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" required placeholder="Enter title" />

            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" type="text" name="content" style={{ height: "150px" }} required placeholder="Describe the blog" />

            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Image</Form.Label>
              <Form.Control type="text" required name="image" placeholder="Insert the Image URL" />

            </Form.Group>
            <div style={{}} className="text-center">
              <Button variant="dark" className='btn col-4' type="submit">
                Submit
              </Button>

            </div>
          </Form>
        </>) : (<>
          <div style={{ marginTop: '50px ', display: 'flex', justifyContent: 'center' }}>
            <Link to="/auth" > Login or Sign Up </Link>
          </div>
        </>)
      }



    </div>

  </>)
}


export default AddBlog; 