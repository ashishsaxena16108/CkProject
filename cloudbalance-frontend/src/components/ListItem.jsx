import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';

const ListItem = ({item,link,open}) => {
  const [isHover, setIsHover] = useState(false);

    const getLinkClassName = ({ isActive }) => {
        const activeOrHoverClass = (open && (isActive || isHover)) ? 'bg-blue-100 font-semibold' : '';

        return `flex p-2 m-4  justify-start gap-5 items-center rounded
                ${activeOrHoverClass}`;
    };

    // Determine the image source based on active or hover state
    const getIconSrc = ({ isActive }) => {
        // If the link is active OR the mouse is hovering, use the hover image
        return (isActive || isHover) ? item.imghover : item.img;
    };

    // Determine the image background style
    const getIconBgClass = ({ isActive }) => {
        // Apply the special background when active OR hovering
        return `${(isActive || isHover) && 'bg-blue-400'} p-1 rounded-md`;
    };


    return (
        <NavLink
            to={link}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
            
            className={getLinkClassName}
        >
            {({ isActive }) => (
                <>
                    <img
                        src={getIconSrc({ isActive })} 
                        className={getIconBgClass({ isActive })}
                        alt=""
                        width={40}
                    />
                    <div className={`whitespace-nowrap transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}
                `}>{item.title}</div>
                </>
            )}
        </NavLink>
    );
}

export default ListItem