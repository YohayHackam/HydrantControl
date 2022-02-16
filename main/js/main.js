

/*************************************
 ***  Made By Yohay Hackam         ***
 ***  mail: Yoman_321@hotmail.com  ***
 ***  054-2616626                  ***
 *************************************/

/******************************          VARIBLES      **********************************/

// פרטי ה-TRIGER-ים:
// Trig 1 - Water flow
// Trig 2 - Reverse water flow
// Trig 3 - Vandalism
// Trig 5 - Low battery
// Trig 6 - Life signal
// Trig 7 - Pressure state
///****** */ What about triger 4 ?!?

var map; //Google Map pointer`

// Event icon location by trigger type:
const eventIcon={trig1:"./img/flow.gif",trig2:"./img/danger.png",trig3:"./img/vandalisem.png",trig5:"./img/battery.png",trig6:"./img/power.png",trig7:"./img/pressure.png" };

var events=[]; //Events data holder Will be filled from jason file

const mapDiv = document.getElementById('mapContainer');
// Get the root element
const root = document.querySelector(':root');
const eventGroupList = document.querySelectorAll(".eventGroupList"); //events container 
const eventGroupBox = document.querySelectorAll(".eventGroup"); //Group events container 
const eventGroupCounter = document.querySelectorAll(".eventGroupCounter"); //Group counter 
const tabSelect = document.querySelector(".tabSelect"); // Events / Alerts Tab selector
const eventsTab = document.querySelector("#eventsTab"); //Events Tab
const alertsTab = document.querySelector("#alertsTab"); //Alerts Tab  T.B.D

var rootStyle = getComputedStyle(root) //counter of visible group type on css

/*****************************      FUNCTIONALITY         *********************************/

/*** Click on Event in list => focus on Hydrent Marker
 *  TBD - Envent PopUp Screen & InfoWindow on Marker
 */

//Fetch Data From file
fetch("./DB/DemoEventDb.json")
 .then(resp=>{return resp.json();}) //read data as JASON
 .then(data=>{  
             data.forEach((event,idx)=>{ //brake data to events 
                events.push(event); //Events data Array 
                eventBuilder(event); //Create Event Element on HTML
                }) 
            });


function eventBuilder(event){//Creates Event Element on HTML With ID HyderntID
    eventGroupList.forEach((element,idx) => {
        if (element.id === "trig"+event.eventType) {
            if(eventGroupBox[idx].classList.contains("hide")){
                root.style.setProperty('--visibleGroupCount', Number(root.style.getPropertyValue('--visibleGroupCount'))+1);
                eventGroupBox[idx].classList.remove("hide"); //Mak Group Event Visible
            }
            // console.log(eventIcon["trig"+event.eventType])
            element.innerHTML+=
            `<div class="event" id="HydrentId#${event.id}"> 
                <img src="${eventIcon["trig"+event.eventType]}" class="eventIcon" id="HydrentId#${event.id}"> 
                <p id="HydrentId#${event.id}" >
                    ${event.address}&nbsp;#${event.id}
                    <br>
                    ${event.dateTime}
                </p>
            </div>`;
            eventGroupCounter[idx].innerText++; //update Event Group's Counter 
            }          
    });
}



/******************* TAB Select **********************/
document.querySelector(".tabSelect").addEventListener("click",()=>{setActiveTab(event.target.id)});

function setActiveTab(tabId){
    switch(tabId){
        case "allEvents":
        document.querySelector("#eventsTab").classList.remove("hide");
        document.querySelector("#alertsTab").classList.add("hide");
        break;
        case "allAlerts":
        document.querySelector("#eventsTab").classList.add("hide");
        document.querySelector("#alertsTab").classList.remove("hide");
        break;
    }

}


/******************* Event Select ***********************/

eventsTab.addEventListener("click",event => focusHydrent(event));  

function focusHydrent(event){ /** Focus Map on Hydrent assisated with event & change it's animation */
    reg=new RegExp("HydrentId","");
    if(reg.test(event.target.id)){
        map.getStreetView().setVisible(false);
        hydrentsMarkers.forEach(marker=>{
            marker.setAnimation(google.maps.Animation.NONE)
            marker.visible=true;
        })
        if (map.getZoom()>16) 
            map.setZoom(16)
        let target=event.target.id.replace("HydrentId#","");
       map.panTo(GetCord(target));
       setTimeout(() => { map.setZoom(17)}, 650); 
    }        
}
function GetCord(id){  /** returns Marker Len&Lat by  Marker ID  */
    let res;
 hydrentsMarkers.forEach(marker=>{
     if(Number(marker.title.replace('Id:',"")) === Number(id)){
        res=marker.position;
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(()=>marker.setAnimation(google.maps.Animation.NONE),4000)
     }
    });
return res;
}




