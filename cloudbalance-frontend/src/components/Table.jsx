import React, { useState, useEffect } from 'react'
import Sort from '/sort.svg'
import Filter from '/filter.svg'

const Table = ({ tableData, headers }) => {
  const [sortedData, setSortedData] = useState(tableData);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  useEffect(() => {
    setSortedData(tableData);
  }, [tableData]);
  const numCols = headers.length;
  const handleSort = (field) => {
    const direction = (field === sortField && sortDirection === 'asc') ? 'desc' : 'asc';

    const sorted = [...sortedData].sort((a, b) => {
      const valA = a[field] || '';
      const valB = b[field] || '';

      let comparison = 0;
      if (valA > valB) {
        comparison = 1;
      } else if (valA < valB) {
        comparison = -1;
      }

      return direction === 'desc' ? comparison * -1 : comparison;
    });
    setSortedData(sorted);
    setSortField(field);
    setSortDirection(direction);
  };
  return (
    <div className="w-full border border-gray-200 overflow-hidden text-sm">
      <div className={`grid bg-blue-800 text-white font-semibold`} style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}>
        {headers.map((header, index) => (
          <div key={index} className="p-1 border-e text-center border-gray-200 last:border-none flex justify-between items-center">
            <div>
              {header.head}
            </div>
            <div className='flex'>
              <img src={Filter} alt="" />
              <img onClick={() => handleSort(header.field)} src={Sort} alt="" className={`cursor-pointer ${header.field === sortField ? (sortDirection === 'asc' ? 'rotate-180' : '') : ''}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
        {sortedData.map((item, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid last:border-none ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}`} style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
          >
            {headers.map((header, colIndex) => {
              return (
                <div
                  key={colIndex}
                  className="p-2 border-e border-gray-200  text-center last:border-none"
                >
                  {header.field ? item[header.field]
                    : (
                      (() => {
                        const BodyComponent = header.body;
                        return <BodyComponent data={item} />;
                      })()
                    )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};


export default Table