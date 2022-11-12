import React from 'react'
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { viewOne } from '../StateManagement/Slices/postSlice';


const BlogDetails = () => {
  const {id} = useParams()
  // const id = localStorage.getItem('postId')
  const data = useSelector((state) => state.posts.posts)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(viewOne(id))
  }, [dispatch])

  const itemData = data.post
  console.log(id, itemData)
 
  
  return (
    <>
     <div className="mx-auto my-2" style={{display:'flex' , justifyContent:'center' }}>

      { itemData? (<>
      <div style={{margin:'20px', width:"60%" }}>
        <Card >
        <Card.Img variant="top" src={itemData.image} />
        <Card.Body>
        <Card.Text>
           <h3> {itemData.title}</h3>
          </Card.Text>
          <Card.Text>
            {itemData.content}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
      </>):
      (<> <h1>Loading...</h1></>)
      }
    
      </div>
    </>
  )
}

export default BlogDetails