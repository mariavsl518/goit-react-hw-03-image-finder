import React from 'react'

export const ImageGalleryItem = ({id, url, openModalWindow}) => {
  return (
    <li key={id} className="gallery-item"
    onClick={()=>openModalWindow(id)}>
        <img src={url} alt="" />
    </li>
  )
}
