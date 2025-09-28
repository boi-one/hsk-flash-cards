import * as customHSKOptions from './hskList.js'
import { practiceSession } from './practiceSettings.js';


const customCheckbox = document.getElementById('custom');
const customLevelSelector = document.getElementById('customLevel');
const hsk1Button = document.getElementById('hsk1');
const hsk2Button = document.getElementById('hsk2');
const startButton = document.getElementById('startbutton');
const settingsButton = document.getElementById('settingsbutton');
const start = document.getElementById('start');

let hskData = null;

hsk1Button.addEventListener('change', () => {
    customHSKOptions.ReturnHSKList('hsk1').then(res => console.log(res)); //todo kan dit niet uitlezen
});

hsk2Button.addEventListener('change', () => {
    customHSKOptions.ReturnHSKList('hsk2').then(res => console.log(res));
});

startButton.addEventListener('click', () => {
    practiceSettings.practiceSession.wordSelection += customHSKOptions.selectedCards; 
    window.location.href = '/practice';
});

let settingsMenuOpen = false;
settingsButton.addEventListener('click', () => {
    settingsMenuOpen = !settingsMenuOpen;

    if(settingsMenuOpen)
    {
        const optionsMenu = practiceSettings.CreateOptions();
        start.insertAdjacentElement('afterend', optionsMenu);
    }
    else document.getElementById('settingswindow').remove();
});

function CreateCustomHSKWindow(elements = [])
{
    const customHSKWindow = document.createElement('div');
    customHSKWindow.setAttribute('id', 'customLevelOptions');
    customHSKWindow.style.width = '40%';
    customHSKWindow.style.height = '70vh';
    customHSKWindow.style.overflowY = 'scroll';
    customLevelSelector.insertAdjacentElement('afterend', customHSKWindow);

    for(let i = 0; i < elements.length; i++)
    {
        customHSKWindow.appendChild(elements[i]);
    }
}

customCheckbox.addEventListener('click', () => {
    if (customCheckbox.checked) {
        const newItem = document.createElement('div');
        newItem.id = 'customSelection';
        newItem.textContent = "new item";
        customHSKOptions.GenerateHSKListElements().then(customHSKElements => {
                CreateCustomHSKWindow(customHSKElements);
            });
    }
    else {
        document.getElementById('customLevelOptions').remove();
        //TODO: als custom uitgezet word alleen nog maar de andere hsk levels die geactiveerd zijn includeren
        //      als je klikt met spatie dat de checkbox uitgaat die je net hebt geklikt
        //      als je hsk1 of 2 etc. aanklikt en custom ook aan hebt staan zet alles van hsk1 of 2 etc. aan in de custom viewer
        //      catagorizeer op hsk level in de custom viewer
        //      mooiere css (waaronder de settings menu bold titles voor variations, order etc. naast elkaar ipv boven elkaar)
        //      check pagina voor bugs enzo
    }
});