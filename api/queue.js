/*
 * @Author: Qiuxue.Wu - LCFC
 * @Date: 2022-04-24 16:13:48
 * @LastEditors: Qiuxue.Wu - LCFC
 * @LastEditTime: 2022-05-18 09:50:56
 * @Description: file content
 * @FilePath: /smart-logistics-applet/api/queue.js
 */
import { httpGet, httpPost } from "../utils/request.js"

export function carStart(params, otherParams) {
  const url = "/smart-logistics/weChat/queue/loadingAndDeparture"
  return httpPost(url, params, otherParams)
}

export function getCurrentTask(params, otherParams) {
  const url = "/smart-logistics/weChat/queue/getAppointmentInfo"
  return httpGet(url, params, otherParams)
}

export function carReserveQueue(params, otherParams) {
  const url = "/smart-logistics/weChat/queue/queueForAppointment"
  return httpPost(url, params, otherParams)
}

export function getCurrentStationInfo(params, otherParams) {
  const url = "/smart-logistics/weChat/queue/getStationSignIn"
  return httpGet(url, params, otherParams)
}

export function carSignIn(params, otherParams) {
  const url = "/smart-logistics/weChat/queue/updateStationStatus"
  return httpPost(url, params, otherParams)
}

export function goodsInTransit(params, otherParams) {
  const url = "/smart-logistics/weChat/queue/listInProgressRecords"
  return httpGet(url, params, otherParams)
}

export function goodsEnd(params, otherParams) {
  const url = "/smart-logistics/weChat/queue/listCompletedRecords"
  return httpGet(url, params, otherParams)
}

export function getGoodsDetailTimeRecord(params, otherParams) {
  const url = "/smart-logistics/weChat/queue/getDetailTimeRecord"
  return httpGet(url, params, otherParams)
}

export function getQueueResult(params, otherParams) {
  const url = "/smart-logistics/weChat/queue/queryQueueResult"
  return httpGet(url, params, otherParams)
}
