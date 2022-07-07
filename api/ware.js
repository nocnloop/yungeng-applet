/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-26 13:55:13
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-05 09:33:14
 * @Description: file content
 * @FilePath: /smart-logistics-applet/api/ware.js
 */

import { httpGet } from "../utils/request.js"

export function getWareList(params, otherParams) {
  const url = "/smart-logistics/weChat/warehouse/list"
  return httpGet(url, params, otherParams)
}
