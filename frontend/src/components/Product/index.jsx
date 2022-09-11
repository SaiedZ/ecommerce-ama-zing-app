import { Card } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import Rating from '../Rating'

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                    <Card.Text className="my-3" as="div">
                        <Rating
                            value={product.rating}
                            text={`${product.numReviews} reviews`}
                            color={'#f8e825'}
                        />
                    </Card.Text>
                    <Card.Text as="h3">${product.price}</Card.Text>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Product