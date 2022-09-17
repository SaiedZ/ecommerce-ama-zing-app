import { useDispatch, useSelector } from 'react-redux'

import { LinkContainer } from 'react-router-bootstrap'

import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'

import styled from 'styled-components'

import { logout } from '../../redux/actions/userActions'

import SearchBox from '../SearchBox'

import logo from '../../resources/logo.png'

const CartNumberSpan = styled.span`
    font-size: 0.6rem;
    position: relative;
    top: -10px;
    right: -25px;
    width: 15px;
    height: 15px;
    color: #fff;
    background-color: #418deb;
    border-radius: 50%;
`

function Header() {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const cartNumberItems = cartItems.reduce((acc, item) => acc + item.qty, 0)

    const dispatch = useDispatch()

    const lougoutHandler = (e) => {
        e.preventDefault()
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container fluid="md">
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src={logo} alt="Ama-Zing" style={{ height: 25 }} />
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse
                        id="navbarScroll"
                        className=" d-flex w-100 justify-content-end">
                        <Nav className="my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <LinkContainer
                                to="/cart"
                                className="my-auto position-relative d-inline-flex"
                                aria-label="View your shopping cart">
                                <Nav.Link>
                                    <CartNumberSpan className="cart-basket d-flex align-items-center justify-content-center">
                                        {cartNumberItems}
                                    </CartNumberSpan>
                                    <i className="fa-solid fa-cart-shopping pe-1"></i>Cart
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                    className="my-auto">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={lougoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fa-solid fa-user pe-1"></i>Login
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenue" className="my-auto">
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                            <SearchBox />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
