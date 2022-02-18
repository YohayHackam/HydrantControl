/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

// Markers icon location by trigger type:
const hydrentsIcons={trig1:"./img/orange_pin.png",trig2:"./img/red_pin.png",trig3:"./img/orange_pin.png",trig4:"./img/orange_pin.png",trig5:"./img/orange_pin.png",trig6:"./img/orange_pin.png",trig7:"./img/orange_pin.png",trig0:"./img/cyan_pin.png"}

const hydrentsMarkers=[]; //Hydrents data holder Will be filled from jason file
var map; //Google Map pointer`


function displayMap()   // CallBack function from GoogleMap Api
{      
    const mapOptions = {  /** Map settings */
      mapTypeId: google.maps.MapTypeId.ROADMAP ,
      center: { lat: 31.2550527265313, lng: 34.79997703336923 },
      zoom: 14, 
      minZoom: 8, maxZoom: 19,
       disableDefaultUI:true,
       streetViewControl:true,
      mapId:'9a6354400ebf2167',
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM},
      streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM},
    };  
     map = new google.maps.Map(mapDiv, mapOptions);
     showHydrentsFromJson();   /*** gets Hydrents data  from jason file and put Markers on Map */
     map.addListener("zoom_changed", () => updateMarkers(map.getZoom()));  //update Markers on changed zoom level
     }
        
function showHydrentsFromJson(){  /*** gets Hydrents data  from jason file and put Markers on Map */
  fetch("./DB/Hydrent.json")
    .then(resp=>{return resp.json()})
    .then(data=>data.forEach(hydrent =>hydrentBuilder(hydrent)))
}


  
function hydrentBuilder(hydrent){   //Put Hydrent Marker on Map
  let icon='trig'+getEvent(hydrent.id); //gets Hydrent Event Icon
  let marker= new google.maps.Marker({
      position: {lat: hydrent.lat,lng:  hydrent.lng },        
      map:map,
      animation: google.maps.Animation.DROP,
        icon:{ url:hydrentsIcons[icon]
       ,scaledSize: new google.maps.Size(28, 28)},
      title: `Id: ${hydrent.id}`,
      lable:"test",  
    });        
    hydrentsMarkers.push(marker); //add Hydrent Marker to array
  }
  
function updateMarkers(zoomLevel){  // set Markers size by zoom level , hide markers on Zoom level above 13
    if(zoomLevel>12) 
      hydrentsMarkers.forEach(marker=>{ //update all Markers Visibilty & Size
        marker.visible=true;
        let size=(zoomLevel-10)*12-20
        marker.icon.scaledSize.height=size;
        marker.icon.scaledSize.width=size;
        });
    else
      hydrentsMarkers.forEach(marker=>{marker.visible=false;});  //hide all markers on zoom level too far
 

}

function getEvent(id){  /*** return event trigger type by hydrent Id */
   let index=events.findIndex(event =>event.id===id)
  if(index!=-1) 
  return events[index].eventType;
  else
     return 0
}