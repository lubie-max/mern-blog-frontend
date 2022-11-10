import React, { useState } from 'react'
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost, viewOne } from '../StateManagement/Slices/postSlice' ;
import Spinner from 'react-bootstrap/Spinner' ;

const EditPost = () => {
  
  const {id} = useParams()
  const item = useSelector((state)=> state.posts.posts)
  const itemData= item.post

console.log("data",item.post)
  
  console.log('post id ', id, typeof(id))
  const navigate = useNavigate()

const dispatch = useDispatch()
useEffect(() => {

  return () => {
    dispatch(viewOne(id))
  
  }
}, [id])



const submitData = (e)=>{
  e.preventDefault()
  const postData= {

    title: e.target.title.value ,
    content: e.target.content.value ,
    image: e.target.image.value 
  }
  const postId = localStorage.getItem('postId')
  console.log('form', postData  , id , postId)
  dispatch(updatePost(postData))
  navigate('/my-blogs')

}

  return (
   <>
   <div style={{width:'65%' , marginTop:'20px'}}>

{
  itemData ?(<>
  <form onSubmit={(e) => submitData(e)}>
<Form.Group className="mb-3" >
  <Form.Label>Title</Form.Label>
  <Form.Control type="text" defaultValue={itemData.title}   name="title" required placeholder="Enter title"  />

</Form.Group>
<Form.Group className="mb-3" >
  <Form.Label>Description</Form.Label>
  <Form.Control as="textarea" type="text" defaultValue={itemData.content} name="content" style={{height:"150px"}} required placeholder="Describe the blog"  />

</Form.Group>

<Form.Group className="mb-3" >
  <Form.Label>Image</Form.Label>
  <Form.Control type="text" required defaultValue={itemData.image} name="image" placeholder="Insert the Image URL"  />

</Form.Group>
<Button variant="dark" className=' border-info' type="submit">
  Update
</Button>

</form> 
  </>): (<>  <div>
                <Spinner animation="grow" />
              </div>
              </>)
}

  
    </div>
   </>
  )
}

export default EditPost;

