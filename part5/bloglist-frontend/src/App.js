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

  const [error, setError] = useState('')
  const [classtype, setType] = useState('success')

  const [createBlogVis, setBlogVis] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  const notify = (message, type) => {                // Function for the notification commponent
    setError(message)
    setType(type)

    setTimeout(() => setError(false), 4000 )
  }

  

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      notify(`${user.username} logged in successfully` , 'success')
      setUser(user)

      window.localStorage.setItem('activeUser', user.token)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    notify(`logged out successfully` , 'success')
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

      setTitle('')
      setAuthor('')
      setUrl('')
      
      setBlogVis(false)
      
      notify(`${newBlog.title} posted successfully` , 'success')
    }
    catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }    


  const increaseLike = async(blog) => {
    const newBlog = {...blog, likes: blog.likes + 1}
    // console.log(newBlog)
    const response = await blogService.update(newBlog)
    // console.log(response)
    const temp = blogs.find(each => each.id === response.id)
    // console.log(temp)
    const newb = {...temp, likes: response.likes}
    const t = blogs.map(
      each => each.id === temp.id ? newb : each
    )
    setBlogs(t)
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

  const showWhenVisible = { display: createBlogVis ? '' : 'none' }  
  
  const Blogs = () => (
    <div>
      <h2>blogs</h2>
      <form onSubmit={handleLogout}>
        {user.username} is logged in
        <button type="submit" >logout</button>
      </form>

      <div style={showWhenVisible}>
        <CreateBlog
          handleBlogPost={handleBlogPost}
          blogTitle={blogTitle}
          setTitle={setTitle}
          blogAuthor={blogAuthor}
          setAuthor={setAuthor} 
          blogUrl={blogUrl} 
          setUrl={setUrl}
        />
      </div>

      <button type="submit" onClick={() => setBlogVis(!createBlogVis)} >
        {createBlogVis ? 'cancel' : 'create blog'}
      </button>

      {
        blogs
        .sort( (a, b) => {
          return b.likes - a.likes 
        })
        .map(blog =>
            <Blog key={blog.id} blog={blog} increaseLike={increaseLike} />
        )
      }
    </div>    
  )



  return (
    <div>
      {error ? 
        <Notification 
          message={error} 
          class_={classtype} 
        /> 
             : 
        <></>
      }
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



const Notification = ({ message, class_}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={class_}>
      {message}
    </div>
  )
}

const CreateBlog = ({handleBlogPost, blogTitle, setTitle, blogAuthor, setAuthor, blogUrl, setUrl}) => {
  return (
    <div>
      <h2>Create Blog</h2> 
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


export default App