import React from 'react'

type Props = {
  title: string;
};

export default function Title({title}: Props) {
  return (
    <div 
     style={{
        fontSize: "28px",
        display: "flex",
        justifyContent:'start',
        padding: "5px",
        fontWeight: "bold",
        color:"white"
    }}
    >{title}</div>
  )
}
