import axios from 'axios'

const ALL_STATION_INFO_URL = 'http://192.168.2.157:12345/apis/stations'
export const getAllStationInfo = () => {
    return axios.get(ALL_STATION_INFO_URL)
}