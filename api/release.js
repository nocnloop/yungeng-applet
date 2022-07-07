/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-29 13:40:10
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-05 11:02:38
 * @Description: file content
 * @FilePath: /smart-logistics-applet/api/release.js
 */
import { httpGet, httpPost } from "../utils/request.js"

export function getReleaseInfo(params, otherParams) {
  const url = "/smart-logistics/weChat/applyOut/outInfo"
  return httpGet(url, params, otherParams)
}

export function applyOut(params, otherParams) {
  const url = "/smart-logistics/weChat/applyOut"
  return httpPost(url, params, otherParams)
}

export function getApplyOutList(params, otherParams) {
  const url = "/smart-logistics/weChat/applyOut/list"
  return httpGet(url, params, otherParams)
}
