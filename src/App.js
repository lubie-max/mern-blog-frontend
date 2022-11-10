import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom"
import Header from './components/Header';
import AddBlog from './components/AddBlog';
import BlogDetails from './components/BlogDetails';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import Auth from './components/Auth';
import EditPost from './components/EditPost';

function App() {
  return (
   <>
 
     <Header/>

   <div className='main'>

<Routes>
  <Route path='/auth' element={<Auth />} />
  <Route path='/' element={<Blogs/>} />
  <Route path='/my-blogs' element={<UserBlogs/>} />
  <Route path='/my-blog/:id' element={<BlogDetails/>} />
  <Route path='/edit-blog/:id' element={<EditPost/>} />
  <Route path='/add-blog' element={<AddBlog/>} />
</Routes>

 
   </div>
   </>
  );
}

export default App;
