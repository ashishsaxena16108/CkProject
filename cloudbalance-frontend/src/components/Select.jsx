import React,{useState,useRef,useEffect} from 'react'
import ArrowDown from '/arrow_down.svg'

const Select = ({options,onSelect,initialValue,name,values}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue || null);
  const dropdownRef = useRef(null);

  const displayLabel = selected ? selected : 'Select an option';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option,value) => {
    setSelected(option);
    onSelect(name,value);
    setIsOpen(false);
  };

  return (
    <div className=" w-full" ref={dropdownRef}>
      <button
        type="button"
        className="w-full p-3 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-500'}>
          {displayLabel}
        </span>
        <span
          className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
          aria-hidden="true" > <img src={ArrowDown} alt="" />
        </span>
      </button>

      {isOpen && (
        <ul
          className=" z-10 fixed w-1/5 mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60 focus:outline-none"
          tabIndex="-1"
          role="listbox"
        >
          {options.map((option,index) => (
            <li
              key={option}
              className={`cursor-pointer p-2 hover:bg-blue-50 hover:text-blue-600 ${
                selected && selected === option ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-900'
              }`}
              onClick={() => handleSelect(option,values[index])}
              role="option"
              aria-selected={selected && selected === option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select