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

    let MapboxImageryProviderSatellite = {
        id:2,
        name:'Mapbox Satellite',
        provider:new Cesium.MapboxImageryProvider({
            mapId: 'mapbox.satellite'
        }),
        selected:false,
        thumbnail:'Widgets/Images/ImageryProviders/mapboxSatellite.png'
    }
    providerContainer.push(MapboxImageryProviderSatellite)

    let MapboxImageryProviderStreets = {
        id:3,
        name:'Mapbox Streets Classic',
        provider:new Cesium.MapboxImageryProvider({
            mapId: 'mapbox.streets-basic'
        }),
        selected:false,
        thumbnail:'Widgets/Images/ImageryProviders/mapboxStreets.png'
    }
    providerContainer.push(MapboxImageryProviderStreets)

    let TileMapServiceImageryProviderBlack = {
        id:4,
        name:'The Black Marble',
        provider:Cesium.createTileMapServiceImageryProvider({
            url : 'https://cesiumjs.org/blackmarble',
            flipXY : true,
            credit : 'Black Marble imagery courtesy NASA Earth Observatory'
        }),
        selected:false,
        thumbnail:'Widgets/Images/ImageryProviders/blackMarble.png'
    }
    providerContainer.push(TileMapServiceImageryProviderBlack)

    let TileMapServiceImageryProviderN2 = {
        id:5,
        name:'Natural Earth\u00a0II',
        provider:Cesium.createTileMapServiceImageryProvider({
            url : 'Assets/Textures/NaturalEarthII'
        }),
        selected:false,
        thumbnail:'Widgets/Images/ImageryProviders/naturalEarthII.png'
    }
    providerContainer.push(TileMapServiceImageryProviderN2)

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
