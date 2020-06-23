import React, {Component} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import './product.css'
import Hoc from "../../Hoc/Hoc";

/*View and Edit features are handled only by this one component*/
class ProductView extends Component{
    /*Will receive product in state as prop by edit/view actions in Products component*/
    state = {
        product: this.props.product,
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.product !== nextState.product
    }

    /*Changes in product info are saving in this component state*/
    productHandler = (e) => {
        let value = e.target.value
        let name = e.target.name

        this.setState({
            product: {
                ...this.state.product,
                [name]: value
            }
        })
    }

    /*Updates the state in Products component by updating the new product there*/
    submitHandler = (e) => {
        e.preventDefault()
            this.props.updateProduct(this.state.product, this.props.product !== this.state.product)

    }

    render() {
        let product = this.props.product
        let disabled = this.props.disabled
        return (
            <Hoc>
                <Row className="product justify-content-md-center">
                    <Col md="3">
                        <h1>Product: {product.name}</h1>
                    </Col>
                </Row>
                <Row className="product justify-content-md-center">
                    <Col md={6}>
                        <form onSubmit={this.submitHandler}>
                            <FormGroup>
                                <FormLabel>ID</FormLabel>
                                <FormControl type="text" placeholder="Enter email" defaultValue={product.id} disabled={true}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Name</FormLabel>
                                <FormControl type="text" name="name" placeholder="Name" defaultValue={product.name} {...disabled ? disabled : ''} onChange={this.productHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Price</FormLabel>
                                <FormControl type="text" name="price" placeholder="Price" defaultValue={product.price} {...disabled ? disabled : ''} onChange={this.productHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Description</FormLabel>
                                <FormControl type="text" name="description" placeholder="Description" defaultValue={product.description} {...disabled ? disabled : ''} onChange={this.productHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Creation Date</FormLabel>
                                <FormControl type="date" name="created_at" placeholder="Creation Date" defaultValue={product.created_at} {...disabled ? disabled : ''} onChange={this.productHandler}/>
                            </FormGroup>
                            {!disabled.disabled ? <Button type="submit" value="Save" >Save</Button> : <button className="btn btn-primary" onClick={this.submitHandler}>Back</button>}
                        </form>
                    </Col>
                </Row>
            </Hoc>
        );
    }
}

ProductView.propsTypes = {
    product: PropTypes.object,
    disabled: PropTypes.bool,
    updateProduct: PropTypes.func
}

export default ProductView;