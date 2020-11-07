import React from 'react';
import {} from 'antd'
import {HashRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import {} from './utils/storageUtils'
// import 'antd/dist/antd.css'

function App() {
  return (
    <HashRouter>
      <Switch>{/* 只匹配其中一个 */}
      <Route path="/login" component={Login}></Route>
      <Route path="/" component={Admin}></Route>
      </Switch>
      </HashRouter>
  );
}

export default App;
