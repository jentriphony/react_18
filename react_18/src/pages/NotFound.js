import classes from './NotFound.module.css'



const Page = props => {



  return (

    <section className={ classes['not-found'] }>



      <p>{ props.message || 'page_not_found' }</p>



    </section>

  )



}



export default Page