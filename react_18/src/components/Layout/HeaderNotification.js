import classes from './HeaderNotification.module.css'

import { useCallback, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actions as layoutHeaderNotificationSliceActions } from './../../redux/ui/layout-header-notification'
import LoadingSpinner from './../UI/LoadingSpinner'



const HeaderNotification = () => {



  const slice = useSelector(store => store.layoutHeaderNotification)



  const dispatch = useDispatch()



  const visibilityHandler = useCallback(() => dispatch(layoutHeaderNotificationSliceActions.unset()), [dispatch])


  return (

    <Fragment>



      { slice.visible && (
        <div className={ classes.notification }>
          <span>{ slice.status }</span>

          { slice.status === 'loading' && (
            <LoadingSpinner />
          ) }

          <span>{ slice.message }</span>

          <button type='button' onClick={ visibilityHandler }>
            x
          </button>
        </div>
      ) }



    </Fragment>

  )



}



export default HeaderNotification