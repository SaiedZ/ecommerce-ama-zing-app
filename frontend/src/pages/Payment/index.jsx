import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { Form, Button, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../../components/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps'
import { savePaymentMethod } from '../../redux/actions/cartActions'

function PaymentPage() {
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping')
        }
    }, [shippingAddress, shippingAddress.address])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            inline
                            type="radio"
                            label="PayPal"
                            id="paypal"
                            name="paymentMethod"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check
                            inline
                            disabled
                            type="radio"
                            label="Credit Card"
                            id="Credit Card"
                            name="paymentMethod"
                        />
                    </Col>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentPage
