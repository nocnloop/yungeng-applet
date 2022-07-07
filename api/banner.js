/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-05-05 09:45:19
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-05 09:45:20
 * @Description: file content
 * @FilePath: /smart-logistics-applet/api/banner.js
 */

import { httpGet } from "../utils/request.js"

export function getBanner(params, otherParams) {
  const url = "/smart-logistics/weChat/banner/banner"
  return httpGet(url, params, otherParams)
}

export function getVideo(params, otherParams) {
  const url = "/smart-logistics/weChat/banner/video"
  return httpGet(url, params, otherParams)
}
