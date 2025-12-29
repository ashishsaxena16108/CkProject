import React from 'react'
import Sort from '/sort.svg'
import Filter from '/filter.svg'

const Table = ({ tableData, headers, headStyle='bg-blue-800 text-white',maxHeight='60vh' }) => {
  
  const numCols = headers.length;
 
  
  return (
    <div className="w-full border border-gray-200 overflow-hidden text-sm">
      <div className={`grid ${headStyle} font-semibold`} style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}>
        {headers.map((header, index) => (
          <div key={index} className="p-1 border-e text-center border-gray-200 last:border-none flex items-center">
            <div className='mx-2'>
              {header.head}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: maxHeight }}>
        {tableData?.filter((i)=>!Object.hasOwn(i,'isFooter')).map((item, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid last:border-none ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}`} style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
          >
            {headers.map((header, colIndex) => {
              return (
                <div
                  key={colIndex}
                  className={`p-2 border-e border-gray-200 last:border-none`}
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
      {tableData?.filter((i)=>Object.hasOwn(i,'isFooter')).map((item, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid last:border-none ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}`} style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
          >
            {headers.map((header, colIndex) => {
              return (
                <div
                  key={colIndex}
                  className={`p-2 border-e border-gray-200 bg-blue-100 text-blue-800 last:border-none`}
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
  );
};


export default Table