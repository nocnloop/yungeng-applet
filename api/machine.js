/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-08-29 17:12:43
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-30 09:53:35
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
