import request from '@/config/axios'
import { TrafficInfo } from './types'

export const allSite = () => {
  return request.get({
    url: '/cm/site/all'
  })
}

export function sitesByName(siteName: string) {
  return request.get({
    url: '/cm/site/' + siteName
  })
}

export function nearestSite(siteName: string) {
  return request.get({
    url: '/cm/site/nearest/' + siteName
  })
}

export function trafficOfDay() {
  return request.get({
    url: '/cm/traffic/day'
  })
}

export function traffifPerDayAndHour(siteName: string): Promise<TrafficInfo[]> {
  return request.get({
    url: '/cm/traffic/avg/' + siteName
  })
}

export function trafficNearest(siteName: string) {
  return request.get({
    url: '/cm/traffic/nearest/' + siteName
  })
}

export function dataWithoutSiteInfo() {
  return request.get({
    url: '/cm/ex/data'
  })
}

export function downloadDataWithoutSiteInfo() {
  request
    .get({
      url: '/cm/ex/download/data',
      responseType: 'blob'
    })
    .then((res: any) => {
      const data = res.data
      if (!data) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.setAttribute('download', '有5G流量无基站信息.xls')
      document.body.appendChild(a)
      a.click() //执行下载
      window.URL.revokeObjectURL(a.href) //释放url
      document.body.removeChild(a) //释放标签
    })
    .catch((error: any) => {
      console.log(error)
    })
}

export function siteWithoutData() {
  return request.get({
    url: '/cm/ex/site'
  })
}

export function downloadSiteWithoutData() {
  request
    .get({
      url: '/cm/ex/download/site',
      responseType: 'blob'
    })
    .then((res: any) => {
      const data = res.data
      if (!data) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([data]))
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.setAttribute('download', '有基站信息无5G流量.xls')
      document.body.appendChild(a)
      a.click() //执行下载
      window.URL.revokeObjectURL(a.href) //释放url
      document.body.removeChild(a) //释放标签
    })
    .catch((error: any) => {
      console.log(error)
    })
}
