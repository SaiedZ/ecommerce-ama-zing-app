import NavbarCustom from './navbar'
import { useDispatch, useSelector } from 'react-redux'

function Header() {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    return (
        <header>
            <NavbarCustom userInfo={userInfo} dispatch={dispatch} />
        </header>
    )
}

export default Header
