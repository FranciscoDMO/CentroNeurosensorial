import { useState,useEffect } from 'react'


const useFetch = (url) =>{
    const [data, setData] = useState(null);
    const [isPending , setIsPending]= useState(true);
    const [error,setError] = useState(null);
    url = "http://localhost:5000" + url;

    useEffect( () => {
        const abortCont = new AbortController();

        fetch(url,{signal: abortCont.signal})
        .then(res =>{
            if(!res.ok){
                throw Error('nao consegiu buscar a informaçao do server');
            }
  
   
            return res.json();
        })
          .then(data=>{
              
            setIsPending(false);
            setData(data);
            setError(null);
  
          })
          .catch(err=>{
              if(err.name === 'AbortError'){
                  console.log('fetch aborted')
              }else{
              setIsPending(false);
              setError(err.message);
              }
              
          });
          return () => abortCont.abort();
    } ,[url] );

    return{data , isPending , error}


}

export default useFetch;