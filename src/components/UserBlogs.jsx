import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPostsOfUser } from '../StateManagement/Slices/postSlice';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';

const UserBlogs = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userPosts = useSelector((state) => state.posts.posts)
  console.log(userPosts)
  

  useEffect(() => {
    dispatch(getPostsOfUser())
  }, [dispatch])

  //edit 
  const handleEdit = (e, id) => {
    console.log('handle edit >>', id)
    navigate(`/edit-blog/${id}`)
  }

  //delete
  const handleDelete = (e, id) => {
    console.log("handle delete >>", id)
    dispatch(deletePost(id))
    dispatch(getPostsOfUser())
  }

  //view
  const details = (e, id)=>{
    console.log(id , "detail page")
    navigate(`/my-blog/${id}`)
   }

  return (
    <>
      <div className="mx-auto my-2" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {
          userPosts.length > 0 ? (<>

            {
              userPosts.map((item) => (<>

                <Card className='shadow' style={{ margin: '20px', width: '20rem', textAlign: 'center' }} border="info" key={item._id} >
                  <Card.Img onClick={(e)=> details(e, item._id)} variant="top" src={item.image} style={{ height: '15rem' }} />
                  <Card.Body>
                    <Card.Text>
                      <h3>
                        {item.title.substring(0, 20)}
                      </h3>
                    </Card.Text>
                    <Card.Text>
                      {item.content.substring(0, 50)}  ...
                    </Card.Text>

                    <div className="mb-0 mt-0 py-0">
                      <Card.Text >
                        <Button onClick={(e) => handleEdit(e, item._id)} className="mx-1 my-3 btn btn-sm col-5 shadow" variant="dark">Edit  </Button>
                        <Button onClick={(e) => handleDelete(e, item._id)} className="btn-sm my-3 col-5 shadow" variant="danger">Delete</Button>
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>

              </>))
            }
          </>) : (<>
            <div className='my-4'><h4>

              No Posts Here !

            </h4>
              <h3 className='mx-4'><Link to={'/add-blog'}>
                Create </Link></h3>
            </div>
          </>)
        }


      </div></>
  )
}

export default UserBlogs