import React, {Component} from 'react';
import Product from "./Product";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ProductView from "./ProductView";
import products from "../../Data/Data";
import '../Product/Product.css';
import Hoc from "../../Hoc/Hoc";

class App extends Component {
    state = {
        products: products, //Dump data with products
        showProduct: false, //If false will display product lists, will be true and display single product if edit/view actions are clicked
        currentProduct: null, //Object, the product that will be selected for view or edit action
        disabled: true //Will be used for the form fields, if true the form is in view mode and the opposite for edit action
    }

    style = {
        textAlign: "center"
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state !== nextState
    }

    /*No need to use spread operator for currentProduct state change here*/
    viewProduct = (product, disabled) => {
        this.setState({
            showProduct: true,
            currentProduct: {
                id: product.id,
                price: product.price,
                name: product.name,
                description: product.description,
                created_at: product.created_at
            },
            disabled: disabled
        })
    }

    /*Removes product from state*/
    deleteProduct = product => {
        let products = this.state.products.filter( p => p.id !== product.id)
        this.setState({
            products: products
        })
    }

    /*Updates product info*/
    updateProduct = (product) => {
        let products = this.state.products
        let foundIndex = products.findIndex(p => p.id === product.id)
        products[foundIndex] = product

        this.setState({
            products: products,
            showProduct: false
        })
    }

    render () {
        let productView = <ProductView product={this.state.currentProduct} disabled={this.state.disabled} updateProduct={this.updateProduct}/>

        let products = (
            <Hoc>
                <Row className="justify-content-md-center Product">
                    <Col md="3">
                        <h1>Products List</h1>
                    </Col>
                </Row>
                <Row className="Product">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Creation date</th>
                                <th colSpan="3" style={this.style}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.products.map(p => (
                                    <Product
                                        key={p.id}
                                        id={p.id}
                                        price={p.price}
                                        name={p.name}
                                        description={p.description}
                                        created_at={p.created_at}
                                        viewProduct={this.viewProduct}
                                        deleteProduct={this.deleteProduct}
                                    />
                                ))
                            }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Hoc>
        )

        return (
            <Container>
                {this.state.showProduct ? productView : products}
            </Container>
        );
    }
}

export default App;
