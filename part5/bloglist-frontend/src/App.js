import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')  
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])



  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('activeUser', JSON.stringify(user))
      setUser(user)
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

  const Login = () => {
    window.localStorage.setItem('activeUser', null)
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          
          <div>
            password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
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

export default App