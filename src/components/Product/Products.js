import React, {Component} from 'react';
import Product from "./Product";
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import ProductView from "./ProductView";
import products from "../../Data/data";
import './product.css';
import Hoc from "../../Hoc/Hoc";
import AddProduct from "./AddProduct";

class App extends Component {
    state = {
        products: products, //Dump data with products
        showProduct: false, //If false will display product lists, will be true and display single product if edit/view actions are clicked
        currentProduct: null, //Object, the product that will be selected for view or edit action
        disabled: true, //Will be used for the form fields, if true the form is in view mode and the opposite for edit action
        addNewProduct: false //Will be used to display the product form
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
            disabled: disabled,
            addNewProduct: false
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
    updateProduct = (product, changed) => {
        if (changed) {
            let products = this.state.products
            let foundIndex = products.findIndex(p => p.id === product.id)
            products[foundIndex] = product

            this.setState({
                products: products,
                showProduct: false,
                addNewProduct: false,

            })
        } else {
            this.setState({
                showProduct: false,
                addNewProduct: false,
            })
        }
    }

    /*returns the last element in array, wil be used to insert ID for new products that are created*/
    getLastId = arr => arr[arr.length - 1]


    /*adds a new product*/
    addProductHandler = product => {
        const lastElement = this.getLastId(this.state.products)
        product.id = 1 //If list is empty

        if (lastElement) {
            product.id = lastElement.id + 1
        }

        this.setState({
            products: [
                ...this.state.products,
                product
            ],
            addNewProduct: false,
        })
    }

    /*it is used to show the add new product form, when addNewProduct is true the form will be displayed*/
    addProduct = () => {
        this.setState({
            addNewProduct: true,
        })
    }

    render () {
        let view = null;

        if (!this.state.addNewProduct && !this.state.showProduct) {
            view = (
                <Hoc>
                    <Row className="justify-content-md-center product">
                        <Col md="3">
                            <h1>Products List</h1>
                        </Col>
                    </Row>
                    <Row className="product">
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
                                {this.state.products.length > 0 ?
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
                                    )) :
                                    <tr>
                                        <td colSpan="6" style={this.style}>Click Add New to add some products</td>
                                    </tr>
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/*<Link to="/add-new" onClick={this.addProduct}>Add new</Link>*/}
                            <button className="btn btn-primary" onClick={this.addProduct}>Add new</button>
                        </Col>
                    </Row>
                </Hoc>
            )
        } else if (this.state.addNewProduct) {
            view = <AddProduct addProduct={this.addProductHandler}/>
        } else if (this.state.showProduct) {
            view = <ProductView product={this.state.currentProduct} disabled={this.state.disabled} updateProduct={this.updateProduct}/>
        }

        return (
            <Container>
                {view}
            </Container>
        );
    }
}

export default App;
