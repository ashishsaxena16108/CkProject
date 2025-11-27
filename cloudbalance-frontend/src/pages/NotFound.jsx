import React from 'react'
import notFound from '../assets/404-error.png';

const NotFound = () => {
  return (
     <div className='notfound'><img src={notFound} width={200}/> Not Found</div>
  )
}

export default NotFound