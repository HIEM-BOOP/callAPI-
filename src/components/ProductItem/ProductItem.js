import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ProductItem extends Component {

    onDelete = (id) => {
        
        this.props.onDelete(id)
    }        
    render() {
        var { products, index } = this.props;
        var statusName = products.status ? "Còn Hàng" : "Hết Hàng";
        var statusClass = products.status ? "warning" : "default";
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{products.id}</td>
                <td>{products.name}</td>
                <td>{products.price}</td>
                <td>
                    <span className={`label label-${statusClass}`}>{statusName}</span>
                </td>
                <td>
                    <Link
                    className="btn btn-success mr-10" 
                    to = {`/product/${products.id}/edit`}
                    >
                    Sửa
                    </Link> 
                    <button type="button" className="btn btn-success "
                        onClick={() => this.onDelete(products.id )}
                    >Xóa </button>

                </td>

            </tr>


        )
    }
}
