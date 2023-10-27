"use client";
import { useEffect, useState } from 'react';
import EpubReader from './epub-reader'

export default function Home() {
  let [url,setUrl] =useState('');
  useEffect(()=>{
    const url=new URLSearchParams(window.location.search).get('url') as string ;
    setUrl(url)
  },[])
  return (    <EpubReader url={url}/>
  )
  
}
