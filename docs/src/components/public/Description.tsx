import React from 'react'
import "./styles/Description.css"

type Props = {
  description: string;
};

export default function Description({description}: Props) {
  return (
    <div className='description-text'>{description}</div>
  )
}
