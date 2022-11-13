import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import {  getPosts  } from '../StateManagement/Slices/postSlice';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';




const Blogs = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const rawData = useSelector((state) => state.posts.posts)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  console.log('isLoggedIn >>', isLoggedIn)
  const userId = localStorage.getItem('userId')
  const allPosts = rawData.posts
  console.log(rawData.posts)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch || navigate])

  //edit 
  const handleEdit = (e, id) => {
    console.log('handle edit >>', id)
    navigate(`/edit-blog/${id}`)
    
  }

  // //delete
  // const handleDelete = (e, id) => {
  //   console.log("handle delete >>", id)
  //   dispatch(deletePost(id))
  //   // navigate('/my-blogs')
  //   dispatch(getPosts())
  // }

  // view details
   const details = (e, id)=>{
    console.log(id , "detail page")
    navigate(`/my-blog/${id}`)
   }

  return (

    <>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', margin: '20px' }}>
        {
          allPosts?.length > 0 ? (<>

            {
              allPosts.map((item) => (<>
                <Card border="info" className='shadow' key={item._id} style={{ margin: '20px', width: '20rem' }}>
                  <Card.Img onClick={(e)=> details(e, item._id)} variant="top" src={item.image} style={{ height: '15rem' }} />
                  <Card.Body>
                    <Card.Text>
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <h4>
                          {item.title.substring(0,25)}
                        </h4>


                      </div>
                    </Card.Text>
                    <Card.Text>
                      {item.content.substring(0,50)} ...
                    </Card.Text>
                    {
                      isLoggedIn && userId === item.user._id ? (<>
                       <div className="mb-0 mt-0">
                      <Card.Text >
                        <Button onClick={(e) => handleEdit(e, item._id)} className="mx-1 my-3 btn btn-sm col-12 shadow" variant="dark">Edit  </Button>
                        {/* <Button onClick={(e) => handleDelete(e, item._id)} className="btn-sm my-3 col-5 shadow" variant="danger">Delete</Button> */}
                      </Card.Text>
                    </div>
                      </>) : (<>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end  ' }}>

                          <h5 className='text-success text-muted'><i>
                            {item.user.name}
                          </i></h5>
                        </div>
                      </>)
                    }

                  </Card.Body>


                </Card>


              </>))
            }

          </>)


            : (
              <div>
                <Spinner animation="grow" />
              </div>
            )
        }

      </div>

    </>
  )
}

export default Blogs