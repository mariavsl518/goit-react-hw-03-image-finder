import React, { Component } from 'react'
import css from './Modal.module.css'

export class Modal extends Component {
    
    componentDidMount


    render(){

        return (
          <div className={css.overlay}>
              <div className={css.modal}>
                  <img src={this.props.imgURL} alt="" />
              </div>
          </div>
        )
    }
}
