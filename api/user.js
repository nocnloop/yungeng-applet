/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-21 15:32:44
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-08-30 13:46:41
 * @Description: file content
 * @FilePath: /yungeng-applet/api/user.js
 */
import { httpPost } from "../utils/request.js"

export function getUserInfo(params, otherParams) {
  const url = "/microuser/queryuser"
  return httpPost(url, params, otherParams)
}
