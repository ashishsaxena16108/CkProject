import React from 'react'
import ListItem from './ListItem'

const SideBar = ({open,list,isAdmin}) => {
  

  return (
    <div className=" w-full  text-lg  sidebar bg-white">
        {list.map((item,index)=>{
            return <ListItem open={open} key={index} item={item} link={isAdmin ? `/admin/${item.title.toLocaleLowerCase().split(' ').join('')}`:`/user/${item.title.toLocaleLowerCase().split(' ').join('')}`}/>
        })}
    </div>
  )
}

export default SideBar