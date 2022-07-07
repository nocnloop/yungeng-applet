// import qs from "qs"
import store from "../store/index.js"

const BASE_URL = "http://101.34.87.100/api"
// const BASE_URL = "https://ct-test.lcfuturecenter.com:14443/api"

const okAction = (otherParams) => {
  const isBack = "back" in otherParams

  const isCb = "cb" in otherParams

  const backAction = () => {
    uni.showModal({
      title: "提交成功",
      showCancel: false,
      success: () => {
        uni.navigateBack()
      }
    })
  }

  const cbAction = () => { otherParams.cb() }

  isBack && backAction()

  isCb && cbAction()
}

const errorAction = (error) => {
  uni.showModal({
    content: error.msg,
    showCancel: false
  })
}

const noPermissionAction = () => {
  store.dispatch("app/tokenAction", "")

  uni.showModal({
    content: "权限发生错误",
    showCancel: false,
    success: () => {
      uni.reLaunch({
        url: "/pages/login/login"
      })
    }
  })
}

const instance = (option) => {
  return new Promise((resolve, reject) => {
    const { url, method, data, otherParams } = option

    // const dataResolve = method == "POST" ? qs.stringify(data) : data

    // const header = method == "POST" ? {
    //   "Content-Type": "application/x-www-form-urlencoded",
    //   accessToken: store.state.app.token
    // } : { accessToken: store.state.app.token }

    const header = {}

    uni.request({
      url: BASE_URL + url,
      header: header,
      method: method || "GET",
      data: data || {},
      success: (res) => {
        switch (res.data.statusCode) {
        case 200:
          resolve(res.data);
          ("okTip" in otherParams) && okAction(otherParams)
          break

        case 401:
          noPermissionAction()
          reject(res.data)
          break
        default:
          // ("errorTip" in otherParams) && errorAction(res.data)
          errorAction(res.data)
          reject(res.data)
        }
      },
      fail: (error) => {
        // ("errorTip" in otherParams) && errorAction(error)
        errorAction({ msg: "网络问题" })
        reject(error)
      }
    })
  })
}

export function httpGet(url, params = {}, otherParams = {}) {
  return instance({
    url,
    method: "GET",
    data: params,
    otherParams
  })
}

export function httpPost(url, params = {}, otherParams = {}) {
  return instance({
    url,
    method: "POST",
    data: params,
    otherParams
  })
}
