import axios from 'axios'

const PREFIX_URL = 'http://192.168.2.157:12345/'

// 获取所有站点信息
const GET_ALL_STATION_INFO_URL = PREFIX_URL + 'apis/stations'
export const getAllStationInfo = () => (axios.get(GET_ALL_STATION_INFO_URL))

// 根据站点类型获取站点信息
const GET_STATION_BY_STTP = PREFIX_URL + 'apis/stations/sttp/'
export const getStationBySTTP = (sttp) => (
    axios.get(GET_STATION_BY_STTP + sttp)
)

// 根据站点编号获取站点信息
const GET_STATION_BY_STCD = PREFIX_URL + 'apis/stations/stcd/'
export const getStationBySTCD = (stcd) => (
    axios.get(GET_STATION_BY_STCD + stcd)
)

// 根据站点编号、起止事件获取站点水位流量关系
const POST_STATION_QOBS = PREFIX_URL + 'apis/station/section'
export const postStationQobs = (STCD, START, END) => (axios.post(POST_STATION_QOBS, {
    STCD,
    START,
    END
}))

// 根据站点编号获取站点阈值信息
const GET_STATION_EXTREMUM = PREFIX_URL + 'apis/station/extream/'
export const getStationExtremum = (stcd) => (
    axios.get(getStationExtremum + stcd)
)

// 根据站点编号获取站点断面数据
const GET_STATION_SECTION = PREFIX_URL + 'apis/section/'
export const getStationSection = (stcd) => (
    axios.get(GET_STATION_SECTION + stcd)
)

// 根据站点编号获取站点某一时段平均水位
const GET_STATION_MH_AVG = PREFIX_URL + 'apis/mhavg/'
export const getStationMhAvg = (stcd, start, end) => (
    axios.get(`${GET_STATION_MH_AVG}${stcd}/from/${start}/to/${end}`)
)

// 根据站点编号获取某一时段内最高水位
const GET_STATION_MH_MAX = PREFIX_URL + 'apis/mhmax/'
export const getStationMhMax = (stcd, start, end) => (
    axios.get(`${GET_STATION_MH_MAX}${stcd}/from/${start}/to/${end}`)
)

// 根据站点编号获取某一时段最低水位
const GET_STATION_MH_MIN = PREFIX_URL + 'apis/mhmin/'
export const getStationMhMin = (stcd, start, end) => (
    axios.get(`${GET_STATION_MH_MIN}${stcd}/from/${start}/to/${end}`)
)

// 根据站点编号获取站点某一时段平均流量
const GET_STATION_MQ_AVG = PREFIX_URL + 'apis/mqavg/'
export const getStationMhAvg = (stcd, start, end) => (
    axios.get(`${GET_STATION_MQ_AVG}${stcd}/from/${start}/to/${end}`)
)

// 根据站点编号获取某一时段内最大流量
const GET_STATION_MQ_MAX = PREFIX_URL + 'apis/mqmax/'
export const getStationMhMax = (stcd, start, end) => (
    axios.get(`${GET_STATION_MQ_MAX}${stcd}/from/${start}/to/${end}`)
)

// 根据站点编号获取某一时段最小流量
const GET_STATION_MQ_MIN = PREFIX_URL + 'apis/mqmin/'
export const getStationMhMin = (stcd, start, end) => (
    axios.get(`${GET_STATION_MQ_MIN}${stcd}/from/${start}/to/${end}`)
)


