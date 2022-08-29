/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-21 15:32:44
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-05 09:33:11
 * @Description: file content
 * @FilePath: /smart-logistics-applet/api/user.js
 */
import { httpGet, httpPost } from "../utils/request.js"

export function getUserInfo(params, otherParams) {
  const url = "/microuser/queryuser"
  return httpPost(url, params, otherParams)
}

export function updateUserInfo(params, otherParams) {
  const url = "/smart-logistics/weChat/driver/update"
  return httpPost(url, params, otherParams)
}

export function getWeChatUserInfo(params, otherParams) {
  const url = "/smart-logistics/weChat/thirdInfo/getInfo"
  return httpGet(url, params, otherParams)
}
