import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 


const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')  
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [blogTitle, setTitle] = useState('')
  const [blogAuthor, setAuthor] = useState('')
  const [blogUrl, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])




  
  // blogService.setToken(password)
  // console.log(window.localStorage.activeUser, 'affff')


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('activeUser', user.token)
      // blogService.setToken(user.token)i
      console.log('logged in with', user.username)
      setUser(user)
      // console.log('token', blogService.token)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log(exception)  
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
  }

  const handleBlogPost = async(event) => {
    event.preventDefault()
    console.log('creating new blog')
    try {
      const newBlog = await blogService.post({
        blogTitle,
        blogAuthor,
        blogUrl
      })

      setBlogs(blogs.concat(newBlog))            
      // blogService.setToken(user.token)
      setTitle('')
      setAuthor('')
      setUrl('')
      
      console.log('added', newBlog )
    }
    catch (exception) {
      console.log(exception)  
    }
  }    
  

  const CreateBlog = (props) => {
    return (
      <div>
        <form onSubmit={handleBlogPost}>
          <InputComp
            desc='Title' 
            type='text'
            value={blogTitle}
            change={setTitle}
          />
          <InputComp 
            desc='Author'
            type='text'
            value={blogAuthor}
            change={setAuthor}
          />
          <InputComp 
            desc='Url'
            type='text'
            value={blogUrl}
            change={setUrl}
          />
        <button type='submit'>create</button>
        </form>

      </div>
    )
  }

  const Login = () => {
    window.localStorage.setItem('activeUser', null)
    return (
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          <div>
            <InputComp 
              desc='Username'
              type='text'
              value={username}
              change={setUsername}
            />
          </div>
          
          <div>
            <InputComp 
                desc='Password'
                type='password'
                value={password}
                change={setPassword}
            />
          </div>

          <button type="submit">login</button>
        </form>   
      </div>
    )
  } 

  
  
  const Blogs = () => (
    <div>
      <h2>blogs</h2>
      <form onSubmit={handleLogout}>
        {user.username} is logged in
        <button type="submit" >logout</button>
      </form>

      {CreateBlog()}

      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </div>    
  )



  return (
    <div>
      { 	
        user === null 
          ? Login()
          : Blogs()
      }
    </div>
  )
}

const InputComp = (props) => 
  <div>
    {props.desc}
    <input 
      type={props.type}
      value={props.value}
      onChange={({ target }) => props.change(target.value)}
    />
  </div>




export default App