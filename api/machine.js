/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-08-29 17:12:43
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-09-05 16:57:22
 * @Description: file content
 * @FilePath: /yungeng-applet/api/machine.js
 */

import { httpPost } from "../utils/request.js"

export function querydevices(params, otherParams) {
  const url = "/microdevice/querydevicesbyorganization"
  return httpPost(url, params, otherParams)
}

export function queryDeviceInfo(params, otherParams) {
  const url = "/microdevice/QueryDeviceInfo"
  return httpPost(url, params, otherParams)
}

export function bindingdevice(params, otherParams) {
  const url = "/microdevice/bindingdevice"
  return httpPost(url, params, otherParams)
}

export function unbindingdevice(params, otherParams) {
  const url = "/microdevice/unbindingdevice"
  return httpPost(url, params, otherParams)
}

export function queryDeviceWorkingCondition(params, otherParams) {
  const url = "/micro/QueryDeviceWorkingCondition"
  return httpPost(url, params, otherParams)
}

export function getdeviceworkingstatistics(params, otherParams) {
  const url = "/micro/getdeviceworkingstatistics"
  return httpPost(url, params, otherParams)
}

export function getdevicelocation(params, otherParams) {
  const url = "/micro/getdevicelocation"
  return httpPost(url, params, otherParams)
}
