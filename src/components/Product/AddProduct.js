import React, {Component} from "react";
import Col from "react-bootstrap/Col";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import './product.css';
import Hoc from "../../Hoc/Hoc";

class AddProduct extends Component{
    /*Will receive product in state as prop by edit/view actions in Products component*/
    state = {
        product: {
            id: null,
            price: null,
            name: null,
            description: null,
            created_at: null
        },
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.product !== nextState.product
    }

    /*Changes in product info are saving in this component state*/
    productHandler = e => {
        let value = e.target.value
        let name = e.target.name

        this.setState({
            product: {
                ...this.state.product,
                [name]: value
            }
        })
    }

    submitHandler = e => {
        e.preventDefault()
        this.props.addProduct(this.state.product)
    }

    render() {
        return (
            <Hoc>
                <Row className="product justify-content-md-center">
                    <Col md="3">
                        <h1>Add product</h1>
                    </Col>
                </Row>
                <Row className="product justify-content-md-center">
                    <Col md={6}>
                        <form onSubmit={this.submitHandler}>
                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <FormControl type="text" name="name" placeholder="Name" onChange={this.productHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Price</FormLabel>
                                <FormControl type="text" name="price" placeholder="Price" onChange={this.productHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Description</FormLabel>
                                <FormControl type="text" name="description" placeholder="Description" onChange={this.productHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Creation Date</FormLabel>
                                <FormControl type="date" name="created_at" placeholder="Creation Date" onChange={this.productHandler}/>
                            </FormGroup>
                            <Button type="submit" value="Save" >Save</Button>
                        </form>
                    </Col>
                </Row>
            </Hoc>
        )
    }
}

export default AddProduct;