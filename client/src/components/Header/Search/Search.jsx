import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import { useState,useEffect } from 'react';
import axios from 'axios';

function Search() {

    const displaySuggestion=(texts)=>texts.map(data=>{
        return <a href={`http://localhost:3000/search?product=${data._id}`}>
                    <p className='transition-all hover:bg-gray-300 p-3 text-lg text-left'>{data.productName}</p>
                </a>
    })

    const [suggestion,setSuggestion]=useState([])
    const [inputvalue,setInputValue]=useState('')

    suggestion[0]!==undefined && document.addEventListener("click",(e)=>{

        !e.target.closest("#search-input") && setSuggestion([])

    })


    useEffect(()=>{
        getSearch()
    },[inputvalue])

    const getSearch=()=>{
        if (inputvalue===""){
            return setSuggestion([])
        }
        axios.get(`http://localhost:65000/product/search/${inputvalue}?onlyname=true`).then(response=>{
            setSuggestion(response.data.data.products)
        }).catch(err=>{
            setSuggestion([])
        })
    }

    return (
    <div className="header_inputs md:block z-30 hidden lg:block">
        <div className="header_search" id='search-input'>
            <div className='input_suggestion'>
                <input type="text" placeholder="Search For Products" onFocus={getSearch} onChange={(e)=>setInputValue(e.target.value)} />
                <div className='suggestions'>
                    {displaySuggestion(suggestion)}
                </div>
            </div>
            <a href={`http://localhost:3000/search?productname=${inputvalue}`}>
                <SearchIcon sx={{width:"25px",height:"25px"}} />
            </a>
        </div>
    </div>
  )
}

export default Search