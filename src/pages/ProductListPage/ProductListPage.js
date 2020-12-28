/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';
import ProductList from '../../components/ProductList/ProductList';
import { connect } from 'react-redux';
import callApi from '../../utils/apiCaller';
import { Link } from 'react-router-dom' ;

class ProductListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }
    componentDidMount() {
        callApi('products','GET',null).then(res => {
            console.log(res);
            this.setState({
                products: res.data
            })
        })
        
    }

    onDelete = (id) => {
        var {products} = this.state
        callApi(`products/${id}`,'DELETE',null).then(res => {
            console.log(res)
            if(res.status === 200){
               var index = this.findIndex(products,id) 
               if(index !== -1){
                   products.splice(index ,1);
                   this.setState({
                       products : products
                   })
               }
            }
        }) 
    }
    findIndex = (products , id) => {
        var result = -1 ;
        products.forEach((product , index) => {
            if(product.id === id){
                result = index ;
            }
        });
        return result;
    }

    

    
    render() {
        // var {products} = this.props ;
        var { products } = this.state
        return (

            <div className="col-xs- col-sm- col-md- col-lg-">

                <Link to="/product/add" className="btn btn-info mb-10 ol">Thêm Sản Phẩm</Link>

                <ProductList>
                    {this.showProducts(products)}
                </ProductList>

            </div>

        );
    }
    showProducts(products) {
        var result = null;


        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        key={index}
                        products={product}
                        index={index}
                        onDelete = {this.onDelete}
                    />
                )
            }
            )
        }
        return result;
    }
}
const mapStateToProps = state => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps, null)(ProductListPage) 