import React, { useContext } from 'react'
import { myContext } from './App';
import './readmore.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';
export default function ReadMore() {
  const {readBlog,User} = useContext(myContext); 

  return (
   <>
   <div className='backDiv'><Link to='/blogDisplay'><button><ArrowBackIosIcon  sx={{color:"purple",size:"30"}}/></button></Link></div>
     <div className='readMore'>
       <div>
         <img src={readBlog.image} alt='cover'/>
      </div>
      <div>
         <h3>{readBlog.title}</h3>
      </div>
         <pre style={{whiteSpace:'pre-wrap'}}>{readBlog.text}</pre>     
      <div><h6>By:{readBlog.userName}</h6></div> 
     </div>
   </>
  )
}
