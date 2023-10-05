import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
export default function Home() {
  return (
    <>
    <div className='HomeMain'>
      <div className='homeContent'>
        <h2>Publish your passion, your way</h2>
        <h5>Create a unique and beatiful blog easily</h5>
       <Link to='/signup'><button>Create your Blog</button></Link>
      </div>
    </div>
    </>
  )
}
