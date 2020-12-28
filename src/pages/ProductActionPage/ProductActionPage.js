/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import callApi from '../../utils/apiCaller';
export default class ProductActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chbStatus: true,
        }
    }
    componentDidMount = () => {
        var { match } = this.props;
        console.log(match);
        if (match) {
            var id = match.params.id;
            callApi(`products/${id}`, 'GET', null).then(res => {
                var data = res.data;
                console.log(res.data);
                this.setState({
                    id: data.id,
                    txtName: data.name,
                    txtPrice: data.price,
                    chbStatus: data.status,
                })
            })
        }
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }
    onSave = (e) => {
        e.preventDefault();
        console.log(this.state);
        var { id, txtName, txtPrice, chbStatus } = this.state
        var { history } = this.props;
        if (id) {
            console.log(id);
            callApi(`products/${id}`, 'PUT', {
                name: txtName,
                price: txtPrice,
                status: chbStatus

            }).then(
                res => {
                    history.goBack();
                }
            )
        } else {
            callApi('products', 'POST', {
                name: txtName,
                price: txtPrice,
                status: chbStatus
            }).then(
                res => {

                    history.goBack();
                }
            )
        }
    }
    render() {
        return (
            <div className="col-xs- col-sm- col-md- col-lg-">
                <form onSubmit={this.onSave}>
                    <legend>Form title</legend>
                    <div className="form-group">
                        <label>Tên Sản Phẩm: </label>
                        <input
                            type="text" className="form-control"
                            name="txtName"
                            onChange={this.onChange}
                            value={this.state.txtName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá: </label>
                        <input
                            type="number" className="form-control"
                            name="txtPrice"
                            onChange={this.onChange}
                            value={this.state.txtPrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng Thái: </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="chkbStatus"
                                onChange={this.onChange}
                                value={this.state.chbStatus}
                                checked={this.state.chbStatus}

                            />
                            Còn Hàng
                        </label>
                    </div>
                    <Link to="/product-list" className="btn btn-danger mr-10">
                        Trở lại
                    </Link>
                    <button type="submit" className="btn btn-primary">Lưu Lại</button>
                </form>
            </div>
        )
    }
}
