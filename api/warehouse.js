/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-05-17 11:12:55
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-17 11:13:14
 * @Description: file content
 * @FilePath: /smart-logistics-applet/api/warehouse.js
 */
import { httpGet } from "../utils/request.js"

export function getWarehouse(params, otherParams) {
  const url = "/smart-logistics/weChat/warehouse/listByType"
  return httpGet(url, params, otherParams)
}
