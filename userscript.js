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
        if (!geofsPreferencesPanel) {
            console.warn('GeoFS preferences panel not found!');
            return;
        }

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
            //ADDON DESCRIPTIONS GO HERE:
            const descriptions = {
                'Example Addon 1': `This is my addon. Click RUN to execute it.
                It has multiple lines for better readability.
                You can describe its functionality in detail here.`,
                'Example Addon 2': `This is another addon. It also has a long description.
                You can provide installation steps, usage instructions,
                and any other important details.`
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
            description.style.paddingRight = '60px';

            
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
        //ADDON NAMES AND runFunctions GO HERE:
        addAddon('Example Addon 1', ExampleAddon1);
        addAddon('Example Addon 2', ExampleAddon2);

        geofsPreferencesPanel.appendChild(addonListItem);
    }

    // ADDON CODE GOES HERE:
    window.ExampleAddon1 = function() {
        (function() {
            //PASTE IN CODE BELOW
            console.log('Example Addon 1 running');
        })();
    };
    
    window.ExampleAddon2 = function() {
        (function() {
            //PASTE IN CODE BELOW
            console.log('Example Addon 2 running');
        })();
    };

    createAddonManager();
})();
