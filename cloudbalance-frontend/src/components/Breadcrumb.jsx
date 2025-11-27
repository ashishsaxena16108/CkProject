import React from 'react'
import { pathTitleMap } from '../app/constant.jsx'
import { useLocation,Link } from 'react-router-dom'
import Home from '/home.svg'

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/');
  return (
    <div className='flex gap-2'><img src={Home} alt="" />{pathnames.map((name, index) => {
              const routeTo = pathnames.slice(0, index + 1).join('/');
              const isLast = index === pathnames.length - 1;
              return isLast ? (
                <div key={name} className="breadcrumb-item active" aria-current="page">
                  {pathTitleMap.get(name)} 
                </div>
              ) : (
                <div key={name} className="flex gap-2">
                  <Link to={`${routeTo}`}>{pathTitleMap.get(name)}</Link><div>{'>'}</div>
                </div>
              );
            })}</div>
  )
}

export default Breadcrumb