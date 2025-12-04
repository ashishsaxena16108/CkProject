import React, { useState,useEffect,useRef } from 'react'
import { dateConstant } from '../app/constant';

const DateInput = () => {
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState({
        day: dateConstant.days[0],
        month: dateConstant.months[4],
        year: dateConstant.yearRange.end,
    });

    const [endDate, setEndDate] = useState({
        day: dateConstant.days[0],
        month: dateConstant.months[7],
        year: dateConstant.yearRange.end,
    });
    const pickerRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (open && pickerRef.current && !pickerRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);
    const formatDate = (date) => {
        return `${date.day} ${date.month} ${date.year}`;
    }
    const handleChange = (e, type) => {
        if (type === 'start')
            setStartDate({ ...startDate, [e.target.name]: e.target.value });
        else
            setEndDate({ ...endDate, [e.target.name]: e.target.value });
    }
    const getYearArray = () => {
        return Array.from({ length: dateConstant.yearRange.end - dateConstant.yearRange.start + 1 }, (_, index) => dateConstant.yearRange.start + index);
    }
    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };
    return (
        <div className='relative'>
            <div onClick={() => setOpen(!open)} className='text-xs flex items-center justify-center bg-white rounded p-3 border border-gray-200'>
                <button >{formatDate(startDate)} - {formatDate(endDate)}</button>
            </div>
            <div ref={pickerRef} className={`${open ? 'opacity-100 duration-200' : 'opacity-0 duration-100 pointer-events-none'} 
            absolute top-full left-1/12 -translate-x-1/2 w-80
            bg-white shadow-xl rounded p-4 z-10 mt-1 flex flex-col justify-center items-center gap-3 border border-gray-300`}>
                <div className='flex'>Start Date:
                    <select name="day" id="" onChange={(e) => handleChange(e, 'start')} onClick={handleDropdownClick}>
                        {dateConstant.days.map((day) => {
                            return <option value={day} key={day}>{day}</option>
                        })}
                    </select>
                    <select name="month" id="" onChange={(e) => handleChange(e, 'start')} onClick={handleDropdownClick}>
                        {dateConstant.months.map((month) => {
                            return <option value={month} key={month}>{month}</option>
                        })}
                    </select>
                    <select name="year" id="" onChange={(e) => handleChange(e, 'start')} onClick={handleDropdownClick}>
                        {getYearArray()
                            .map(year => (<option value={year} key={year}>{year}</option>))}
                    </select>
                </div>
                <div className='flex'>End Date:
                    <select name="day" id="" onChange={(e) => handleChange(e, 'end')} onClick={handleDropdownClick}>
                        {dateConstant.days.map((day, index) => {
                            return <option value={day} key={index}>{day}</option>
                        })}
                    </select>
                    <select name="month" id="" onChange={(e) => handleChange(e, 'end')} onClick={handleDropdownClick}>
                        {dateConstant.months.map((month, index) => {
                            return <option value={month} key={index}>{month}</option>
                        })}
                    </select>
                    <select name="year" id="" onChange={(e) => handleChange(e, 'end')} onClick={handleDropdownClick}>
                        {getYearArray()
                            .map((year) => {
                                return <option value={year} key={year}>{year}</option>
                            }
                            )}
                    </select>
                </div>
                <div className='self-end'>
                <button onClick={()=>setOpen(false)} className=' text-blue-800 rounded p-1 border border-blue-800 mx-4'>Cancel</button>
                <button className=' bg-blue-800 rounded p-1 text-white mx-4'>Apply</button>
                </div>
            </div>
        </div>
    )
}

export default DateInput