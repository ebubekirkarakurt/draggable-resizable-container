import React from 'react'

type Props = {
  description: string;
};

export default function Description({description}: Props) {
  return (
    <div 
     style={{
        fontSize: "13px",
        display: "flex",
        justifyContent:'start',
        padding: "5px",
        fontWeight: "semi-bold",
        color:"white",
        textAlign: "left",
        marginBottom:"10px",
        marginTop: "10px"
    }}
    >{description}</div>
  )
}
