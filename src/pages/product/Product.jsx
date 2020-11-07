import React from 'react'
import { Switch, Route,Redirect } from 'react-router-dom'
import ProductHome from './Home'
import ProductEdit from './Edit'
import ProductDetail from './Detail'

/**
 * 商品路由
 */
function Product() {
    return (
       <Switch>
           <Route path='/products:/product' exact component={ProductHome}></Route>
           <Route path='/products:/product/edit/:id?'  component={ProductEdit}></Route>
           <Route path='/products:/product/detail' component={ProductDetail}></Route>
           <Redirect to='/products:/product'></Redirect>
       </Switch>
    )
}

export default Product
