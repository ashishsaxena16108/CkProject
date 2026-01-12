import React, { useState,useEffect,useRef } from 'react'
import { dateConstant } from '../app/constant';
import { useDispatch } from 'react-redux';
import { setdates } from '../app/feature/accountReducer';

const DateInput = ({start={day:1,month:'Jan',year:2025},end={day:1,month:'Jun',year:2025}}) => {
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(start);
    const dispatch = useDispatch();
    const [endDate, setEndDate] = useState(end);
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
    const handleApply = ()=>{
        dispatch(setdates({startDate:`${startDate.year}-${dateConstant.months.indexOf(startDate.month)+1}-${startDate.day}`,endDate:`${endDate.year}-${dateConstant.months.indexOf(endDate.month)+1}-${endDate.day}`}));
    };
    const handleReset = ()=>{
        dispatch(setdates({startDate:'',endDate:''}));
        setStartDate(start);
        setEndDate(end);
    }
    return (
        <div className='relative'>
            <div onClick={() => setOpen(!open)} className='text-xs flex items-center justify-center bg-white rounded p-3 border border-gray-200'>
                <button >{formatDate(startDate)} - {formatDate(endDate)}</button>
            </div>
            <div ref={pickerRef} className={`${open ? 'opacity-100 duration-200' : 'opacity-0 duration-100 pointer-events-none'} 
            absolute top-full left-1/12 -translate-x-1/2 w-80
            bg-white shadow-xl rounded p-4 z-10 mt-1 flex flex-col justify-center items-center gap-3 border border-gray-300`}>
                <button className='text-xs self-end text-blue-900' onClick={()=>handleReset()}>Clear Selection</button>
                <div className='flex gap-2'>Start Date:
                    <select name="day" id=""  onChange={(e) => handleChange(e, 'start')} onClick={handleDropdownClick} value={startDate.day}>
                        {dateConstant.days.map((day) => {
                            return <option value={day} key={day}>{day}</option>
                        })}
                    </select>
                    <select name="month" id="" onChange={(e) => handleChange(e, 'start')} onClick={handleDropdownClick} value={startDate.month}>
                        {dateConstant.months.map((month) => {
                            return <option value={month} key={month}>{month}</option>
                        })}
                    </select>
                    <select name="year" id=""  onChange={(e) => handleChange(e, 'start')} onClick={handleDropdownClick} value={startDate.year}>
                        {getYearArray()
                            .map(year => (<option value={year} key={year}>{year}</option>))}
                    </select>
                </div>
                <div className='flex gap-2'>End Date:
                    <select name="day" id="" onChange={(e) => handleChange(e, 'end')} onClick={handleDropdownClick} value={endDate.day}>
                        {dateConstant.days.map((day) => {
                            return <option value={day} key={day}>{day}</option>
                        })}
                    </select>
                    <select name="month" id="" onChange={(e) => handleChange(e, 'end')} onClick={handleDropdownClick} value={endDate.month}>
                        {dateConstant.months.map((month) => {
                            return <option value={month} key={month}>{month}</option>
                        })}
                    </select>
                    <select name="year" id="" onChange={(e) => handleChange(e, 'end')} onClick={handleDropdownClick} value={endDate.year}>
                        {getYearArray()
                            .map((year) => {
                                return <option value={year} key={year}>{year}</option>
                            }
                            )}
                    </select>
                </div>
                <div className='self-end'>
                <button onClick={()=>setOpen(false)} className=' text-blue-800 rounded p-1 border border-blue-800 mx-4'>Cancel</button>
                <button className=' bg-blue-800 rounded p-1 text-white mx-4' onClick={()=>handleApply()}>Apply</button>
                </div>
            </div>
        </div>
    )
}

export default DateInput