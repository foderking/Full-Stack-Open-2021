import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')  
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  console.log(username)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  const handleLogin = (event) => {    
    event.preventDefault()    
    console.log('logging in with', username, password)
    setUser('root')  
  }

  const Login = () => 
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
  
  
  const Blogs = () => (
    <div>
      <h2>blogs</h2>
      <p>{username} is logged in</p>
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