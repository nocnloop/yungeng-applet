/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-26 14:36:31
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-05 09:33:01
 * @Description: file content
 * @FilePath: /smart-logistics-applet/api/message.js
 */
import { httpGet, httpPost } from "../utils/request.js"

export function getMessageList(params, otherParams) {
  const url = "/smart-logistics/weChat/message/listMessage"
  return httpGet(url, params, otherParams)
}

export function readMessage(params, otherParams) {
  const url = "/smart-logistics/weChat/message/addOrUpdateMessage"
  return httpPost(url, params, otherParams)
}
