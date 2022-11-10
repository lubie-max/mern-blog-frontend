import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


export const getPosts = createAsyncThunk(
    'getPosts',
    async () => {
        const response = await axios.get(`https://lubies-mern-blog.herokuapp.com/api/blogs/`);
        const data = await response.data
        console.log(data)
        console.log(localStorage.userId)
        return data

    }
)

export const getPostsOfUser = createAsyncThunk(
    'userPosts',
    async () => {
        const response = await axios.get(`https://lubies-mern-blog.herokuapp.com/api/blogs/user/${localStorage.userId}/`)
        const data = await response.data
        return data.blogs.blogs
    }
)


export const addPost = createAsyncThunk(
    'sendPosts',
    async (postData) => {
        const response = await axios(
            {
                method: 'post',
                url: `https://lubies-mern-blog.herokuapp.com/api/blogs/new-blog/`,
                data: postData
            })

        const data = await response.data

        return data
    })

// delete post 

export const deletePost = createAsyncThunk(
    'deltePost',
    async (id) => {
        const response = await axios.delete(`https://lubies-mern-blog.herokuapp.com/api/blogs/delete/${id}/`)
        const data = await response.data
        console.log(data)
        return data
    }

)

// edit post 
export const updatePost = createAsyncThunk(
    'updatePost',
    async (postData ) => {
        
        const response = await axios.put(`https://lubies-mern-blog.herokuapp.com/api/blogs/update/${localStorage.postId}`,postData )
        const data = await response.data
        console.log("updated data", data)
        return data
    }
)

// view one

export const viewOne = createAsyncThunk('viewOne',
    async (id) => {
        const response = await axios.get(`https://lubies-mern-blog.herokuapp.com/api/blogs/${id}`)
        const data = await response.data
        console.log(">>>>>>data>>", data)
        localStorage.setItem('postId', data.post._id)
        console.log("id at viewOne", localStorage.getItem('postId'))
        return data

    })


//slice
export const blogPostsSlice = createSlice(
    {
        name: 'blogPosts',
        initialState: {
            posts: [],
            isLoading: true
        },
        extraReducers: {
            [getPosts.pending]: (state) => {
                state.isLoading = true
            },
            [getPosts.fulfilled]: (state, action) => {
                state.posts = action.payload
                state.isLoading = false
            },
            [getPosts.rejected]: (state) => {
                state.isLoading = true
            },

            //userPosts
            [getPostsOfUser.pending]: (state) => {
                state.isLoading = true
            },
            [getPostsOfUser.fulfilled]: (state, action) => {
                state.posts = action.payload
                state.isLoading = false
            },
            [getPostsOfUser.rejected]: (state) => {
                state.isLoading = true
            },

            //send Post
            [addPost.pending]: (state) => {
                state.isLoading = true
            },
            [addPost.fulfilled]: (state, action) => {
                state.posts = action.payload
                state.isLoading = false
            },
            [addPost.rejected]: (state) => {
                state.isLoading = true
            },

            //view one
            [viewOne.pending]: (state) => {
                state.isLoading = true
            },
            [viewOne.fulfilled]: (state, action) => {
                state.posts = action.payload
                state.isLoading = false
            },
            [viewOne.rejected]: (state) => {
                state.isLoading = true
            },

            // update posts
            [updatePost.pending]: (state) => {
                state.isLoading = true
            },
            [updatePost.fulfilled]: (state, action) => {
                state.posts = action.payload
                state.isLoading = false
            },
            [updatePost.rejected]: (state) => {
                state.isLoading = true
            },

            //delete
            [deletePost.pending]: (state) => {
                state.isLoading = true
            },
            [deletePost.fulfilled]: (state, action) => {
                // state.posts = action.payload
                state.isLoading = false
            },
            [deletePost.rejected]: (state) => {
                state.isLoading = true
            },

        }
    }
)

export default blogPostsSlice.reducer