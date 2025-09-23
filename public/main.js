import * as customHSKOptions from './hskList.js'
import * as practiceSettings from './practiceSettings.js'

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
settingsButton.addEventListener('click', () => { //todo: wanneer je het weg klikt en weer terug klikt laad de settings in uit de practiceSession class
    settingsMenuOpen = !settingsMenuOpen;
    
    if(settingsMenuOpen)
    {
        const lol = practiceSettings.CreateOptions();
        start.insertAdjacentElement('afterend', lol);
    }
    else
    {
       // close the window again which should be opened by the if statement above
       document.getElementById('settingswindow').remove();
    }
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
        if (!hskData) {
            customHSKOptions.GenerateHSKListElements().then(customHSKElements => {
                CreateCustomHSKWindow(customHSKElements);
            });
        }
        // hskdata is if the data is retrieved from the server or not
        if (hskData) { 
            

            
        }

    }
    else {
        document.getElementById('customLevelOptions').remove();
    }
});