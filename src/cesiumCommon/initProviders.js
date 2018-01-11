import Cesium from 'cesium/Cesium'

export const initImageryProviders = () => {
    let providerContainer = []
    let ArcGisMapServerImageryProvider = {
        id:0,
        name:'ArcGIS World Street Maps',
        provider:new Cesium.ArcGisMapServerImageryProvider({
            url : 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
        }),
        selected:false,
        thumbnail:'Widgets/Images/ImageryProviders/esriWorldImagery.png'
    }
    providerContainer.push(ArcGisMapServerImageryProvider)

    let BingMapsImageryProvider = {
        id:1,
        name:'Bing Maps Road',
        provider:new Cesium.BingMapsImageryProvider({
        url : 'https://dev.virtualearth.net',
            mapStyle: Cesium.BingMapsStyle.ROAD
        }),
        selected:false,
        thumbnail:'Widgets/Images/ImageryProviders/bingRoads.png'
    }
    providerContainer.push(BingMapsImageryProvider)

    // let BlueMarbleProvider = {
    //     id:2,
    //     name:'Blue Marble',
    //     provider:new Cesium.createTileMapServiceImageryProvider({
    //         url:blueMarbleUrl
    //     }),
    //     selected:false,
    //     thumbnail:'Widgets/Images/ImageryProviders/bingRoads.png'
    // }
    // providerContainer.push(BlueMarbleProvider)

    return providerContainer
}

export const initTerrainProviders = () => {
    let providerContainer = []

    let TerrainProvider = {
        id:0,
        name:'Terrain',
        provider:new Cesium.CesiumTerrainProvider({url: 'http://192.168.2.157/t'}),
        selected:false,
        thumbnail:'Widgets/Images/ImageryProviders/bingRoads.png'
    }
    providerContainer.push(TerrainProvider)

    return providerContainer
}
