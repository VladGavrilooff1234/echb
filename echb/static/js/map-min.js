class App{constructor(e,s,t,i){this.regions=e,this.churches=s,this.gMap=t,this.closestChurchesQnty=i,this.showRegions(),this.showChurches(),this.initializeClosestChurches(),this.userPosition={},this.closestChurches=[],this.helper=new Helper}showRegions(){document.getElementById("regions").innerHTML=tmpl("regions-list",this.regions),$("#regions").on("click","li a",function(e){return $(".aside__menu-link").removeClass("aside__menu-link--active"),$(this).addClass("aside__menu-link--active"),!1}),$("#regions").on("click","li a",()=>{const e=document.getElementsByClassName("aside__menu-link--active")[0].dataset.region;return this.gMap.resetDirections(),this.gMap.filterGpointsByRegion(e),!1})}initializeClosestChurches(){$("#get_closest_churches").on("click",()=>(this.showclosestChurches(),!1)),$("#closest-churches-list").on("click","li a",function(e){return $(this).parent().children(".church__closest-list").toggleClass("church__closest-list--none"),!1}),$("#closest-churches-list").on("click","li .closest-churches-list__button",e=>{let s={lat:e.target.dataset.lat,lng:e.target.dataset.lng};return this.gMap.calculateRoute(s,this.userPosition),!1})}filterGpointsByChurchIds(){this.addDistanceFromUserPosition(this.userPosition),this.closestChurches=this.getClosestChurches();let e=this.closestChurches.reduce((e,s)=>(e.push(s.pk),e),[]);this.gMap.filterGpointsByChurchIds(e)}showListOfChurches(){document.getElementById("closest-churches-list").innerHTML=tmpl("church-info-search",this.closestChurches)}setUserPosition(e){this.userPosition=e.coords}showclosestChurches(){navigator.geolocation?navigator.geolocation.getCurrentPosition(e=>{e&&(this.setUserPosition(e),this.filterGpointsByChurchIds(),this.showListOfChurches(),this.gMap.addUserGpoint(this.userPosition))},function(){this.helper.showMessage("Невозможно определить ваше положение.")}):this.helper.showMessage("Ваш браузер не поддерживает функцию Геолокации.")}addDistanceFromUserPosition(){this.churches.forEach(e=>{e.distanceFromUser=this.helper.calculateDistance(e,this.userPosition)})}getClosestChurches(){return this.churches.sort((e,s)=>e.distanceFromUser-s.distanceFromUser),this.churches.slice(0,this.closestChurchesQnty)}showChurches(){const e=[];this.churches.forEach(s=>{let t=this.gMap.createGmapMarker(s);this.gMap.addChurchClickListener(s,t),e.push(t)}),this.gMap.addMarkersToMap(e)}}class Data{constructor(e,s){this.regionsUrl=e,this.churchesUrl=s,this.regionsData=[]}getPromise(){return new Promise((e,s)=>this.getRegions(e))}getRegions(e,s){fetch(this.regionsUrl).then(e=>e.json()).then(s=>this.getChurches(s,e))}getChurches(e,s){this.regionsData=e,fetch(this.churchesUrl).then(e=>e.json()).then(t=>{let i=this.addRegionNameToChurch(e,t);s(i)})}addRegionNameToChurch(e,s){let t={};return t.regions=e,t.churches=s.map(e=>(e.fields.region_name=this.getRegionNameById(e.fields.region),e)),t}getRegionNameById(e){return this.regionsData.filter(s=>s.pk==e)[0].fields.name}}class GMapServices{constructor(e,s,t,i,o){this.map=this.createMap(e,s,t,i),this.map.gmarkers=[],this.directionsService=new o.maps.DirectionsService,this.directionsDisplay=new o.maps.DirectionsRenderer,this.infoWindow=new o.maps.InfoWindow}createMap(e,s,t,i){return new google.maps.Map(document.getElementById(i),{center:{lat:e,lng:s},zoom:t})}addChurchClickListener(e,s){google.maps.event.addListener(s,"click",function(e,s,t){const i=tmpl("church-info-gmap",e.fields);return function(){t.setContent(i),t.open(this.map,s)}}(e,s,this.infoWindow))}createGmapMarker(e){return new google.maps.Marker({position:new google.maps.LatLng(e.fields.lat,e.fields.lng),map:this.map,regionId:e.fields.region,churchId:e.pk,icon:"/static/img/church-gmap.png"})}filterGpointsByChurchIds(e){var s=new google.maps.LatLngBounds;this.map.gmarkers.forEach(t=>{if(e.indexOf(t.churchId)>-1){let e=new google.maps.LatLng(t.position.lat(),t.position.lng());s.extend(e),t.setVisible(!0)}else t.setVisible(!1)}),this.map.fitBounds(s)}filterGpointsByRegion(e){var s=new google.maps.LatLngBounds;this.map.gmarkers.forEach(t=>{if(0==e||t.regionId==e){let e=new google.maps.LatLng(t.position.lat(),t.position.lng());s.extend(e),t.setVisible(!0)}else t.setVisible(!1)}),this.map.fitBounds(s)}addUserGpoint(e){const s=new google.maps.Marker({position:new google.maps.LatLng(e.latitude,e.longitude),map:this.map,regionId:0,churchId:0,icon:"/static/img/location.png"});this.map.gmarkers.push(s)}resetDirections(){this.directionsDisplay.setMap(null)}calculateRoute(e,s){const t=new google.maps.LatLng(s.latitude,s.longitude),i=new google.maps.LatLng(e.lat,e.lng);let o=new google.maps.LatLngBounds;o.extend(t),o.extend(i),this.map.fitBounds(o);const n={origin:t,destination:i,travelMode:google.maps.TravelMode.DRIVING};this.directionsService.route(n,(e,s)=>{s==google.maps.DirectionsStatus.OK?(this.directionsDisplay.setDirections(e),this.directionsDisplay.setMap(this.map)):console.log("Directions Request from "+t.toUrlValue(6)+" to "+i.toUrlValue(6)+" failed: "+s)})}addMarkersToMap(e){this.map.gmarkers=e}}class Helper{getRadian(e){return e*Math.PI/180}calculateDistance(e,s){var t=this.getRadian(e.fields.lat-s.latitude),i=this.getRadian(e.fields.lng-s.longitude),o=Math.sin(t/2)*Math.sin(t/2)+Math.cos(this.getRadian(s.latitude))*Math.cos(this.getRadian(s.latitude))*Math.sin(i/2)*Math.sin(i/2),n=2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o));return Math.round(6371*n)}showMessage(e){$("#messages").innerHTML=e}}