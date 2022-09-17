import React, { useState, useEffect } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'

import Product from '../../components/Product'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Paginate from '../../components/Paginate'
import { listProducts } from '../../redux/actions/productActions'

function HomePage() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    let keyword = location.search

    const productList = useSelector((state) => state.productList)
    const { error, loading, products, pages, page } = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            <h1>Latest products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Row>
                        {products.map((product) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword} />
                </div>
            )}
        </div>
    )
}

export default HomePage
