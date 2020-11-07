/**
 * 包含应用中所有接口请求函数模块
 * 每个函数的返回值都是promise
 */
import ajax from './ajax'


const BASE = '/api'
// const BASE = ''
/**
 * 用户登录
 * @param {*} username 
 * @param {*} password 
 */
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')

/**
 * 添加用户
 * @param {*} user  一整个对象
 */
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')
/**
 * 获取所有用户列表
 */
export const reqUser = () => ajax(BASE + "/manage/user/list")
/**
 * 删除用户
 * @param {*} userId 
 */
export const reqDelUser = (userId) => ajax(BASE + "/manage/user/delete", { userId }, 'POST')
/**
 * 更新用户
 * @param {*} user 一整个对象
 */
export const reqUpdateUser = (user) => ajax(BASE + "/manage/user/update", user, 'POST')
/**
 * 获取一二级分类列表
 */
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId }, 'GET')

/**
 * 添加分类
 */
export const reqAddCategorys = (parentId, categoryName) => ajax(BASE + '/manage/category/add', { parentId, categoryName }, 'POST')

/**
 * 更新分类
 */

export const reqUpdataCategorys = (categoryId, categoryName) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')

/**
 * 删除分类
 * @param {*} categoryName 
 * @param {*} _id 
 */
export const reqDelCategorys = (categoryName, _id) => ajax(BASE + '/manage/category/del', { categoryName, _id }, 'POST')

/**
 * 获取商品
 * @param {*} pageNum 
 * @param {*} pageSize 
 */
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize }, 'GET')

/**
 * 搜索商品分类列表(根据商品名称)
 * @param {*} pageNum 
 * @param {*} pageSize 
 * @param {*} searchName 
 */
export const reqSearchProductsName = (pageNum, pageSize, searchName) => ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    productName: searchName
}, 'GET')

/**
 * 搜索商品分类列表(根据描述搜)
 * @param {*} pageNum 
 * @param {*} pageSize 
 * @param {*} searchName 
 */
export const reqSearchProductsDesc = (pageNum, pageSize, searchName) => ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    productDesc: searchName
}, 'GET')

/**
 * 图片删除
 * @param {*} name 
 */
export const reqDelImg = (name) => ajax(BASE + '/manage/img/delete', { name }, 'POST')

/**
 * 添加商品
 * @param {*} name 
 * @param {*} imgs 
 * @param {*} desc 
 * @param {*} price 
 * @param {*} categoryId 
 * @param {*} pCategoryId 
 * @param {*} detail 
 */
export const reqAddProducts = (name, imgs, desc, price, categoryId, pCategoryId, detail) => ajax(BASE + '/manage/product/add', { name, imgs, desc, price, categoryId, pCategoryId, detail }, 'POST')

/**
 * 获取商品信息
 * @param {*} _id 
 */
export const reqFindOneProduct = (_id) => ajax(BASE + '/manage/product/findOne', { _id }, 'GET')

/**
 * 修改商品
 * _id 修改哪个商品id
 * @param {*} name 
 * @param {*} imgs 
 * @param {*} desc 
 * @param {*} price 
 * @param {*} categoryId 
 * @param {*} pCategoryId 
 * @param {*} detail 
 */
export const reqUpdateProduct = (_id, name, imgs, desc, price, categoryId, pCategoryId, detail) => ajax(BASE + '/manage/product/update', { _id, name, imgs, desc, price, categoryId, pCategoryId, detail }, 'POST')

/**
 * 对商品进行上架/下架处理
 * @param {*} _id 
 * @param {*} status 
 */
export const reqUpdateState = (productId, status) => ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST')
/**
 * 删除商品
 * @param {*} _id 
 */
export const reqDelProducts = (_id) => ajax(BASE + '/manage/product/del', { _id }, 'POST')

/**
 * 获取角色
 */
export const reqRoles = () => ajax(BASE + '/manage/role/list')

/**F
 * 添加角色
 */
export const reqAddRoles = (roleName) => ajax(BASE + '/manage/role/add', { roleName }, 'POST')
/**
 * 删除角色
 * @param {*} role_id 
 */
export const reqDelRoles = (_id) => ajax(BASE + '/manage/role/delete', { _id }, 'POST')
/**
 * 
 * @param {*} _id 角色id
 * @param {*} menus 权限key数组
 * @param {*} auth_time 授权时间
 * @param {*} auth_name 授权人
 */
export const reqUpdateRoles = (role) => ajax(BASE + '/manage/role/update', role, 'POST')