import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import PropTypes from 'prop-types'

class Product extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
                <td>{this.props.description}</td>
                <td>{this.props.created_at}</td>
                <td><Button onClick={() => this.props.viewProduct(this.props, {disabled:true})}>View</Button></td>
                <td><Button onClick={() => this.props.viewProduct(this.props, {disabled:false})}>Edit</Button></td>
                <td><button className="btn btn-danger" onClick={() => this.props.deleteProduct(this.props)}>Delete</button></td>
            </tr>
        );
    }
}

Product.protoTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    created_at: PropTypes.string,
    viewProduct: PropTypes.func,
    deleteProduct: PropTypes.func
}

export default Product;

