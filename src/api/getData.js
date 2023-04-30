import request from '@/api/request.js'

// 登陆

export const reqLogin = (params) => {
  return request({
    method: 'post',
    url: 'admin/login',
    data: params

  })
}

// 获取文章列表
export const reqArticleList = () => {
  return request({
    method: 'get',
    url: 'admin/article'
  })
}

// 上传图片
export const reqUploadImg = (params) => {
  return request({
    url: 'admin/article/img-load',
    method: 'post',
    data: params

  })
}
// 新增文章
export const reqAddArticle = (params) => {
  return request({
    method: 'post',
    url: 'admin/aritcile/article-add',
    data: params
  })
}

// 获取文章详情
export const reqArticleDetail = (params) => {
  // console.log(params)
  return request({
    method: 'get',
    url: `admin/article/article-view/ ${params}`

  })
}

// 修改文章
export const reqArticleUpdate = (params) => {
  return request({
    method: 'post',
    url: 'admin/article/article-update',
    data: params
  })
}
// 获取分类列表
export const reqClssifyList = () => {
  return request({
    method: 'get',
    url: 'admin/classify'
  })
}

// 新增分类
export const reqAddClassify = (params) => {
  return request({
    url: 'admin/clssify/classify-add',
    method: 'post',
    data: params
  })
}
// 修改分类
export const reqUpdateClassify = (params) => {
  return request({
    method: 'post',
    url: 'admin/clssify/classify-update',
    data: params
  })
}

// 获取访问记录列表
export const reqGetVisitList = (params) => {
  return request({
    method: 'get',
    url: `visitcount/get-visitlist/${params}`
  })
}

// 获取访问数据
export const reqGetVisitData = (params) => {
  return request({
    method: 'get',
    url: 'visitcount/get-visitdata',
    data: params
  })
}

// 获得留言列表
export const reqCommentsList = () => {
  return request({
    url: '/home/comments/getcomments',
    method: 'get'

  })
}

// 修改评论
export const reqCommentsUpdate = (params) => {
  return request({
    method: 'post',
    url: 'admin/comments/comments-update',
    data: params
  })
}
