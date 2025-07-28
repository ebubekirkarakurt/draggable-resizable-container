import React from 'react'
import "./styles/Title.css"

type Props = {
  title: string;
};

export default function Title({title}: Props) {
  return (
    <div className='title-text'>{title}</div>
  )
}
