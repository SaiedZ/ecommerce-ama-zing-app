import React, { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listProductDetails } from '../../redux/actions/productActions'
import Rating from '../../components/Rating'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

export default function ProductPage() {
    let navigate = useNavigate()
    let [qty, setQty] = useState(1)
    let { productId } = useParams()

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { error, loading, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(productId))
    }, [dispatch, productId])

    const addToCartHandler = () => {
        navigate(`/cart/${productId}?qty=${qty}`)
    }
    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    <Col className="pt-3 pt-lg-0" lg={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col className="pt-3 pt-lg-0" xs={8} lg={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="pt-0 mt-0">
                                <h3 className="pt-0 mt-0">{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col className="pt-3 pt-lg-0" xs={4} lg={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong> ${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 ? (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty:</Col>
                                            <Col xs="auto" className="my-1">
                                                <Form.Select
                                                    aria-label="Select quantity of product to buy"
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}>
                                                    {[...Array(product.countInStock).keys()].map(
                                                        (x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        )
                                                    )}
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ) : null}
                                <ListGroup.Item>
                                    <Button
                                        onClick={addToCartHandler}
                                        className="btn-block"
                                        disabled={product.countInStock == 0}
                                        type="button">
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    )
}
