import React from 'react'
import ListItem from './ListItem'
import { adminList,userList } from '../app/constant'

const SideBar = ({open,isAdmin}) => {
  const list = isAdmin?adminList:userList; 

  return (
    <div className="flex flex-col gap-3 my-2 text-lg  sidebar bg-white">
        {list.map((item,index)=>{
            return <ListItem open={open} key={index} item={item} link={isAdmin ? `/admin/${item.title.toLocaleLowerCase().split(' ').join('')}`:`/user/${item.title.toLocaleLowerCase().split(' ').join('')}`}/>
        })}
    </div>
  )
}

export default SideBar