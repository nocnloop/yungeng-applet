/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-08-29 17:12:43
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-29 17:16:18
 * @Description: file content
 * @FilePath: /yungeng-applet/api/machine.js
 */

import { httpPost } from "../utils/request.js"

export function querydevices(params, otherParams) {
  const url = "/microdevice/querydevicesbyorganization"
  return httpPost(url, params, otherParams)
}
