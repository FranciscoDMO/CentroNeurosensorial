import React, { useEffect } from 'react';
import useStorage from './hooks/useStorage';



const ProgressBar = ({ file, setFile, url1 , setURL }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
      
    
    }
  }, [url, setFile]);
  setURL(url)

  return (
      
    <div className ="progress-bar" style ={{with : progress +'%'}}></div>
    
  );
} 

export default ProgressBar;