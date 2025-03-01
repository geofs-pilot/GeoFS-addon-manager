# GeoFS-addon-manager
Inspired by https://github.com/tylerbmusic/GeoFS-Addon-Menu <br/>
This creates an Addons item in the options panel, which drops down to allow you to run different addons. There is also a description section where you can put instructions, etc. <br/>
![image](https://github.com/user-attachments/assets/da122b15-1bf9-44ac-9264-9622cf767246) <br/>
The userscript is an example setup that creates the addons above. You can add your own addons in the places that I've labeled accordingly. <br/>
I've also included the version that I use. It includes 15 addons (some of which I modified slightly to allow it to better run alongside the others*):

https://github.com/meatbroc/GeoFS-atc-airspace <br/>
https://github.com/jtpotato/geofs-scripts/tree/main/Autoland%2B%2B <br/>
https://github.com/tylerbmusic/GeoFS-Flight-Path-Vector <br/>
https://github.com/tylerbmusic/GeoFS-Failures <br/>
https://github.com/geofs-pilot/GeoFS-Fuel <br/>
https://github.com/tylerbmusic/GeoFS-GPWS-Callouts <br/>
https://github.com/RadioactivePotato/GeoFS-Information-Display <br/>
https://github.com/tylerbmusic/GeoFS-Landing-Stats <br/>
https://github.com/kolos26/GEOFS-LiverySelector <br/>
https://github.com/geofs-pilot/geofs-overpowered-engines/tree/main <br/>
https://github.com/TotallyRealElonMusk/GeoFS-Pushback <br/>
https://github.com/NVB9ALT/Realism-pack. <br/>
https://github.com/tylerbmusic/GeoFS-Slew-Mode <br/>
https://github.com/tylerbmusic/GeoFS-Taxiway-Lights

*modifications include CSS changes to make all the ui bar elements coexist neatly, integrating the fuel leak failure with the fuel addon, adding a RUN ALL button (if you also want a RUN ALL button, it is on line 40-59 of my example.js), and remapping the FPV toggle key to [Insert] to prevent overlapping with the slew mode keybinds <br/>
![image](https://github.com/user-attachments/assets/b14ba171-feb5-4a72-992e-78ea02138824) <br/>
# Things I'm working on
 -allowing slew mode and taxiway lights to run at the same time (for some reason you could only run one at a time) <br/>
 -allowing exemptions from the RUN ALL button, for example so that if realism pack is running, there's no need to run liveryselector too (or I could just get rid of LS entirely for that purpose)
