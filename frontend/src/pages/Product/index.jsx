import React, { useState, useEffect } from 'react'

import { Link, useParams, useNavigate } from 'react-router-dom'

import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { listProductDetails, createProductReview } from '../../redux/actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../redux/constants/productConstants'

import Rating from '../../components/Rating'
import Loader from '../../components/Loader'
import Message from '../../components/Message'

export default function ProductPage() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    let { productId } = useParams()

    let [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const productDetails = useSelector((state) => state.productDetails)
    const { error, loading, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }

        dispatch(listProductDetails(productId))
    }, [dispatch, productId, successProductReview])

    const addToCartHandler = () => {
        navigate(`/cart/${productId}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            createProductReview(productId, {
                rating,
                comment
            })
        )
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
                <div>
                    <Row>
                        <Col className="pt-3 pt-lg-0" lg={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>
                        <Col className="pt-3 pt-lg-0" lg={3}>
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
                        <Col className="pt-3 pt-lg-0" lg={3}>
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
                                                {product.countInStock > 0
                                                    ? 'In Stock'
                                                    : 'Out of stock'}
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
                                                        {[
                                                            ...Array(product.countInStock).keys()
                                                        ].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
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
                    <Row className="mt-5">
                        <Col lg={6}>
                            <h4>Reviews</h4>
                            {product.reviews.length === 0 && (
                                <Message variant="info">No Reviews</Message>
                            )}

                            <ListGroup variant="flush">
                                {product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} color="#f8e825" />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}

                                <ListGroup.Item className="mt-4">
                                    <h4>Write a review</h4>

                                    {loadingProductReview && <Loader />}
                                    {successProductReview && (
                                        <Message variant="success">Review Submitted</Message>
                                    )}
                                    {errorProductReview && (
                                        <Message variant="danger">{errorProductReview}</Message>
                                    )}

                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating" className="mb-4">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}>
                                                    <option value="">Select...</option>
                                                    <option value="1">1 - Poor</option>
                                                    <option value="2">2 - Fair</option>
                                                    <option value="3">3 - Good</option>
                                                    <option value="4">4 - Very Good</option>
                                                    <option value="5">5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="comment" className="mb-4">
                                                <Form.Label>Review</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    row="5"
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(e.target.value)
                                                    }></Form.Control>
                                            </Form.Group>

                                            <Button
                                                disabled={loadingProductReview}
                                                type="submit"
                                                variant="primary">
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message variant="info">
                                            Please <Link to="/login">login</Link> to write a review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    )
}
