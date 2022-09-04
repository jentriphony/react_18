import classes from './Modal.module.css'

import { Fragment } from 'react'
import { createPortal } from 'react-dom'



const Backdrop = props => {



  return (

    <div className={ classes.backdrop } onClick={ props.onClick }></div>

  )



}

const ModalOverlay = props => {



  return (

    <section className={ classes['modal-overlay'] }>



      { props.children }



    </section>

  )



}

const Modal = props => {



  return (

    <Fragment>



      { createPortal((
        <Backdrop onClick={ props.onBackdropClick } />
      ), document.getElementById('overlays')) }

      { createPortal((
        <ModalOverlay>{ props.children }</ModalOverlay>
      ), document.getElementById('overlays')) }



    </Fragment>

  )



}



export default Modal