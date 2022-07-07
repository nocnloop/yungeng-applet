/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-21 17:41:33
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-05 09:32:51
 * @Description: file content
 * @FilePath: /smart-logistics-applet/api/car.js
 */
import { httpGet, httpPost } from "../utils/request.js"

export function getCarInfo(params, otherParams) {
  const url = "/smart-logistics/weChat/car/getById"
  return httpGet(url, params, otherParams)
}

export function addOrUpdateCarInfo(params, otherParams) {
  const url = "/smart-logistics/weChat/car/addOrUpdate"
  return httpPost(url, params, otherParams)
}

export function deleteCarInfo(params, otherParams) {
  const url = "/smart-logistics/weChat/car/deleteById"
  return httpGet(url, params, otherParams)
}
