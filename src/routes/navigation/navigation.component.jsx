import {Fragment, useContext} from 'react'
import { Outlet, Link } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/car-dropdown.component';

import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';

import {ReactComponent as FireLogo} from '../../assets/crown.svg'
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss'

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext)
        return(
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <FireLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {currentUser ?(
                        <span className='nav-link' onClick={signOutUser}>
                            SIGN OUT
                        </span>)
                        : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>)
                    }
                    <CartIcon className='cart-icon'/>
                     
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>        
            <Outlet/>
        </Fragment>
    );
};

export default Navigation;