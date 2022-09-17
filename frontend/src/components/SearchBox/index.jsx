import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

import { useSearchParams } from 'react-router-dom'

function SearchBox() {
    const navigate = useNavigate()
    const location = useLocation()

    // console.log('hash', location.hash)
    // console.log('pathname', location.pathname)
    // console.log('search', location.search)
    // let [searchParams, setSearchParams] = useSearchParams()

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword) {
            // let params = {
            //     keyword: keyword
            // }
            // setSearchParams(params)
            navigate(`/?keyword=${keyword}&page=1`) // go to the home page with the keyword in the url
        } else {
            // setSearchParams()
            navigate(location.pathname) // clean up the pathnam from any unused querysearch
        }
    }
    return (
        <Form className="d-flex mt-2" onSubmit={submitHandler}>
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button type="submit" variant="outline-success" className="p-2">
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
