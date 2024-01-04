import React from 'react'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'

export const ImageGallery = ({images, searchParam, openModalWindow}) => {
  return (
    <ul className="gallery">
        { images? images.map(img => {
        return (<ImageGalleryItem
            id={img.id}
            url={img.webformatURL}
            openModalWindow={openModalWindow}
            />)
        })
        : 
        searchParam ? (<p>Nothing was found at your request</p>) : null
        }
        </ul>
        )
    }

