  // ==UserScript==
  // @name         GeoFS Addon Manager
  // @namespace    http://tampermonkey.net/
  // @version      1.0
  // @description  Manage all GeoFS addons from one panel
  // @author       geofspilot
  // @match        https://www.geo-fs.com/*
  // @grant        none
  // ==/UserScript==
  
  (function() {
      'use strict';
  
      function createAddonManager() {
          const geofsPreferencesPanel = document.querySelector('.geofs-list.geofs-toggle-panel.geofs-preference-list');
  
          const addonListItem = document.createElement('li');
          addonListItem.className = 'geofs-list-collapsible-item';
          addonListItem.innerText = 'Addons';
          
  
          const dropdownIcon = document.createElement('li');
          dropdownIcon.className = 'geofs-collapsible-item::before';
          dropdownIcon.style.marginRight = '5px';
          
          addonListItem.appendChild(dropdownIcon);
  
          const addonContent = document.createElement('div');
          addonContent.className = 'geofs-list';
          addonContent.style.display = 'none';
        
          addonListItem.appendChild(addonContent);
  
          addonListItem.onclick = () => {
              const isVisible = addonContent.style.display === 'block';
              addonContent.style.display = isVisible ? 'none' : 'block';
              dropdownIcon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(90deg)';
          };
  
          function addAddon(name, runFunction) {
              //ADDON DESCRIPTIONS GO HERE:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
              const descriptions = {
                  'ATC airspace': `2 airspace monitoring modes accessible via the AIRSPACE button at the top
                  RDR mode has larger range and will set the radius of your airspace up to 25 km
                  RDR mode creates an invisible circle centered around your airport of choice that senses if a plane enters or exits it regardless of altitude
                  Set your radius and your airport to begin monitoring
                  When planes enter or exit this airspace, a sound and notification are activated
                  VIS mode uses which planes are visible to notify you
                  When the number of players visible to you changes, the sound and notification are activated
                  While VIS mode is based on where you are, you can remotely monitor airspace using the RDR mode, which uses the input airport as the center of the airspace`,
                  
                  'Autoland': `Automatic spoiler arming system
                  Auto-disables autopilot on touchdown
                  Automatic reverse thrust activation on landing
                  Visual indicator for spoiler arm status (press [Shift] to arm)`,
          		
                  'Chat frequencies': `Allows you to chat on the same frequencies as others using this addon`,

                  'Flight path vector': `Shows approximately where your flight path intersects the ground. It also displays your glideslope if you are tuned into ILS. The addon only activates if your landing gear is down. Hide the FPV by pressing [Insert]`,

                  'Failures': `Adds the ability for systems to fail`,

                  'Fuel': `Simulates fuel consumption by calculating burn rate from throttle setting and fuel capacity from aircraft mass. To refuel, you must be on the ground, stationary, and have engines off`,

                  'GPWS': `Adds GPWS callouts
                  For the minimums to work, you need to type in the BAROMETRIC (MSL) minimum altitude/desision height (without the -½) as defined at the bottom of the IFR approach plate.
                  For the Glideslope alarm to work, you must be tuned into an ILS.
                  For some of the callouts to work, you must be descending.`,

                  'Information display': `Displays Indicated Airspeed, Mach, Ground Speed, Altitude, Above Ground Level, Heading, Vertical Speed, Throttle %`,

                  'Landing stats': `Upon landing, displays vertical speed, G-forces, airspeed, roll, tilt, TDZ accuracy, and more. For the TDZ to work you must be tuned into ILS `,

                  'LiverySelector': `Unified livery handler addon for geofs.
                  This addon contains more than a hundred of new liveries and a brand new user interface to make it easier to use your favorite livery.
                  In the list of liveries you can find:
                  the well known multiliveries by Spice9,
                  the LiveryChanger by Ariakim Taiyo,
                  Iuhairways, and
                  other custom liveries made exactly for this project.`,

                  'Overpowered engines': `Sets the engine thrust to 900,000 and the ceiling to 300,000 feet.
                  Toggle using [Q]`,

                  'Pushback': `Adds pushback tugs for most military and civilian aircraft which appear if you are stationary.`,

                  'Realism pack': `Toggle button for KCAS/KTAS instruments
                    Fixed PFD/HUD sizes for all CC aircraft
                    ILS autoland for autopilot approaches
                    Blackout over 9 Gs (cockpit view only)
                    Fighter condensation effects
                    SSR shaders by AriakimTaiyo (*)
                    Immersion sounds for A320/A220/A350, 737/777 (*)
                    Helicopter rotor strikes cause crashes
                    Basic propwash
                    Livery Selector by Kolos26 (use alone if Realism Pack crashes)
                    Bug fixes for F-14, XB-70
                    F-14 swing wing physics
                    8 addon aircraft:
                    F/A-18C: Tailhook, paddle switch (G-limiter override)
                    Su-27: Cobra button (not Su-35)
                    MiG-17
                    E-7 Wedgetail AWACS
                    MiG-21: X toggles drop tank
                    Morane-Saulnier Type G
                    F-117: No working stealth
                    F-14A Tomcat: More realistic physics than F-14B
                    Paddle switch/Cobra button: ["] (apostrophe/quotation mark)
                    Clickable cockpits:
                    Piper Cub: Mixture (toggles engine)
                    Cessna 172: Throttle, mixture (toggles engine)
                    Embraer Phenom 100: Throttle, landing gear, parking brake
                    DHC-6 Twin Otter: Flaps
                    Douglas DC-3: Flaps, throttle, mixture, magnetos (both must be on for auto-start)
                    Alisport Silent 2: Speedbrake, flaps
                    DHC-2 Beaver: Flaps, throttle, mixture (toggles engine), water rudders
                    Airbus A380: Speedbrake
                    Minor F-16 sound tweak (directional)
                    Sonic booms & high-G sounds
                    Carrier catapults (*)
                    Taxi to USS John C. Stennis front deck, press [Q] to lock/unlock launch bar, [~] to launch (full power recommended)
                    Stall buffet camera effect (*)
                    Lift-based wingflex for most CC airliners (*)
                    Realism fixes: HAL Tejas, F-15, F-22
                    Tricky Corsair startup (advance throttle slightly)
                    F-16 brake parachute
                    Turbofan spool-up delay (10%-70% RPM)
                    Advanced 2D Clouds Gen V1
                    Autospoilers (Shift to arm)
                    Fighter jet ejection seats ([E] to eject, [B] to descend faster)
                    HUD machmeter
                    Lag reduction`,

		    'Slew mode': `Mimics slew mode from FSX
      		    Fwd: [I]
		    Back: [K]
		    Left: [J]
		    Right: [L]
		    Up:[U]
		    Down: [Enter]
		    Yaw right: [.]
		    Yaw left: [,]
		    Roll right: [->]
		    Roll left: [<-]`,

                    'Streetlights': `Creates 3d streetlights`,

                    'Taxiway lights': `Creates taxiway lights that turn yellow when nearing a runway to help distinguish intersections`,

                    'Tiller fix for autolanding': `Dampens steering above 10 kts, to prevent overcorrection by the ILS autoland`
              };
              
              const descriptionText = descriptions[name] || 'No description available.';
              const addonItem = document.createElement('ul');
              addonItem.className = 'no-hover geofs-list-collapsible-item geofs-hideForApp';
              addonItem.style.position = 'relative';
              addonItem.innerText = name;
  
              const descDropdownIcon = document.createElement('li');
              descDropdownIcon.className = 'geofs-collapsible-item::before';
              descDropdownIcon.style.marginRight = '5px';
      
              const runButton = document.createElement('button');
              runButton.innerText = 'RUN';
              runButton.style.position = 'absolute';
              runButton.style.right = '5px';
              runButton.style.top = '50%';
              runButton.style.transform = 'translateY(-50%)';
              runButton.onclick = () => {
                  runButton.innerText = 'RUNNING';
                  runButton.style.backgroundColor = 'grey';
                  runButton.style.color = 'white';
                  runButton.style.border = '1px solid grey';
                  runButton.disabled = true;
                  (function() { runFunction(); })();
                  const descIsVisible = description.style.display === 'block';
                  description.style.display = descIsVisible ? 'none' : 'block';
                  descDropdownIcon.style.transform = descIsVisible ? 'rotate(0deg)' : 'rotate(90deg)';
                  const isVisible = addonContent.style.display === 'block';
                  addonContent.style.display = isVisible ? 'none' : 'block';
                  dropdownIcon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(90deg)';
              };
              
              const description = document.createElement('li');
              description.className = 'geofs-list-item-description';
              description.innerText = descriptionText;
              description.style.display = 'none';
              description.style.lineHeight = '1.1';
              description.style.paddingRight = '80px';
  
              
              addonItem.onclick = (event) => {
                  event.stopPropagation();
                  const descIsVisible = description.style.display === 'block';
                  description.style.display = descIsVisible ? 'none' : 'block';
                  descDropdownIcon.style.transform = descIsVisible ? 'rotate(0deg)' : 'rotate(90deg)';
                  const isVisible = addonContent.style.display === 'block';
                  addonContent.style.display = isVisible ? 'none' : 'block';
                  dropdownIcon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(90deg)';
              };
  
              addonItem.appendChild(runButton);
              addonItem.appendChild(description);
              addonListItem.appendChild(addonItem);
          }
          //ADDON NAMES AND runFunctions GO HERE:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          addAddon('ATC airspace', airspace);
          addAddon('Autoland++', autoland);
          addAddon('Chat frequencies', freq);
          addAddon('Flight path vector', fpv);
          addAddon('Failures', failures);
          addAddon('Fuel', fuel);
          addAddon('GPWS', gpws);
          addAddon('Information display', info);
          addAddon('Landing stats', stats);
          addAddon('LiverySelector', ls);
          addAddon('Overpowered engines', opengines);
          addAddon('Pushback', pushback);
          addAddon('Realism pack', realism);
          addAddon('Slew mode', slew);
	  addAddon('Streetlights', slights);
	  addAddon('Taxiway lights', twlights);
          addAddon('Tiller fix for autolanding', tiller);
         

          geofsPreferencesPanel.appendChild(addonListItem);
      }
  
      // ADDON CODE GOES HERE:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      window.airspace = function() {
          (function() {
              //PASTE IN CODE BELOW
              let radius=1,airportName="";function checkUser(t){let i=distanceInKmBetweenEarthCoordinates(t[0],t[1],geofs.mainAirportList[airportName][0],geofs.mainAirportList[airportName][1]);return i<radius||!(i>radius)}function distanceInKmBetweenEarthCoordinates(t,i,o,s){var n=degreesToRadians(o-t),r=degreesToRadians(s-i),l=Math.sin(n/2)*Math.sin(n/2)+Math.sin(r/2)*Math.sin(r/2)*Math.cos(t=degreesToRadians(t))*Math.cos(o=degreesToRadians(o));return 6371*(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)))}function degreesToRadians(t){return t*Math.PI/180}function check(t){let i=[];for(let[o,s]of Object.entries(t))try{void 0!==s.lastUpdate.co&&null!==s.lastUpdate.co&&checkUser(s.lastUpdate.co)&&i.push(o)}catch(n){}return i}Array.prototype.equals&&console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code."),Array.prototype.equals=function(t){if(!t)return!1;if(t===this)return!0;if(this.length!=t.length)return!1;for(var i=0,o=this.length;i<o;i++)if(this[i]instanceof Array&&t[i]instanceof Array){if(!this[i].equals(t[i]))return!1}else if(this[i]!=t[i])return!1;return!0},Object.defineProperty(Array.prototype,"equals",{enumerable:!1}),Array.prototype.diff=function(t){return this.filter(i=>!t.includes(i)).concat(t.filter(t=>!this.includes(t)))},Object.defineProperty(Array.prototype,"diff",{enumerable:!1});let airspace={},visible={},a,b,d,e,sonarSound=new Audio("https://raw.githubusercontent.com/meatbroc/geofs-atc-airspace/main/sonar.mp3");function createHaring(t){let i=document.createElement("div");i.classList.add("geofs-haring"),i.innerHTML=`<div class="geofs-content"><p>${t}</p></div></div></div>`,document.body.appendChild(i),setTimeout(function(){i.remove()},3e3)}function action(t,i,o){(t=(t=t.map(t=>{try{if(multiplayer.users[t]&&void 0==multiplayer.users[t].isTraffic)return multiplayer.users[t].callsign}catch(i){console.error("Error reading player "+t+"'s data")}})).filter(function(t){return void 0!==t})).length>0&&(i.length<o.length?(createHaring(`${t} entered your airspace`),sonarSound.play()):i.length>o.length&&(createHaring(`${t} left your airspace`),sonarSound.play()),console.log(t))}airspace.init=function(){a=check(multiplayer.users),b=check(multiplayer.users),airspace.interval=setInterval(function t(){let i=a.diff(b);0!=i.length&&action(i,a,b),a=b,b=check(multiplayer.users)},200)},airspace.stop=function(){clearInterval(airspace.interval),a=void 0,b=void 0},visible.init=function(){d=Object.keys(multiplayer.visibleUsers),e=Object.keys(multiplayer.visibleUsers),visible.interval=setInterval(function t(){let i=d.diff(e);0!=d.diff(e).length&&action(i,d,e),d=e,e=Object.keys(multiplayer.visibleUsers)},200)},visible.stop=function(){clearInterval(visible.interval),d=void 0,e=void 0};const style=document.createElement("style");style.innerHTML=`
     .ext-autopilot-pad {
         width: 90px;
         margin: 0px 10px;
     }
     .ext-autopilot-bar {
         white-space: nowrap;
         display: flex;
         align-items: flex-start;
         pointer-events: all;
     }
     .ext-control-pad {
         border: 1px solid #888;
         background-color: #000;
         box-shadow: 0px 0px 5px #000;
         border-radius: 15px;
         cursor: pointer !important;
     }
     .ext-autopilot-controls {
         vertical-align: bottom;
         display: none;
         margin-right: 10px;
     }
     .ext-autopilot-control {
         position: relative;
         text-align: center;
         margin: 0px 5px;
         color: white;
         line-height: 25px;
         display: inline-block;
     }
     .ext-airport-label {
         position: relative !important;
         left: 17.5px;
     }
     .ext-highlighted {
         color: #66ff00 !important;
         border-color: white !important;
     }
     .ext-highlighted2 {
         color: #FF0000 !important;
         border-color: white !important;
     }
     .ext-autopilot-control span {
         display: block;
         text-align: center;
         text-shadow: #000 1px 1px 3px;
         font-size: 12px;
         top: 2px;
         position: relative;
     }
     .ext-autopilot-bar .ext-autopilot-switch .ext-switchRight {
         border-radius: 0px 15px 15px 0px;
         left: 0px;
     }
     .ext-autopilot-bar .ext-autopilot-switch .ext-switchLeft {
         border-radius: 15px 0px 0px 15px;
         border-right: 5px;
         right: -3px;
     }
     .ext-autopilot-bar .ext-autopilot-switch a {
         user-select: none;
         -webkit-user-select: none;
         position: relative;
         display: inline-block;
         width: 35px;
         height: 17px;
         line-height: 19px;
         cursor: pointer;
         color: white;
         background: #000;
         margin: 2px 0px;
         display: inline-block;
         border: 1px solid white;
         box-shadow: 0px 0px 5px #000;
     }
     .ext-autopilot-bar .ext-autopilot-control {
         position: relative;
         text-align: center;
         margin: 0px 5px;
         color: white;
         line-height: 25px;
         display: inline-block;
     }
     .ext-autopilot-bar .ext-autopilot-course {
         width: 35px !important;
     }
     .ext-autopilot-bar .ext-autopilot-airport {
         width: 70px !important;
     }
     .ext-numberDown {
         border-radius: 15px 0px 0px 15px;
         line-height: 23px;
         right: -5px;
         position: relative !important;
     }
     .ext-numberUp {
         border-radius: 0px 15px 15px 0px;
         line-height: 26px;
         left: -5px;
         position: relative !important;
     }
     .ext-airportInput {
         border-radius: 15px 0px 0px 15px !important;
     }
     .ext-autopilot-control .ext-numberDown,.ext-autopilot-control .ext-numberUp {
         user-select: none;
         -webkit-user-select: none;
         vertical-align: top;
         cursor: pointer;
         text-align: center;
         color: white;
         background: #000;
         margin: 0px;
         width: 30px;
         display: inline-block;
         border: 1px solid white;
         height: 25px;
         box-shadow: 0px 0px 5px #000;
     }
     .ext-autopilot-control .ext-numberValue {
         font-family: 'LCD-Bold', monospace;
         font-size: 20px !important;
         letter-spacing: 1px;
         display: inline-block;
         vertical-align: top;
         padding: 0px 5px;
         margin: 0px;
         background: #000;
         border: 1px solid;
         border-radius: 0px;
         height: 25px;
         line-height: 26px;
         box-shadow: 0px 0px 5px #000;
         color: white;
         width: 80px;
         text-align: right;
     }
  `,document.head.appendChild(style);const controlButton=document.createElement("div");controlButton.classList.add("ext-autopilot-bar"),controlButton.innerHTML=`
                 <div class="ext-control-pad ext-autopilot-pad" id="atc-button" tabindex="0">
                     <div class="control-pad-label transp-pad">AIRSPACE</div>
                     `;const container=document.getElementsByClassName("geofs-autopilot-bar");container[0].appendChild(controlButton);const controlElmnt=document.createElement("div");controlElmnt.classList.add("ext-autopilot-controls"),controlElmnt.style.display="none",controlElmnt.innerHTML=`
                     <div class="ext-autopilot-control">
                         <span class="ext-autopilot-switch ext-autopilot-mode">
                             <a class="ext-switchLeft" data-method="setMode" value="HDG" id="radar-sel">RDR</a>
                             <a class="ext-switchRight" data-method="setMode" value="NAV" id="vis-sel">VIS</a>
                         </span>
                     </div>
     `;const radiusElmnt=document.createElement("div");radiusElmnt.classList.add("ext-autopilot-control"),radiusElmnt.style.display="none",radiusElmnt.innerHTML=`
                         <a class="ext-numberDown" id="radius-selDown">-</a>
                         <input class="ext-numberValue ext-autopilot-course" min="0" max="359" data-loop="true" step="1" maxlength="3" value="1">
                         <a class="ext-numberUp" id="radius-selUp">+</a>
                         <span>RDR RADIUS</span>
     `;const airportElmnt=document.createElement("div");airportElmnt.classList.add("ext-autopilot-control"),airportElmnt.style.display="none",airportElmnt.style.width="64px",airportElmnt.innerHTML=`
                         <input class="ext-airportInput ext-numberValue ext-autopilot-airport geofs-stopKeyboardPropagation geofs-stopKeyupPropagation" id="airport-selInput" min="0" max="359" data-loop="true" step="1" maxlength="4" value="">
                         <a class="ext-numberUp" id="airport-selSub">→</a>
                         <span class="ext-airport-label">AIRPORT</span>
     `;const container2=document.getElementsByClassName("ext-autopilot-bar");container2[0].appendChild(controlElmnt),container2[0].appendChild(radiusElmnt),container2[0].appendChild(airportElmnt);let extMode=0;document.getElementById("atc-button").addEventListener("click",function(){this.classList.toggle("active"),this.classList.contains("active")?(controlElmnt.style.display="block",this.classList.add("green-pad"),this.classList.contains("red-pad")&&this.classList.remove("red-pad")):(controlElmnt.style.display="none",radiusElmnt.style.display="none",airportElmnt.style.display="none",1===extMode?(airspace.stop(),document.getElementById("radar-sel").classList.remove("green-pad")):2===extMode&&(visible.stop(),document.getElementById("vis-sel").classList.remove("green-pad")),extMode=0,this.classList.remove("green-pad"),this.classList.add("red-pad"),setTimeout(()=>{this.classList.remove("red-pad")},3e3))}),document.getElementById("radar-sel").addEventListener("click",function(){0===extMode&&(extMode=3,this.classList.add("green-pad")),2===extMode&&(extMode=3,visible.stop(),document.getElementById("vis-sel").classList.remove("green-pad"),this.classList.add("green-pad")),radiusElmnt.style.display="block",airportElmnt.style.display="block"}),document.getElementById("vis-sel").addEventListener("click",function(){0===extMode&&(extMode=2,visible.init(),this.classList.add("green-pad"),document.getElementById("radar-sel").classList.contains("green-pad")&&document.getElementById("radar-sel").classList.remove("green-pad")),1===extMode&&(extMode=2,airspace.stop(),visible.init(),document.getElementById("radar-sel").classList.remove("green-pad"),this.classList.add("green-pad")),3===extMode&&(extMode=2,visible.init(),document.getElementById("radar-sel").classList.remove("green-pad"),this.classList.add("green-pad")),radiusElmnt.style.display="none",airportElmnt.style.display="none"}),document.getElementById("radius-selUp").addEventListener("click",function(){radiusElmnt.childNodes[3].value<25&&radiusElmnt.childNodes[3].value++,radius=parseInt(radiusElmnt.childNodes[3].value)}),document.getElementById("radius-selDown").addEventListener("click",function(){radiusElmnt.childNodes[3].value>1&&radiusElmnt.childNodes[3].value--,radius=parseInt(radiusElmnt.childNodes[3].value)}),document.getElementById("airport-selSub").addEventListener("click",function(){4===airportElmnt.childNodes[1].value.length&&geofs.mainAirportList[airportElmnt.childNodes[1].value]?(airportName=airportElmnt.childNodes[1].value,airportElmnt.childNodes[1].classList.add("ext-highlighted"),extMode=1,airspace.init()):(airportElmnt.childNodes[1].classList.add("ext-highlighted2"),setTimeout(()=>{airportElmnt.childNodes[1].classList.remove("ext-highlighted2"),airportElmnt.childNodes[1].value=""},3e3))}),document.getElementById("airport-selInput").addEventListener("click",function(){this.value="",this.classList.contains("ext-highlighted")&&this.classList.remove("ext-highlighted"),this.classList.contains("ext-highlighted2")&&this.classList.remove("ext-highlighted2")});
          })();
      };
      
      window.autoland = function() {
          (function() {
              //PASTE IN CODE BELOW
              async function waitForCondition(i){return new Promise(t=>{let n=setInterval(()=>{i()&&(clearInterval(n),t())},100)})}async function waitForUI(){return waitForCondition(()=>"undefined"!=typeof ui)}async function waitForInstance(){return waitForCondition(()=>geofs.aircraft&&geofs.aircraft.instance)}async function waitForInstruments(){return waitForCondition(()=>instruments&&geofs.aircraft.instance.setup.instruments)}async function autospoilers(){await waitForUI(),await waitForInstance(),ui.notification.show("Note: spoiler arming key has now changed to Shift."),geofs.aircraft.instance.animationValue.spoilerArming=0;let i=()=>{geofs.aircraft.instance.groundContact||0!==controls.airbrakes.position||(geofs.aircraft.instance.animationValue.spoilerArming=0===geofs.aircraft.instance.animationValue.spoilerArming?1:0)},t=()=>{controls.airbrakes.target=0===controls.airbrakes.target?1:0,controls.setPartAnimationDelta(controls.airbrakes),geofs.aircraft.instance.animationValue.spoilerArming=0};controls.setters.setSpoilerArming={label:"Spoiler Arming",set:i},controls.setters.setAirbrakes={label:"Air Brakes",set:t},await waitForInstruments(),instruments.definitions.spoilers.overlay.overlays[3]={anchor:{x:0,y:0},size:{x:50,y:50},position:{x:0,y:0},animations:[{type:"show",value:"spoilerArming",when:[1]},{type:"hide",value:"spoilerArming",when:[0]}],class:"control-pad-dyn-label green-pad",text:"SPLR<br/>ARM",drawOrder:1},instruments.init(geofs.aircraft.instance.setup.instruments),$(document).keydown(function(i){16===i.which&&(console.log("Toggled Arming Spoilers"),controls.setters.setSpoilerArming.set())}),setInterval(function(){1===geofs.aircraft.instance.animationValue.spoilerArming&&geofs.aircraft.instance.groundContact&&(0===controls.airbrakes.position&&controls.setters.setAirbrakes.set(),geofs.aircraft.instance.animationValue.spoilerArming=0,geofs.autopilot.setSpeed(0),setTimeout(()=>{geofs.autopilot.turnOff()},200),controls.setters.fullReverse.set())},100),setInterval(function(){["3292","3054"].includes(geofs.aircraft.instance.id)&&void 0===geofs.aircraft.instance.setup.instruments.spoilers&&(geofs.aircraft.instance.setup.instruments.spoilers="",instruments.init(geofs.aircraft.instance.setup.instruments))},500)}autospoilers();
          })();
      };
      window.freq = function() {
          (function() {
              //PASTE IN CODE BELOW
              // @license MIT
const sleep=e=>new Promise(t=>setTimeout(t,e));if("/pages/map.php"===window.location.pathname){function e(e){var t=document.createElement("div");return t.innerHTML=e.trim(),t.firstChild}async function t(){var t=Date.now();multiplayer.lastRequestTime=t;var a={acid:geofs.userRecord.id,sid:geofs.userRecord.sessionId,id:multiplayer.myId,ac:1,co:[33.936952715460784,-118.38498159830658,45.20037842951751,141.2313037411972,-15,0],ve:[0,-.000000000000000014210854715202004,9835858350015769e-26,0,0,0],st:{gr:!0,as:0},ti:multiplayer.getServerTime(),m:multiplayer.chatMessage,ci:multiplayer.chatMessageId};multiplayer.chatMessage&&(multiplayer.chatMessage=""),multiplayer.lastRequest=await geofs.ajax.post(geofs.multiplayerHost+"/update",a,multiplayer.updateCallback,multiplayer.errorCallback),window.ATCADDON.chat=[...ATCADDON.chat,...multiplayer.lastRequest.chatMessages],multiplayer.lastRequest.chatMessages.forEach(t=>{let a=document.getElementById("atc-box");var i=decodeURIComponent(t.msg).match(/(?<=\[)(?:1[1-3]\d\.\d{1,3})(?=\])/);t.acid==geofs.userRecord.id?a.insertAdjacentElement("afterbegin",e(`<div class="chat-msg-self" style="color: #06F;"><b>${decodeURIComponent(t.cs)}:</b> ${decodeURIComponent(t.msg).replace(/(?:\[1[1-3]\d\.\d{1,3}\])/g,"")}<br></div>`)):i&&i[0]==window.ATCADDON.frequency?a.insertAdjacentElement("afterbegin",e(`<div class="chat-msg-self" style="color: #F70;"><b>${decodeURIComponent(t.cs)}:</b> ${decodeURIComponent(t.msg).replace(/(?:\[1[1-3]\d\.\d{1,3}\])/g,"")}<br></div>`)):898455!=t.acid&&!1==document.querySelector("#atc-only").checked&&a.insertAdjacentElement("afterbegin",e(`<div class="chat-msg-other"><b>${decodeURIComponent(t.cs)}:</b> ${decodeURIComponent(t.msg).replace(/(?:\[1[1-3]\d\.\d{1,3}\])/g,"")}<br></div>`))})}async function a(){for(;;)await t(),await sleep(1e3)}function i(){geofs.map.toggleATCMode();let e=document.createElement("div"),t=document.createElement("form"),i=document.createElement("input"),s=document.createElement("input"),r=document.createElement("div");e.setAttribute("id","atc-box"),e.setAttribute("style",`

            position: absolute;
            top: 170px;
            left: 10px;
            z-index: 1000;
            font-weight: normal;
            overflow: hidden;
            text-align: left;
            color: #DDD;
            font-family: Arial, sans-serif;
            font-size: 12px;
            padding: 0px 0px;
            padding-left: 5px;
            line-height: 29px;
            background-color: #0000007F;
            border: 1px solid rgb(169, 187, 223);
            width: 40%;
            height: 75%;
            box-shadow: 0px 5px 30px #666;

        `),t.setAttribute("id","atc-form"),i.setAttribute("id","atc-input"),i.setAttribute("style",`

            position: absolute;
            top: 130px;
            left: 10px;
            z-index: 1000;
            font-weight: bold;
            overflow: hidden;
            text-align: left;
            color: #DDD;
            font-family: Arial, sans-serif;
            font-size: 12px;
            padding: 0px 0px;
            padding-left: 5px;
            line-height: 29px;
            background-color: #0000007F;
            border: 1px solid rgb(169, 187, 223);
            width: 40%;
            height: 30px;
            box-shadow: 0px 5px 30px #666;

        `),i.setAttribute("placeholder","Send Message..."),s.setAttribute("id","atc-frequency"),s.setAttribute("style",`

            position: absolute;
            top: 90px;
            left: 50px;
            z-index: 1000;
            font-weight: bold;
            overflow: hidden;
            text-align: left;
            color: #DDD;
            font-family: Arial, sans-serif;
            font-size: 12px;
            padding: 0px 0px;
            padding-left: 5px;
            line-height: 29px;
            background-color: #0000007F;
            border: 1px solid rgb(169, 187, 223);
            width: 15%;
            height: 30px;
            box-shadow: 0px 5px 30px #666;

        `),s.setAttribute("placeholder","Frequency"),s.setAttribute("type","number"),s.setAttribute("min","118"),s.setAttribute("max","137"),s.setAttribute("step","0.001"),r.setAttribute("style",`

            position: absolute;
            top: 90px;
            left: 10px;
            z-index: 1000;
            font-weight: bold;
            overflow: hidden;
            text-align: left;
            color: #DDD;
            font-family: Arial, sans-serif;
            font-size: 12px;
            padding: 0px 0px;
            line-height: 29px;
            background-color: #0000007F;
            border: 1px solid rgb(169, 187, 223);
            width: 30px;
            height: 30px;
            box-shadow: 0px 5px 30px #666;

        `),r.innerHTML='<input id="atc-only" type="checkbox" style="width:75%;height:75%;position:relative;">',t.appendChild(i),document.body.appendChild(e),document.body.appendChild(t),document.body.appendChild(s),document.body.appendChild(r),t.addEventListener("submit",e=>{e.preventDefault();let t=document.getElementById("atc-input"),a=document.getElementById("atc-frequency");window.ATCADDON.frequency=a.value,window.ATCADDON.frequency&&/(?:1[1-3]\d\.\d{1,3})/.test(window.ATCADDON.frequency)?multiplayer.setChatMessage(t.value+` [${window.ATCADDON.frequency}]`):multiplayer.setChatMessage(t.value),t.value=""}),a()}window.ATCADDON={},window.ATCADDON.chat=[],i()}else if("/geofs.php"===window.location.pathname){let s=document.querySelector(".geofs-ui-top"),r=document.createElement("div");r.setAttribute("class","atcaddon-frequency"),r.setAttribute("style",`

            opacity: 0.5;
            margin-top: 5px;
            white-space: nowrap;
            display: flex;

        `),r.innerHTML=`

            <input id="Frequency" type="number" min="118" max="137" step="0.001" style="left: 10px; top: 0px; border: 1px solid #888;background-color: #000;box-shadow: 0px 0px 5px #000;cursor: pointer !important;width: 90px;height: 25px;border-radius: 15px;outline: none;line-height: 27px;white-space: nowrap; color: white; padding: 5px, 0px;" placeholder="Input Frequency">

        `,s.appendChild(r);let n=document.createElement("style");n.innerHTML=`
            .geofs-chat-message .label.atc {
                color: rgb(255,128,0);
                cursor: auto;
            }
        `,document.head.appendChild(n),(async()=>{await sleep(5e3),ui.chat.publish=function(e){var t=decodeURIComponent(e.msg),a=t.match(/(?<=\[)(?:1[1-3]\d\.\d{1,3})(?=\])/),i=a&&a[0]==`${document.querySelector("#Frequency").value}`;if(geofs.preferences.chat&&(i||!document.querySelector("#Frequency").value)){ui.chat.$container=ui.chat.$container||$(".geofs-chat-messages");var s="";i&&(s="atc"),t=t.replace(/(?:\[1[1-3]\d\.\d{1,3}\])/g,""),e.acid==geofs.userRecord.id&&(s="myself"),ui.chat.$container.prepend('<div class="geofs-chat-message '+e.cls+'"><b class="label '+s+'" data-player="'+e.uid+'" acid="'+e.acid+'" callsign="'+e.cs+'">'+e.cs+":</b> "+t+"</div>"),ui.chat.$container.find(".geofs-chat-message").each(function(e,t){$(t).css("opacity",(ui.chat.maxNumberMessages-e)/ui.chat.maxNumberMessages)}).eq(ui.chat.maxNumberMessages).remove()}},multiplayer.setChatMessage=function(e){let t=document.querySelector("#Frequency").value;t&&/(?:1[1-3]\d\.\d{1,3})/.test(t)?multiplayer.chatMessage=e+` [${t}]`:multiplayer.chatMessage=e}})()}
          })();
      };
      window.fpv = function() {
          (function() {
              //PASTE IN CODE BELOW
             function cF(e,a,i){return{x:e,y:a,z:i}}function waitForEntities(){try{if(geofs.api){main();return}}catch(e){console.log("Error in waitForEntities:",e)}setTimeout(waitForEntities,1e3)}function main(){window.y=geofs.api.viewer.entities.add({position:Cesium.Cartesian3.fromDegrees(geofs.camera.lla[1],geofs.camera.lla[0],geofs.animation.values.groundElevationFeet/3.2808399),billboard:{image:"https://tylerbmusic.github.io/GPWS-files_geofs/FPV.png",scale:.03*(1/geofs.api.renderingSettings.resolutionScale)}}),geofs.api.renderingSettings.resolutionScale<=.6&&(window.y.billboard.image="https://tylerbmusic.github.io/GPWS-files_geofs/FPV_Lowres.png"),window.lastLoc=Cesium.Cartesian3.fromDegrees(geofs.camera.lla[1],geofs.camera.lla[0],geofs.camera.lla[2]),setInterval(function e(){if(geofs.animation.values&&!geofs.isPaused()){window.currLoc&&(window.lastLoc=window.currLoc),window.currLoc=Cesium.Cartesian3.fromDegrees(geofs.camera.lla[1],geofs.camera.lla[0],geofs.camera.lla[2]),window.deltaLoc=[window.currLoc.x-window.lastLoc.x,window.currLoc.y-window.lastLoc.y,window.currLoc.z-window.lastLoc.z];var a,i=void 0!==geofs.animation.values.altitude&&void 0!==geofs.animation.values.groundElevationFeet?Math.round(geofs.animation.values.altitude-geofs.animation.values.groundElevationFeet+3.2808399*geofs.aircraft.instance.collisionPoints[geofs.aircraft.instance.collisionPoints.length-2].worldPosition[2]):"N/A";a=geofs.animation.getValue("NAV1Direction")&&600!==geofs.animation.getValue("NAV1Distance")?"to"===geofs.animation.getValue("NAV1Direction")?(Math.atan(.3048*i/(geofs.animation.getValue("NAV1Distance")+600))*RAD_TO_DEGREES).toFixed(1):(Math.atan(.3048*i/Math.abs(geofs.animation.getValue("NAV1Distance")-600))*RAD_TO_DEGREES).toFixed(1):"N/A",geofs.aircraft.instance.groundContact||window.deltaLoc[0]+window.deltaLoc[1]+window.deltaLoc[2]==0||(window.y.position=cF(window.currLoc.x+window.howFar*window.deltaLoc[0],window.currLoc.y+window.howFar*window.deltaLoc[1],window.currLoc.z+window.howFar*window.deltaLoc[2]));var t=document.getElementById("flightDataDisplay0");t||((t=document.createElement("div")).id="flightDataDisplay0",t.style.position="fixed",t.style.bottom="0",t.style.right="25px",t.style.height="36px",t.style.minWidth="64px",t.style.padding="0 16px",t.style.display="inline-block",t.style.fontFamily='"Roboto", "Helvetica", "Arial", sans-serif',t.style.fontSize="14px",t.style.textTransform="uppercase",t.style.overflow="hidden",t.style.willChange="box-shadow",t.style.transition="box-shadow .2s cubic-bezier(.4,0,1,1), background-color .2s cubic-bezier(.4,0,.2,1), color .2s cubic-bezier(.4,0,.2,1)",t.style.textAlign="center",t.style.lineHeight="36px",t.style.verticalAlign="middle",t.style.zIndex="9999",document.body.appendChild(t)),t.innerHTML=`
                <span style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;">Glideslope ${a}</span>
            `}},geofs.debug.fps?1/Number(geofs.debug.fps)+5:100),document.addEventListener("keydown",function(e){"Insert"===e.key&&(window.y.show=!window.y.show)})}window.lastLoc,window.onload=setTimeout(waitForEntities,1e4),window.howFar=15;
          })();
      };
      window.failures = function() {
          (function() {
              //PASTE IN CODE BELOW
              class Failure{constructor(){this.aId=window.geofs.aircraft.instance.id,this.enabled=!1,this.failures=[],this.fails={landingGear:{front:!1,left:!1,right:!1},fuelLeak:!1,flightCtrl:{ailerons:!1,elevators:!1,rudder:!1},electrical:!1,structural:!1,hydraulic:{flaps:!1,brakes:!1,spoilers:!1},pitotStatic:!1,pressurization:!1,engines:[]};for(var e=0;e<window.geofs.aircraft.instance.engines.length;e++)this.fails.engines.push({i:!1});this.chances={landingGear:{front:0,left:0,right:0},fuelLeak:0,flightCtrl:{ailerons:0,elevators:0,rudder:0},electrical:0,structural:0,hydraulic:{flaps:0,brakes:0,spoilers:0},pitotStatic:0,pressurization:0,engines:[]};for(var t=0;t<window.geofs.aircraft.instance.engines.length;t++)this.chances.engines.push({v:0})}fail(e){for(var t=window.geofs.aircraft.instance.engines.length,i=0;i<t;i++)e=="engine"+i&&(alert("Engine "+(i+1)+" failed!"),window.geofs.aircraft.instance.engines[i].thrust=0,new window.geofs.fx.ParticleEmitter({off:0,anchor:window.geofs.aircraft.instance.engines[0].points.contrailAnchor||{worldPosition:window.geofs.aircraft.instance.engines[0].object3d.worldPosition},duration:1e10,rate:.03,life:1e4,easing:"easeOutQuart",startScale:.01,endScale:.2,randomizeStartScale:.01,randomizeEndScale:.15,startOpacity:1,endOpacity:.2,startRotation:"random",texture:"whitesmoke"}),setInterval(()=>{window.geofs.fx.setParticlesColor(new window.Cesium.Color(.1,.1,.1,1))},20));if(!e.includes("engine"))switch(e){case"fuelLeak":this.fails.fuelLeak||(alert("Fuel leak! 2 minutes of fuel remaining"),this.fails.fuelLeak=!0,setTimeout(()=>{setInterval(()=>{window.geofs.aircraft.instance.stopEngine()},1e3)},12e4));break;case"gearFront":if(!this.fails.landingGear.front){alert("Nose gear failure"),this.fails.landingGear.front=!0;var a=2;for(i=0;i<window.geofs.aircraft.instance.suspensions.length;i++)(window.geofs.aircraft.instance.suspensions[i].name.includes("front")||window.geofs.aircraft.instance.suspensions[i].name.includes("nose")||window.geofs.aircraft.instance.suspensions[i].name.includes("tail"))&&(a=i);this.failures.push(setInterval(()=>{window.geofs.aircraft.instance.suspensions[a].collisionPoints[0][2]=30}),1e3)}break;case"gearLeft":if(!this.fails.landingGear.left){alert("Left gear failure"),this.fails.landingGear.left=!0;var n=0;for(i=0;i<window.geofs.aircraft.instance.suspensions.length;i++)(window.geofs.aircraft.instance.suspensions[i].name.includes("left")||window.geofs.aircraft.instance.suspensions[i].name.includes("l"))&&(n=i);this.failures.push(setInterval(()=>{window.geofs.aircraft.instance.suspensions[n].collisionPoints[0][2]=30}),1e3)}break;case"gearRight":if(alert("Right gear failure"),!this.fails.landingGear.right){this.fails.landingGear.right=!0;var l=1;for(i=0;i<window.geofs.aircraft.instance.suspensions.length;i++)(window.geofs.aircraft.instance.suspensions[i].name.includes("right")||window.geofs.aircraft.instance.suspensions[i].name.includes("r_g"))&&(l=i);this.failures.push(setInterval(()=>{window.geofs.aircraft.instance.suspensions[l].collisionPoints[0][2]=30}),1e3)}break;case"ailerons":alert("Flight control failure (ailerons)"),this.fails.flightCtrl.ailerons||(this.fails.flightCtrl.ailerons=!0,this.failures.push(setInterval(()=>{for(var e in window.geofs.aircraft.instance.airfoils)window.geofs.aircraft.instance.airfoils[e].name.toLowerCase().includes("aileron")&&(window.geofs.aircraft.instance.airfoils[e].object3d._scale=[0,0,0])}),1e3));break;case"elevators":alert("Flight control failure (elevators)"),this.fails.flightCtrl.elevators||(this.fails.flightCtrl.elevators=!0,this.failures.push(setInterval(()=>{for(var e in window.geofs.aircraft.instance.airfoils)window.geofs.aircraft.instance.airfoils[e].name.toLowerCase().includes("elevator")&&(window.geofs.aircraft.instance.airfoils[e].object3d._scale=[0,0,0])}),1e3));break;case"rudder":alert("Flight control failure (rudder)"),this.fails.flightCtrl.rudder||(this.fails.flightCtrl.rudder=!0,this.failures.push(setInterval(()=>{for(var e in window.geofs.aircraft.instance.airfoils)window.geofs.aircraft.instance.airfoils[e].name.toLowerCase().includes("rudder")&&(window.geofs.aircraft.instance.airfoils[e].object3d._scale=[0,0,0])}),1e3));break;case"electrical":this.fails.electrical||(alert("Electrical failure"),this.fails.electrical=!0,this.failures.push(setInterval(()=>{for(var e=1;e<=5;e++)window.geofs.aircraft.instance.cockpitSetup.parts[e].object3d._scale=[0,0,0];window.geofs.autopilot.turnOff(),window.instruments.hide()}),1e3));break;case"structural":this.fails.structural||(alert("Significant structural damage detected"),console.log("Boeing, am I right?"),this.fails.structural=!0,this.failures.push(setInterval(()=>{window.weather.definition.turbulences=3}),1e3));break;case"flaps":this.fails.hydraulic.flaps||(alert("Hydraulic failure (flaps)"),this.fails.hydraulic.flaps=!0,this.failures.push(setInterval(()=>{window.controls.flaps.target=Math.floor(.6822525475345469*(2*window.geofs.animation.values.flapsSteps)),window.controls.flaps.delta=20}),1e3));break;case"brakes":this.fails.hydraulic.brakes||(alert("Hydraulic failure (brakes)"),this.fails.hydraulic.brakes=!0,this.failures.push(setInterval(()=>{window.controls.brakes=0}),500));break;case"spoilers":this.fails.hydraulic.spoilers||(alert("Hydraulic failure (spoilers)"),this.fails.hydraulic.spoilers=!0,this.failures.push(setInterval(()=>{window.controls.spoilers.target=.2,window.controls.spoilers.delta=20}),1e3));break;case"pressurization":this.fails.pressurization||(alert("Cabin depressurization! Get at or below 9,000 ft MSL!"),this.fails.pressurization=!0,this.failures.push(setInterval(()=>{window.geofs.animation.values.altitude>9e3?window.weather.definition.turbulences=(window.geofs.animation.values.altitude-9e3)/5200:window.weather.definition.turbulences=0}),1e3))}}tick(){if(this.enabled){for(var e in console.log("tick"),this.chances.landingGear)Math.random()<this.chances.landingGear[e]&&this.fail("gear"+(e[0].toUpperCase()+e.substr(1,e.length)));for(var t in this.chances)if("number"==typeof this.chances[t])Math.random()<this.chances[e]&&this.fail(t);else if("landingGear"!==t)for(var i in this.chances[t])Math.random()<this.chances[t][i]&&this.fail(i);setTimeout(()=>{this.tick()},6e4)}}reset(){for(var e in this.failures)clearInterval(this.failures[e]);this.enabled=!1}}function waitForEntities(){try{if(!1==window.geofs.cautiousWithTerrain){window.mainFailureFunction();return}}catch(e){console.log("Error in waitForEntities:",e)}setTimeout(()=>{waitForEntities()},1e3)}window.openFailuresMenu=function(){if(window.failuresMenu){if(window.failuresMenu.hidden=!window.failuresMenu.hidden,window.geofs.aircraft.instance.id!==window.aId)for(window.failure.reset(),window.failure=new Failure,e=`
        <div style="position: fixed; width: 640px; height: 10px; background: lightgray; cursor: move;" id="dragPart"></div>
        <p style="cursor: pointer;right: 0px;position: absolute;background: gray;height: fit-content;" onclick="window.failuresMenu.hidden=true;">X</p>
    <p>Note: Some failures may require a manual refresh of the page.</p>
    <button id="enBtn" onclick="(function(){window.failure.enabled=true; window.failure.tick(); document.getElementById('enBtn').hidden = true;})();">Enable</button>
    <button onclick="window.failure.reset()">RESET ALL</button>
        <h1>Landing Gear</h1>
        <h2>Front</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" value="0" min="0" max="1" step="0.01" id="slide1" onchange="[document.getElementById('input1').value, window.failure.chances.landingGear.gearFront]=[document.getElementById('slide1').value, document.getElementById('slide1').value]" draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="input1" style="
    width: 40px;
">
    <button onclick="failure.fail('gearFront')">FAIL</button>
        <br>
        <h2>Left</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideGearL" onchange="[document.getElementById('inputGearL').value, window.failure.chances.landingGear.left]=[document.getElementById('slideGearL').valueAsNumber, document.getElementById('slideGearL').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="inputGearL" style="
    width: 40px;
">

        <button onclick="failure.fail('gearLeft')">FAIL</button>
    <br>
        <h2>Right</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
            <input type="range" min="0" max="1" step="0.01" id="slideGearR" onchange="[document.getElementById('inputGearR').value, window.failure.chances.landingGear.right]=[document.getElementById('slideGearR').valueAsNumber, document.getElementById('slideGearR').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="inputGearR" style="
    width: 40px;
">
    <button onclick="failure.fail('gearRight')">FAIL</button>
    <br>
        <h1>Fuel Leak</h1>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideFuelLeak" onchange="[document.getElementById('inputFuelLeak').value, window.failure.chances.fuelLeak]=[document.getElementById('slideFuelLeak').valueAsNumber, document.getElementById('slideFuelLeak').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="inputFuelLeak" style="
    width: 40px;
">



        <button onclick="failure.fail('fuelLeak')">FAIL</button>
    <br>
    <h1>Flight Control</h1>
    <h2>Ailerons</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideFlightCtrl" onchange="[document.getElementById('inputFlightCtrl').value, window.failure.chances.flightCtrl.ailerons]=[document.getElementById('slideFlightCtrl').valueAsNumber, document.getElementById('slideFlightCtrl').valueAsNumber]" draggable="false" style="vertical-align: bottom;">
    <input disabled="true;" id="inputFlightCtrl" style="
    width: 40px;
">
        <button onclick="failure.fail('ailerons')">FAIL</button><br>
            <h2>Elevators</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideElevator" onchange="[document.getElementById('inputElevator').value, window.failure.chances.flightCtrl.elevator]=[document.getElementById('slideElevator').valueAsNumber, document.getElementById('slideElevator').valueAsNumber]" draggable="false" style="vertical-align: bottom;">
    <input disabled="true;" id="inputElevator" style="
    width: 40px;
">
        <button onclick="failure.fail('elevators')">FAIL</button><br>
        <h2>Rudder</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideRudder" onchange="[document.getElementById('inputRudder').value, window.failure.chances.flightCtrl.rudder]=[document.getElementById('slideRudder').valueAsNumber, document.getElementById('slideRudder').valueAsNumber]" draggable="false" style="vertical-align: bottom;">
    <input disabled="true;" id="inputRudder" style="
    width: 40px;
">
        <button onclick="failure.fail('rudder')">FAIL</button><br>
    <h1>Electrical</h1>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideElectrical" onchange="[document.getElementById('inputElectrical').value, window.failure.chances.electrical]=[document.getElementById('slideElectrical').valueAsNumber, document.getElementById('slideElectrical').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">

        <input disabled="true;" id="inputElectrical" style="
    width: 40px;
">
        <button onclick="failure.fail('electrical')">FAIL</button>

    <br>

    <h1>Structural</h1>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideStructural" onchange="[document.getElementById('inputStructural').value, window.failure.chances.structural]=[document.getElementById('slideStructural').valueAsNumber, document.getElementById('slideStructural').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">

        <input disabled="true;" id="inputStructural" style="
    width: 40px;
">
        <button onclick="failure.fail('structural')">FAIL</button>

    <br>
    <h1>Hydraulic</h1>
<h2>Flaps</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideFlaps" onchange="[document.getElementById('inputFlaps').value, window.failure.chances.hydraulic.flaps]=[document.getElementById('slideFlaps').valueAsNumber, document.getElementById('slideFlaps').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">

        <input disabled="true;" id="inputFlaps" style="
    width: 40px;
">
        <button onclick="failure.fail('flaps')">FAIL</button>
<h2>Brakes</h2>
    <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideBrakes" onchange="[document.getElementById('inputBrakes').value, window.failure.chances.hydraulic.brakes]=[document.getElementById('slideBrakes').valueAsNumber, document.getElementById('slideBrakes').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">

        <input disabled="true;" id="inputBrakes" style="
    width: 40px;
">
        <button onclick="failure.fail('brakes')">FAIL</button>
<h2>Spoilers</h2>
    <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideSpoilers" onchange="[document.getElementById('inputSpoilers').value, window.failure.chances.hydraulic.spoilers]=[document.getElementById('slideSpoilers').valueAsNumber, document.getElementById('slideSpoilers').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="inputSpoilers" style="
    width: 40px;
">
<button onclick="failure.fail('spoilers')">FAIL</button>
    <h1>Cabin Pressurization</h1>
    <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slidePressurization" onchange="[document.getElementById('inputPressurization').value, window.failure.chances.pressurization]=[document.getElementById('slidePressurization').valueAsNumber, document.getElementById('slidePressurization').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="inputPressurization" style="
    width: 40px;
">
        <button onclick="failure.fail('pressurization')">FAIL</button>
        <h1>Engines</h1>
        `,t=0;t<window.geofs.aircraft.instance.engines.length;t++)e+=`
            <h2>Engine ${t+1}</h2>
    <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideEngine${t}" onchange="document.getElementById('inputEngine${t}').value=document.getElementById('slideEngine${t}').valueAsNumber; window.failure.chances.engines[i] = document.getElementById('slideEngine${t}').valueAsNumber"; draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="inputEngine${t}" style="
    width: 40px;
">
        <button onclick="failure.fail('engine${t}')">FAIL</button>
            `,window.failuresMenu.innerHTML=e}else{window.failure=new Failure,window.failuresMenu=document.createElement("div"),window.failuresMenu.style.position="fixed",window.failuresMenu.style.width="640px",window.failuresMenu.style.height="480px",window.failuresMenu.style.background="white",window.failuresMenu.style.display="block",window.failuresMenu.style.overflow="scroll",window.failuresMenu.style.zIndex="10000",window.failuresMenu.id="failMenu",window.failuresMenu.className="geofs-ui-left",document.body.appendChild(window.failuresMenu);for(var e=`
        <div style="position: fixed; width: 640px; height: 10px; background: lightgray; cursor: move;" id="dragPart"></div>
        <p style="cursor: pointer;right: 0px;position: absolute;background: gray;height: fit-content;" onclick="window.failuresMenu.hidden=true;">X</p>
    <p>Note: Some failures may require a manual refresh of the page.</p>
    <button id="enBtn" onclick="(function(){window.failure.enabled=true; window.failure.tick(); document.getElementById('enBtn').hidden = true;})();">Enable</button>
    <button onclick="window.failure.reset()">RESET ALL</button>
        <h1>Landing Gear</h1>
        <h2>Front</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" value="0" min="0" max="1" step="0.01" id="slide1" onchange="[document.getElementById('input1').value, window.failure.chances.landingGear.gearFront]=[document.getElementById('slide1').value, document.getElementById('slide1').value]" draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="input1" style="
    width: 40px;
">
    <button onclick="failure.fail('gearFront')">FAIL</button>
        <br>
        <h2>Left</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideGearL" onchange="[document.getElementById('inputGearL').value, window.failure.chances.landingGear.left]=[document.getElementById('slideGearL').valueAsNumber, document.getElementById('slideGearL').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="inputGearL" style="
    width: 40px;
">

        <button onclick="failure.fail('gearLeft')">FAIL</button>
    <br>
        <h2>Right</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
            <input type="range" min="0" max="1" step="0.01" id="slideGearR" onchange="[document.getElementById('inputGearR').value, window.failure.chances.landingGear.right]=[document.getElementById('slideGearR').valueAsNumber, document.getElementById('slideGearR').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="inputGearR" style="
    width: 40px;
">
    <button onclick="failure.fail('gearRight')">FAIL</button>
    <br>
        <h1>Fuel Leak</h1>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideFuelLeak" onchange="[document.getElementById('inputFuelLeak').value, window.failure.chances.fuelLeak]=[document.getElementById('slideFuelLeak').valueAsNumber, document.getElementById('slideFuelLeak').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="inputFuelLeak" style="
    width: 40px;
">



        <button onclick="failure.fail('fuelLeak')">FAIL</button>
    <br>
    <h1>Flight Control</h1>
    <h2>Ailerons</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideFlightCtrl" onchange="[document.getElementById('inputFlightCtrl').value, window.failure.chances.flightCtrl.ailerons]=[document.getElementById('slideFlightCtrl').valueAsNumber, document.getElementById('slideFlightCtrl').valueAsNumber]" draggable="false" style="vertical-align: bottom;">
    <input disabled="true;" id="inputFlightCtrl" style="
    width: 40px;
">
        <button onclick="failure.fail('ailerons')">FAIL</button><br>
            <h2>Elevators</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideElevator" onchange="[document.getElementById('inputElevator').value, window.failure.chances.flightCtrl.elevator]=[document.getElementById('slideElevator').valueAsNumber, document.getElementById('slideElevator').valueAsNumber]" draggable="false" style="vertical-align: bottom;">
    <input disabled="true;" id="inputElevator" style="
    width: 40px;
">
        <button onclick="failure.fail('elevators')">FAIL</button><br>
        <h2>Rudder</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideRudder" onchange="[document.getElementById('inputRudder').value, window.failure.chances.flightCtrl.rudder]=[document.getElementById('slideRudder').valueAsNumber, document.getElementById('slideRudder').valueAsNumber]" draggable="false" style="vertical-align: bottom;">
    <input disabled="true;" id="inputRudder" style="
    width: 40px;
">
        <button onclick="failure.fail('rudder')">FAIL</button><br>
    <h1>Electrical</h1>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideElectrical" onchange="[document.getElementById('inputElectrical').value, window.failure.chances.electrical]=[document.getElementById('slideElectrical').valueAsNumber, document.getElementById('slideElectrical').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">

        <input disabled="true;" id="inputElectrical" style="
    width: 40px;
">
        <button onclick="failure.fail('electrical')">FAIL</button>

    <br>

    <h1>Structural</h1>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideStructural" onchange="[document.getElementById('inputStructural').value, window.failure.chances.structural]=[document.getElementById('slideStructural').valueAsNumber, document.getElementById('slideStructural').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">

        <input disabled="true;" id="inputStructural" style="
    width: 40px;
">
        <button onclick="failure.fail('structural')">FAIL</button>

    <br>
    <h1>Hydraulic</h1>
<h2>Flaps</h2>
        <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideFlaps" onchange="[document.getElementById('inputFlaps').value, window.failure.chances.hydraulic.flaps]=[document.getElementById('slideFlaps').valueAsNumber, document.getElementById('slideFlaps').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">

        <input disabled="true;" id="inputFlaps" style="
    width: 40px;
">
        <button onclick="failure.fail('flaps')">FAIL</button>
<h2>Brakes</h2>
    <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideBrakes" onchange="[document.getElementById('inputBrakes').value, window.failure.chances.hydraulic.brakes]=[document.getElementById('slideBrakes').valueAsNumber, document.getElementById('slideBrakes').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">

        <input disabled="true;" id="inputBrakes" style="
    width: 40px;
">
        <button onclick="failure.fail('brakes')">FAIL</button>
<h2>Spoilers</h2>
    <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideSpoilers" onchange="[document.getElementById('inputSpoilers').value, window.failure.chances.hydraulic.spoilers]=[document.getElementById('slideSpoilers').valueAsNumber, document.getElementById('slideSpoilers').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="inputSpoilers" style="
    width: 40px;
">
<button onclick="failure.fail('spoilers')">FAIL</button>
    <h1>Cabin Pressurization</h1>
    <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slidePressurization" onchange="[document.getElementById('inputPressurization').value, window.failure.chances.pressurization]=[document.getElementById('slidePressurization').valueAsNumber, document.getElementById('slidePressurization').valueAsNumber]" draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="inputPressurization" style="
    width: 40px;
">
        <button onclick="failure.fail('pressurization')">FAIL</button>
        <h1>Engines</h1>
        `,t=0;t<window.geofs.aircraft.instance.engines.length;t++){e+=`
            <h2>Engine ${t+1}</h2>
    <span style="
    font-size: large;
    vertical-align: top;
">Chance per minute: </span>
        <input type="range" min="0" max="1" step="0.01" id="slideEngine${t}" onchange="document.getElementById('inputEngine${t}').value=document.getElementById('slideEngine${t}').valueAsNumber; window.failure.chances.engines[i] = document.getElementById('slideEngine${t}').valueAsNumber"; draggable="false" style="
    vertical-align: bottom;
">
        <input disabled="true;" id="inputEngine${t}" style="
    width: 40px;
">
        <button onclick="failure.fail('engine${t}')">FAIL</button>
            `,window.failuresMenu.innerHTML=e;let i=document.getElementById("failMenu"),a=document.getElementById("dragPart");a.addEventListener("mousedown",function(e){let t=e.clientX-i.getBoundingClientRect().left,a=e.clientY-i.getBoundingClientRect().top;function n(e){i.style.left=`${e.clientX-t}px`,i.style.top=`${e.clientY-a}px`}function l(){document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",l)}document.addEventListener("mousemove",n),document.addEventListener("mouseup",l)})}}},window.mainFailureFunction=function(){"use strict";window.failBtn=document.createElement("div"),window.failBtn.style.position="fixed",window.failBtn.style.right="2%",window.failBtn.style.padding="10px",window.failBtn.style.top="30%",window.failBtn.style.border="transparent",window.failBtn.style.background="rgb(0,0,0)",window.failBtn.style.color="white",window.failBtn.style.fontWeight="600",window.failBtn.style.cursor="pointer",window.failBtn.style.zIndex="10000",document.body.appendChild(window.failBtn),window.failBtn.innerHTML='<button style="position: inherit; right: inherit; padding: inherit; top: inherit; border: inherit; background: inherit; color: inherit; font-weight: inherit; cursor: inherit;" onclick="window.openFailuresMenu()">FAILURES</button>',console.log("Failures loaded.")},waitForEntities();
          })();
      };
       window.fuel = function() {
          (function() {
              //PASTE IN CODE BELOW
              function runFuelSystem(){var e,t,n;let r,l,i={fuel:l=.75*geofs.aircraft.instance.definition.mass,initialFuel:l},{fuelBar:a,fuelBarContainer:o}=function e(){let t=document.createElement("div");t.style.position="absolute",t.style.bottom="8px",t.style.right="170px",t.style.width="100px",t.style.height="17px",t.style.border="1px solid black",t.style.borderRadius="5px",t.style.backgroundColor="black",t.style.zIndex="1000";let n=document.createElement("div");return n.style.height="100%",n.style.width="100%",n.style.backgroundColor="green",n.style.borderRadius="5px",t.appendChild(n),document.querySelector(".geofs-ui-bottom").appendChild(t),{fuelBar:n,fuelBarContainer:t}}(),s=function e(t){let n=document.createElement("button");return n.textContent="Refuel",n.style.position="absolute",n.style.bottom="5px",n.style.right="280px",n.style.padding="4px 20px",n.style.fontSize="14px",n.style.backgroundColor="yellow",n.style.border="1px solid black",n.style.borderRadius="5px",n.style.zIndex="1000",document.querySelector(".geofs-ui-bottom").appendChild(n),n.addEventListener("click",()=>{t.fuel=t.initialFuel,console.log("Plane refueled.")}),n}(i);e=i,t=a,n=s,r=setInterval(()=>{if(geofs.pause)return;let r=geofs.aircraft.instance.engines.reduce((e,t)=>e+(t.thrust||0),0),l=geofs.aircraft.instance.engines[0]?.afterBurnerThrust!==void 0,i=l&&Math.abs(geofs.animation.values.smoothThrottle)>.9,a=l?geofs.aircraft.instance.engines.reduce((e,t)=>e+(t.afterBurnerThrust||0),0):0,o=i?a:Math.abs(geofs.animation.values.smoothThrottle)*r,s=i?a/140:r/140,u=geofs.aircraft.instance.engine.on?s+o/r*(3*s-s):0;e.fuel-=u*(1/3600),e.fuel<0&&(e.fuel=0);let d=e.fuel/e.initialFuel*100;t.style.width=`${d}%`,t.style.backgroundColor=d>50?"green":d>25?"orange":"red",0===e.fuel&&(setInterval(()=>{0===e.fuel&&(controls.throttle=0,geofs.aircraft.instance.stopEngine())},10),console.log("Fuel depleted! Engines have been turned off."));let c=geofs.aircraft.instance.groundSpeed,$=geofs.aircraft.instance.groundContact,f=geofs.aircraft.instance.engine.on;n.style.display=c<1&&$&&!f?"block":"none",console.log(`Fuel Burn Rate per Hour: ${u.toFixed(6)}`),console.log(`Fuel Burned This Second: ${(u/3600).toFixed(6)}`),console.log(`Fuel Remaining: ${e.fuel.toFixed(2)}`)},1e3);let u=geofs.aircraft.instance.aircraftRecord.id;setInterval(()=>{geofs.aircraft.instance.aircraftRecord.id!==u&&(o.remove(),s.remove(),u=geofs.aircraft.instance.aircraftRecord.id,clearInterval(r),runFuelSystem())},1e3)}runFuelSystem();
          })();
      };
       window.gpws = function() {
          (function() {
              //PASTE IN CODE BELOW
              setTimeout(function(){"use strict";function i(i,e,t){if(i>=100){if(i<=e+10&&i>=e-10)return!0}else if(i>=10){if(i<e+4&&i>e-4)return!0}else if(i<=e+1&&i>=e-1)return!0;return!1}window.soundsToggleKey="w",window.soundsOn=!0,window.a2500=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/2500.wav"),window.a2000=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/2000.wav"),window.a1000=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/1000.wav"),window.a500=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/500.wav"),window.a400=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/400.wav"),window.a300=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/300.wav"),window.a200=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/200.wav"),window.a100=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/100.wav"),window.a50=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/50.wav"),window.a40=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/40.wav"),window.a30=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/30.wav"),window.a20=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/20.wav"),window.a10=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/10.wav"),window.aRetard=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/retard.wav"),window.a5=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/5.wav"),window.stall=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/stall.wav"),window.glideSlope=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/glideslope.wav"),window.tooLowFlaps=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/too-low_flaps.wav"),window.tooLowGear=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/too-low_gear.wav"),window.apDisconnect=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/ap-disconnect.wav"),window.minimumBaro=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/minimum.wav"),window.dontSink=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/dont-sink.wav"),window.masterA=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/masterAlarm.wav"),window.bankAngle=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/bank-angle.wav"),window.overspeed=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/overspeed.wav"),window.justPaused=!1,window.masterA.loop=!0,window.bankAngle.loop=!0,window.overspeed.loop=!0,window.iminimums=!1,window.i2500=!1,window.i2000=!1,window.i1000=!1,window.i500=!1,window.i400=!1,window.i300=!1,window.i200=!1,window.i100=!1,window.i50=!1,window.i40=!1,window.i30=!1,window.i20=!1,window.i10=!1,window.i7=!1,window.i5=!1,window.gpwsRefreshRate=100,window.willTheDoorFallOff=!1,window.didAWheelFall=!1,window.wasAPOn=!1;var e=document.getElementById("flightDataDisplay1");if(!e){var t=document.getElementsByClassName("geofs-ui-bottom")[0];(e=document.createElement("div")).id="flightDataDisplay1",e.classList="mdl-button",t.appendChild(e)}e.innerHTML=`
                <input style="background: 0 0; border: none; border-radius: 2px; color: #000; display: inline-block; padding: 0 8px;" placeholder="Minimums (Baro)" id="minimums">
            `,setInterval(function e(){if(void 0===geofs.animation.values||geofs.isPaused())geofs.isPaused()&&!window.justPaused&&(window.a2500.pause(),window.a2000.pause(),window.a1000.pause(),window.a500.pause(),window.a400.pause(),window.a300.pause(),window.a200.pause(),window.a100.pause(),window.a50.pause(),window.a40.pause(),window.a30.pause(),window.a20.pause(),window.a10.pause(),window.aRetard.pause(),window.a5.pause(),window.stall.pause(),window.glideSlope.pause(),window.tooLowFlaps.pause(),window.tooLowGear.pause(),window.apDisconnect.pause(),window.minimumBaro.pause(),window.dontSink.pause(),window.masterA.pause(),window.bankAngle.pause(),window.overspeed.pause(),window.justPaused=!0);else{window.justPaused&&(window.justPaused=!1),window.willTheDoorFallOff=geofs.aircraft.instance.aircraftRecord.name.includes("Boeing"),window.isAsOldAsYourMom=geofs.aircraft.instance.aircraftRecord.name.includes("757")||geofs.aircraft.instance.aircraftRecord.name.includes("767"),window.isAsOldAsYourMom&&!window.wasAsOldAsYourMom?(window.a2500=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b2500.wav"),window.a2000=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b2000.wav"),window.a1000=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/o1000.wav"),window.a500=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/o500.wav"),window.a400=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/o400.wav"),window.a300=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/o300.wav"),window.a200=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/o200.wav"),window.a100=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/o100.wav"),window.a50=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/o50.wav"),window.a40=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/o40.wav"),window.a30=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/o30.wav"),window.a20=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/o20.wav"),window.a10=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/o10.wav"),window.a5=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b5.wav"),window.stall=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/bstall.wav"),window.glideSlope=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/oglideslope.wav"),window.tooLowFlaps=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/otoo-low_flaps.wav"),window.tooLowGear=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/otoo-low_gear.wav"),window.apDisconnect=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/bap-disconnect.wav"),window.minimumBaro=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/ominimums.wav"),window.dontSink=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/odont-sink.wav"),window.masterA=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/bmasterAlarm.wav"),window.bankAngle=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/obank-angle.wav"),window.overspeed=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/boverspeed.wav"),window.masterA.loop=!0,window.bankAngle.loop=!0,window.overspeed.loop=!0):!window.willTheDoorFallOff||window.didAWheelFall||window.isAsOldAsYourMom?!window.willTheDoorFallOff&&window.didAWheelFall&&(window.a2500=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/2500.wav"),window.a2000=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/2000.wav"),window.a1000=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/1000.wav"),window.a500=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/500.wav"),window.a400=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/400.wav"),window.a300=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/300.wav"),window.a200=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/200.wav"),window.a100=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/100.wav"),window.a50=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/50.wav"),window.a40=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/40.wav"),window.a30=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/30.wav"),window.a20=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/20.wav"),window.a10=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/10.wav"),window.a5=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/5.wav"),window.stall=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/stall.wav"),window.glideSlope=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/glideslope.wav"),window.tooLowFlaps=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/too-low_flaps.wav"),window.tooLowGear=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/too-low_gear.wav"),window.apDisconnect=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/ap-disconnect.wav"),window.minimumBaro=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/minimum.wav"),window.dontSink=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/dont-sink.wav"),window.masterA=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/masterAlarm.wav"),window.bankAngle=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/bank-angle.wav"),window.overspeed=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/overspeed.wav"),window.masterA.loop=!0,window.bankAngle.loop=!0,window.overspeed.loop=!0):(window.a2500=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b2500.wav"),window.a2000=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b2000.wav"),window.a1000=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b1000.wav"),window.a500=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b500.wav"),window.a400=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b400.wav"),window.a300=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b300.wav"),window.a200=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b200.wav"),window.a100=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b100.wav"),window.a50=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b50.wav"),window.a40=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b40.wav"),window.a30=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b30.wav"),window.a20=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b20.wav"),window.a10=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b10.wav"),window.a5=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/b5.wav"),window.stall=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/bstall.wav"),window.glideSlope=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/bglideslope.wav"),window.tooLowFlaps=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/btoo-low_flaps.wav"),window.tooLowGear=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/btoo-low_gear.wav"),window.apDisconnect=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/bap-disconnect.wav"),window.minimumBaro=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/bminimums.wav"),window.dontSink=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/bdont-sink.wav"),window.masterA=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/bmasterAlarm.wav"),window.bankAngle=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/bbank-angle.wav"),window.overspeed=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/boverspeed.wav"),window.masterA.loop=!0,window.bankAngle.loop=!0,window.overspeed.loop=!0);var t,a=null!==document.getElementById("minimums")&&void 0!==document.getElementById("minimums").value?Number(document.getElementById("minimums").value):void 0,s=void 0!==geofs.animation.values.altitude&&void 0!==geofs.animation.values.groundElevationFeet?Math.round(geofs.animation.values.altitude-geofs.animation.values.groundElevationFeet+3.2808399*geofs.aircraft.instance.collisionPoints[geofs.aircraft.instance.collisionPoints.length-2].worldPosition[2]):"N/A",o=void 0!==geofs.animation.values.verticalSpeed?Math.round(geofs.animation.values.verticalSpeed):"N/A";t=geofs.animation.getValue("NAV1Direction")&&geofs.animation.getValue("NAV1Distance")!==.185*geofs.runways.getNearestRunway([geofs.nav.units.NAV1.navaid.lat,geofs.nav.units.NAV1.navaid.lon,0]).lengthMeters?"to"===geofs.animation.getValue("NAV1Direction")?Number((Math.atan((geofs.animation.values.altitude/3.2808399+(geofs.aircraft.instance.collisionPoints[geofs.aircraft.instance.collisionPoints.length-2].worldPosition[2]+.1)-geofs.nav.units.NAV1.navaid.elevation)/(geofs.animation.getValue("NAV1Distance")+.185*geofs.runways.getNearestRunway([geofs.nav.units.NAV1.navaid.lat,geofs.nav.units.NAV1.navaid.lon,0]).lengthMeters))*RAD_TO_DEGREES).toFixed(1)):Number((Math.atan((geofs.animation.values.altitude/3.2808399+(geofs.aircraft.instance.collisionPoints[geofs.aircraft.instance.collisionPoints.length-2].worldPosition[2]+.1)-geofs.nav.units.NAV1.navaid.elevation)/Math.abs(geofs.animation.getValue("NAV1Distance")-.185*geofs.runways.getNearestRunway([geofs.nav.units.NAV1.navaid.lat,geofs.nav.units.NAV1.navaid.lon,0]).lengthMeters))*RAD_TO_DEGREES).toFixed(1)):void 0,audio.on&&window.soundsOn&&((geofs.aircraft.instance.stalling&&!geofs.aircraft.instance.groundContact||null!==geofs.nav.units.NAV1.navaid&&s>100&&(t<geofs.nav.units.NAV1.navaid.slope-1.5||t>geofs.nav.units.NAV1.navaid.slope+2)||!geofs.aircraft.instance.groundContact&&s<300&&void 0!==geofs.aircraft.instance.definition.gearTravelTime&&geofs.animation.values.gearPosition>=.5||!geofs.aircraft.instance.groundContact&&s<500&&void 0!==geofs.animation.values.flapsSteps&&0==geofs.animation.values.flapsPosition&&window.tooLowGear.paused||!geofs.aircraft.instance.groundContact&&s<300&&geofs.animation.values.throttle>.95&&o<=0||Math.abs(geofs.aircraft.instance.animationValue.aroll)>45)&&window.masterA.paused?window.masterA.play():geofs.aircraft.instance.stalling&&!geofs.aircraft.instance.groundContact||null!==geofs.nav.units.NAV1.navaid&&s>100&&(t<geofs.nav.units.NAV1.navaid.slope-1.5||t>geofs.nav.units.NAV1.navaid.slope+2)||!geofs.aircraft.instance.groundContact&&s<300&&void 0!==geofs.aircraft.instance.definition.gearTravelTime&&geofs.animation.values.gearPosition>=.5||!geofs.aircraft.instance.groundContact&&s<500&&void 0!==geofs.animation.values.flapsSteps&&0==geofs.animation.values.flapsPosition&&window.tooLowGear.paused||!geofs.aircraft.instance.groundContact&&s<300&&geofs.animation.values.throttle>.95&&o<=0||Math.abs(geofs.aircraft.instance.animationValue.aroll)>45||window.masterA.paused||window.masterA.pause(),Math.abs(geofs.aircraft.instance.animationValue.aroll)>45&&window.bankAngle.paused?window.bankAngle.play():Math.abs(geofs.aircraft.instance.animationValue.aroll)>45||window.bankAngle.paused||window.bankAngle.pause(),geofs.aircraft.instance.stalling&&!geofs.aircraft.instance.groundContact&&window.stall.paused?window.stall.play():window.stall.paused||geofs.aircraft.instance.stalling||window.stall.pause(),null!==geofs.nav.units.NAV1.navaid&&s>100&&(t<geofs.nav.units.NAV1.navaid.slope-1.5||t>geofs.nav.units.NAV1.navaid.slope+2)&&window.glideSlope.paused&&window.glideSlope.play(),!geofs.aircraft.instance.groundContact&&s<300&&void 0!==geofs.aircraft.instance.definition.gearTravelTime&&geofs.animation.values.gearPosition>=.5&&window.tooLowGear.paused&&window.tooLowGear.play(),!geofs.aircraft.instance.groundContact&&s<500&&void 0!==geofs.animation.values.flapsSteps&&0==geofs.animation.values.flapsPosition&&window.tooLowGear.paused&&window.tooLowFlaps.paused&&window.tooLowFlaps.play(),!geofs.autopilot.on&&window.wasAPOn&&window.apDisconnect.play(),o<=0?(!geofs.aircraft.instance.groundContact&&s<300&&geofs.animation.values.throttle>.95&&window.dontSink.paused&&window.dontSink.play(),void 0!==a&&geofs.animation.values.altitude+2>a&&a>geofs.animation.values.altitude-2&&!window.iminimums&&(window.minimumBaro.play(),window.iminimums=!0),i(2500,s)&&!window.i2500&&(window.a2500.play(),window.i2500=!0),i(2e3,s)&&!window.i2000&&(window.a2000.play(),window.i2000=!0),i(1e3,s)&&!window.i1000&&(window.a1000.play(),window.i1000=!0),i(500,s)&&!window.i500&&(window.a500.play(),window.i500=!0),i(400,s)&&!window.i400&&(window.a400.play(),window.i400=!0),i(300,s)&&!window.i300&&(window.a300.play(),window.i300=!0),i(200,s)&&!window.i200&&(window.a200.play(),window.i200=!0),i(100,s)&&!window.i100&&(window.a100.play(),window.i100=!0),i(50,s)&&!window.i50&&(window.a50.play(),window.i50=!0),i(40,s)&&!window.i40&&(window.a40.play(),window.i40=!0),i(30,s)&&!window.i30&&(window.a30.play(),window.i30=!0),i(20,s)&&!window.i20&&(window.a20.play(),window.i20=!0),i(10,s)&&!window.i10&&(window.a10.play(),window.i10=!0),geofs.aircraft.instance.groundContact||!(s+geofs.animation.values.verticalSpeed/60*2<=1)||window.i7||(window.aRetard.play(),window.i7=!0),i(5,s)&&!window.i5&&(window.a5.play(),window.i5=!0),window.gpwsRefreshRate=30):o>0&&(window.iminimums&&(window.iminimums=!1),window.i2500&&(window.i2500=!1),window.i2000&&(window.i2000=!1),window.i1000&&(window.i1000=!1),window.i500&&(window.i500=!1),window.i400&&(window.i400=!1),window.i300&&(window.i300=!1),window.i200&&(window.i200=!1),window.i100&&(window.i100=!1),window.i50&&(window.i50=!1),window.i40&&(window.i40=!1),window.i30&&(window.i30=!1),window.i20&&(window.i20=!1),window.i10&&(window.i10=!1),window.i7&&(window.i7=!1),window.i5&&(window.i5=!1),window.gpwsRefreshRate=100))}window.wasAPOn=geofs.autopilot.on,window.didAWheelFall=window.willTheDoorFallOff,window.wasAsOldAsYourMom=geofs.aircraft.instance.aircraftRecord.name.includes("757")||geofs.aircraft.instance.aircraftRecord.name.includes("767")},window.gpwsRefreshRate),document.addEventListener("keydown",function(i){i.key===window.soundsToggleKey&&(window.soundsOn=!window.soundsOn)})},8e3);
          })();
      };
      
      window.info = function() {
          (function() {
              //PASTE IN CODE BELOW
              // @license      GPL-3.0
setInterval(function a(){if(geofs.animation.values){var i=geofs.animation.values.kias?geofs.animation.values.kias.toFixed(1):"N/A",n=geofs.animation.values.mach?geofs.animation.values.mach.toFixed(2):"N/A",e=geofs.animation.values.groundSpeed?geofs.animation.values.groundSpeed.toFixed(1):"N/A",t=geofs.animation.values.altitude?Math.round(geofs.animation.values.altitude):"N/A",s=geofs.animation.values.heading360?Math.round(geofs.animation.values.heading360):"N/A",l=void 0!==geofs.animation.values.altitude&&void 0!==geofs.animation.values.groundElevationFeet?Math.round(geofs.animation.values.altitude-geofs.animation.values.groundElevationFeet+3.2808399*geofs.aircraft.instance.collisionPoints[geofs.aircraft.instance.collisionPoints.length-2].worldPosition[2]):"N/A",o=void 0!==geofs.animation.values.verticalSpeed?Math.round(geofs.animation.values.verticalSpeed):"N/A",d=void 0!==geofs.animation.values.throttle?0===geofs.animation.values.throttle?"IDLE":(100*geofs.animation.values.throttle).toFixed(0)+"%":"N/A",p=document.querySelector(".geofs-ui-bottom");if(p){var u=document.getElementById("flightDataDisplay");u||((u=document.createElement("div")).id="flightDataDisplay",u.style.display="inline-block",u.style.fontFamily='"Roboto", "Helvetica", "Arial", sans-serif',u.style.fontWeight="450",u.style.fontSize="14px",u.style.textTransform="uppercase",u.style.textAlign="left",u.style.lineHeight="36px",u.style.padding="0px 8px",u.style.borderRadius="5px",p.appendChild(u)),u.innerHTML=`
                <span style="padding: 0 8px;">KIAS ${i}</span> |
                <span style="padding: 0 8px;">Mach ${n}</span> |
                <span style="padding: 0 8px;">GS ${e}</span> |
                <span style="padding: 0 8px;">ALT ${t}</span> |
                <span style="padding: 0 8px;">AGL ${l}</span> |
                <span style="padding: 0 8px;">HDG ${s}</span> |
                <span style="padding: 0 8px;">V/S ${o}</span> |
                <span style="padding: 0 8px;">THR ${d}</span>
            `}}},100);
          })();
      };
      window.stats = function() {
          (function() {
              //PASTE IN CODE BELOW
              setTimeout(function(){"use strict";window.closeTimer=!0,window.closeSeconds=10,window.refreshRate=20,window.counter=0,window.isLoaded=!1,window.justLanded=!1,window.vertSpeed=0,window.oldAGL=0,window.newAGL=0,window.calVertS=0,window.groundSpeed=0,window.ktias=0,window.kTrue=0,window.bounces=0,window.statsOpen=!1,window.isGrounded=!0,window.isInTDZ=!1,window.softLanding=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/soft_landing.wav"),window.hardLanding=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/hard_landing.wav"),window.crashLanding=new Audio("https://tylerbmusic.github.io/GPWS-files_geofs/crash_landing.wav"),window.statsDiv=document.createElement("div"),window.statsDiv.style.width="fit-content",window.statsDiv.style.height="fit-content",window.statsDiv.style.background="linear-gradient(to bottom right, rgb(29, 52, 87), rgb(20, 40, 70))",window.statsDiv.style.zIndex="100000",window.statsDiv.style.margin="30px",window.statsDiv.style.padding="15px",window.statsDiv.style.fontFamily="Arial, sans-serif",window.statsDiv.style.boxShadow="0 8px 24px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)",window.statsDiv.style.color="white",window.statsDiv.style.position="fixed",window.statsDiv.style.borderRadius="12px",window.statsDiv.style.left="-50%",window.statsDiv.style.transition="0.4s ease",window.statsDiv.style.border="1px solid rgba(255,255,255,0.1)",document.body.appendChild(window.statsDiv),setInterval(function t(){if(!1==geofs.cautiousWithTerrain&&!geofs.isPaused()){if((void 0!==geofs.animation.values.altitude&&void 0!==geofs.animation.values.groundElevationFeet?geofs.animation.values.altitude-geofs.animation.values.groundElevationFeet+3.2808399*geofs.aircraft.instance.collisionPoints[geofs.aircraft.instance.collisionPoints.length-2].worldPosition[2]:"N/A")<500){if(window.justLanded=geofs.animation.values.groundContact&&!window.isGrounded,window.justLanded&&!window.statsOpen){if(window.closeTimer&&setTimeout(window.closeLndgStats,1e3*window.closeSeconds),window.statsOpen=!0,window.statsDiv.innerHTML=`
                <button style="
                    right: 10px; 
                    top: 10px; 
                    position: absolute; 
                    background: rgba(255,255,255,0.2); 
                    border: none; 
                    color: white; 
                    cursor: pointer; 
                    width: 30px; 
                    height: 30px; 
                    border-radius: 50%; 
                    font-weight: bold;" 
                    onclick="window.closeLndgStats()">✕</button>
                    <style>
                        .info-block {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            gap: 10px;
                            font-size: 14px;
                        }
                        .landing-quality {
                            grid-column: 1 / -1;
                            text-align: center;
                            font-weight: bold;
                            margin-top: 10px;
                            padding: 5px;
                            border-radius: 5px;
                        }
                    </style>
                    <div class="info-block">
                        <span>Vertical speed: ${window.vertSpeed} fpm</span>
                        <span>G-Forces: ${(geofs.animation.values.accZ/9.80665).toFixed(2)}G</span>
                        <span>Terrain-calibrated V/S: ${window.calVertS.toFixed(1)}</span>
                        <span>True airspeed: ${window.kTrue} kts</span>
                        <span>Ground speed: ${window.groundSpeed.toFixed(1)} kts</span>
                        <span>Indicated speed: ${window.ktias} kts</span>
                        <span>Roll: ${geofs.animation.values.aroll.toFixed(1)} degrees</span>
                        <span>Tilt: ${geofs.animation.values.atilt.toFixed(1)} degrees</span>
                        <span id="bounces">Bounces: 0</span>
                    </div>
                `,window.statsDiv.style.left="0px",geofs.nav.units.NAV1.inRange&&(window.statsDiv.innerHTML+=`
                        <div style="margin-top: 10px; font-size: 14px;">
                            <span>Landed in TDZ? ${window.isInTDZ} | </span>
                            <span>Deviation from center: ${geofs.nav.units.NAV1.courseDeviation.toFixed(1)}</span>
                        </div>`),0>Number(window.vertSpeed)){let e="",i="";Number(window.vertSpeed)>=-50?(e="landing-quality",i="SUPER BUTTER!",window.statsDiv.innerHTML+=`
                                <div class="${e}" style="background-color: green; color: white;">
                                    ${i}
                                </div>`,window.softLanding.play()):Number(window.vertSpeed)>=-200?(e="landing-quality",i="BUTTER",window.statsDiv.innerHTML+=`
                                <div class="${e}" style="background-color: green; color: white;">
                                    ${i}
                                </div>`,window.softLanding.play()):Number(window.vertSpeed)>=-500&&-200>Number(window.vertSpeed)?(window.hardLanding.play(),window.statsDiv.innerHTML+=`
                                <div class="${e}" style="background-color: yellow; color: black;">
                                    ACCEPTABLE
                                </div>`):Number(window.vertSpeed)>=-1e3&&-500>Number(window.vertSpeed)&&(window.hardLanding.play(),window.statsDiv.innerHTML+=`
                                <div class="${e}" style="background-color: red; color: white;">
                                    HARD LANDING
                                </div>`)}(-1e3>=Number(window.vertSpeed)||Number(window.vertSpeed>200))&&(window.crashLanding.play(),window.statsDiv.innerHTML+=`
                            <div class="landing-quality" style="background-color: crimson; color: white;">
                                u ded
                            </div>`)}else window.justLanded&&window.statsOpen&&(window.bounces++,document.getElementById("bounces").innerHTML=`Bounces: ${window.bounces}`,window.softLanding.pause());geofs.nav.units.NAV1.inRange&&(window.isInTDZ=geofs.nav.units.NAV1.distance*FEET_TO_METERS>.052902913939976676*geofs.runways.getNearestRunway([geofs.nav.units.NAV1.navaid.lat,geofs.nav.units.NAV1.navaid.lon,0]).lengthMeters&&geofs.nav.units.NAV1.distance*FEET_TO_METERS<.06136825053484974*geofs.runways.getNearestRunway([geofs.nav.units.NAV1.navaid.lat,geofs.nav.units.NAV1.navaid.lon,0]).lengthMeters?"Yes":"No"),window.groundSpeed=geofs.animation.values.groundSpeedKnt,window.ktias=geofs.animation.values.kias.toFixed(1),window.kTrue=geofs.aircraft.instance.trueAirSpeed.toFixed(1),window.vertSpeed=geofs.animation.values.verticalSpeed.toFixed(1),window.gForces=geofs.animation.values.accZ/9.80665,window.isGrounded=geofs.animation.values.groundContact,window.refreshRate=12}else window.refreshRate=60}},window.refreshRate),setInterval(function t(){void 0===geofs.animation.values||geofs.isPaused()||(void 0!==geofs.animation.values.altitude&&void 0!==geofs.animation.values.groundElevationFeet?geofs.animation.values.altitude-geofs.animation.values.groundElevationFeet+3.2808399*geofs.aircraft.instance.collisionPoints[geofs.aircraft.instance.collisionPoints.length-2].worldPosition[2]:"N/A")===window.oldAGL||(window.newAGL=void 0!==geofs.animation.values.altitude&&void 0!==geofs.animation.values.groundElevationFeet?geofs.animation.values.altitude-geofs.animation.values.groundElevationFeet+3.2808399*geofs.aircraft.instance.collisionPoints[geofs.aircraft.instance.collisionPoints.length-2].worldPosition[2]:"N/A",window.newTime=Date.now(),window.calVertS=(window.newAGL-window.oldAGL)*(6e4/(window.newTime-window.oldTime)),window.oldAGL=void 0!==geofs.animation.values.altitude&&void 0!==geofs.animation.values.groundElevationFeet?geofs.animation.values.altitude-geofs.animation.values.groundElevationFeet+3.2808399*geofs.aircraft.instance.collisionPoints[geofs.aircraft.instance.collisionPoints.length-2].worldPosition[2]:"N/A",window.oldTime=Date.now())},25),window.closeLndgStats=function(){window.statsDiv.style.left="-50%",setTimeout(function(){window.statsDiv.innerHTML="",window.statsOpen=!1,window.bounces=0},400)}},1e3);
          })();
      };
      window.ls = function() {
          (function() {
              //PASTE IN CODE BELOW
              const githubRepo="https://raw.githubusercontent.com/kolos26/GEOFS-LiverySelector/main",version="3.2.3",liveryobj={},mpLiveryIds={},mLiveries={},origHTMLs={},uploadHistory=JSON.parse(localStorage.lsUploadHistory||"{}"),liveryIdOffset=1e4,mlIdOffset=1e3;let links=[],airlineobjs=[],whitelist;async function handleLiveryJson(e){let t=await e.json();Object.keys(t).forEach(e=>liveryobj[e]=t[e]),"3.2.3"!=liveryobj.version&&document.querySelector(".livery-list h3").appendChild(createTag("a",{href:"https://github.com/kolos26/GEOFS-LiverySelector",target:"_blank",style:"display:block;width:100%;text-decoration:none;text-align:center;"},"Update available: "+liveryobj.version)),Object.keys(liveryobj.aircrafts).forEach(e=>{if(liveryobj.aircrafts[e].liveries.length<2)return;let t=document.querySelector(`[data-aircraft='${e}']`);origHTMLs[e]||(origHTMLs[e]=t.innerHTML),t.innerHTML=origHTMLs[e]+createTag("img",{src:`${githubRepo}/liveryselector-logo-small.svg`,style:"height:30px;width:auto;margin-left:20px;",title:"Liveries available"}).outerHTML,"disabled"!=liveryobj.aircrafts[e].mp&&(t.innerHTML+=createTag("small",{title:"Liveries are multiplayer compatible\n(visible to other players)"},"\uD83C\uDFAE").outerHTML)})}function loadLivery(e,t,i,l){for(let r=0;r<e.length;r++){let a=geofs.aircraft.instance.definition.parts[i[r]]["3dmodel"];if("object"==typeof e[r]){if(void 0!==e[r].material){let n=l[e[r].material];a._model.getMaterial(n.name).setValue(Object.keys(n)[1],new Cesium.Cartesian4(...n[Object.keys(n)[1]],1))}continue}2.9==geofs.version?geofs.api.Model.prototype.changeTexture(e[r],t[r],a):geofs.version>=3&&geofs.version<=3.7?geofs.api.changeModelTexture(a._model,e[r],t[r]):geofs.api.changeModelTexture(a._model,e[r],{index:t[r]})}}function inputLivery(){let e=getCurrentAircraft(),t=e.liveries[0].texture,i=document.getElementsByName("textureInput");if(t.filter(e=>e===t[0]).length===t.length){let l=i[0].value;loadLivery(Array(t.length).fill(l),e.index,e.parts)}else{let r=[];i.forEach(e=>r.push(e.value)),loadLivery(r,e.index,e.parts)}}function submitLivery(){let e=getCurrentAircraft(),t=e.liveries[0].texture,i=document.getElementsByName("textureInput"),l={};if(document.querySelectorAll(".livery-submit input").forEach(e=>l[e.id.replace("livery-submit-","")]=e),!localStorage.liveryDiscordId||localStorage.liveryDiscordId.length<6)return alert("Invalid Discord User id!");if(l.liveryname.value.trim().length<3)return alert("Invalid Livery Name!");if(!l["confirm-perms"].checked||!l["confirm-legal"].checked)return alert("Confirm all checkboxes!");let r={name:l.liveryname.value.trim(),credits:l.credits.value.trim(),texture:[]};if(!r.name||""==r.name.trim())return;let a=[],n=[];if(i.forEach((i,l)=>{if(i.value=i.value.trim(),i.value.match(/^https:\/\/.+/i)){let o=Object.values(uploadHistory).find(e=>e.url==i.value);if(!o)return alert("Only self-uploaded imgbb links work for submitting!");if(o.expiration>0)return alert('Can\' submit expiring links! DISABLE "Expire links after one hour" option and re-upload texture:\n'+e.labels[l]);let s={title:e.labels[l]+" ("+Math.ceil(o.size/1024/10.24)/100+"MB, "+o.width+"x"+o.height+")",description:i.value,image:{url:i.value},fields:[{name:"Timestamp",value:new Date(1e3*o.time),inline:!0},{name:"File ID",value:o.id,inline:!0},]};if(o.submitted){if(!confirm("The following texture was already submitted:\n"+i.value+"\nContinue anyway?"))return;s.fields.push({name:"First submitted",value:new Date(1e3*o.submitted)})}n.push(s),a.push(o),r.texture.push(i.value)}else r.texture.push(t[l])}),!n.length)return alert("Nothing to submit, upload images first!");let o=[`Livery upload by <@${localStorage.liveryDiscordId}>`,`__Plane:__ \`${geofs.aircraft.instance.id}\` ${geofs.aircraft.instance.aircraftRecord.name}`,`__Livery Name:__ \`${r.name}\``,"```json\n"+JSON.stringify(r,null,2)+"```"];fetch(atob(liveryobj.dapi),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:o.join("\n"),embeds:n})}).then(e=>{a.forEach(e=>{e.submitted=e.submitted||Math.round(new Date/1e3)}),localStorage.lsUploadHistory=JSON.stringify(uploadHistory)})}function sortList(e){let t=domById(e),i,l,r,a;for(l=!0;l;){for(i=0,l=!1,r=t.getElementsByTagName("LI");i<r.length-1;i++)if(a=!1,r[i].innerHTML.toLowerCase()>r[i+1].innerHTML.toLowerCase()){a=!0;break}a&&(r[i].parentNode.insertBefore(r[i+1],r[i]),l=!0)}}function listLiveries(){domById("liverylist").innerHTML="";let e=[githubRepo,"thumbs"].join("/"),t=[e,geofs.aircraft.instance.id+".png"].join("/"),i=getCurrentAircraft();i.liveries.forEach(function(l,r){if(l.disabled)return;let a=appendNewChild(domById("liverylist"),"li",{id:[geofs.aircraft.instance.id,l.name,"button"].join("_"),class:"livery-list-item"});if(a.dataset.idx=r,a.onclick=()=>{loadLivery(l.texture,i.index,i.parts,l.materials),"disabled"!=l.mp&&setInstanceId(r+("geofs"==l.credits?.toLowerCase()?"":1e4))},a.innerHTML=createTag("span",{class:"livery-name"},l.name).outerHTML,geofs.aircraft.instance.id<1e3){a.classList.add("offi");let n=createTag("img");n.onerror=()=>{n.onerror=null,n.src=t},n.src=[e,geofs.aircraft.instance.id,geofs.aircraft.instance.id+"-"+r+".png"].join("/"),a.appendChild(n)}else a.classList.remove("offi");l.credits&&l.credits.length&&(a.innerHTML+=`<small>by ${l.credits}</small>`),appendNewChild(a,"span",{id:[geofs.aircraft.instance.id,l.name].join("_"),class:"fa fa-star nocheck",onclick:"LiverySelector.star(this)"})}),sortList("liverylist"),loadFavorites(),sortList("favorites"),loadAirlines(),addCustomForm()}function loadFavorites(){null===localStorage.getItem("favorites")&&(localStorage.favorites=""),domById("favorites").innerHTML="";let e=localStorage.favorites.split(","),t=geofs.aircraft.instance.id;e.forEach(function(e){t==e.slice(0,t.length)&&"_"==e.charAt(t.length)&&star(domById(e))})}function loadAirlines(){domById("airlinelist").innerHTML="";let e=getCurrentAircraft(),t=e.liveries[0].texture;airlineobjs.forEach(function(i){let l=appendNewChild(domById("airlinelist"),"li",{style:"color:"+i.color+";background-color:"+i.bgcolor+"; font-weight: bold;"});l.innerText=i.name;appendNewChild(l,"button",{class:"mdl-button mdl-js-button mdl-button--raised mdl-button",style:"float: right; margin-top: 6px; background-color: #9e150b;",onclick:`LiverySelector.removeAirline("${i.url}")`}).innerText="- Remove airline",Object.keys(i.aircrafts).includes(geofs.aircraft.instance.id)&&i.aircrafts[geofs.aircraft.instance.id].liveries.forEach(function(l){let r=appendNewChild(domById("airlinelist"),"li",{id:[geofs.aircraft.instance.id,l.name,"button"].join("_"),class:"livery-list-item"});if(t.filter(e=>e===t[0]).length===t.length){let a=l.texture[0];r.onclick=()=>{loadLivery(Array(t.length).fill(a),e.index,e.parts),"disabled"!=e.mp&&whitelist.includes(i.url.trim())&&setInstanceId(a)}}else r.onclick=()=>{let t=e.labels.indexOf("Texture");loadLivery(l.texture,e.index,e.parts),"disabled"!=e.mp&&whitelist.includes(i.url.trim())&&setInstanceId(l.texture[t])};r.innerHTML=createTag("span",{class:"livery-name"},l.name).outerHTML,l.credits&&l.credits.length&&(r.innerHTML+=`<small>by ${l.credits}</small>`)})})}function addCustomForm(){document.querySelector("#livery-custom-tab-upload .upload-fields").innerHTML="",document.querySelector("#livery-custom-tab-direct .upload-fields").innerHTML="";let e=getCurrentAircraft(),t=e.liveries[0].texture.filter(e=>"object"!=typeof e);if(!t.length)return;let i=e.labels;t.filter(e=>e===t[0]).length===t.length?(createUploadButton(i[0]),createDirectButton(i[0])):i.forEach((e,t)=>{createUploadButton(e),createDirectButton(e,t)}),document.querySelector(".livery-custom-tabs li").click()}function search(e){if(""===e)listLiveries();else{let t=domById("liverylist").childNodes;t.forEach(function(t){let i=t.innerText.toLowerCase().includes(e.toLowerCase());t.style.display=i?"block":"none"})}}function star(e){let t=e.classList,i=[e.id,"favorite"].join("_");if("fa fa-star nocheck"==t){let l=domById([e.id,"button"].join("_")),r=appendNewChild(domById("favorites"),"li",{id:i,class:"livery-list-item"});r.onclick=l.onclick,r.innerText=l.children[0].innerText;let a=localStorage.favorites.split(",");a.push(e.id),a=[...new Set(a)],localStorage.favorites=a}else if("fa fa-star checked"==t){domById("favorites").removeChild(domById(i));let n=localStorage.favorites.split(","),o=n.indexOf(e.id);-1!==o&&n.splice(o,1),localStorage.favorites=n}t.toggle("checked"),t.toggle("nocheck")}function createUploadButton(e){let t=document.querySelector("#livery-custom-tab-upload .upload-fields");appendNewChild(t,"input",{type:"file",onchange:"LiverySelector.uploadLivery(this)"}),appendNewChild(t,"input",{type:"text",name:"textureInput",class:"mdl-textfield__input address-input",placeholder:e,id:e}),appendNewChild(t,"br")}function createDirectButton(e,t){let i=document.querySelector("#livery-custom-tab-direct .upload-fields");appendNewChild(i,"input",{type:"file",onchange:"LiverySelector.loadLiveryDirect(this,"+t+")"}),appendNewChild(i,"span").innerHTML=e,appendNewChild(i,"br")}function loadLiveryDirect(e,t){let i=new FileReader;i.addEventListener("load",i=>{let l=getCurrentAircraft(),r=l.liveries[0].texture,a=i.target.result;void 0===t?loadLivery(Array(r.length).fill(a),l.index,l.parts):geofs.api.changeModelTexture(geofs.aircraft.instance.definition.parts[l.parts[t]]["3dmodel"]._model,a,{index:l.index[t]}),e.value=null}),e.files.length&&i.readAsDataURL(e.files[0])}function uploadLivery(e){if(!e.files.length)return;if(!localStorage.imgbbAPIKEY){alert("No imgbb API key saved! Check API tab"),e.value=null;return}let t=new FormData;t.append("image",e.files[0]),localStorage.liveryAutoremove&&t.append("expiration",new Date/1e3*3600);let i={url:`https://api.imgbb.com/1/upload?key=${localStorage.imgbbAPIKEY}`,method:"POST",timeout:0,processData:!1,mimeType:"multipart/form-data",contentType:!1,data:t};$.ajax(i).done(function(t){let i=JSON.parse(t);console.log(i.data.url),e.nextSibling.value=i.data.url,e.value=null,uploadHistory[i.data.id]&&uploadHistory[i.data.id].expiration===i.data.expiration||(uploadHistory[i.data.id]=i.data,localStorage.lsUploadHistory=JSON.stringify(uploadHistory))})}function handleCustomTabs(e){e=e||window.event;let t=e.target||e.srcElement,i=t.innerHTML.toLocaleLowerCase();domById("customDiv").querySelectorAll(":scope > div").forEach(e=>{if(e.id!=["livery-custom-tab",i].join("-")){e.style.display="none";return}switch(e.style.display="",i){case"upload":{let t=e.querySelectorAll('input[type="file"]');t.forEach(e=>localStorage.imgbbAPIKEY?e.classList.remove("err"):e.classList.add("err"));let l=!!localStorage.liveryDiscordId&&!!localStorage.imgbbAPIKEY;e.querySelector(".livery-submit .api").style.display=l?"":"none",e.querySelector(".livery-submit .no-api").style.display=l?"none":""}break;case"download":reloadDownloadsForm(e);break;case"api":reloadSettingsForm()}})}function reloadDownloadsForm(e){let t=getCurrentAircraft(),i=t.liveries,l=i[0],r=e.querySelector(".download-fields");r.innerHTML="",i.forEach((e,i)=>{let a=e.texture.filter(e=>"object"!=typeof e);if(!a.length)return;appendNewChild(r,"h7").innerHTML=e.name;let n=appendNewChild(r,"div");a.forEach((e,r)=>{if("object"==typeof e||i>0&&e==l.texture[r])return;let a=appendNewChild(n,"a",{href:e,target:"_blank",class:"mdl-button mdl-button--raised mdl-button--colored"});a.innerHTML=t.labels[r]})})}function reloadSettingsForm(){let e=domById("livery-setting-apikey");e.placeholder=localStorage.imgbbAPIKEY?"API KEY SAVED ✓ (type CLEAR to remove)":"API KEY HERE";let t=domById("livery-setting-remove");t.checked=1==localStorage.liveryAutoremove;let i=domById("livery-setting-discordid");i.value=localStorage.liveryDiscordId||""}function saveSetting(e){let t=e.id.replace("livery-setting-","");switch(t){case"apikey":e.value.length&&("clear"==e.value.trim().toLowerCase()?delete localStorage.imgbbAPIKEY:localStorage.imgbbAPIKEY=e.value.trim(),e.value="");break;case"remove":localStorage.liveryAutoremove=e.checked?"1":"0";break;case"discordid":localStorage.liveryDiscordId=e.value.trim()}reloadSettingsForm()}async function addAirline(){let e=prompt("Enter URL to the json file of the airline:");links.includes(e)?alert("Airline already added"):(links.push(e),localStorage.links+=`,${e}`,await fetch(e).then(e=>e.json()).then(e=>airlineobjs.push(e)),airlineobjs[airlineobjs.length-1].url=e.trim(),loadAirlines())}function removeAirline(e){removeItem(links,e.trim()),","===links.toString().charAt(0)?localStorage.links=links.toString().slice(1):localStorage.links=links.toString(),airlineobjs.forEach(function(t,i){t.url.trim()===e.trim()&&airlineobjs.splice(i,1)}),loadAirlines()}function getCurrentAircraft(){return liveryobj.aircrafts[geofs.aircraft.instance.id]}function setInstanceId(e){geofs.aircraft.instance.liveryId=e}function updateMultiplayer(){Object.values(multiplayer.visibleUsers).forEach(e=>{let t=liveryobj.aircrafts[e.aircraft],i=[],l=e.currentLivery;t&&e.model&&"disabled"!=t.mp&&mpLiveryIds[e.id]!==l&&(mpLiveryIds[e.id]=l,i=l>=1e3&&l<1e4?getMLTexture(e,t):getMPTexture(e,t)).forEach(t=>{applyMPTexture(t.uri,t.tex,i=>e.model.changeTexture(i,{index:t.index}))})})}function applyMPTexture(e,t,i){try{Cesium.Resource.fetchImage({url:e}).then(e=>{let l=createTag("canvas",{width:t._width,height:t._height});l.getContext("2d").drawImage(e,0,0,l.width,l.height),i(l.toDataURL("image/png"))})}catch(l){console.log("LSMP",!!t,e,l)}}function getMPTexture(e,t){let i=e.currentLivery-1e4,l=[],r=e.model._model._rendererResources.textures;if(console.log(e.currentLivery),console.log(typeof e.currentLivery),"string"==typeof e.currentLivery[0])console.log("VA detected"),console.log(e.currentLivery),l.push({uri:e.currentLivery,tex:r[0],index:0});else if("multi"==t.mp)t.index.forEach((e,a)=>{l.push({uri:t.liveries[i].texture[a],tex:r[e],index:e})});else{let a=t.labels.indexOf("Texture");l.push({uri:t.liveries[i].texture[a],tex:r[0],index:0})}return console.log(l),l}function getMLTexture(e,t){if(!mLiveries.aircraft)return fetch(atob(liveryobj.mapi)).then(e=>e.json()).then(e=>{Object.keys(e).forEach(t=>mLiveries[t]=e[t])}),[];let i=e.currentLivery-1e3,l=[],r=t.labels.indexOf("Texture");return -1!==r&&l.push({uri:mLiveries.aircraft[i].mptx,tex:e.model._model._rendererResources.textures[t.index[r]],index:t.index[r]}),l}function toggleDiv(e){let t=domById(e),i=window.event.target;i.classList.contains("closed")?(i.classList.remove("closed"),t.style.display=""):(i.classList.add("closed"),t.style.display="none")}function createTag(e,t={},i=""){let l=document.createElement(e);return Object.keys(t||{}).forEach(e=>l.setAttribute(e,t[e])),(""+i).length&&(l.innerHTML=i),l}function appendNewChild(e,t,i={},l=-1){let r=createTag(t,i);return l<0?e.appendChild(r):e.insertBefore(r,e.children[l]),r}function removeItem(e,t){let i=e.indexOf(t);-1!==i&&e.splice(i,1)}function domById(e){return document.getElementById(e)}function generateListHTML(){return`
        <h3><img src="${githubRepo}/liveryselector-logo.svg" class="livery-title" title="LiverySelector" /></h3>

        <div class="livery-searchbar mdl-textfield mdl-js-textfield geofs-stopMousePropagation geofs-stopKeyupPropagation">
            <input class="mdl-textfield__input address-input" type="text" placeholder="Search liveries" onkeyup="LiverySelector.search(this.value)" id="searchlivery">
            <label class="mdl-textfield__label" for="searchlivery">Search liveries</label>
        </div>

        <h6 onclick="LiverySelector.toggleDiv('favorites')">Favorite liveries</h6>
        <ul id="favorites" class="geofs-list geofs-visible"></ul>

        <h6 onclick="LiverySelector.toggleDiv('liverylist')">Available liveries</h6>
        <ul id="liverylist" class="geofs-list geofs-visible"></ul>

        <h6 onclick="LiverySelector.toggleDiv('airlinelist')">Virtual airlines</h6><button class="mdl-button mdl-js-button mdl-button--raised mdl-button" style="background-color: #096628; color: white;" onclick="LiverySelector.addAirline()">+ Add airline</button>
        <ul id="airlinelist" class="geofs-list geofs-visible"></ul>

        <h6 onclick="LiverySelector.toggleDiv('customDiv')" class="closed">Load external livery</h6>
        <div id="customDiv" class="mdl-textfield mdl-js-textfield geofs-stopMousePropagation geofs-stopKeyupPropagation" style="display:none;">
            <ul class="livery-custom-tabs" onclick="LiverySelector.handleCustomTabs()">
                <li>Upload</li>
                <li>Direct</li>
                <li>Download</li>
                <li>API</li>
            </ul>
            <div id="livery-custom-tab-upload" style="display:none;">
                <div>Paste URL or upload image to generate imgbb URL</div>
                <div class="upload-fields"></div>
                <div><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onclick="LiverySelector.inputLivery()">Load livery</button></div>
                <div class="livery-submit geofs-list-collapsible-item">Contribute to the LiverySelector Database
                    <div class="geofs-collapsible no-api">-&gt; Fill in API key and Discord User ID in API tab.</div>
                    <div class="geofs-collapsible api">
                        <label for="livery-submit-liveryname">Livery Name</label>
                        <input type="text" id="livery-submit-liveryname" class="mdl-textfield__input address-input">
                        <label for="livery-submit-credits">Author</label>
                        <input type="text" id="livery-submit-credits" class="mdl-textfield__input address-input">
                        <input type="checkbox" id="livery-submit-confirm-perms">
                        <label for="livery-submit-confirm-perms">I am the author and have created the textures myself or have the permission from the author to use those textures.</label><br>
                        <input type="checkbox" id="livery-submit-confirm-legal">
                        <label for="livery-submit-confirm-legal">I confirm the textures are safe for all ages, are non-offensive and appropriate for the game and don't violate any laws or other regulations.</label>
                        <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onclick="LiverySelector.submitLivery()">Submit livery for review</button>
                        <small>
                          Join our <a href="https://discord.gg/2tcdzyYaWU" target="_blank">Discord</a> to follow up on your contributions.
                          By submitting you agree to the Discord server rules. Failing to comply may result in exclusion from further submits.
                        </small>
                    </div>
                </div>
            </div>
            <div id="livery-custom-tab-direct" style="display:none;">
                <div>Load texture directly in client, no upload.</div>
                <div class="upload-fields"></div>
            </div>
            <div id="livery-custom-tab-download" style="display:none;">
                <div>Download textures for current Airplane:</div>
                <div class="download-fields"></div>
            </div>
            <div id="livery-custom-tab-api" style="display:none;">
              <div>
                <label for="livery-setting-apikey">Paste your imgbb API key here (<a href="https://api.imgbb.com" target="_blank">get key</a>)</label>
                <input type="text" id="livery-setting-apikey" class="mdl-textfield__input address-input" onchange="LiverySelector.saveSetting(this)">
                <input type="checkbox" id="livery-setting-remove" onchange="LiverySelector.saveSetting(this)">
                <label for="livery-setting-remove">Expire links after one hour<br><small>(only for testing, disable when submitting to the database!)</small></label>
                <label for="livery-setting-discordid">Discord User ID (<a href="https://support.discord.com/hc/en-us/articles/206346498" target="_blank">howto</a>)</label>
                <input type="number" id="livery-setting-discordid" class="mdl-textfield__input address-input" onchange="LiverySelector.saveSetting(this)">
              </div>
            </div>
        </div>
        <br/>
        <a href="https://raw.githubusercontent.com/kolos26/GEOFS-LiverySelector/refs/heads/main/tutorial.txt" target="_blank"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button">Open tutorial</button></a><br/>
        <a href="https://discord.gg/2tcdzyYaWU" target="_blank"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button">Join our discord server</button></a><br/>
        <a href="https://github.com/kolos26/GEOFS-LiverySelector" target="_blank"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button">Visit our Github page</button></a><br/>
        <a href="mailto:LiverySelector20220816@gmail.com" target="_blank"><button class="mdl-button mdl-js-button mdl-button--raised mdl-button">Contact us: LiverySelector20220816@gmail.com</button></a><br/>
`}function generatePanelButtonHTML(){let e=createTag("button",{title:"Change livery",id:"liverybutton",class:"mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly",onclick:"LiverySelector.listLiveries()","data-toggle-panel":".livery-list","data-tooltip-classname":"mdl-tooltip--top","data-upgraded":",MaterialButton"});return e.innerHTML=createTag("img",{src:`${githubRepo}/liveryselector-logo-small.svg`,height:"30px"}).outerHTML,e}!function e(){fetch(`${githubRepo}/styles.css?`+Date.now()).then(async e=>{let t=createTag("style",{type:"text/css"});t.innerHTML=await e.text(),document.head.appendChild(t)}),appendNewChild(document.head,"link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"});let t=appendNewChild(document.querySelector(".geofs-ui-left"),"div",{id:"listDiv",class:"geofs-list geofs-toggle-panel livery-list","data-noblur":"true","data-onshow":"{geofs.initializePreferencesPanel()}","data-onhide":"{geofs.savePreferencesPanel()}"});t.innerHTML=generateListHTML();let i=document.querySelector(".geofs-ui-bottom"),l=geofs.version>=3.6?4:3;i.insertBefore(generatePanelButtonHTML(),i.children[l]);let r=document.getElementsByClassName("geofs-liveries geofs-list-collapsible-item");Object.values(r).forEach(e=>e.parentElement.removeChild(e)),fetch(`${githubRepo}/livery.json?`+Date.now()).then(handleLiveryJson),null===localStorage.getItem("links")?localStorage.links="":(links=localStorage.links.split(",")).forEach(async function(e){await fetch(e).then(e=>e.json()).then(e=>airlineobjs.push(e)),airlineobjs[airlineobjs.length-1].url=e.trim()}),fetch(`${githubRepo}/whitelist.json?`+Date.now()).then(e=>e.json()).then(e=>whitelist=e),setInterval(updateMultiplayer,5e3),window.addEventListener("keyup",function(e){e.target.classList.contains("geofs-stopKeyupPropagation")&&e.stopImmediatePropagation(),"l"===e.key&&(listLiveries(),ui.panel.toggle(".livery-list"))})}(),window.LiverySelector={liveryobj,saveSetting,toggleDiv,loadLiveryDirect,handleCustomTabs,listLiveries,star,search,inputLivery,uploadLivery,submitLivery,uploadHistory,loadAirlines,addAirline,removeAirline,airlineobjs};
          })();
      };
      window.opengines = function() {
          (function() {
              //PASTE IN CODE BELOW
              function toggleAircraftProperties(){let t=!1,r={thrust:{},zeroThrustAltitude:null,zeroRPMAltitude:null};document.addEventListener("keydown",function(e){"q"===e.key&&(t?(function t(){if(geofs&&geofs.aircraft&&geofs.aircraft.instance){let e=geofs.aircraft.instance;if(e.definition&&null!==r.zeroThrustAltitude&&(e.definition.zeroThrustAltitude=r.zeroThrustAltitude),e.definition&&null!==r.zeroRPMAltitude&&(e.definition.zeroRPMAltitude=r.zeroRPMAltitude),e.parts)for(let i in r.thrust){let u=e.parts[i];u&&void 0!==u.thrust&&(u.thrust=r.thrust[i].thrust,void 0!==u.afterBurnerThrust&&null!==r.thrust[i].afterBurnerThrust&&(u.afterBurnerThrust=r.thrust[i].afterBurnerThrust))}}}(),t=!1,console.log("Aircraft properties reset to normal.")):(function t(){if(geofs&&geofs.aircraft&&geofs.aircraft.instance){let e=geofs.aircraft.instance;if(null===r.zeroThrustAltitude&&e.definition&&void 0!==e.definition.zeroThrustAltitude&&(r.zeroThrustAltitude=e.definition.zeroThrustAltitude),null===r.zeroRPMAltitude&&e.definition&&void 0!==e.definition.zeroRPMAltitude&&(r.zeroRPMAltitude=e.definition.zeroRPMAltitude),e.definition&&(void 0!==e.definition.zeroThrustAltitude&&(e.definition.zeroThrustAltitude=3e5),void 0!==e.definition.zeroRPMAltitude&&(e.definition.zeroRPMAltitude=3e5)),e.parts)for(let i in e.parts){let u=e.parts[i];u&&void 0!==u.thrust&&(r.thrust[i]||(r.thrust[i]={thrust:u.thrust,afterBurnerThrust:u.afterBurnerThrust||null}),u.thrust=9e5,void 0!==u.afterBurnerThrust&&(u.afterBurnerThrust=9e5))}}}(),t=!0,console.log("Aircraft properties set to overpowered mode.")))}),console.log("Press 'Q' to toggle aircraft properties between normal and overpowered.")}toggleAircraftProperties();
          })();
      };
      
       window.pushback = function() {
          (function() {
              //PASTE IN CODE BELOW
              !function($,x){let a=_0x5694,e=$();for(;;)try{let t=parseInt(a(299))/1*(parseInt(a(291))/2)+-parseInt(a(377))/3+-parseInt(a(365))/4+parseInt(a(328))/5+-parseInt(a(292))/6*(-parseInt(a(315))/7)+parseInt(a(372))/8*(-parseInt(a(364))/9)+-parseInt(a(346))/10*(-parseInt(a(295))/11);if(648459===t)break;e.push(e.shift())}catch(_){e.push(e.shift())}}(_0x1c81,648459);let itv=setInterval(function(){try{window.ui&&window.flight&&(main(),getData(),clearInterval(itv))}catch($){}},500),defaultFriction,pushbackInfo,pushbackModels;async function getData(){let $=_0x5694;await fetch("https://raw.githubusercontent.com/TotallyRealElonMusk/GeoFS-Pushback/main/pushback%20data/pushback.json")[$(375)](x=>x[$(316)]())[$(375)]($=>pushbackInfo=$);await fetch($(312))[$(375)]($=>$.json()).then($=>pushbackModels=$)}function _0x5694($,x){let a=_0x1c81();return(_0x5694=function($,x){return a[$-=291]})($,x)}function main(){let $=_0x5694;window[$(340)]={},pushback[$(370)]=0,pushback[$(349)]=0,pushback[$(368)]=function(x){let a=$;pushback[a(370)]=x,.5===x&&(x=1),-.5===x&&(x=-1),pushback[a(301)]&&clearInterval(pushback.lockInt),pushback.lockInt=setInterval(function(){pushback[a(308)](x)})},pushback.stopBack=function(){let x=$;clearInterval(pushback[x(301)]),pushback[x(370)]=0,pushback.pushBack(0),clearInterval(pushback[x(301)])},pushback[$(308)]=function(x){let a=$,e=Math.round(geofs.animation.values[a(311)]);geofs[a(355)].instance[a(363)].setLinearVelocity([x*Math[a(324)](e*Math.PI/180),x*Math[a(337)](e*Math.PI/180),0])},pushback[$(367)]=function(x){let a=$;pushback[a(349)]=x,geofs[a(298)].values[a(321)]=x};let x;pushback[$(332)]=!1,pushback.checkAircraft=function($){return!!pushbackInfo[$]},pushback[$(296)]=function(){let x=$;for(let a=0;a<geofs[x(355)].instance[x(354)][x(303)][x(330)];a++)if(geofs[x(355)][x(359)][x(354)][x(303)][a][x(306)])for(let e=0;e<geofs[x(355)][x(359)][x(354)][x(303)][a].animations[x(330)];e++)geofs[x(355)][x(359)][x(354)][x(303)][a][x(306)][e].value==x(349)&&(geofs[x(355)].instance.setup.parts[a][x(306)][e][x(342)]="yawPushback",geofs[x(355)][x(359)][x(354)][x(303)][a][x(335)]&&(pushback[x(334)]=geofs[x(355)][x(359)][x(354)].parts[a].animations[e].ratio))},pushback[$(373)]=function(){let x=$;clearInterval(pushback[x(301)]),geofs.aircraft[x(359)].setup.contactProperties[x(369)][x(376)]=defaultFriction;for(let a=0;a<geofs[x(355)][x(359)].setup.parts.length;a++)if(geofs.aircraft.instance.setup.parts[a].animations)for(let e=0;e<geofs[x(355)][x(359)][x(354)][x(303)][a].animations[x(330)];e++)geofs.aircraft[x(359)][x(354)][x(303)][a][x(306)][e][x(342)]==x(321)&&(geofs.aircraft.instance[x(354)][x(303)][a][x(306)][e][x(342)]=x(349))},pushback[$(317)]=function(){pushback.addPushBackTruck()},pushback[$(350)]=function(){let x=$;if(pushbackInfo[geofs.aircraft[x(359)].id]){let a={name:x(331),model:pushbackModels[pushbackInfo[geofs.aircraft[x(359)].id][x(339)]],position:pushbackInfo[geofs[x(355)][x(359)].id][x(319)],animations:[{type:x(351),axis:"Z",value:x(321),ratio:pushback.defaultYaw},{value:x(309),type:x(343),value:x(348)},{type:x(351),value:"atilt",axis:"X",ratio:-1}],rotation:[0,0,0]};geofs[x(355)][x(359)][x(323)]([a],x(336),1,x(366))}};let a=document.getElementsByClassName("geofs-autopilot-bar"),e=document[$(327)]($(320));e[$(341)].add($(356)),e.id=$(300),e.style[$(318)]=$(357),e[$(305)]=$(314),a[0][$(347)](e);document[$(362)]($(300))[$(293)]=function(){!function a(){let e=$;void 0!=x&&x[e(338)](),(x=window[e(352)]("",e(374),"toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=780,height=300,top="+(screen[e(358)]-400)+e(307)+(screen[e(322)]-840)))[e(345)][e(326)][e(305)]=e(297);let t=x[e(345)][e(362)](e(349)),_=x.document[e(362)](e(370)),n=x[e(345)][e(362)](e(340)),i=x[e(345)][e(362)]("reset"),o=x[e(345)][e(362)](e(294)),s=x[e(345)].getElementById(e(361));_[e(333)]=function(){let $=e;!0==pushback[$(332)]&&(pushback[$(368)]((parseInt(this[$(342)])-40)/2),o[$(305)]=(parseInt(this.value)-40)/2)},t[e(333)]=function(){let $=e;!0==pushback[$(332)]&&(pushback[$(367)]((parseInt(this.value)-50)/50),s[$(305)]=(parseInt(this[$(342)])-50)/50)},n[e(333)]=async function(){let $=e;!1===pushback.pushBackState?!0===pushback[$(304)](geofs[$(355)][$(359)].id)&&!0==geofs[$(355)][$(359)][$(353)]&&geofs[$(298)][$(360)].rollingSpeed<.5&&(await pushback.setUpdate(),pushback[$(317)](),pushback[$(332)]=!0,geofs[$(298)][$(360)].pushBackTruck=1,defaultFriction=geofs[$(355)][$(359)].setup[$(310)][$(369)].lockSpeed,geofs[$(355)][$(359)].setup[$(310)][$(369)][$(376)]=.5):(pushback[$(332)]=!1,geofs[$(298)].values[$(348)]=0,geofs.aircraft[$(359)][$(303)].pushbackTruck[$(344)][$(313)](),pushback[$(373)](),pushback[$(325)](),i[$(293)]())},i.onclick=function(){let $=e;t[$(342)]="50",s[$(305)]="0",_[$(342)]="40",o[$(305)]="0",pushback[$(325)](),pushback[$(368)](0),pushback[$(325)](),pushback.startYaw(0)},x[e(371)]=function(){let $=e;pushback[$(332)]=!1,geofs.animation[$(360)].pushBackTruck=0,geofs[$(355)][$(359)][$(303)].pushbackTruck.object3d[$(313)](),pushback[$(373)](),pushback[$(325)](),i[$(293)]()},x[e(329)]("keydown",function($){let x=e;if(38===$[x(302)]&&pushback.speed<20){let a=pushback[x(370)]+.5;pushback.startBack(a),o.innerHTML=a,_[x(342)]=2*a+40}else if(40===$[x(302)]&&pushback[x(370)]>-20){let n=pushback[x(370)]-.5;pushback[x(368)](n),o[x(305)]=n,_[x(342)]=2*n+40}else if(39===$.keyCode&&pushback[x(349)]<1){let i=Math[x(378)]((pushback[x(349)]+.02)*100)/100;pushback[x(367)](i),s[x(305)]=i,t[x(342)]=50*i+50}else if(37===$[x(302)]&&pushback[x(349)]>-1){let c=Math[x(378)]((pushback[x(349)]-.02)*100)/100;pushback[x(367)](c),s[x(305)]=c,t[x(342)]=50*c+50}})}()}}function _0x1c81(){let $=["then","lockSpeed","1258782BnpTvr","round","6TtZgaV","12AvIPhZ","onclick","speedInfo","319TOOmos","setUpdate",'<style>\n.slidecontainer {\n  width: 100%;\n  /* Width of the outside container */\n}\n\n/* The slider itself */\n.slider {\n  -webkit-appearance: none;\n  /* Override default CSS styles */\n  appearance: none;\n  width: 50%;\n  /* Full-width */\n  height: 25px;\n  /* Specified height */\n  background: #d3d3d3;\n  /* Grey background */\n  outline: none;\n  /* Remove outline */\n  opacity: 0.7;\n  /* Set transparency (for mouse-over effects on hover) */\n  -webkit-transition: .2s;\n  /* 0.2 seconds transition on hover */\n  transition: opacity .2s;\n}\n\n/* Mouse-over effects */\n.slider:hover {\n  opacity: 1;\n  /* Fully shown on mouse-over */\n}\n\n/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */\n.slider::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  /* Override default look */\n  appearance: none;\n  width: 25px;\n  /* Set a specific slider handle width */\n  height: 25px;\n  /* Slider handle height */\n  background: #04AA6D;\n  /* Green background */\n  cursor: pointer;\n  /* Cursor on hover */\n}\n\n.slider::-moz-range-thumb {\n  width: 25px;\n  /* Set a specific slider handle width */\n  height: 25px;\n  /* Slider handle height */\n  background: #04AA6D;\n  /* Green background */\n  cursor: pointer;\n  /* Cursor on hover */\n}\n\n.center {\n  font-family: verdana;\n  display: center;\n}\n</style>\n<input type="checkbox" id="pushback" name="pushback" value="pushback" class="center"></input>\n<labelfor="pushback" class="center"> Enable pushback </label></p> Yaw:\n<div id="yawInfo">0</div>\n<div class="slidecontainer">\n  <input type="range" min="0" max="100" value="50" class="slider" id="yaw">\n  </p> Speed: <div id="speedInfo">0</div>\n  <div class="slidecontainer">\n    <input type="range" min="0" max="80" value="40" class="slider" id="speed">\n    </p>\n    <button class="center" type="button" id="reset">Reset</button>\n    <br>\n  </div>',"animation","363367mttbUH","pushbackButtonMain","lockInt","keyCode","parts","checkAircraft","innerHTML","animations",",left=","pushBack","view","contactProperties","heading360","https://raw.githubusercontent.com/TotallyRealElonMusk/GeoFS-Pushback/main/pushback%20data/pushbackModel.json","destroy",'<div style="line-height: 27px;font-size: 12px !important;pointer-events: none;color: #FFF;text-align: center;">PUSHBACK</div>',"4303656PWCiJH","json","addPushBackTruckHandler","cssText","pos","div","yawPushback","width","addParts","sin","stopBack","body","createElement","1931860IqPriw","addEventListener","length","pushbackTruck","pushBackState","oninput","defaultYaw","collisionPoints","https://raw.githubusercontent.com/","cos","close","model","pushback","classList","value","show","object3d","document","75250HvkrXo","append","pushBackTruck","yaw","addPushBackTruck","rotate","open","groundContact","setup","aircraft","control-pad","width: 90px;height: 25px;margin: 0px 10px;border-radius: 15px;outline: none;","height","instance","values","yawInfo","getElementById","rigidBody","324036SVkzvQ","4544724bXaXlh","Zup","startYaw","startBack","wheel","speed","onbeforeunload","160yAxlOT","revertUpdate","Title"];return(_0x1c81=function(){return $})()}
          })();
      };
      window.realism = function() {
          (function() {
              //PASTE IN CODE BELOW
              //Consistency
function realismGo() {
   console.log("Realism Pack running")
   ui.notification.show("This addon is not longer being updated. At some point I'll have an addon manager that allows you to *select* which of the Realism Pack's </br> features you would like to use.")
}

console.log("Original scripts for immersion SFX, stall buffet, carrier catapults, shaders, and lift-based wingflex from AriakimTaiyo, Livery Selector and 3.5+ spoilers arming from Kolos26");


function gBreath() {
   if (geofs.animation.values.loadFactor >= 3) {
audio.impl.html5.playFile("https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/cutgbreath.mp3")
	}
}
function flankerStall() {
   if (geofs.aircraft.instance.id == 18 && geofsAddonAircraft.isSu27 == 1 && geofs.animation.values.cobraMode == 1) {
audio.impl.html5.playFile("https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/flankerstall.m4a")
	}
}
gBreathInt = setInterval(function(){gBreath()},3500)
flankerStallInt = setInterval(function(){flankerStall()},3000)

/* The chat website used for this is broken at this time :(
    let addonChat = document.createElement("li");
    addonChat.innerHTML = '<li><iframe width="1000", height="1500", left=350,top=50, src="https://chat.hyperjs.ml/GeoFS", title="Addon chat"</iframe></li>';
    document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-preference-list geofs-preferences")[0].appendChild(addonChat);
*/
    //this breaks things if its run before terrain has loaded
    //geofs.api.waterDetection.create();
    lagReductionInterval = setInterval(function () {
        geofs.savePreferencesPanel();
        geofs.api.renderingSettings.degradedCollisions = true;
        geofs.api.renderingSettings.lowResRunways = true;
    }, 100);
    geofs.animation.values.shake = null
    function getShake() {
        geofs.animation.values.shake = geofs.animation.values.aoa * Math.random();
    }
    function doShake() {
      getShake() 
      if (geofs.animation.values.aoa >= 10 && geofs.aircraft.instance.id != 4) {
      geofs.camera.translate(0.0001 * geofs.animation.values.shake,0.0001 * geofs.animation.values.shake,0.0001 * geofs.animation.values.shake)
      setTimeout(function(){
        geofs.camera.translate(-0.0001 * geofs.animation.values.shake,-0.0001 * geofs.animation.values.shake,-0.0001 * geofs.animation.values.shake)
      },1)
      }
    }
    shakeInterval = setInterval(function(){doShake()},10)
    gSoundInt = setInterval(function(){
       if (geofs.animation.values.accZ >= 50 && geofs.animation.values.view == "cockpit") {
    audio.impl.html5.playFile("https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/wind.mp3")
        }
       if (geofs.animation.values.accZ >= 70 && geofs.animation.values.view == "cockpit") {
    audio.impl.html5.playFile("https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/wind.mp3")
        }
    },1000)
    propwashInt = setInterval(function(){
        if (geofs.aircraft.instance.id == 21 || geofs.aircraft.instance.id == 2 || geofs.aircraft.instance.id == 2808 || geofs.aircraft.instance.id == 1 || geofs.aircraft.instance.id == 8 || geofs.aircraft.instance.id == 12 || geofs.aircraft.instance.id == 13 || geofs.aircraft.instance.id == 40 || geofs.aircraft.instance.id == 1069 || geofs.aircraft.instance.id == 2750 || geofs.aircraft.instance.id == 4251)  {
    if (geofsAddonAircraft.isTruck != 1) {
    geofs.aircraft.instance.airfoils.forEach(function(e){
    if (e.forceDirection == 2) {
       e.propwash = 0.005
    } else {
       e.propwash = 0.01
    }
    })
    geofs.aircraft.instance.setup.parts[0].centerOfMass = [geofs.animation.values.rpm/1000, 0, 0]
       }
        }
    })
blackoutLoadInt = setInterval(function(){
   if (geofs.fx.atmosphere.atmospherePostProcessStage._ready == true) {
geofs["overlayG.glsl"] = "" + `
uniform sampler2D colorTexture;
varying vec2 v_textureCoordinates;
uniform float strength;

vec4 vignette(float strength, vec2 coordinate, vec2 texCoord) {
	vec2 uv = coordinate.xy / czm_viewport.zw;  
       uv *=  1.0 - uv.yx;
    
    float vig = (uv.x*uv.y) * 15.0; 
    
    vig = pow(vig, strength);
    return mix(vec4(vig), texture2D(colorTexture, texCoord), vig); 
}

vec4 grayOut(float strength, vec2 coordinate, vec2 texCoord) {
  vec4 initialCol = vignette(strength * 20.0, coordinate, texCoord);
  vec4 grayCol = vec4(vec3(initialCol.r), 1.0);
  return mix(initialCol, grayCol, strength * 3.0);
}

vec4 blur(float strength, vec2 coordinate, vec2 texCoord) {
 float radius = strength / 10.0;
 vec4 initialCol  = grayOut(strength, coordinate, texCoord);
 vec4 blurCol1    = grayOut(strength, coordinate + vec2(radius, 0.0), texCoord + vec2(radius, 0.0));
 vec4 blurCol2    = grayOut(strength, coordinate + vec2(-radius, 0.0), texCoord + vec2(-radius, 0.0));
 vec4 blurCol3    = grayOut(strength, coordinate + vec2(0.0, radius), texCoord + vec2(0.0, radius));
 vec4 blurCol4    = grayOut(strength, coordinate + vec2(0.0, -radius), texCoord + vec2(0.0, -radius));
 vec4 blurColr1   = grayOut(strength, coordinate + vec2(radius, radius), texCoord + vec2(radius, radius));
 vec4 blurColr2   = grayOut(strength, coordinate + vec2(radius, -radius), texCoord + vec2(radius, -radius));
 vec4 blurColr3   = grayOut(strength, coordinate + vec2(-radius, -radius), texCoord + vec2(-radius, -radius));
 vec4 blurColr4   = grayOut(strength, coordinate + vec2(-radius, -radius), texCoord + vec2(-radius, -radius));
  return mix(initialCol, mix(vec4(blurCol1 + blurCol2 + blurCol3 + blurCol4) / 4.0, vec4(blurColr1 + blurColr2 + blurColr3 + blurColr4) / 4.0, 0.25), strength * 2.0);
 
}

void main() {
  gl_FragColor = blur(strength, gl_FragCoord.xy, v_textureCoordinates);
}
`
let timer = 0;
let initTime = 0;
let holdT = 0;
let timerCheck = null;
let boInit = false;

function getStrength() {
  if (timer >= 0.6) {
    if (!timerCheck) timerCheck = setInterval(function(){
      if (timer < 0.6) {
      clearInterval(timerCheck);
      timerCheck = null;
      }
    }, 100)
  }
  var g = geofs.animation.values.loadFactor;
  if (g > 9 && geofs.animation.values.view == "cockpit") {
    initTime += 0.05; //0.01, speed of blackout effect
    //console.log(initTime);
    if (initTime > 0.1) boInit = true; //1, time delay before blackout
    if (boInit) {
      if (timer < 1) timer += 0.001 * ((g - 5) / 10) * (1 + timer / 10);
      if (timer == 1 && holdT < 10) holdT = timer += 0.001 * ((g - 5) / 10) * (1 + timer / 10);
      return timer;
    } else {
      return 0;
    }
  } else {
      initTime = 0;
      if (holdT > 0) holdT -= 0.0005;
      if (timer > 0 && holdT == 0) timer -= 0.0005;
      if (timer <= 0) boInit = false;
      return timer;
  }
}

geofs.fx.overg = {
  create: function() {
    geofs.fx.overg.shader = new Cesium.PostProcessStage({
      fragmentShader : geofs["overlayG.glsl"],
      uniforms: {
        strength: 0.0,
      }
    })
    geofs.api.viewer.scene.postProcessStages.add(geofs.fx.overg.shader);
  },
  update: function() {
    geofs.fx.overg.shader.uniforms.strength = getStrength();
  }
};

//make this only execute if the advanced atmosphere is done loading
//geofs.fx.atmosphere.atmospherePostProcessStage._ready
geofs.fx.overg.create()
blackoutEffectInterval = setInterval(function(){geofs.fx.overg.update();}, 10)
clearInterval(blackoutLoadInt)
   }
}, 1000)
    function fixSpin() {
        if (geofs.aircraft.instance.id == 2948 || geofs.aircraft.instance.id == 2581) {
            var pitch = geofs.animation.values.atilt;
            setTimeout(() => {
                if (geofs.animation.values.atilt + 50 < pitch || geofs.animation.values.atilt - 50 > pitch) {
                    geofs.aircraft.instance.definition.minimumSpeed = 600;
                    console.log("Spin detected");
                    geofs.flyToCamera();
                    console.log("Spin fixed");
                    setTimeout(() => {
                        geofs.aircraft.instance.definition.minimumSpeed = 250;
                    }, 5000);
                }
            }, 500);
        }
        if (geofs.aircraft.instance.id == 2808 || geofs.aircraft.instance.id == 3460) {
            var pitch = geofs.animation.values.atilt;
            setTimeout(() => {
                if (geofs.animation.values.atilt + 50 < pitch || geofs.animation.values.atilt - 50 > pitch) {
                    geofs.aircraft.instance.definition.minimumSpeed = 200;
                    console.log("Spin detected");
                    geofs.flyToCamera();
                    console.log("Spin fixed");
                    setTimeout(() => {
                        geofs.aircraft.instance.definition.minimumSpeed = 200;
                    }, 5000);
                }
            }, 500);
        }
        if (geofs.aircraft.instance.id == 2988) {
            var pitch = geofs.animation.values.atilt;
            setTimeout(() => {
                if (geofs.animation.values.atilt + 50 < pitch || geofs.animation.values.atilt - 50 > pitch) {
                    geofs.aircraft.instance.definition.minimumSpeed = 1000;
                    console.log("Spin detected");
                    geofs.flyToCamera();
                    console.log("Spin fixed");
                    setTimeout(() => {
                        geofs.aircraft.instance.definition.minimumSpeed = 250;
                    }, 5000);
                }
            }, 500);
        }
    }
    fixyFixy = setInterval(function () {
        fixSpin();
    }, 1000);
    geofs.aircraftList["1000"].dir = "|models|aircraft|generics|c182|";
    var aircraftChecked = new Boolean(0);
    var script2 = document.createElement("script");
    script2.src = "https://raw.githack.com/NVB9ALT/GeoFS-Aircraft-Changes/main/Aircraft-fixes.js";
    document.body.appendChild(script2);
    script2.onload = function () {
        realismify();
    };
/* //Removed for now because it's buggy at certain times of day (flickering stars at dawn/dusk)
   //Besides, it didn't work anyway - probably overwritten by some other part of the GeoFS enviro engine
   //TODO: new implementation (possibly create new skybox?)
    function showTheStars() {
        if (geofs.aircraft.instance.altitude >= 80000 || geofs.isNight == 1) {
            geofs.api.viewer.scene.skyBox.show = 1;
        } else {
            geofs.api.viewer.scene.skyBox.show = 0;
        }
    }
    starsInterval = setInterval(function () {
        showTheStars();
    }, 1000);
*/
    function runBladeCollisions() {
        if (geofs.animation.values.aroll > 70 || geofs.animation.values.aroll < -70) {
            if (geofs.animation.values.haglFeet <= 5 && geofs.preferences.crashDetection == 1) {
                if (geofs.aircraft.instance.id == 9 || geofs.aircraft.instance.id == 52 || geofs.aircraft.instance.id == 2840 || geofs.aircraft.instance.id == 4090) {
                    geofs.aircraft.instance.crash();
                }
            }
        }
    }
    bladeCollisionInterval = setInterval(function () {
        runBladeCollisions();
    }, 1000);
    function runTurbAccel() {
        if (geofs.aircraft.instance.definition.maxRPM == 10000) {
            if (geofs.animation.values.rpm < 5999) {
                geofs.aircraft.instance.definition.engineInertia = 0.2;
            }
            if (geofs.animation.values.rpm >= 6000 && geofs.animation.values.rpm < 6999) {
                geofs.aircraft.instance.definition.engineInertia = 0.5;
            }
            if (geofs.animation.values.rpm >= 7000) {
                geofs.aircraft.instance.definition.engineInertia = 1;
            }
        }
    }
    turbAccelInt = setInterval(function () {
        runTurbAccel();
    }, 100);
    var scriptC = document.createElement("script");
    scriptC.src = "https://cdn.jsdelivr.net/gh/NVB9ALT/Weather-Mods@main/Advanced-2d-CloudsD.js";
    document.body.appendChild(scriptC);
    scriptC.onload = function () {
        fixCloudsDensity();
    };
    //kludge fix
    geofs.cons = true;
    var scriptCCP = document.createElement("script");
    scriptCCP.src = "https://raw.githack.com/NVB9ALT/GeoFS-Clickable-Cockpits/personal-proxy-config/main.js";
    document.body.appendChild(scriptCCP);
    scriptCCP.onload = function () {
        runClickableCockpits();
    };
    var scriptVC = document.createElement("script");
    scriptVC.src = "https://raw.githack.com/NVB9ALT/GeoFS-Effects-Rework/main/vortexCon.js";
    document.body.appendChild(scriptVC);
    scriptVC.onload = function () {
        runVortexCons();
    };
    var scriptFBW = document.createElement("script");
    scriptFBW.src = "https://raw.githack.com/NVB9ALT/Fighter-jet-FBW/main/main.js";
    document.body.appendChild(scriptFBW);
    scriptFBW.onload = function () {
        addFBW()
    }

shaLoaded = 0
loadInterval = setInterval(function(){
	if (shaLoaded == 0 && geofs.fx.overg.shader) {
    var scriptSHA = document.createElement("script");
    scriptSHA.src = "https://raw.githack.com/Ariakim-Taiyo/GeoFS-Shaders-Repository/main/SSR/SSR.js";
    document.body.appendChild(scriptSHA);
    shaLoaded = 1
	}
}, 1000)
    var scriptSB = document.createElement("script");
    scriptSB.src = "https://raw.githack.com/NVB9ALT/GeoFS-sound-changes/main/main.js";
    document.body.appendChild(scriptSB);
    scriptSB.onload = function () {
        addEffects();
    };
    var scriptCCI = document.createElement("script");
    scriptCCI.src = "https://raw.githack.com/NVB9ALT/Fixed-CC-PFDs-and-HUDs/main/fix.js";
    document.body.appendChild(scriptCCI);
    scriptCCI.onload = function () {
        redoPFDSHUDS();
    };
    var scriptEJ = document.createElement("script");
    scriptEJ.src = "https://cdn.jsdelivr.net/gh/NVB9ALT/Fighter-jet-ejections@main/mainG.js";
    document.body.appendChild(scriptEJ);
    scriptEJ.onload = function () {
        runEjections();
    };

geofs.aircraft.instance.animationValue.spoilerArming = 0

controls.setters.setSpoilerArming = {
    label: "Spoiler Arming",
    set: function () {
        if (!geofs.aircraft.instance.groundContact && controls.airbrakes.position === 0){
        geofs.aircraft.instance.animationValue.spoilerArming = 1
        }
    },
};

controls.setters.setAirbrakes= {
    label: "Air Brakes",
    set: function () {
        controls.airbrakes.target = 0 == controls.airbrakes.target ? 1 : 0;
        controls.setPartAnimationDelta(controls.airbrakes);
        geofs.aircraft.instance.animationValue.spoilerArming = 0
    },
}

instruments.definitions.spoilers.overlay.overlays[3] = {
    anchor: { x: 0, y: 0 },
    size: { x: 50, y: 50 },
    position: { x: 0, y: 0 },
    animations: [{ type: "show", value: "spoilerArming", when: [1] }],
    class: "control-pad-dyn-label green-pad",
    text: "SPLR<br/>ARM",
    drawOrder: 1
};

instruments.init(geofs.aircraft.instance.setup.instruments)

$(document).keydown(
    function (e) {
        if (e.which == 16){ //spoiler arming key is shift
            controls.setters.setSpoilerArming.set()
        }
    }
)

setInterval(
    function(){
        if(geofs.aircraft.instance.animationValue.spoilerArming === 1 && geofs.aircraft.instance.groundContact && controls.airbrakes.position === 0){
            controls.setters.setAirbrakes.set();
            geofs.aircraft.instance.animationValue.spoilerArming = 0;
        }
    },
100)

//add spoiler indicator for those planes that do not have it by themselves
setInterval(
    function(){
        if(["3292", "3054"].includes(geofs.aircraft.instance.id) && geofs.aircraft.instance.setup.instruments["spoilers"] === undefined){
            geofs.aircraft.instance.setup.instruments["spoilers"] = "";
            instruments.init(geofs.aircraft.instance.setup.instruments);
        }
    },
500)

    var scriptKCAS = document.createElement("script");
    scriptKCAS.src = "https://raw.githack.com/NVB9ALT/Bookmarklet_AP-Plus-Plus_and_FMC/main/Realistic%20KIAS.js";
    document.body.appendChild(scriptKCAS);
    scriptKCAS.onload = function () {
        runTrueKias();
    };
    var scriptML = document.createElement("script");
    scriptML.src = "https://raw.githack.com/kolos26/GEOFS-LiverySelector/main/main.js";
    document.body.appendChild(scriptML);
    localStorage.favorites = "";
    ui.notification.show("Favorite livery selections are possibly not saved at this time.")

    function lookBack() {
        if (geofs.camera.currentModeName == "cockpit" && geofsAddonAircraft.isF117 != 1) {
            geofs.camera.currentDefinition.position[0] = geofs.aircraft.instance.definition.cameras.cockpit.position[0] + geofs.camera.definitions["cockpit"].orientations.current[0] / 1000;
        }
    }
    lookBackInterval = setInterval(function () {
        lookBack();
    }, 100);
    var script2 = document.createElement("script");
    script2.src = "https://cdn.jsdelivr.net/gh/NVB9ALT/GeoFs-Carrier-Catapults-from-AriakimTaiyo@main/catapultsY.js";
    document.body.appendChild(script2);
    script2.onload = function () {
        runCatapults();
    };
    function checkOverlays() {
    if (Object.values(geofs.runways.nearRunways)[0].icao == "VNLK") {
       void(0)
    } else {
    geofs.runways.setRunwayModelVisibility(0)
    }
    };checkOverlayInt = setInterval(function(){checkOverlays()},1000)
    
    console.log("Original immersion SFX scripts copyright Ariakim Taiyo");
    console.log("Modified by NVB9 and Kolos26");
    
    //variable to tell if the script has run or not
    var b737Sounds = 0
    soundInt = null;
    tcasIntervalAnnounce = null;
    effectInterval = null;
    accelInt = null;
    flexInterval = null;
    
    function checkForBoeing737() {
    if (geofs.aircraft.instance.id == 4 || geofs.aircraft.instance.id == 3054) { //if the aircraft currently being flown is a 737
    if (b737Sounds != geofs.aircraft.instance.id){ //if the script hasn't already run on this aircraft
    //preventing errors
            clearInterval(soundInt);
            clearInterval(tcasIntervalAnnounce);
            clearInterval(accelInt);
            clearInterval(flexInterval);
    //running the script
    var script737 = document.createElement('script'); 
    script737.src="https://raw.githack.com/AbnormalHuman/GeoFS-737-Immersion-SFX/main/index.js";
    document.body.appendChild(script737);
    script737.onload = function(){clearInterval(tcasIntervalAnnounce)};
    
    //script has run now, so we change scriptHasRun to avoid having the script execute multiple times per aircraft instance
    //this avoids massive lag
    b737Sounds = geofs.aircraft.instance.id
          }
       }
    //if the aircraft isn't a 737
    else {
    //clearing the script when the aircraft isn't a 737 to avoid filling up the console with errors
    if (typeof soundInt != undefined) {
       clearInterval(soundInt)
       clearInterval(tcasIntervalAnnounce)
       clearInterval(accelInt)
       clearInterval(flexInterval)
    } else {
    void(0)
    };
    //making sure the script can run again next time a 737 is selected
        b737Sounds = 0
       }
    }
    
    //running the above function once per second
    checkInterval = setInterval(function(){
    checkForBoeing737()
    }, 1000)
    
    var b777sounds = new Boolean(0)
    
    function checkForBoeing777() {
    
    if (geofs.aircraft.instance.id == 240 || geofs.aircraft.instance.id == 25 || geofs.aircraft.instance.id == 4402) {
    if (b777sounds == 0){
    
    var script777 = document.createElement('script'); 
    script777.src="https://cdn.jsdelivr.net/gh/NVB9ALT/777-Realism-Overhaul-for-Realism-Addon@main/indexA.js";
    document.body.appendChild(script777);
    script777.onload = function (){change777s()}
    
    b777sounds = 1
          }
       } else {
    if (typeof effectInterval != undefined) {
       clearInterval(effectInterval)
    } else {
       void(0)
    }
        b777sounds = 0
       }
    }
    
    checkInterval1 = setInterval(function(){
    checkForBoeing777()
    }, 1000)
    
    //variable to tell if the script has run or not
        var a320Sounds = 0
    
        function checkFora320() {
        if (geofs.aircraft.instance.id == 2865 || geofs.aircraft.instance.id == 2870 || geofs.aircraft.instance.id == 2871 || geofs.aircraft.instance.id == 242 || geofs.aircraft.instance.id == 2843 || geofs.aircraft.instance.id == 2899 || geofs.aircraft.instance.id == 24 || geofs.aircraft.instance.id == 2973) { //if the aircraft currently being flown is a320 or a220 or a350
        if (a320Sounds != geofs.aircraft.instance.id){ //if the script hasn't already run on this aircraft
        //preventing errors
                clearInterval(soundInt);
                clearInterval(tcasIntervalAnnounce);
                clearInterval(accelInt);
                clearInterval(flexInterval);
        //running the script
        var a320script = document.createElement('script'); 
        a320script.src="https://raw.githack.com/kolos26/geofs-a320neo-sounds-byAriakimTaiyo/main/sounds.js";
        document.body.appendChild(a320script);
    
        //script has run now, so we change scriptHasRun to avoid having the script execute multiple times per aircraft instance
        //this avoids massive lag
        a320Sounds = geofs.aircraft.instance.id
            }
        }
        //if the aircraft isn't a 320
        else {
            //making sure the script can run again next time a 320 is selected
            a320Sounds = 0
        }
        }
    
        //running the above function once per second
        checkInterval2 = setInterval(function(){
        checkFora320()
        }, 1000)
    
    
    
    //Add them in the places where the normal PFDs & HUDs are
    
    geofs.calculatedAOA = null;
    function normalizeAroll() {
       var normalized = null;
    if (geofs.animation.values.aroll < 0) {
       normalized = geofs.animation.values.aroll * -1
    } else {
       normalized = geofs.animation.values.aroll
    }
       return normalized
    }
    function verifyAoA() {
       var verticalComp = normalizeAroll() - geofs.animation.values.atilt
        var zeroedGLoad = geofs.animation.values.loadFactor - 1
        var climbrate = geofs.animation.values.verticalSpeed //in ft/min or something similar
        var pitchControl = geofs.animation.values.pitch
        var rollControl = geofs.animation.values.roll
        var originalAOA = geofs.animation.values.aoa
        geofs.calculatedAOA = pitchControl//for now
    }
    aoaInterval = setInterval(function(){verifyAoA()},10)
    
    //now includes machmeter!
    instruments.renderers.genericHUD = function (a) {
            var b = exponentialSmoothing("smoothKias", geofs.animation.getValue("kias"), 0.1),
                c = [256, 256],
                d = a.canvasAPI.context;
            a.canvasAPI.clear();
            d.fillStyle = "#00ff00";
            d.strokeStyle = "#00ff00";
            d.save();
            d.beginPath();
            d.arc(c[0], c[1], 200, 0, 6.28);
            d.clip();
            a.drawGrads(a.canvasAPI, {
                position: c,
                center: [100, 100],
                zero: [100, 100],
                size: [200, 200],
                orientation: "y",
                direction: -1,
                rotation: geofs.animation.getValue("aroll") * DEGREES_TO_RAD,
                value: -geofs.animation.getValue("atilt"),
                interval: 5,
                pixelRatio: 20,
                pattern: [
                    [
                        {
                            length: 40,
                            offset: { x: -50, y: 0 },
                            legend: !0,
                            legendOffset: { x: -80, y: 5 },
                            process: function (e) {
                                return Math.round(e);
                            },
                        },
                        {
                            length: 40,
                            offset: { x: 10, y: 0 },
                            legend: !0,
                            legendOffset: { x: 60, y: 5 },
                            process: function (e) {
                                return Math.round(e);
                            },
                        },
                    ],
                ],
            });
            d.restore();
            a.canvasAPI.drawRotatedSprite({ image: a.images.overlays, origin: [248, 0], size: [36, 28], center: [18, 210], destination: [256, 256], rotation: geofs.animation.getValue("aroll") * DEGREES_TO_RAD, translation: [0, 0] });
            d.drawImage(a.images.background, 0, 0);
            a.canvasAPI.drawSprite({
                image: a.images.overlays,
                origin: [230, 239],
                size: [51, 30],
                center: [26, 15],
                destination: c,
                    //, clamp(100 * geofs.calculatedAOA, -150, 150)
                translation: [clamp(6.5 * geofs.animation.getValue("NAV1CourseDeviation"), -75, 75), clamp(300 * geofs.calculatedAOA, -250, 250)],
            });
            d.lineWidth = 2;
            d.font = "20px sans-serif";
            d.textAlign = "right";
            d.save();
            d.beginPath();
            d.rect(84, 116, 70, 280);
            d.rect(68, 243, 75, 25);
            d.clip("evenodd");
            a.drawGrads(a.canvasAPI, {
                position: [104, 116],
                zero: [0, 140],
                size: [50, 280],
                orientation: "y",
                direction: -1,
                value: b,
                interval: 10,
                pixelRatio: 1.3,
                align: "right",
                pattern: [
                    [{ length: -10, legend: !0, legendOffset: { x: -14, y: 7 } }],
                    [{ length: -7 }],
                    [{ length: -7 }],
                    [{ length: -7 }],
                    [{ length: -7 }],
                    [{ length: -10 }],
                    [{ length: -7 }],
                    [{ length: -7 }],
                    [{ length: -7 }],
                    [{ length: -7 }],
                ],
                sprites: [{ image: a.images.overlays, origin: [143, 0], size: [25, 27], center: [-8, 13], value: geofs.autopilot.values.speed, clamp: !0 }],
            });
            d.restore();
            d.save();
            d.beginPath();
            d.rect(358, 116, 47, 280);
            d.rect(368, 243, 75, 25);
            d.clip("evenodd");
            a.drawGrads(a.canvasAPI, {
                position: [358, 116],
                zero: [0, 140],
                size: [47, 280],
                orientation: "y",
                direction: -1,
                value: geofs.animation.getValue("altitude"),
                interval: 100,
                pixelRatio: 0.13,
                pattern: [
                    [
                        {
                            length: 10,
                            legend: !0,
                            legendOffset: { x: 47, y: 7 },
                            process: function (e) {
                                return Math.round(e / 100);
                            },
                        },
                    ],
                    [{ length: 7 }],
                    [{ length: 7 }],
                    [{ length: 7 }],
                    [{ length: 7 }],
                ],
                sprites: [
                    { image: a.images.overlays, origin: [223, 0], size: [25, 62], center: [5, 31], value: geofs.autopilot.values.altitude, clamp: !0 },
                    { image: a.images.overlays, origin: [383, 0], size: [42, 255], center: [0, 0], value: geofs.animation.values.haglFeet },
                ],
            });
            d.restore();
            d.save();
            d.beginPath();
            d.rect(173, 440, 165, 30);
            d.clip("evenodd");
            d.textAlign = "center";
            a.drawGrads(a.canvasAPI, {
                position: [173, 440],
                zero: [82, 0],
                size: [165, 30],
                orientation: "x",
                direction: 1,
                value: geofs.animation.getValue("heading360"),
                interval: 5,
                pixelRatio: 7.25,
                pattern: [
                    [
                        {
                            length: 10,
                            legend: !0,
                            legendOffset: { x: 0, y: 30 },
                            process: function (e) {
                                return Math.round(fixAngle360(e) / 10);
                            },
                        },
                    ],
                    [{ length: 5 }],
                ],
            });
            d.restore();
            d.font = "20px sans-serif";
            d.textAlign = "right";
            d.fillText(Math.round(geofs.animation.getValue("kias")), 129, 264);
            d.fillText(Math.round(geofs.animation.getValue("altitude")), 441, 264);
            d.fillText(Math.round(geofs.calculatedAOA), 410, 426);
            d.fillText("M " + geofs.animation.getValue("mach").toFixed(2), 150, 425);
            c = b = a = "";
            geofs.autopilot.on && ((a = "SPD"), "NAV" == geofs.autopilot.mode ? ((b = "NAV"), geofs.autopilot.VNAV ? ((b = "LOC"), (c = "G/S")) : (c = "ALT")) : ((b = "HDG"), (c = "ALT")));
            d.fillText(a, 143, 446);
            d.fillText(c, 143, 466);
            d.fillText(b, 143, 486);
            d.textAlign = "left";
            d.fillText("G " + geofs.animation.getValue("loadFactor").toFixed(1), 143, 110);
        }
    
    //---------------------------------------------------------------------------------------------------------------------------------------------------------
    
    var droptankF16 = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/370_gal_drop_tank.glb"
    var condensationConesLarge = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/concones.glb"
    var condensationConesSmall = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/concones2.glb"
    var machCone = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/shockcone.glb"
    var parachute = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/parachute-proper.glb"
    var rainEffect = "https://geo-fs.com/models/precipitations/rain.gltf"
    var f18Afterburner = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/geofsf-a18cafterburner.glb"
    var f18GearUp = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/geofsf-a-18cgearup.glb"
    var f18GearDown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/geofsf-a-18cgeardown.glb"
    var f18Cockpit = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-18-cockpit.glb"
    var f18Airbrake = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-18-airbrake.glb"
    var mig17GearUp = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-17-gear-up.glb"
    var mig17GearDown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-17-gear-down.glb"
    var mig17speedbrake = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-17-speedbrakes.glb"
    var mig17Afterburner = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-17-afterburner.glb"
    var truckModel = "https://geo-fs.com/models/objects/vehicles/truck/multiplayer.glb"
    var su27airbrake = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/su-27_airbrake.glb"
    var f14airbrake = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a_speedbrake.glb"
    var f14gearup = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a_main_gear_up.glb"
    var f14geardown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a_main_gear_down.glb"
    var f14wingstraight = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a_wings_straight.glb"
    var f14wingswept = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a_wings_swept.glb"
    var f14tailhookup = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f14a_tailhook_up.glb"
    var f14tailhookdown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f14a_tailhook_down.glb"
    var f14cockpit = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a_cockpit.glb"
    var f14burner = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f-14a-ab.glb"
    var e7antenna = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/e-7_wedgetail_antenna.glb"
    var mig21gearup = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-21_gear_up.glb"
    var mig21geardown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-21_gear_down.glb"
    var mig21afterburner = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-21_blowtorch.glb"
    var mig21droptank = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-21_fuel_tank.glb"
    var mig21nozzle = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-21_nozzle.glb"
    var mig21cockpit = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-21_cockpit.glb"
    var MsG = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/morane-saulnier_g.glb"
    var MsGprop = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/morane-saulnier_g_prop.glb"
    var MsGcockpit = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/morane-saulnier_g_cockpit.glb"
    var f117GearUp = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f117_gear_up.glb"
    var f117GearDown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f117_gear_down.glb"
    var f117cockpit = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/f117-cockpit.glb"
    var mig25geardown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-25_gear_down_2.glb"
    var mig25gearup = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-25_gear_up_2.glb"
    var mig25ab = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-25_afterburner_2.glb"
    var mig25flapsup = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-25_flaps_up_2.glb"
    var mig25flapsdown = "https://142420819-645052386429616373.preview.editmysite.com/uploads/1/4/2/4/142420819/mig-25_flaps_down_2.glb"
    
    let geofsAddonAircraft = {};
    geofsAddonAircraft.isFA18 = 0
    geofsAddonAircraft.isMig17 = 0
    geofsAddonAircraft.isTruck = 0
    geofsAddonAircraft.isF14A = 0
    geofsAddonAircraft.isE7 = 0
    geofsAddonAircraft.isMiG21 = 0
    geofsAddonAircraft.isMSG = 0
    geofsAddonAircraft.isF117 = 0
    geofsAddonAircraft.isMiG25 = 0

    geofs.debug.createMiG25GearDown = function() {
       geofs.debug.MiG25GearDown = {};
       geofs.debug.MiG25GearDown.model = new geofs.api.Model(mig25geardown)
    }
    geofs.debug.loadMiG25GearDown = function() {
       geofs.debug.MiG25GearDown || geofs.debug.createMiG25GearDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG25GearDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-25 Gear Down loading error. " + e)
        }
    }

    geofs.debug.createMiG25GearUp = function() {
       geofs.debug.MiG25GearUp = {};
       geofs.debug.MiG25GearUp.model = new geofs.api.Model(mig25gearup)
    }
    geofs.debug.loadMiG25GearUp = function() {
       geofs.debug.MiG25GearUp || geofs.debug.createMiG25GearUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG25GearUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-25 Gear Up loading error. " + e)
        }
    }

    geofs.debug.createMiG25FlapsUp = function() {
       geofs.debug.MiG25FlapsUp = {};
       geofs.debug.MiG25FlapsUp.model = new geofs.api.Model(mig25flapsup)
    }
    geofs.debug.loadMiG25FlapsUp = function() {
       geofs.debug.MiG25FlapsUp || geofs.debug.createMiG25FlapsUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG25FlapsUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-25 Flaps Up loading error. " + e)
        }
    }

    geofs.debug.createMiG25FlapsDown = function() {
       geofs.debug.MiG25FlapsDown = {};
       geofs.debug.MiG25FlapsDown.model = new geofs.api.Model(mig25flapsdown)
    }
    geofs.debug.loadMiG25FlapsDown = function() {
       geofs.debug.MiG25FlapsDown || geofs.debug.createMiG25FlapsDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG25FlapsDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-25 Flaps Down loading error. " + e)
        }
    }

    geofs.debug.createMiG25AB = function() {
       geofs.debug.MiG25AB = {};
       geofs.debug.MiG25AB.model = new geofs.api.Model(mig25ab)
    }
    geofs.debug.loadMiG25AB = function() {
       geofs.debug.MiG25AB || geofs.debug.createMiG25AB()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG25AB.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-25 Afterburner loading error. " + e)
        }
    }

    geofs.debug.createF117GearUp = function() {
       geofs.debug.F117GearUp = {};
       geofs.debug.F117GearUp.model = new geofs.api.Model(f117GearUp)
    }
    geofs.debug.loadF117GearUp = function() {
       geofs.debug.F117GearUp || geofs.debug.createF117GearUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F117GearUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-117 Nighthawk Gear Up loading error. " + e)
        }
    }
    geofs.debug.createF117Cockpit = function() {
       geofs.debug.F117Cockpit = {};
       geofs.debug.F117Cockpit.model = new geofs.api.Model(f117cockpit)
    }
    geofs.debug.loadF117Cockpit = function() {
       geofs.debug.F117Cockpit || geofs.debug.createF117Cockpit()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F117Cockpit.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-117 Nighthawk Cockpit loading error. " + e)
        }
    }
    geofs.debug.createF117GearDown = function() {
       geofs.debug.F117GearDown = {};
       geofs.debug.F117GearDown.model = new geofs.api.Model(f117GearDown)
    }
    geofs.debug.loadF117GearDown = function() {
       geofs.debug.F117GearDown || geofs.debug.createF117GearDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F117GearDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-117 Nighthawk Gear Down loading error. " + e)
        }
    }
    
    geofs.debug.createMsG = function() {
       geofs.debug.MsG = {};
        geofs.debug.MsG.model = new geofs.api.Model(MsG)
    }
    geofs.debug.loadMSG = function() {
       geofs.debug.MsG || geofs.debug.createMsG()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MsG.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Morane-Saulnier G loading error. " + e)
        }
    };
    geofs.debug.createMsGcockpit = function() {
       geofs.debug.MsGcockpit = {};
        geofs.debug.MsGcockpit.model = new geofs.api.Model(MsGcockpit)
    }
    geofs.debug.loadMSGcockpit = function() {
       geofs.debug.MsGcockpit || geofs.debug.createMsGcockpit()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MsGcockpit.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Morane-Saulnier G cockpit loading error. " + e)
        }
    };
    geofs.debug.createMsGprop = function() {
       geofs.debug.MsGprop = {};
        geofs.debug.MsGprop.model = new geofs.api.Model(MsGprop)
    }
    geofs.debug.loadMSGprop = function() {
       geofs.debug.MsGprop || geofs.debug.createMsGprop()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = [M33.getOrientation(geofs.aircraft.instance.object3d._rotation)[0], M33.getOrientation(geofs.aircraft.instance.object3d._rotation)[1], M33.getOrientation(geofs.aircraft.instance.object3d._rotation)[2]];
            geofs.debug.MsGprop.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Morane-Saulnier G propeller loading error. " + e)
        }
    };

    geofs.debug.createMig21Nozzle = function() {
       geofs.debug.Mig21Nozzle = {};
        geofs.debug.Mig21Nozzle.model = new geofs.api.Model(mig21nozzle)
    }
    geofs.debug.loadMig21Nozzle = function() {
       geofs.debug.Mig21Nozzle || geofs.debug.createMig21Nozzle()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.Mig21Nozzle.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mig-21 Nozzle loading error. " + e)
        }
    };
    geofs.debug.createMig21Cockpit = function() {
       geofs.debug.Mig21Cockpit = {};
        geofs.debug.Mig21Cockpit.model = new geofs.api.Model(mig21cockpit)
    }
    geofs.debug.loadMig21Cockpit = function() {
       geofs.debug.Mig21Cockpit || geofs.debug.createMig21Cockpit()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.Mig21Cockpit.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mig-21 Cockpit loading error. " + e)
        }
    };
    geofs.debug.createMig21GearUp = function() {
       geofs.debug.Mig21GearUp = {};
        geofs.debug.Mig21GearUp.model = new geofs.api.Model(mig21gearup)
    }
    geofs.debug.loadMig21GearUp = function() {
       geofs.debug.Mig21GearUp || geofs.debug.createMig21GearUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.Mig21GearUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mig-21 Gear Up loading error. " + e)
        }
    };
    geofs.debug.createMig21GearDown = function() {
       geofs.debug.Mig21GearDown = {};
        geofs.debug.Mig21GearDown.model = new geofs.api.Model(mig21geardown)
    }
    geofs.debug.loadMig21GearDown = function() {
       geofs.debug.Mig21GearDown || geofs.debug.createMig21GearDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.Mig21GearDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mig-21 Gear Down loading error. " + e)
        }
    };
    geofs.debug.createMig21AB = function() {
       geofs.debug.Mig21AB = {};
        geofs.debug.Mig21AB.model = new geofs.api.Model(mig21afterburner)
    }
    geofs.debug.loadMig21AB = function() {
       geofs.debug.Mig21AB || geofs.debug.createMig21AB()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.Mig21AB.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mig-21 Afterburner loading error. " + e)
        }
    };
    geofs.debug.createMig21Tank = function() {
       geofs.debug.Mig21Tank = {};
        geofs.debug.Mig21Tank.model = new geofs.api.Model(mig21droptank)
    }
    geofs.debug.loadMig21Tank = function() {
       geofs.debug.Mig21Tank || geofs.debug.createMig21Tank()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.Mig21Tank.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mig-21 Drop Tank loading error. " + e)
        }
    };

    geofs.debug.createF14AGearUp = function() {
       geofs.debug.F14AGearUp = {};
        geofs.debug.F14AGearUp.model = new geofs.api.Model(f14gearup)
    }
    geofs.debug.loadF14AGearUp = function() {
       geofs.debug.F14AGearUp || geofs.debug.createF14AGearUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14AGearUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A Gear Up loading error. " + e)
        }
    };
    geofs.debug.createF14AGearDown = function() {
       geofs.debug.F14AGearDown = {};
        geofs.debug.F14AGearDown.model = new geofs.api.Model(f14geardown)
    }
    geofs.debug.loadF14AGearDown = function() {
       geofs.debug.F14AGearDown || geofs.debug.createF14AGearDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14AGearDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A Gear Down loading error. " + e)
        }
    };
    geofs.debug.createF14AWingStraight = function() {
       geofs.debug.F14AWingStraight = {};
        geofs.debug.F14AWingStraight.model = new geofs.api.Model(f14wingstraight)
    }
    geofs.debug.loadF14AWingStraight = function() {
       geofs.debug.F14AWingStraight || geofs.debug.createF14AWingStraight()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14AWingStraight.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A Straight Wings loading error. " + e)
        }
    };
    geofs.debug.createF14AWingSwept = function() {
       geofs.debug.F14AWingSwept = {};
        geofs.debug.F14AWingSwept.model = new geofs.api.Model(f14wingswept)
    }
    geofs.debug.loadF14AWingSwept = function() {
       geofs.debug.F14AWingSwept || geofs.debug.createF14AWingSwept()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14AWingSwept.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A Swept Wings loading error. " + e)
        }
    };
    geofs.debug.createF14ASpeedbrake = function() {
       geofs.debug.F14ASpeedbrake = {};
        geofs.debug.F14ASpeedbrake.model = new geofs.api.Model(f14airbrake)
    }
    geofs.debug.loadF14ASpeedbrake = function() {
       geofs.debug.F14ASpeedbrake || geofs.debug.createF14ASpeedbrake()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14ASpeedbrake.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A speedbrake loading error. " + e)
        }
    };
    geofs.debug.createF14ACockpit = function() {
       geofs.debug.F14ACockpit = {};
        geofs.debug.F14ACockpit.model = new geofs.api.Model(f14cockpit)
    }
    geofs.debug.loadF14ACockpit = function() {
       geofs.debug.F14ACockpit || geofs.debug.createF14ACockpit()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14ACockpit.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A cockpit loading error. " + e)
        }
    };
    geofs.debug.createF14ABurner = function() {
       geofs.debug.F14ABurner = {};
        geofs.debug.F14ABurner.model = new geofs.api.Model(f14burner)
    }
    geofs.debug.loadF14ABurner = function() {
       geofs.debug.F14ABurner || geofs.debug.createF14ABurner()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F14ABurner.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F-14A afterburner loading error. " + e)
        }
    };
    
    geofs.debug.createTruck = function() {
       geofs.debug.truck = {};
        geofs.debug.truck.model = new geofs.api.Model(truckModel)
    }
    geofs.debug.loadTruck = function() {
       geofs.debug.truck || geofs.debug.createTruck()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.truck.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Truck model loading error. " + e)
        }
    };

    geofs.debug.createSu27Airbrake = function() {
       geofs.debug.su27airbrake = {};
        geofs.debug.su27airbrake.model = new geofs.api.Model(su27airbrake)
    }
    geofs.debug.loadSu27Airbrake = function() {
       geofs.debug.su27airbrake || geofs.debug.createSu27Airbrake()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.su27airbrake.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Su-27 airbrake loading error. " + e)
        }
    };

    geofs.debug.createF18GearUp = function() {
       geofs.debug.F18GearUp = {};
        geofs.debug.F18GearUp.model = new geofs.api.Model(f18GearUp)
    }
    geofs.debug.loadF18GearUp = function() {
       geofs.debug.F18GearUp || geofs.debug.createF18GearUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F18GearUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F18 Gear Up loading error. " + e)
        }
    };
    geofs.debug.createF18GearDown = function() {
       geofs.debug.F18GearDown = {};
        geofs.debug.F18GearDown.model = new geofs.api.Model(f18GearDown)
    }
    geofs.debug.loadF18GearDown = function() {
       geofs.debug.F18GearDown || geofs.debug.createF18GearDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F18GearDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F18 Gear Down loading error. " + e)
        }
    };
    geofs.debug.createF18AB = function() {
       geofs.debug.F18AB = {};
        geofs.debug.F18AB.model = new geofs.api.Model(f18Afterburner)
    }
    geofs.debug.loadF18AB = function() {
       geofs.debug.F18AB || geofs.debug.createF18AB()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F18AB.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F18 AB loading error. " + e)
        }
    };
    geofs.debug.createF18Cockpit = function() {
       geofs.debug.F18Cockpit = {};
        geofs.debug.F18Cockpit.model = new geofs.api.Model(f18Cockpit)
    }
    geofs.debug.loadF18Cockpit = function() {
       geofs.debug.F18Cockpit || geofs.debug.createF18Cockpit()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F18Cockpit.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F18 cockpit loading error. " + e)
        }
    };
    geofs.debug.createF18Airbrake = function() {
       geofs.debug.F18Airbrake = {};
        geofs.debug.F18Airbrake.model = new geofs.api.Model(f18Airbrake)
    }
    geofs.debug.loadF18Airbrake = function() {
       geofs.debug.F18Airbrake || geofs.debug.createF18Airbrake()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F18Airbrake.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F18 airbrake loading error. " + e)
        }
    };
        
    geofs.debug.createMiG17GearUp = function() {
       geofs.debug.MiG17GearUp = {};
        geofs.debug.MiG17GearUp.model = new geofs.api.Model(mig17GearUp)
    }
    geofs.debug.loadMiG17GearUp = function() {
       geofs.debug.MiG17GearUp || geofs.debug.createMiG17GearUp()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG17GearUp.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-17 Gear Up loading error. " + e)
        }
    };
    geofs.debug.createMiG17GearDown = function() {
       geofs.debug.MiG17GearDown = {};
        geofs.debug.MiG17GearDown.model = new geofs.api.Model(mig17GearDown)
    }
    geofs.debug.loadMiG17GearDown = function() {
       geofs.debug.MiG17GearDown || geofs.debug.createMiG17GearDown()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG17GearDown.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-17 Gear Down loading error. " + e)
        }
    };
    geofs.debug.createMiG17AB = function() {
       geofs.debug.MiG17AB = {};
        geofs.debug.MiG17AB.model = new geofs.api.Model(mig17Afterburner)
    }
    geofs.debug.loadMiG17AB = function() {
       geofs.debug.MiG17AB || geofs.debug.createMiG17AB()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG17AB.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-17 AB loading error. " + e)
        }
    };
    geofs.debug.createMiG17Speedbrake = function() {
       geofs.debug.MiG17Speedbrake = {};
        geofs.debug.MiG17Speedbrake.model = new geofs.api.Model(mig17speedbrake)
    }
    geofs.debug.loadMiG17Speedbrake = function() {
       geofs.debug.MiG17Speedbrake || geofs.debug.createMiG17Speedbrake()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.MiG17Speedbrake.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("MiG-17 speedbrake loading error. " + e)
        }
    };
        
    geofs.debug.loadF16Tank = function() {
       geofs.debug.F16Tank || geofs.debug.createF16Tank()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.F16Tank.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("F16 tank loading error. " + e)
        }
    };

    geofs.debug.createMachCone = function() {
       geofs.debug.machCone = {};
        geofs.debug.machCone.model = new geofs.api.Model(machCone)
    }
    geofs.debug.loadMachCone = function() {
       geofs.debug.machCone || geofs.debug.createMachCone()
        try {
             geofs.debug.machCone.model._model.color.alpha = 0.9
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.machCone.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Mach cone loading error. " + e)
        }
    };

    geofs.debug.createParachute = function() {
       geofs.debug.parachute = {};
        geofs.debug.parachute.model = new geofs.api.Model(parachute)
    }
    geofs.debug.loadParachute = function() {
       geofs.debug.parachute || geofs.debug.createParachute()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.parachute.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Parachute loading error. " + e)
        }
    };

    geofs.debug.createConConesLarge = function() {
       geofs.debug.conConeLarge = {};
        geofs.debug.conConeLarge.model = new geofs.api.Model(condensationConesLarge)
    }
    geofs.debug.loadConConesLarge = function() {
       geofs.debug.conConeLarge || geofs.debug.createConConesLarge()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([Math.floor(Math.random() * 2) * 0.05, Math.floor(Math.random() * 2) * 0.05, Math.floor(Math.random() * 2) * 0.05], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.conConeLarge.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Condensation cone loading error. " + e)
        }
    };

    geofs.debug.createConConesSmall = function() {
       geofs.debug.conConeSmall = {};
        geofs.debug.conConeSmall.model = new geofs.api.Model(condensationConesSmall)
    }
    geofs.debug.loadConConesSmall = function() {
       geofs.debug.conConeSmall || geofs.debug.createConConesSmall()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([Math.floor(Math.random() * 2) * 0.05, Math.floor(Math.random() * 2) * 0.05, Math.floor(Math.random() * 2) * 0.05], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.conConeSmall.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("Condensation cone loading error. " + e)
        }
    };

    geofs.debug.createE7Antenna = function() {
       geofs.debug.E7Antenna = {};
        geofs.debug.E7Antenna.model = new geofs.api.Model(e7antenna)
    }
    geofs.debug.loadE7Antenna = function() {
       geofs.debug.E7Antenna || geofs.debug.createE7Antenna()
        try {
            var c = V3.add(geofs.aircraft.instance.llaLocation, xyz2lla([0, 0, 0], geofs.aircraft.instance.llaLocation)),
                d = M33.getOrientation(geofs.aircraft.instance.object3d._rotation);
            geofs.debug.E7Antenna.model.setPositionOrientationAndScale(c, d);
        } catch (e) {
            throw("E-7 AEW&C antenna loading error. " + e)
        }
    };

    geofs.debug.update = function (a) {
        geofs.debug.fps = exponentialSmoothing("fps", 1e3 / a).toPrecision(2);
        if (geofs.debugOn) {
            if ((a = $(".debugPointName")[0])) {
                a = a.value;
                var b = geofs.aircraft.instance.parts[a],
                    c = instruments.list[a];
                if (b) {
                    var d = $(".debugCollisionPointIndex")[0].value;
                    d
                        ? ((d = b.collisionPoints[parseInt(d)] || b.points[d]), geofs.debug.placeAxis(b.object3d.getWorldFrame(), d.worldPosition))
                        : ($(".debugShowForceSource")[0].checked && geofs.debug.placeAxis(b.object3d.getWorldFrame(), b.points.forceSourcePoint.worldPosition),
                          $(".debugShowForceDirection")[0].checked && geofs.debug.placeAxis(b.object3d.getWorldFrame(), b.points.forceDirection.worldPosition),
                          $(".debugShowLocalPosition")[0].checked && geofs.debug.placeAxis(b.object3d.getWorldFrame(), b.object3d.worldPosition),
                          $(".debugShowsuspensionOrigin")[0].checked && geofs.debug.placeAxis(b.object3d.getWorldFrame(), b.points.suspensionOrigin.worldPosition));
                    $(".debugPartData").html("Node Origin: " + b.object3d._nodeOrigin);
                }
                c && c.definition.cockpit && ((b = c.definition.cockpit.position), geofs.debug.placeAxis(geofs.aircraft.instance.object3d.getWorldFrame(), b.worldPosition));
                "camera" == a && ((b = geofs.aircraft.instance.definition.camera.cockpit), geofs.aircraft.instance.object3d.setVectorWorldPosition(b), geofs.debug.placeAxis(geofs.aircraft.instance.object3d.getWorldFrame(), b.worldPosition));
            }
            geofs.debug.placingObjectId = $(".objectId").val();
            geofs.debug.placingObjectId &&
                $(".geofs-debugObjectLlaHtr").text(geofs.objects.getLla(geofs.debug.placingObjectId) + " " + geofs.objects.getHtr(geofs.debug.placingObjectId) + " " + geofs.objects.getScale(geofs.debug.placingObjectId));
        }
         // brake parachute
         if (geofs.aircraft.instance.id == 7) { //compile database
      if (geofs.animation.values.airbrakesTarget > 0 && geofs.animation.values.kias >= 10 && geofs.animation.values.kias <= 200) {
    geofs.debug.loadParachute()
    //increase drag a lot without having it increment (somehow)
    //separate function for each aircraft? would definitely be doable
    geofs.aircraft.instance.definition.dragFactor = 10
      } else {
    geofs.aircraft.instance.definition.dragFactor = 0.5
      }
         }
      if (geofsAddonAircraft.isSu27 == 1 && geofs.animation.values.airbrakesTarget > 0) {
        geofs.debug.loadSu27Airbrake()
      }
      if (geofs.animation.values.mach > 0.95 && geofs.animation.values.mach < 1.05 && geofs.aircraft.instance.id != 2364 && geofs.cons == true) {
         geofs.debug.loadMachCone()
      }
      if (geofs.aircraft.instance.id == 18 && geofs.animation.values.kias > 50 && geofs.animation.values.accZ > 60 && geofs.cons == true && geofsAddonAircraft.isFA18 != 1 ) {
        geofs.debug.loadConConesLarge()
      }
      if (geofs.aircraft.instance.id == 18 && geofs.animation.values.kias > 50 && geofs.animation.values.accZ > 60 && geofs.cons == true && geofsAddonAircraft.isFA18 == 1 ) {
        geofs.debug.loadConConesSmall()
      }
      if (geofs.aircraft.instance.id == 7 && geofs.animation.values.kias > 50 && geofs.animation.values.accZ > 60 && geofs.cons == true && geofsAddonAircraft.isMiG21 != 1) {
        geofs.debug.loadConConesSmall()
      }
      if (geofs.aircraft.instance.id == 2857 && geofs.animation.values.kias > 50 && geofs.animation.values.accZ > 60 && geofs.cons == true) {
        geofs.debug.loadConConesSmall()
      }
      //load cockpit for DHC-8 Q400
      //edit emb120 cockpit in vectary
      if (geofs.aircraft.instance.id == 247 && geofs.camera.currentModeName == "cockpit") {
        void(0) //placeholder
      }
    
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && geofs.animation.values.gearTarget == 1) {
        geofs.debug.loadF14AGearUp()
      }
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && geofs.animation.values.gearTarget == 0) {
        geofs.debug.loadF14AGearDown()
      }
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && controls.optionalAnimatedPart.target == 0) {
        geofs.debug.loadF14AWingStraight()
      }
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && controls.optionalAnimatedPart.target == 1) {
        geofs.debug.loadF14AWingSwept()
      }
      //if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" &&) {
      //}
      //if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" &&) {
      //}
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view != "cockpit" && geofs.animation.values.airbrakesTarget == 1) {
        geofs.debug.loadF14ASpeedbrake()
      }
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.view == "cockpit") {
        geofs.debug.loadF14ACockpit()
      }
      if (geofsAddonAircraft.isF14A == 1 && geofs.animation.values.rpm > 9100) {
	 geofs.debug.loadF14ABurner()
      }
    
      if (geofsAddonAircraft.isFA18 == 1 && geofs.animation.values.airbrakesTarget == 1) {
        geofs.debug.loadF18Airbrake()  
      }
      if (geofsAddonAircraft.isFA18 == 1 && geofs.animation.values.gearTarget == 0) {
        geofs.debug.loadF18GearDown()
      }
      if (geofsAddonAircraft.isFA18 == 1 && geofs.animation.values.gearTarget == 1) {
        geofs.debug.loadF18GearUp()
      }
      if (geofsAddonAircraft.isFA18 == 1 && geofs.animation.values.rpm >= 9100) {
        geofs.debug.loadF18AB()
      }
      if (geofsAddonAircraft.isFA18 == 1 && geofs.animation.values.view == "cockpit") {
        geofs.debug.loadF18Cockpit()
      }
    
      if (geofsAddonAircraft.isMig17 == 1 && geofs.animation.values.airbrakesTarget == 1) {
        geofs.debug.loadMiG17Speedbrake()
      }
      if (geofsAddonAircraft.isMig17 == 1 && geofs.animation.values.gearTarget == 0 && geofs.animation.values.view != "cockpit") {
        geofs.debug.loadMiG17GearDown()
      }
      if (geofsAddonAircraft.isMig17 == 1 && geofs.animation.values.gearTarget == 1 && geofs.animation.values.view != "cockpit") {
        geofs.debug.loadMiG17GearUp()
      }
      if (geofsAddonAircraft.isMig17 == 1 && geofs.animation.values.rpm >= 9100) {
        geofs.debug.loadMiG17AB()
      }
      if (geofsAddonAircraft.isE7 == 1) {
        geofs.debug.loadE7Antenna()
      }
      if (geofsAddonAircraft.isMiG21 == 1 && geofs.animation.values.gearTarget == 0 && geofs.animation.values.view != "cockpit") {
          geofs.debug.loadMig21GearDown()
          geofs.debug.loadMig21Nozzle()
      }
      if (geofsAddonAircraft.isMiG21 == 1 && geofs.animation.values.gearTarget == 1 && geofs.animation.values.view != "cockpit") {
          geofs.debug.loadMig21GearUp()
          geofs.debug.loadMig21Nozzle()
      }
      if (geofsAddonAircraft.isMiG21 == 1 && geofs.animation.values.view == "cockpit") {
          geofs.debug.loadMig21Cockpit()
      }
      if (geofsAddonAircraft.isMiG21 == 1 && geofs.animation.values.rpm >= 9100) {
          geofs.debug.loadMig21AB()
      }
      if (geofsAddonAircraft.isMiG21 == 1 && controls.optionalAnimatedPart.target == 1) {
          geofs.debug.loadMig21Tank()
      }
      if (geofsAddonAircraft.isMSG == 1 && geofs.animation.values.view != "cockpit") {
          geofs.debug.loadMSG();
      }
      if (geofsAddonAircraft.isMSG == 1 && geofs.animation.values.view != "cockpit" && geofs.animation.values.enginesOn == 0) {
          geofs.debug.loadMSGprop();
      }
      if (geofsAddonAircraft.isMSG == 1 && geofs.animation.values.view == "cockpit") {
          geofs.debug.loadMSGcockpit();
      }
      if (geofsAddonAircraft.isF117 == 1 && geofs.animation.values.gearTarget == 1 && geofs.animation.values.view != "cockpit") {
         geofs.debug.loadF117GearUp();
      }
      if (geofsAddonAircraft.isF117 == 1 && geofs.animation.values.gearTarget == 0 && geofs.animation.values.view != "cockpit") {
         geofs.debug.loadF117GearDown();
      }
      if (geofsAddonAircraft.isF117 == 1 && geofs.animation.values.view == "cockpit") {
         geofs.debug.loadF117Cockpit();
      }
      if (geofsAddonAircraft.isMiG25 == 1 && geofs.animation.values.gearTarget == 1) {
	 geofs.debug.loadMiG25GearUp()
	 geofs.debug.loadMiG25FlapsUp()
      }
      if (geofsAddonAircraft.isMiG25 == 1 && geofs.animation.values.gearTarget == 0) {
	 geofs.debug.loadMiG25GearDown()
	 geofs.debug.loadMiG25FlapsDown()
      }
      if (geofsAddonAircraft.isMiG25 == 1 && geofs.animation.values.rpm > 9000) {
	 geofs.debug.loadMiG25AB()
      }
        
      if (geofsAddonAircraft.isTruck == 1) {
        geofs.debug.loadTruck()  
      }
    };

/*
flight.setAnimationValues = function (a, b) {
//a = e from flight.tick
    var c = geofs.aircraft.instance,
        d = geofs.animation.values,
        e = c.llaLocation[2] * METERS_TO_FEET,
        g = (60 * (e - c.oldAltitude * METERS_TO_FEET)) / a;
    c.oldAltitude = c.llaLocation[2];
    var f = fixAngle(weather.currentWindDirection - c.htr[0]),
        k = c.engine.rpm * c.definition.RPM2PropAS * a;
    d.acceleration = M33.transform(M33.transpose(c.object3d._rotation), c.rigidBody.v_acceleration);
    d.accX = d.acceleration[0];
    d.accY = d.acceleration[1];
    d.accZ = d.acceleration[2];
    d.loadFactor = d.acceleration[2] / GRAVITY;
    d.slipball = exponentialSmoothing("slipball", d.acceleration[0], 0.02);
    d.ktas = c.trueAirSpeed * MS_TO_KNOTS;
    d.kiasChangeRate = (d.ktas - d.ktas) * a;
    d.kias = d.kcas;
    d.kiasUnits = d.ktas % 10;
    d.kiasTens = d.ktas % 100;
    d.kiasHundreds = d.ktas % 1e3;
    d.kiasThousands = d.ktas % 1e4;
    d.groundSpeed = c.groundSpeed;
    d.groundSpeedKnt = c.groundSpeed * MS_TO_KNOTS;
    d.altitudeMeters = c.llaLocation[2];
    d.altitude = e;
    d.haglMeters = geofs.relativeAltitude;
    d.haglFeet = geofs.relativeAltitude * METERS_TO_FEET;
    d.groundElevationFeet = geofs.groundElevation * METERS_TO_FEET;
    d.verticalSpeed = g;
    d.climbrate = g;
    d.aoa = c.angleOfAttackDeg;
    d.turnrate = (60 * fixAngle(c.htr[0] - d.heading)) / a;
    d.pitchrate = (60 * fixAngle(c.htr[1] - d.atilt)) / a;
    d.heading = c.htr[0];
    d.heading360 = fixAngle360(c.htr[0]);
    d.atilt = c.htr[1];
    d.aroll = c.htr[2];
    d.enginesOn = c.engine.on;
    d.engineVibration = 100 < c.engine.rpm ? Math.random() * clamp(1e3 / c.engine.rpm, 0, 1) : 0;
    d.prop = fixAngle360(d.prop + k);
    d.thrust = c.totalThrust;
    d.rpm = c.engine.rpm;
    d.throttle = controls.throttle;
    d.mixture = controls.mixture;
    d.carbHeat = controls.carbHeat;
    d.smoothThrottle = exponentialSmoothing("throttle", d.throttle, 0.02);
    d.pitch = controls.pitch;
    d.rawPitch = controls.rawPitch;
    d.roll = controls.roll;
    d.yaw = controls.yaw;
    d.rawYaw = controls.rawYaw;
    d.trim = controls.elevatorTrim;
    d.brakes = controls.brakes;
    d.gearPosition = controls.gear.position;
    d.invGearPosition = 1 - controls.gear.position;
    d.gearTarget = controls.gear.target;
    d.flapsValue = controls.flaps.position / controls.flaps.maxPosition;
    d.accessoriesPosition = controls.accessories.position;
    d.flapsPosition = controls.flaps.position;
    d.flapsTarget = controls.flaps.target;
    d.flapsPositionTarget = controls.flaps.positionTarget;
    d.flapsMaxPosition = controls.flaps.maxPosition;
    d.airbrakesPosition = controls.airbrakes.position;
    d.optionalAnimatedPartPosition = controls.optionalAnimatedPart.position;
    d.airbrakesTarget = controls.airbrakes.target;
    d.parkingBrake = c.brakesOn;
    d.groundContact = c.groundContact ? 1 : 0;
    d.arrestingHookTension = c.arrestingCableContact ? V3.length(c.arrestingCableContact.force) : 0;
    d.airTemp = weather.atmosphere.airTempAtAltitude;
    d.mach = c.trueAirSpeed / (331.3 + 0.606 * weather.atmosphere.airTempAtAltitude);
    d.machUnits = Math.floor(d.mach);
    d.machTenth = Math.floor(10 * (d.mach % 1).toPrecision(2));
    d.machHundredth = Math.floor(100 * (d.mach % 0.1).toPrecision(2));
    d.altTenThousands = e % 1e5;
    d.altThousands = e % 1e4;
    d.altHundreds = e % 1e3;
    d.altTens = e % 100;
    d.altTensShift = Math.floor((e % 1e5) / 1e4);
    d.altUnits = e % 10;
    d.relativeWind = f;
    d.windSpeed = weather.currentWindSpeed;
    d.windSpeedLabel = parseInt(weather.currentWindSpeed) + " kts";
    d.view = geofs.camera.currentView;
    d.envelopeTemp = c.envelopeTemp;
    d["aircraft.maxAngularVRatio"] = c.maxAngularVRatio;
    d.rollingSpeed = c.groundContact ? c.velocityScalar : 0;
    "free" == geofs.camera.currentModeName || "chase" == geofs.camera.currentModeName
        ? ((c = geofs.utils.llaDistanceInMeters(geofs.camera.lla, c.llaLocation)), (d.cameraAircraftSpeed = (d.cameraAircraftDistance - c) / a), (d.cameraAircraftDistance = c))
        : ((d.cameraAircraftSpeed = 0), (d.cameraAircraftDistance = 0));
    d.geofsTime = b;
    geofs.api.postMessage({ animationValues: d });
};
geofs.kiasOn = 1
*/

geofsAddonAircraft = {};
//Generic addon aircraft tailhook:
//Any aircraft running this tailhook MUST run the function on an interval of 10ms or the hook only has 10% the strength
//All these functions made by AriakimTaiyo
geofsAddonAircraft.wireLLAs = [[37.779434570552304, -122.60905835885147, 25]]; //geofs.aircraft.instance.llaLocation
geofsAddonAircraft.stopForce = -(geofs.aircraft.instance.rigidBody.mass * 1.1);
geofsAddonAircraft.landed = 0;
geofsAddonAircraft.resolveForceVector = function(force, angle) {
  var fx = force * (Math.cos(angle * (Math.PI/180)));
  var fy = force * (Math.sin(angle * (Math.PI/180)));
  return [fx, fy, 0];
}
geofsAddonAircraft.distance = function (pos1, pos2) {
  var a = pos2[0] - pos1[0];
  var b = pos2[1] - pos1[1];
  var c = pos2[2] - pos1[2];
  return Math.sqrt(a * a + b * b + c * c); 
}
//Master function
//This has a bug where at low FPS, it misses that window where groundSpeedKnt < qty and kachows you off the back of the carrier
//but I'm not gonna bother fixing it because approaching the carrier with CC multiplayer models turned on literally crashes my computer
//The inconsiderate CCs think people playing GeoFS on school Chromebooks have 1000 dollars to drop on a PC that can run MSFS
//which we obviously don't
geofsAddonAircraft.runAddonTailhook = function(){
   geofsAddonAircraft.wireLLAs.forEach(function(e){
if (geofs.animation.values.gearPosition == 0 && geofsAddonAircraft.landed == 0 && geofs.animation.values.groundContact == 1 && geofsAddonAircraft.distance(geofs.aircraft.instance.llaLocation, e) < 10) {
   console.log("Hooking detected")
   geofs.aircraft.instance.rigidBody.applyCentralImpulse([geofsAddonAircraft.resolveForceVector(geofsAddonAircraft.stopForce, geofs.animation.values.heading360)[1], geofsAddonAircraft.resolveForceVector(geofsAddonAircraft.stopForce, geofs.animation.values.heading360)[0], geofsAddonAircraft.resolveForceVector(geofsAddonAircraft.stopForce, geofs.animation.values.heading360)[2]])
}
   })
	if (geofs.animation.values.groundSpeedKnt < 10 && geofs.animation.values.groundContact == 1) {
geofsAddonAircraft.landed = 1
console.log("Landed")
	}
	if (geofs.animation.values.groundContact == 0) {
geofsAddonAircraft.landed = 0
console.log("Airborne")
	}
}
//-----F/A-18C Hornet-----------------------------------------------------------------------------------------------------
//adding the button
geofsAddonAircraft.runFA18 = function(){
   console.log("Loading F/A-18C. Model credit cs09736. Model loaded under CC Attribution Share-Alike Liscense.")
   geofs.aircraft.instance.change(18, 4)
}
f18Li = document.createElement("li");
f18Li.innerHTML = '<div><img src="https://w7.pngwing.com/pngs/871/313/png-transparent-boeing-f-a-18e-f-super-hornet-mcdonnell-douglas-f-a-18-hornet-battlefield-3-rogerson-aircraft-corporation-airplane-boeing-767-video-game-fighter-aircraft-airplane.png">F/A-18C Hornet</div>';
f18Li.addEventListener("click", geofsAddonAircraft.runFA18);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(f18Li)

geofs.f18instruments = new Boolean(0)
//the actual implementation lol:
function runHornet() {
   if (geofs.aircraft.instance.id == 18 && geofs.aircraft.instance.liveryId == 4) {
//removing the thrust vectoring
geofs.aircraft.instance.definition.parts[46].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[46].animations[1].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[1].ratio = 0.069;
//fcs (alpha and G limiter) and paddle switch
//Push controls forwards 0.02
//aoa > 0.09? or check if "stall" is lit
   if (geofs.animation.values.cobraMode == 1) {
geofs.aircraft.instance.definition.parts[2].area = 25
geofs.aircraft.instance.definition.parts[12].stalls = true
geofs.aircraft.instance.definition.parts[13].stalls = true
if (geofs.animation.values.airbrakesTarget > 0) {
   geofs.aircraft.instance.definition.dragFactor = 6
} else if (geofs.animation.values.accZ >= 30) {
   geofs.aircraft.instance.definition.dragFactor = 5
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.9
}
   } else {
geofs.aircraft.instance.definition.parts[2].area = 17
geofs.aircraft.instance.definition.parts[12].stalls = false
geofs.aircraft.instance.definition.parts[13].stalls = false
if (geofs.animation.values.airbrakesTarget > 0) {
   geofs.aircraft.instance.definition.dragFactor = 6
} else if (geofs.animation.values.accZ >= 50) {
   geofs.aircraft.instance.definition.dragFactor = 5
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.9
}
   }
//making the LERX stall like a delta wing (bc it kinda is)
geofs.aircraft.instance.definition.parts[2].stallIncidence = 25
geofs.aircraft.instance.definition.parts[2].zeroLiftIncidence = 70
//The actual wings have delayed lift loss, because the leading edge vortex streaming off the LERX
//sticks to the wing and maintains the pressure differential
geofs.aircraft.instance.definition.parts[3].stallIncidence = 25
geofs.aircraft.instance.definition.parts[3].zeroLiftIncidence = 50
geofs.aircraft.instance.definition.parts[3].area = 15
geofs.aircraft.instance.definition.parts[4].stallIncidence = 25
geofs.aircraft.instance.definition.parts[4].zeroLiftIncidence = 50
geofs.aircraft.instance.definition.parts[4].area = 15
//Tuning the stabilizer area
geofs.aircraft.instance.definition.parts[11].area = 3
//Adjusting engine power
geofs.aircraft.instance.engines[0].thrust = 50000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 87000
geofs.aircraft.instance.engines[1].thrust = 50000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 87000
//Maintaining 1:1 TWR
geofs.aircraft.instance.definition.mass = 17000
audio.soundplayer.setRate(geofs.aircraft.instance.definition.sounds[3].id, 0.5) //Sound pitch modification
//Tailhook
geofsAddonAircraft.runAddonTailhook()
//Replacing the tires lol
geofs.aircraft.instance.definition.contactProperties = {
        "wheel": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
        	"rollingFriction": 0.00001,
            "damping": 1
        },
        "frame": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
            "damping": 1
        },
	    "airfoil": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
            "damping": 1
        },
        "hook": {
            "frictionCoef": 2,
            "dynamicFriction": 0.01,
            "damping": 1
        }
    };
//Adding the airbrake
geofs.aircraft.instance.definition.airbrakesTravelTime = 1;
geofs.aircraft.instance.definition.instruments.spoilers = "";
geofs.aircraft.instance.definition.instruments.correctHUD = {
            "cockpit": {
                "position": [-0.01, 8.3, 1.23],
                "scale": 0.4
            },
            "animations": [
                {"value": "view", "type": "show", "eq": "cockpit"}
            ]
	}
if (geofs.f18instruments == 0) {
   instruments.init(geofs.aircraft.instance.setup.instruments)
   geofs.f18instruments = 1
}
setTimeout(() => {
   geofsAddonAircraft.isFA18 = 1
},5000)
setTimeout(() => {
   	 geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	 geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
   	 geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	 geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
	 geofs.aircraft.instance.definition.parts[50].animations[0].gt = 100000
	 geofs.aircraft.instance.definition.parts[55].animations[0].gt = 100000
},10000)
   } else {
geofsAddonAircraft.isFA18 = 0
geofs.f18instruments = 0
   }
}
checkRunHornetInterval = setInterval(function(){runHornet()},10)

//-----Mig-17 Fresco-----------------------------------------------------------------------------------------------------
geofsAddonAircraft.isMig17 = 0
geofsAddonAircraft.runMiG17 = function(){
   console.log("Loading MiG-17. Model credit manilov.ap")
}
mig17Li = document.createElement("li");
mig17Li.innerHTML = '<div><img src="https://finescale.com/~/media/images/workbench-reviews/2020/february-2020/fsmwb1219_zvezda_mig17_01.jpg">Mikoyan-Gurevich MiG-17 "Fresco"</div>';
mig17Li.addEventListener("click", geofsAddonAircraft.runMiG17);
//this works actually
mig17Li.setAttribute("data-aircraft", 3)
mig17Li.setAttribute("data-livery", 1)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(mig17Li)
function runMiG17() {
   if (geofs.aircraft.instance.id == 3 && geofs.aircraft.instance.liveryId == 1) {
geofs.aircraft.instance.definition.parts[3].area = 3
geofs.aircraft.instance.definition.parts[4].area = 3
geofs.aircraft.instance.definition.parts[8].liftFactor = 7
geofs.aircraft.instance.definition.parts[9].liftFactor = 7
geofs.aircraft.instance.definition.parts[8].dragFactor = 1
geofs.aircraft.instance.definition.parts[9].dragFactor = 1
geofs.aircraft.instance.definition.parts[16].liftFactor = 8
geofs.aircraft.instance.engines[0].thrust = 15000
geofs.aircraft.instance.engines[1].thrust = 15000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 20000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 20000
   if (geofs.animation.values.view == "cockpit") {
geofs.aircraft.instance.cockpitSetup.parts[1].object3d.model._model.color.alpha = 0
   }
setTimeout(() => {
   geofsAddonAircraft.isMig17 = 1
},5000)
setTimeout(() => {
   geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
},10000)
   } else {
geofsAddonAircraft.isMig17 = 0
   }
}
mig17Int = setInterval(function(){runMiG17()},100)

//-----Su-27 Flanker (the OG one)---------------------------------------------------------------------------------------
geofsAddonAircraft.isSu27 = new Boolean(0)
geofs.debug.su27Instruments = new Boolean(0)
geofsAddonAircraft.runSu27 = function(){
   geofs.aircraft.instance.change(18, 1)
}
flankerLi = document.createElement("li");
flankerLi.innerHTML = '<div><img src="images/planes/su35_1.png">Sukhoi Su-27 Flanker</div>';
flankerLi.addEventListener("click", geofsAddonAircraft.runSu27);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(flankerLi)
function runSu27() {
if (geofs.aircraft.instance.id == 18 && geofs.aircraft.instance.liveryId == 1) {
geofsAddonAircraft.isSu27 = 1
geofs.aircraft.instance.definition.airbrakesTravelTime = 1
geofs.aircraft.instance.definition.accessoriesTravelTime = 0.1
geofs.aircraft.instance.definition.parts[46].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[46].animations[1].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[1].ratio = 0.069;
geofs.aircraft.instance.engines[0].thrust = 60000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 80000
geofs.aircraft.instance.engines[1].thrust = 60000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 80000
   geofs.aircraft.instance.definition.parts[46].animations[2] = {};
	geofs.aircraft.instance.definition.parts[46].animations[2].type = "rotate";
	geofs.aircraft.instance.definition.parts[46].animations[2].axis = "Z";
	geofs.aircraft.instance.definition.parts[46].animations[2].value = "roll";
	geofs.aircraft.instance.definition.parts[46].animations[2].ratio = -10;
	geofs.aircraft.instance.definition.parts[46].animations[2].currentValue = null;
	geofs.aircraft.instance.definition.parts[46].animations[2].rotationMethod = function(a) {
      this._rotation = M33.rotationZ(this._rotation, a)
   };
   geofs.aircraft.instance.definition.parts[51].animations[2] = {};
	geofs.aircraft.instance.definition.parts[51].animations[2].type = "rotate";
	geofs.aircraft.instance.definition.parts[51].animations[2].axis = "Z";
	geofs.aircraft.instance.definition.parts[51].animations[2].value = "roll";
	geofs.aircraft.instance.definition.parts[51].animations[2].ratio = -10;
	geofs.aircraft.instance.definition.parts[51].animations[2].currentValue = null;
	geofs.aircraft.instance.definition.parts[51].animations[2].rotationMethod = function(a) {
      this._rotation = M33.rotationZ(this._rotation, a)
   };
	geofs.aircraft.instance.definition.parts[48].animations[0].gt = 9100
	geofs.aircraft.instance.definition.parts[53].animations[0].gt = 9100
if (geofs.debug.su27Instruments == 0) {
geofs.aircraft.instance.setup.instruments = {
        "cdi": "",
        "compass": "",
        "airspeedSupersonic": "",
        "attitudeJet": "",
        "altitude": "",
        "varioJet": "",
        "rpmJet": "",
		"brakes": "",		
		"gear": "",
		"flaps": "",
		"spoilers": ""
}
instruments.init(geofs.aircraft.instance.setup.instruments)
geofs.debug.su27Instruments = 1
}
if (geofs.animation.values.airbrakesTarget > 0) {
   geofs.aircraft.instance.definition.dragFactor = 7.5
} else if (geofs.animation.values.accZ >= 60) {
   geofs.aircraft.instance.definition.dragFactor = 5
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.5
}
if (geofs.animation.values.cobraMode == 1) {
   geofs.aircraft.instance.definition.parts[2].area = 40
} else {
   geofs.aircraft.instance.definition.parts[2].area = 10
}
   } else {
geofs.debug.su27Instruments = 0
geofsAddonAircraft.isSu27 = 0
	}
};
Su27Int = setInterval(function(){runSu27()},100)
//clearInterval(Su27Int)
//-----E-7 Wedgetail AEW&C------------------------------------------------------------------------------------------------
geofsAddonAircraft.isE7 = 0
geofsAddonAircraft.runE7 = function(){
   console.log("Loading E-7 Wedgetail AEW&C.")
}
e7Li = document.createElement("li");
e7Li.innerHTML = '<div><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/B737_AEW%26C_Wedgetail_cut_model.PNG/220px-B737_AEW%26C_Wedgetail_cut_model.PNG">E-7 Wedgetail AEW&C</div>';
e7Li.addEventListener("click", geofsAddonAircraft.runE7);
//this works actually
e7Li.setAttribute("data-aircraft", 3292)
e7Li.setAttribute("data-livery", 1)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(e7Li)
function runE7Wedgetail() {
   if (geofs.aircraft.instance.id == 3292 && geofs.aircraft.instance.liveryId == 1) {
geofsAddonAircraft.isE7 = 1
geofs.aircraft.instance.definition.mass = 75000
   } else {
geofsAddonAircraft.isE7 = 0
	}
}
e7int = setInterval(function(){runE7Wedgetail()},100)
//-----MiG-21 Fishbed-----------------------------------------------------------------------------------------------------
geofsAddonAircraft.runMig21 = function(){
	console.log("Loading MiG-21 Fishbed. Model credit manilov.ap.")
	controls.optionalAnimatedPart.target = 1
}
mig21Li = document.createElement("li");
mig21Li.innerHTML = '<div><img src="http://atlas-content-cdn.pixelsquid.com/stock-images/russian-fighter-mig-21-fishbed-jet-q1ylV3E-600.jpg">Mikoyan-Gurevich MiG-21 "Fishbed"</div>';
mig21Li.addEventListener("click", geofsAddonAircraft.runMig21);
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(mig21Li)
mig21Li.setAttribute("data-aircraft", 7)
mig21Li.setAttribute("data-livery", 1)

geofs.mig21instruments = new Boolean(0)
//clearInterval(mig21Interval)
function runMiG21() {
if (geofs.aircraft.instance.id == 7 && geofs.aircraft.instance.liveryId == 1) {
	geofs.aircraft.instance.definition.parts[2].zeroLiftIncidence = 90
	geofs.aircraft.instance.definition.parts[3].zeroLiftIncidence = 90
	geofs.aircraft.instance.definition.parts[6].area = 1
if (geofs.animation.values.kias >= 150 && geofs.animation.values.kias <= 225) {
	geofs.aircraft.instance.definition.parts[7].area = 0.5
	geofs.aircraft.instance.definition.parts[8].area = 0.5
	geofs.aircraft.instance.definition.parts[2].area = 10
	geofs.aircraft.instance.definition.parts[3].area = 10
} else {
	geofs.aircraft.instance.definition.parts[7].area = 2
	geofs.aircraft.instance.definition.parts[8].area = 2
	geofs.aircraft.instance.definition.parts[2].area = 7
	geofs.aircraft.instance.definition.parts[3].area = 7
}
if (geofs.animation.values.aoa > 14) {
   geofs.aircraft.instance.definition.dragFactor = 6
} else if (geofs.animation.values.aoa > 5) {
   geofs.aircraft.instance.definition.dragFactor = 3
} else {
   geofs.aircraft.instance.definition.dragFactor = 0.4
}
	geofs.aircraft.instance.definition.mass = 21000
	geofs.aircraft.instance.engine.thrust = 40000
if (controls.optionalAnimatedPart.target == 0) {
	geofs.aircraft.instance.engine.afterBurnerThrust = 90000
} else {
   geofs.aircraft.instance.engine.afterBurnerThrust = 60000
}
	geofs.aircraft.instance.definition.parts[12].liftFactor = 5
geofs.aircraft.instance.setup.instruments = {
        "cdi": "",
        "compass": "",
        "airspeedSupersonic": "",
        "attitudeJet": "",
        "altitude": "",
        "varioJet": "",
        "rpmJet": "",
		"brakes": "",		
		"gear": "",
		"flaps": "",
		"spoilers": ""
}
if (geofs.mig21instruments == 0) {
   instruments.init(geofs.aircraft.instance.setup.instruments)
   geofs.mig21instruments = 1
}
setTimeout(() => {
   geofsAddonAircraft.isMiG21 = 1
 },5000)
setTimeout(() => {
   geofs.aircraft.instance.definition.parts[0].animations[0] = {"type": "hide", "value": "rpm", "gt": -1}
	geofs.aircraft.instance.definition.parts[41].animations[0].gt = 100000
 },10000)
if (geofs.animation.values.view == "cockpit") {
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
	geofs.camera.currentDefinition.position[2] = geofs.aircraft.instance.definition.cameras.cockpit.position[2] - 0.15
   }
} else {
   geofsAddonAircraft.isMiG21 = 0
	geofs.mig21instruments = 0
}
}
mig21Interval = setInterval(function(){runMiG21()},100)
//-----Morane-Saulneir "G"-----------------------------------------------------------------------------------------------------
geofsAddonAircraft.isMsG = 0
geofsAddonAircraft.runMsG = function(){
   console.log("Loading Morane-Saulnier G. Model credit manilov.ap")
}
MsGLi = document.createElement("li");
MsGLi.innerHTML = '<div>Morane-Saulnier Type G</div>';
MsGLi.addEventListener("click", geofsAddonAircraft.runMsG);
MsGLi.setAttribute("data-aircraft", 8)
MsGLi.setAttribute("data-livery", 3)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(MsGLi)
function runMsG() {
if (geofs.aircraft.instance.id == 8 && geofs.aircraft.instance.liveryId == 3) {
	geofs.aircraft.instance.definition.parts[4].area = 3
	geofs.aircraft.instance.definition.parts[5].area = 3
	geofs.aircraft.instance.definition.parts[6].area = 3
	geofs.aircraft.instance.definition.parts[7].area = 3
	geofs.aircraft.instance.definition.mass = 300
	geofs.aircraft.instance.definition.parts[30].thrust = 1500
	geofs.aircraft.instance.definition.parts[8].area = 0.069
	geofs.aircraft.instance.definition.parts[9].area = 0.069
	geofs.aircraft.instance.definition.parts[10].area = 0.2
	geofs.aircraft.instance.definition.parts[11].area = 0.2
	geofs.aircraft.instance.definition.dragFactor = 0.7
	geofs.aircraft.instance.definition.autopilot = false
   geofsAddonAircraft.isMSG = 1
	geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
	if (geofs.animation.values.view == "cockpit") {
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
	}
} else {
geofsAddonAircraft.isMSG = 0	
}
}
msgInterval = setInterval(function(){runMsG()},100)
//----- F-117 -------------------------------------------------------------------------------------------------------------
geofsAddonAircraft.isF117 = 0;
geofs.debug.F117Instruments = 0;
geofsAddonAircraft.runF117 = function(){
   console.log("Loading F-117. Model credit manilov.ap")
}
f117Li = document.createElement("li");
f117Li.innerHTML = '<div><img src="https://cdn.shopify.com/s/files/1/0277/5197/2966/products/HA5807-3_1200x789.jpg">Lockheed F-117 "Nighthawk"</div>';
f117Li.addEventListener("click", geofsAddonAircraft.runF117);
//this works actually
f117Li.setAttribute("data-aircraft", 5)
f117Li.setAttribute("data-livery", 1)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(f117Li)
function runF117() {
   if (geofs.aircraft.instance.id == 5 && geofs.aircraft.instance.liveryId == 1) {
	//Remove lights
	geofs.aircraft.instance.definition.parts[46].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[46].animations[0].lt = -1
   geofs.aircraft.instance.definition.parts[45].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[45].animations[0].lt = -1
	geofs.aircraft.instance.definition.parts[47].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[47].animations[0].lt = -1
   geofs.aircraft.instance.definition.parts[48].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[48].animations[0].lt = -1
   geofs.aircraft.instance.definition.parts[8].area = 5
setTimeout(() => {
	geofsAddonAircraft.isF117 = 1
},5000)
setTimeout(() => {
	geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
}, 10000)
   //Wing area adjustment
	geofs.aircraft.instance.definition.parts[2].area = 4
	geofs.aircraft.instance.definition.parts[5].area = 4
	//Drag increase (flat panels = draggy airplane)
	geofs.aircraft.instance.definition.dragFactor = 0.5
	//Boost thrust to compensate for rise in dragFactor
	geofs.aircraft.instance.engines[0].thrust = 20000
	geofs.aircraft.instance.engines[1].thrust = 20000
	//remove flaps
	geofs.aircraft.instance.definition.flapsPositions = [0.01, 0.02, 0.03, 0.04, 0.05]
if (geofs.debug.F117Instruments == 0) {
	geofs.aircraft.instance.definition.instruments = {
        "hsi": "",
        "compass": "",
        "airspeedJet": "",
        "attitudeJet": "",
        "altitude": "",
        "varioJet": "",
        "rpmJet": "",
        "brakes": "",
        "gear": ""
}
	instruments.init(geofs.aircraft.instance.definition.instruments)
	geofs.debug.F117Instruments = 1
}
if (geofs.animation.values.view == "cockpit") {
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
	geofs.camera.currentDefinition.position[0] = geofs.aircraft.instance.definition.cameras.cockpit.position[0] + 0.35
	geofs.camera.currentDefinition.position[1] = geofs.aircraft.instance.definition.cameras.cockpit.position[1] - 0.2
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Stealth technology goes here (haven't been able to develop it)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   } else {
geofs.debug.F117Instruments = 0
geofsAddonAircraft.isF117 = 0
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//Stealth technology goes here (haven't been able to develop it)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	}
}
f117Int = setInterval(function(){runF117()},100)
//-----Grumman F-14A-----------------------------------------------------------------------------------------------------
geofsAddonAircraft.isF14A = 0
geofsAddonAircraft.F14AInstruments = 0
geofsAddonAircraft.runF14A = function(){
   console.log("Loading F-14A Tomcat. Model credit manilov.ap")
}
F14ALi = document.createElement("li");
F14ALi.innerHTML = '<div><img src="http://atlas-content-cdn.pixelsquid.com/stock-images/f-14-airplane-tomcat-fighter-jet-ENB74k2-600.jpg">Grumman F-14A Tomcat</div>';
F14ALi.addEventListener("click", geofsAddonAircraft.runF14A);
//this works actually
F14ALi.setAttribute("data-aircraft", 18)
F14ALi.setAttribute("data-livery", 6)
document.getElementsByClassName("geofs-list geofs-toggle-panel geofs-aircraft-list")[0].appendChild(F14ALi)
function runF14A() {
if (geofs.aircraft.instance.id == 18 && geofs.aircraft.instance.liveryId == 6) {
//Wing sweep physics
   if (geofs.animation.values.optionalAnimatedPartPosition < 1) {
geofs.aircraft.instance.definition.parts[3].area = 17
geofs.aircraft.instance.definition.parts[4].area = 17
geofs.aircraft.instance.definition.parts[2].area = 17
   } else {
geofs.aircraft.instance.definition.parts[3].area = 10
geofs.aircraft.instance.definition.parts[4].area = 10
geofs.aircraft.instance.definition.parts[2].area = 5
	}
//area refinements
geofs.aircraft.instance.definition.parts[11].area = 0.5
geofs.aircraft.instance.definition.parts[14].area = 5
geofs.aircraft.instance.definition.parts[15].area = 5
geofs.aircraft.instance.definition.parts[6].area = 5
geofs.aircraft.instance.definition.parts[5].area = 5
//removing the thrust vectoring
geofs.aircraft.instance.definition.parts[46].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[46].animations[1].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[0].ratio = 0.069;
geofs.aircraft.instance.definition.parts[51].animations[1].ratio = 0.069;
//TF30s having no thrust unless you go really fast
//mass is 25300 by default, try increasing it so thrust can increase as well
geofs.aircraft.instance.definition.mass = 35000
   if (geofs.animation.values.mach >= 1.75) {
geofs.aircraft.instance.engines[0].thrust = 85000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 190000
geofs.aircraft.instance.engines[1].thrust = 85000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 190000
	} else {
geofs.aircraft.instance.engines[0].thrust = 85000
geofs.aircraft.instance.engines[0].afterBurnerThrust = 145000
geofs.aircraft.instance.engines[1].thrust = 85000
geofs.aircraft.instance.engines[1].afterBurnerThrust = 145000
   }

//attempt at landing gear adjustment
geofs.aircraft.instance.definition.parts[17].collisionPoints[0][2] = -0.8
geofs.aircraft.instance.definition.parts[27].collisionPoints[0][2] = -0.8
//Sound adjustment
audio.soundplayer.setRate(geofs.aircraft.instance.definition.sounds[3].id, 0.5)
if (geofs.animation.values.view == "cockpit") {
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.cockpitSetup.parts[0].animations[0].gt = -1
geofs.camera.currentDefinition.position[1] = 6.4
geofs.camera.currentDefinition.position[2] = 1.08
}
//HUD
	geofs.aircraft.instance.setup.instruments.correctHUD = {
            "cockpit": {
                "position": [0, 7.109, 1.06],
                "scale": 0.65
            },
            "animations": [
                {"value": "view", "type": "show", "eq": "cockpit"}
            ]
	}
if (geofsAddonAircraft.F14AInstruments == 0) {
	instruments.init(geofs.aircraft.instance.setup.instruments)
   geofsAddonAircraft.F14AInstruments = 1
}
//Tailhook
geofsAddonAircraft.runAddonTailhook()
//Replacing the tires lol
geofs.aircraft.instance.definition.contactProperties = {
        "wheel": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
        	"rollingFriction": 0.00001,
            "damping": 1
        },
        "frame": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
            "damping": 1
        },
	    "airfoil": {
        	"frictionCoef": 2,
        	"dynamicFriction": 0.01,
            "damping": 1
        },
        "hook": {
            "frictionCoef": 2,
            "dynamicFriction": 0.01,
            "damping": 1
        }
    };
//Adding the airbrake
geofs.aircraft.instance.definition.airbrakesTravelTime = 1;
geofs.aircraft.instance.definition.instruments.spoilers = "";
if (geofs.animation.values.airbrakesTarget > 0) {
   geofs.aircraft.instance.definition.dragFactor = 7
} else {
   geofs.aircraft.instance.definition.dragFactor = 1.5
}
setTimeout(() => {
   geofsAddonAircraft.isF14A = 1
},5000)
setTimeout(() => {
	geofs.aircraft.instance.definition.parts[0].animations[0].value = "rpm"
	geofs.aircraft.instance.definition.parts[0].animations[0].gt = -1
	 geofs.aircraft.instance.definition.parts[50].animations[0].gt = 100000
	 geofs.aircraft.instance.definition.parts[55].animations[0].gt = 100000
},10000)} else {
   geofsAddonAircraft.isF14A = 0
   geofsAddonAircraft.F14AInstruments = 0
}
}
f14aInterval = setInterval(function(){runF14A()},10)
          })();
      };
      window.slights = function() {
          (function() {
              //PASTE IN CODE BELOW
              const workerScript=()=>{function e(e,t,s){let[a,o]=e,[i,r]=t,n=i-a,l=r-o,d=Math.sqrt(n*n+l*l),g=Math.ceil(d/s),c=[];for(let u=0;u<=g;u++){let f=u/g,$=a+f*n,h=o+f*l;c.push([$,h])}return c}function t(e,t,s){let[a,o]=e,i=6371e3,r=a+s/i*(180/Math.PI)*Math.cos(t),n=o+s/i*(180/Math.PI)*Math.sin(t)/Math.cos(a*Math.PI/180);return[r,n]}let s=async function(s,a){var o=[];s.forEach(s=>{for(let i=0;i<s.length-1;i++){let r=s[i],n=s[i+1],l=Math.atan2(n[1]-r[1],n[0]-r[0]),d=e(r,n,Number(a)/111e3);d.forEach(e=>{let s=t(e,l+Math.PI/2,5),a=t(e,l-Math.PI/2,5);var i=!0,r=!0;for(var n in o)if(Math.abs(s[0]-o[n][0])<5/111e3&&Math.abs(s[1]-o[n][1])<5/111e3&&(i=!1),Math.abs(a[0]-o[n][0])<5/111e3&&Math.abs(a[1]-o[n][1])<5/111e3&&(r=!1),!i&&!r)break;i&&(o.push(s),self.postMessage({type:"addStreetlight",data:[s,l]})),r&&(o.push(a),self.postMessage({type:"addStreetlight",data:[a,l+Math.PI]}))})}}),self.postMessage({type:"streetLightsFinished"})};function a(e,t){let[s,a]=e,[o,i]=t,r=6371e3,n=(o-s)*(Math.PI/180),l=(i-a)*(Math.PI/180),d=Math.sin(n/2)**2+Math.cos(s*Math.PI/180)*Math.cos(o*Math.PI/180)*Math.sin(l/2)**2,g=2*Math.atan2(Math.sqrt(d),Math.sqrt(1-d));return r*g}function o(e){for(var t=[],s=new Set,a=0;a<e.length;a++)if(!s.has(a))for(var o=a+1;o<e.length;o++){var i=Math.abs(e[o][0][0]-e[a][0][0]),r=Math.abs(e[o][0][1]-e[a][0][1]);i<5/111111&&r<5/111111&&!s.has(o)&&(t.push(e[o][1]),s.add(o))}return console.log("Removing "+t.length+" streetlights..."),t}function i(e){let t=new Map;e.elements.forEach(e=>{"node"===e.type&&t.set(e.id,[e.lat,e.lon])});let s=[];return e.elements.forEach(e=>{if("way"===e.type&&e.tags&&e.tags.highway){let a=e.nodes.map(e=>t.get(e)).filter(e=>e);s.push(a)}}),s}self.addEventListener("message",async function(e){if("fetchRoadData"==e.data.type){console.log("Fetching Road Data...");let t=e.data.data[0],a=e.data.data[1];console.log("received bounds: "+t);let r=`
    [out:json];
    way[highway][!aeroway][!building](${t}); // Filter to avoid airport taxiways and buildings
    (._;>;);
    out body;
    `,n=`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(r)}`;try{let l=await fetch(n);if(!l.ok)throw Error(`Error fetching data: ${l.statusText}`);let d=await l.json(),g=i(d);console.log("Road coordinates:",g),s(g,a)}catch(c){console.error("Error:",c)}}else if("removeCloseStreetLights"==e.data.type){var u=o(e.data.data);self.postMessage({type:"removeCloseStreetLights",data:u})}})};async function removeStreetLights(e){for(var t in console.log("removing Streetlights"),e)window.geofs.api.viewer.entities.remove(window.roads[e[t]])}function calculateDistance(e,t){let[s,a]=e,[o,i]=t,r=6371e3,n=(o-s)*(Math.PI/180),l=(i-a)*(Math.PI/180),d=Math.sin(n/2)**2+Math.cos(s*Math.PI/180)*Math.cos(o*Math.PI/180)*Math.sin(l/2)**2,g=2*Math.atan2(Math.sqrt(d),Math.sqrt(1-d));return r*g}async function instanceStLts(){let e=window.slPos.map((e,t)=>{let s=window.Cesium.Matrix4.fromTranslation(e),a=window.Cesium.Matrix3.fromQuaternion(window.slOri[t]);return window.Cesium.Matrix4.multiplyByMatrix3(s,a,new window.Cesium.Matrix4)});console.log(e),window.roads.push(window.geofs.api.viewer.scene.primitives.add(new window.Cesium.ModelInstanceCollection({url:"https://raw.githubusercontent.com/tylerbmusic/GPWS-files_geofs/refs/heads/main/streetlight_coned.glb",instances:e.map(e=>({modelMatrix:e}))})))}async function addStreetlight(e,t){window.ltTO+=1,setTimeout(()=>{let s=[e[1],e[0],window.geofs.api.viewer.scene.globe.getHeight(window.Cesium.Cartographic.fromDegrees(e[1],e[0]))],a=window.Cesium.Cartesian3.fromDegrees(s[0],s[1],s[2]),o=new window.Cesium.HeadingPitchRoll(t,0,0),i=window.Cesium.Transforms.headingPitchRollQuaternion(a,o);window.rPos.push([e,window.roads.length]),window.roads.push(window.geofs.api.viewer.entities.add({name:"streetlight",position:a,orientation:i,model:{uri:"https://raw.githubusercontent.com/tylerbmusic/GPWS-files_geofs/refs/heads/main/streetlight_coned.glb",minimumPixelSize:64,maximumScale:1},translucencyByDistance:new window.Cesium.NearFarScalar(100,1,500,0)}))},window.ltTO)}!async function(){"use strict";function afterGMenu(){let e=new window.GMenu("Streetlights","stLt");e.addItem("Render Distance (degrees): ","RenderDist","number",0,"0.003"),e.addItem("Update Interval (seconds): ","UpdateInterval","number",0,"5"),e.addItem("Distance between Streetlights (meters): ","Dist","number",0,"60"),setInterval(()=>{window.doRoads(),setTimeout(()=>{window.streetLightLOD()},3500)},1e3*Number(localStorage.getItem("stLtUpdateInterval")))}window.roads=[],window.rPos=[],window.fPos=[],window.slPos=[],window.slOri=[],window.allSPos=[],window.rdslastBounds,window.slLOD=!1,window.ltTO=0,window.streetLightWorker=new Worker(URL.createObjectURL(new Blob([`(${workerScript})()`],{type:"application/javascript"}))),window.streetLightWorker.addEventListener("message",function(e){if("addStreetlight"==e.data.type){let t=e.data.data[0],s=e.data.data[1],a=[t[1],t[0],window.geofs.api.viewer.scene.globe.getHeight(window.Cesium.Cartographic.fromDegrees(t[1],t[0]))],o=window.Cesium.Cartesian3.fromDegrees(a[0],a[1],a[2]);window.slPos.push(o);let i=new window.Cesium.HeadingPitchRoll(s,0,0),r=window.Cesium.Transforms.headingPitchRollQuaternion(o,i);window.slOri.push(r)}else"removeCloseStreetLights"==e.data.type?(console.log("Chat, I'm cooked"),removeStreetLights(e.data.data)):"streetLightsFinished"==e.data.type&&(console.log("streetLightsFinished"),instanceStLts())}),window.gmenu&&window.GMenu||(console.log("Streetlights getting GMenu"),fetch("https://raw.githubusercontent.com/tylerbmusic/GeoFS-Addon-Menu/refs/heads/main/addonMenu.js").then(e=>e.text()).then(script=>{eval(script)}).then(()=>{setTimeout(afterGMenu,100)}))}(),window.streetLightLOD=async function(){var e,t=void 0!==window.geofs.animation.values.altitude&&void 0!==window.geofs.animation.values.groundElevationFeet?window.geofs.animation.values.altitude-window.geofs.animation.values.groundElevationFeet+3.2808399*window.geofs.aircraft.instance.collisionPoints[window.geofs.aircraft.instance.collisionPoints.length-2].worldPosition[2]:"N/A";if((t>3e3||window.weather.timeRatio<.5)&&!window.slLOD)for(e=0,window.slLOD=!0;e<window.roads.length;e++)window.roads[e].model.uri="https://raw.githubusercontent.com/tylerbmusic/GPWS-files_geofs/refs/heads/main/streetlight_lod.glb";else if(t<=3e3&&window.weather.timeRatio>=.5&&window.slLOD)for(e=0,window.slLOD=!1;e<window.roads.length;e++)window.roads[e].model.uri="https://raw.githubusercontent.com/tylerbmusic/GPWS-files_geofs/refs/heads/main/streetlight_coned.glb"},window.doRoads=async function(){window.ltTO=0;var e=void 0!==window.geofs.animation.values.altitude&&void 0!==window.geofs.animation.values.groundElevationFeet?window.geofs.animation.values.altitude-window.geofs.animation.values.groundElevationFeet+3.2808399*window.geofs.aircraft.instance.collisionPoints[window.geofs.aircraft.instance.collisionPoints.length-2].worldPosition[2]:"N/A";if(!1==window.geofs.cautiousWithTerrain&&"true"==localStorage.getItem("stLtEnabled")&&e<3e3){var t=Number(localStorage.getItem("stLtRenderDist")),s=Math.floor(window.geofs.aircraft.instance.llaLocation[0]/t)*t,a=Math.floor(window.geofs.aircraft.instance.llaLocation[1]/t)*t;if(window.bounds=s+", "+a+", "+(s+t)+", "+(a+t),!window.rdslastBounds||window.rdslastBounds!=window.bounds){for(let o=0;o<window.roads.length;o++)window.geofs.api.viewer.scene.primitives.remove(window.roads[o]);window.roads=[],window.slPos=[],window.slOri=[],console.log("Roads removed, placing new ones"),console.log("bounds: "+window.bounds),window.streetLightWorker.postMessage({type:"fetchRoadData",data:[window.bounds,localStorage.getItem("stLtDist")]})}window.rdslastBounds=window.bounds}else if(!1==window.geofs.cautiousWithTerrain&&"false"==window.stLtOn){window.rdslastBounds="";for(let i=0;i<window.roads.length;i++)window.geofs.api.viewer.scene.primitives.remove(window.roads[i]);window.roads=[],window.slPos=[],window.slOri=[]}},window.removeCloseStreetlights=async function(){let e=5,t=new Map,s=new Set,a=([t,s])=>`${Math.floor(t/e)},${Math.floor(s/e)}`;for(let o=0;o<window.rPos.length;o++){let i=window.rPos[o][0],r=a(i);t.has(r)||t.set(r,[]),t.get(r).push(o)}for(let[n,l]of t){let[d,g]=n.split(",").map(Number);for(let c=-1;c<=1;c++)for(let u=-1;u<=1;u++){let f=`${d+c},${g+u}`,$=t.get(f)||[];for(let h=0;h<l.length;h++){let m=l[h],_=window.rPos[m][0];for(let p=0;p<$.length;p++){let v=$[p];if(m>=v)continue;let P=window.rPos[v][0],w=calculateDistance(_,P);w<=5&&s.add(v)}}}}let b=Array.from(s).sort((e,t)=>t-e);for(let y of b)window.geofs.api.viewer.entities.remove(window.roads[y]);for(let L of b)window.rPos.splice(L,1),window.roads.splice(L,1);console.log(`${b.length} streetlights removed.`)};
          })();
      };
      window.slew = function() {
          (function() {
              //PASTE IN CODE BELOW
              !function(){"use strict";function afterGMenu(){let e=new window.GMenu("Slew Mode","slew");e.addItem("Horizontal Speed (in degrees/frame): ","LatSpeed","number",0,"0.0001"),e.addItem("Vertical Speed (in feet/frame): ","VertSpeed","number",0,"2"),e.addItem("Rotate Amount (in degrees): ","RotAmount","number",0,"2"),e.addItem("Speed after slew disabled (higher values are lower speeds, no flaps): ","SpeedMultiplier","number",0,"1.96"),e.addItem("Speed after slew disabled (with flaps): ","SpeedMultiplierFlaps","number",0,"2.7"),e.addHeader(2,"Keybinds"),e.addKBShortcut("Toggle Slew Mode: ","Toggle",1,"y",function(){kb("Toggle")}),e.addKBShortcut("Forwards: ","Forward",1,"i",function(){kb("Forward")}),e.addKBShortcut("Backwards: ","Backwards",1,"k",function(){kb("Backwards")}),e.addKBShortcut("Left: ","Left",1,"j",function(){kb("Left")}),e.addKBShortcut("Right: ","Right",1,"l",function(){kb("Right")}),e.addKBShortcut("Up: ","Up",1,"u",function(){kb("Up")}),e.addKBShortcut("Down: ","Down",1,"Enter",function(){kb("Down")}),e.addHeader(3,"Rotation"),e.addKBShortcut("Tilt Up: ","RotTiltUp",2,"ArrowUp",function(){kb("TiltUp")}),e.addKBShortcut("Tilt Down: ","RotTiltDown",2,"ArrowDown",function(){kb("TiltDown")}),e.addKBShortcut("Roll Left: ","RotRLeft",2,"ArrowLeft",function(){kb("RLeft")}),e.addKBShortcut("Roll Right: ","RotRRight",2,"ArrowRight",function(){kb("RRight")}),e.addKBShortcut("Yaw Left: ","RotRYLeft",2,",",function(){kb("YLeft")}),e.addKBShortcut("Yaw Right: ","RotYRight",2,".",function(){kb("YRight")})}window.gmenu&&window.GMenu||fetch("https://raw.githubusercontent.com/tylerbmusic/GeoFS-Addon-Menu/refs/heads/main/addonMenu.js").then(e=>e.text()).then(script=>{eval(script)}).then(()=>{setTimeout(afterGMenu,100)});var isSlewing=!1,tilt=0,roll=0,speedF=0,sideways=0,speedV=0,slewA=0,slewB=0,slewAlt=0,headingRad=0;window.lastCam=0,window.lastGravity=[0,0,0],window.slewDiv=document.createElement("div"),window.slewDiv.style.width="fit-content",window.slewDiv.style.height="fit-content",window.slewDiv.style.color="red",window.slewDiv.style.position="fixed",window.slewDiv.style.margin="5px",document.body.appendChild(window.slewDiv);let lastFrameNumber=window.geofs.frameNumber;function checkFrameNumber(){isSlewing&&(window.geofs.frameNumber!==lastFrameNumber&&(lastFrameNumber=window.geofs.frameNumber,updateSlew()),requestAnimationFrame(checkFrameNumber))}function kb(e){localStorage.getItem("slewToggle"),localStorage.getItem("slewForward"),localStorage.getItem("slewLeft"),localStorage.getItem("slewBackwards"),localStorage.getItem("slewRight"),localStorage.getItem("slewUp"),localStorage.getItem("slewRotYRight"),localStorage.getItem("slewRotYLeft"),localStorage.getItem("slewRotTiltUp"),localStorage.getItem("slewRotTiltDown"),localStorage.getItem("slewRotRLeft"),localStorage.getItem("slewRotRRight"),localStorage.getItem("slewDown");let t=document.activeElement===document.getElementById("chatInput");if(!t&&"true"==localStorage.getItem("slewEnabled")){if("Toggle"==e){if(isSlewing=!isSlewing)window.slew();else if(window.geofs.camera.set(window.lastCam),speedF=0,sideways=0,speedV=0,tilt=0,roll=0,window.geofs.aircraft.instance.rigidBody.gravityForce=window.lastGravity,window.slewDiv.innerHTML="",!window.geofs.animation.values.groundContact){var o,i=window.geofs.aircraft.instance;o=0==window.geofs.animation.values.flapsTarget?i.definition.minimumSpeed/Number(localStorage.getItem("slewSpeedMultiplier"))*i.definition.mass:i.definition.minimumSpeed/Number(localStorage.getItem("slewSpeedMultiplierFlaps"))*i.definition.mass,i.rigidBody.applyCentralImpulse(window.V3.scale(i.object3d.getWorldFrame()[1],o))}}else"Forward"==e?speedF+=Number(localStorage.getItem("slewLatSpeed")):"Backwards"==e?speedF-=Number(localStorage.getItem("slewLatSpeed")):"Right"==e?sideways+=Number(localStorage.getItem("slewLatSpeed")):"Left"==e?sideways-=Number(localStorage.getItem("slewLatSpeed")):"Up"==e?speedV+=Number(localStorage.getItem("slewVertSpeed")):"Down"==e?speedV-=Number(localStorage.getItem("slewVertSpeed")):"YRight"==e?headingRad+=Number(localStorage.getItem("slewRotAmount"))*window.DEGREES_TO_RAD:"YLeft"==e?headingRad-=Number(localStorage.getItem("slewRotAmount"))*window.DEGREES_TO_RAD:"TiltUp"==e?tilt+=Number(localStorage.getItem("slewRotAmount"))*window.DEGREES_TO_RAD:"TiltDown"==e?tilt-=Number(localStorage.getItem("slewRotAmount"))*window.DEGREES_TO_RAD:"RLeft"==e?roll+=Number(localStorage.getItem("slewRotAmount"))*window.DEGREES_TO_RAD:"RRight"==e&&(roll-=Number(localStorage.getItem("slewRotAmount"))*window.DEGREES_TO_RAD)}}async function updateSlew(){headingRad%=360*window.DEGREES_TO_RAD,window.controls.setMode(window.pControl);var e=Math.cos(headingRad)*speedF-Math.sin(headingRad)*sideways,t=Math.sin(headingRad)*speedF+Math.cos(headingRad)*sideways;slewA+=e,slewB+=t,slewAlt=window.geofs.animation.values.groundContact&&speedV<0?slewAlt:slewAlt+speedV,window.geofs.aircraft.instance.llaLocation=[slewA,slewB,slewAlt],window.geofs.aircraft.instance.object3d.setInitialRotation([tilt,roll,headingRad]),window.geofs.aircraft.instance.rigidBody.v_linearVelocity=[0,0,0],window.geofs.aircraft.instance.rigidBody.v_acceleration=[0,0,0],window.geofs.aircraft.instance.rigidBody.v_angularVelocity=[0,0,0],window.geofs.aircraft.instance.rigidBody.v_angularAcceleration=[0,0,0],window.geofs.aircraft.instance.rigidBody.gravityForce=[0,0,0],window.slewDiv.innerHTML=`
        <p style="margin: 0px; font-weight: bold;">LAT: ${slewA.toFixed(4)} LON: ${slewB.toFixed(4)} ALT: ${(slewAlt*window.METERS_TO_FEET).toFixed(1)} FT MSL MAG ${(headingRad*window.RAD_TO_DEGREES).toFixed(0)} ${((Math.abs(speedF)+Math.abs(sideways))/Number(localStorage.getItem("slewLatSpeed"))).toFixed(0)} UNITS</p>
        `}window.slew=async function(){speedF=0,sideways=0,speedV=0,tilt=0,roll=0,window.lastGravity=window.geofs.aircraft.instance.rigidBody.gravityForce,window.lastCam=window.geofs.camera.currentMode,headingRad=window.geofs.animation.values.heading360*window.DEGREES_TO_RAD,window.pControl=window.geofs.preferences.controlMode,slewA=window.geofs.aircraft.instance.llaLocation[0],slewB=window.geofs.aircraft.instance.llaLocation[1],slewAlt=window.geofs.aircraft.instance.llaLocation[2],window.geofs.camera.set(5),requestAnimationFrame(checkFrameNumber)}}();
          })();
      };
      window.twlights = function() {
          (function() {
              //PASTE IN CODE BELOW
              function calculateBearing(e,t,a,n){let i=(a-e)*Math.PI/180,s=t*Math.PI/180,r=n*Math.PI/180,o=Math.sin(i)*Math.cos(r),l=Math.cos(s)*Math.sin(r)-Math.sin(s)*Math.cos(r)*Math.cos(i),u=180*Math.atan2(o,l)/Math.PI;return(u+360)%360}function calculateOffsetPoint(e,t,a,n){let i=6378137,s=(a+90)*Math.PI/180,r=n*Math.cos(s)/i,o=n*Math.sin(s)/(i*Math.cos(Math.PI*t/180));return{lonPlus:e+180*o/Math.PI,latPlus:t+180*r/Math.PI,lonMinus:e-180*o/Math.PI,latMinus:t-180*r/Math.PI}}function interpolatePoints(e,t,a){let[n,i]=e,[s,r]=t,o=Math.sqrt(Math.pow(s-n,2)+Math.pow(r-i,2)),l=Math.max(Math.floor(o/a),1),u=[];for(let $=0;$<=l;$++){let g=$/l,h=n+(s-n)*g,c=i+(r-i)*g;u.push([h,c,0])}return u}async function getTaxiwayData(e){let t="https://overpass-api.de/api/interpreter",a=`
        [out:json];
        (
            way["aeroway"="taxiway"]({{bbox}});
        );
        out body;
        >;
        out skel qt;
    `,n=e;try{let i=await fetch(`${t}?data=${encodeURIComponent(a.replace("{{bbox}}",n))}`),s=await i.json(),r=[],o={};return s.elements.forEach(e=>{"node"===e.type&&(o[e.id]=e)}),s.elements.forEach(e=>{if("way"===e.type){let t=e.nodes.map(e=>{let t=o[e];if(t)return[t.lon,t.lat,0]}).filter(Boolean);if(t.length>1){let a=[],n=2e-4+(Math.random()-.5)*5e-5;for(let i=0;i<t.length-1;i++){let s=interpolatePoints(t[i],t[i+1],n),l=calculateBearing(t[i][0],t[i][1],t[i+1][0],t[i+1][1]),u=10,$=s.map(([e,t,a])=>{let n=calculateOffsetPoint(e,t,l,u);return[[n.lonPlus,n.latPlus,a],[n.lonMinus,n.latMinus,a]]});a.push(...$)}r.push(a)}}}),r}catch(l){console.error("Error fetching taxiway data:",l)}}async function getTaxiwayDataEdgeless(e){let t="https://overpass-api.de/api/interpreter",a=`
        [out:json];
        (
            way["aeroway"="taxiway"]({{bbox}});
        );
        out body;
        >;
        out skel qt;
    `,n=e;try{let i=await fetch(`${t}?data=${encodeURIComponent(a.replace("{{bbox}}",n))}`),s=await i.json(),r=[],o={};return s.elements.forEach(e=>{"node"===e.type&&(o[e.id]=e)}),s.elements.forEach(e=>{if("way"===e.type){let t=e.nodes.map(e=>{let t=o[e];if(t)return[t.lon,t.lat,0]}).filter(Boolean);if(t.length>1){let a=7e-5+(Math.random()-.5)*2e-5;for(let n=0;n<t.length-1;n++){let i=interpolatePoints(t[n],t[n+1],a);r.push(...i)}}}}),r}catch(l){console.error("Error fetching taxiway data:",l)}}function checkProximityToRunway(e){if(!window.runwayThresholds)for(var t in window.runwayThresholds=[],window.geofs.runways.nearRunways){let a=window.geofs.runways.nearRunways[t],n=a.threshold1,i=a.threshold2;window.runwayThresholds.push(interpolatePoints([n[1],n[0]],[i[1],i[0]],5/111e3))}let s=(40/111e3)**2,r=e[0],o=e[1];for(var l in window.runwayThresholds)if(window.runwayThresholds[l].some(([e,t])=>{let a=e-r,n=t-o;return a**2+n**2<s}))return!0;return!1}!function(){"use strict";function afterGMenu(){let e=new window.GMenu("Taxiway Lights","twL");e.addItem("Render distance (degrees): ","RenderDist","number",0,"0.05"),e.addItem("Update Interval (seconds): ","UpdateInterval","number",0,"5"),e.addItem("Green/Yellow Light Size: ","GSize","number",0,"0.05"),e.addItem("Blue Light Size: ","BSize","number",0,"0.07"),console.log("TwL Enabled? "+localStorage.getItem("twLEnabled")),setTimeout(()=>{window.updateLights()},100*Number(localStorage.getItem("twLUpdateInterval")))}window.twLights=[],window.twPos=[],window.currLight,window.errs=0,window.gmenu&&window.GMenu||(console.log("Taxiway Lights getting GMenu"),fetch("https://raw.githubusercontent.com/tylerbmusic/GeoFS-Addon-Menu/refs/heads/main/addonMenu.js").then(e=>e.text()).then(script=>{eval(script)}).then(()=>{setTimeout(afterGMenu,100)}))}(),window.updateLights=async function(){if(!1==window.geofs.cautiousWithTerrain&&"true"==localStorage.getItem("twLEnabled")){var e=Number(localStorage.getItem("twLRenderDist")),t=Math.floor(window.geofs.aircraft.instance.llaLocation[0]/e)*e,a=Math.floor(window.geofs.aircraft.instance.llaLocation[1]/e)*e,n=t+", "+a+", "+(t+e)+", "+(a+e);if(!window.lastBounds||window.lastBounds!=n){for(let i=0;i<window.twLights.length;i++)window.geofs.api.viewer.entities.remove(window.twLights[i]);window.twLights=[],console.log("Lights removed, placing taxiway edge lights"),window.getTwD(n),console.log("Placing taxiway centerline lights"),window.getTwDE(n)}window.lastBounds=n}else if("true"!=localStorage.getItem("twLEnabled")){window.lastBounds="";for(let s=0;s<window.twLights.length;s++)window.geofs.api.viewer.entities.remove(window.twLights[s]);window.twLights=[]}setTimeout(()=>{window.updateLights()},1e3*Number(localStorage.getItem("twLUpdateInterval")))},window.getTwD=async function(e){getTaxiwayData(e).then(e=>{e.forEach(e=>{e.forEach(([e,t])=>{[e,t].forEach(e=>{let t=window.geofs.getGroundAltitude([e[1],e[0],e[2]]).location;t[2]+=.3556;let a=window.Cesium.Cartesian3.fromDegrees(t[1],t[0],t[2]);a[2]<0&&(window.errs++,a[2]=0-a[2]),window.twLights.push(window.geofs.api.viewer.entities.add({position:a,billboard:{image:"https://tylerbmusic.github.io/GPWS-files_geofs/bluelight.png",scale:Number(localStorage.getItem("twLBSize"))*(1/window.geofs.api.renderingSettings.resolutionScale),scaleByDistance:{near:1,nearValue:.5,far:1500,farValue:.15},translucencyByDistance:new window.Cesium.NearFarScalar(10,1,1e4,0)}}))})})})})},window.getTwDE=async function(e){getTaxiwayDataEdgeless(e).then(e=>{var t=0;e.forEach(e=>{t++;let a=window.geofs.getGroundAltitude([e[1],e[0],e[2]]).location;a[2]+=.3556;let n=window.Cesium.Cartesian3.fromDegrees(a[1],a[0],a[2]),i=checkProximityToRunway(e),s=t%2==0&&i?"https://tylerbmusic.github.io/GPWS-files_geofs/yellowlight.png":"https://tylerbmusic.github.io/GPWS-files_geofs/greenlight.png";n[2]<0&&(window.errs++,n[2]=0-n[2]),window.twPos.push([n,window.twLights.length]),window.twLights.push(window.geofs.api.viewer.entities.add({position:n,billboard:{image:s,scale:Number(localStorage.getItem("twLGSize"))*(1/window.geofs.api.renderingSettings.resolutionScale),scaleByDistance:{near:1,nearValue:1,far:2e3,farValue:.15},translucencyByDistance:new window.Cesium.NearFarScalar(10,1,1e4,0)}}))})})},window.removeCloseTwLights=function(){let e={},t=2,a=new Set,n=(e,a)=>`${Math.floor(e/t)}_${Math.floor(a/t)}`;for(let i=0;i<window.twPos.length;i++){let s=window.twPos[i][0],r=n(s.x,s.y);e[r]||(e[r]=[]),e[r].push(i)}for(let o in e){let[l,u]=o.split("_").map(Number),$=[`${l}_${u}`,`${l+1}_${u}`,`${l-1}_${u}`,`${l}_${u+1}`,`${l}_${u-1}`,`${l+1}_${u+1}`,`${l-1}_${u-1}`,`${l+1}_${u-1}`,`${l-1}_${u+1}`];for(let g of $)if(e[g])for(let h=0;h<e[o].length;h++){let c=e[o][h],f=window.twPos[c][0];for(let w of e[g]){if(c>=w||a.has(w))continue;let d=window.twPos[w][0];3>=Math.abs(f.x-d.x)&&3>=Math.abs(f.y-d.y)&&a.add(w)}}}let _=Array.from(a).sort((e,t)=>t-e);for(let p of _)window.geofs.api.viewer.entities.remove(window.twLights[p]),window.twPos.splice(p,1),window.twLights.splice(p,1);console.log(`${_.length} taxiway lights removed.`)};
          })();
      };
       window.tiller = function() {
          (function() {
              //PASTE IN CODE BELOW
              setInterval(function(){geofs.aircraft.instance.groundContact&&geofs.aircraft.instance.groundSpeed>10&&Math.abs(controls.yaw)>4/geofs.aircraft.instance.groundSpeed&&(controls.yaw=4/geofs.aircraft.instance.groundSpeed*Math.sign(controls.yaw))},6);
          })();
      };
      createAddonManager();
  })();
