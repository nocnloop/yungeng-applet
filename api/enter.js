/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-24 14:42:34
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-27 17:21:52
 * @Description: file content
 * @FilePath: /smart-logistics-applet/api/enter.js
 */
import { httpGet, httpPost } from "../utils/request.js"

export function enterApply(params, otherParams) {
  const url = "/smart-logistics/weChat/applyEnter"
  return httpPost(url, params, otherParams)
}

export function enterApplyList(params, otherParams) {
  const url = "/smart-logistics/weChat/applyEnter/list"
  return httpGet(url, params, otherParams)
}

export function editEstimateArrivalTime(params, otherParams) {
  const url = "/smart-logistics/weChat/applyEnter/editEstimateArrivalTime"
  return httpPost(url, params, otherParams)
}
