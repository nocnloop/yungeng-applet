/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-21 15:32:44
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-07-08 09:37:56
 * @Description: file content
 * @FilePath: /yungeng-applet/api/login.js
 */
import { httpPost } from "../utils/request.js"

export function login(params, otherParams) {
  const url = "/authorize/wxlogin"
  return httpPost(url, params, otherParams)
}

export function wxuserregister(params, otherParams) {
  const url = "/microuser/wxuserregister"
  return httpPost(url, params, otherParams)
}

export function saveWxUser(params, otherParams) {
  const url = "/smart-logistics/weChat/saveWxUser"
  return httpPost(url, params, otherParams)
}
