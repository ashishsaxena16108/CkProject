import React from 'react'
import { useSelector } from 'react-redux';

const Loader = () => {
  const isLoading = useSelector((state) => state.load.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-9999 backdrop-blur-lg flex justify-center items-center">
      <div className="flex justify-center items-center h-full w-full space-x-1">
      {/* Bar 1 */}
      <div 
        className="w-2 bg-blue-300 animate-bouncing-bars" 
        style={{ animationDelay: '0s' }}
      ></div>
      {/* Bar 2 */}
      <div 
        className="w-2 bg-blue-600  animate-bouncing-bars" 
        style={{ animationDelay: '0.1s' }}
      ></div>
      {/* Bar 3 */}
      <div 
        className="w-2 bg-blue-800 animate-bouncing-bars" 
        style={{ animationDelay: '0.2s' }}
      ></div>
      </div>
    </div>
  );
}

export default Loader