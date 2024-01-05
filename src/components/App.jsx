import React, { Component } from 'react'
import { getImages } from 'services/api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  
  state = {
    img: null,
    modalImgURL: null,
    isModalOpen: false,
    status: 'idle',
    error: null,
    searchParam: '',
    page: 1
  }

   handleSearchSubmit = (evt) =>{
     evt.preventDefault();
     const searchParam = evt.target.elements.input.value;
     this.setState({searchParam})
  }

  handleLoadMore= ()=>{
    this.setState({
      page:this.state.page+1
    })
  }

  fetchImagesWithParams = async (searchParam) => {
    try{
      this.setState({status:'pending', img:null})
      const img = await getImages(searchParam, this.state.page);
      this.setState({img, status:'success'});
    }
    catch{
      this.setState({status:'error'})
    }
  }

  fetchImagesWithPagination = async (page) => {
    try{
      this.setState({status:'pending'})
      const img = await getImages(this.state.searchParam, page);
      this.setState({
        img:this.state.img.concat(img), 
        status:'success'});
    }
    catch{
      this.setState({status:'error'})
    }
  }

  openModalWindow = (key) =>{
    const elem =  this.state.img.find(elem=>elem.id===key)
    console.log(elem.largeImageURL);
    this.setState({modalImgURL:elem.largeImageURL, isModalOpen:true})
  }

  closeModalWindow =() =>{
    this.setState({isModalOpen:false})
  }
  


  componentDidMount() {
    const fetchImages = async() =>{
      try{
        this.setState({status:'pending'})
        const img = await getImages();
        this.setState({img, status:'success'});
      }
      catch{
        this.setState({status:'error'})
      }
    }
    fetchImages()

  }

  componentDidUpdate(prevProps, prevState){

    if(prevState.searchParam !== this.state.searchParam){
      this.fetchImagesWithParams(this.state.searchParam);
      }

    if(prevState.page !== this.state.page){
        this.fetchImagesWithPagination(this.state.page)
      }
    }

  render() {

    const totalHits = JSON.parse(localStorage.getItem('resp')).totalHits;

    return (
      <div>
        <Searchbar
        handleSearchSubmit={this.handleSearchSubmit}/>

        {this.state.status==='pending' && <Loader/>}

        <ImageGallery
        images={this.state.img}
        searchParam={this.state.searchParam}
        openModalWindow={this.openModalWindow}
        />

        {(totalHits!==0&&this.state.status==='success') && 
        <Button handleLoadMore={this.handleLoadMore}/>}

        {totalHits===0 && <p className='errorTitle'>Nothing was found...</p>}
        {this.state.status==='error'&& <p className='errorTitle'>Oops, some error occurred.. </p>}
       
        {this.state.isModalOpen && 
        <Modal
        imgURL={this.state.modalImgURL}
        closeModalWindow={this.closeModalWindow}
        />}
      </div>
    )
  }
}

