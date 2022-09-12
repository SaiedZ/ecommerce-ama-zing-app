import React, { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import axios from 'axios'

import Rating from '../../components/Rating'

export default function ProductPage() {
    let { productId } = useParams()

    const [product, setProduct] = useState([])

    useEffect(() => {
        async function fetchProduct() {
            const { data } = await axios.get(`/api/products/${productId}`)
            setProduct(data)
        }
        fetchProduct()
    }, [])

    return (
        <div>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
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
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
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
                            <ListGroup.Item>
                                <Button
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
        </div>
    )
}
