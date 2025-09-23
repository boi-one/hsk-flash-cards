export const selectedCards = [];

let hskData = null;

export function ReturnHSKList(route = 'customhsk') {

    if (!hskData) {

        return fetch(`http://localhost:3000/${route}`)
            .then(response => response.json())
            .then(data => {
                console.log("pull data from server");
                hskData = data;
                return data;
            })
            .catch(error => {
                console.error(error);
                return null;
            });
    }
    else{
        console.log("reuse data");   
        return Promise.resolve(hskData);
    }
}

export function GenerateHSKListElements() {

    return ReturnHSKList().then(returnedhskList => {
        const elements = [];

        for (let i = 0; i < returnedhskList.length; i++) {
            const currentIndex = returnedhskList[i];

            const card = document.createElement('div');
            const word = document.createElement('div');
            const info = document.createElement('div');

            let english = document.createElement('p');
            let pinyin = document.createElement('p');
            let hanzi = document.createElement('p');
            let select = document.createElement('input');
            let passed = document.createElement('p');
            let passedCount = document.createElement('p');
            let correct = document.createElement('p');
            let correctCount = document.createElement('p');

            card.className = 'card';
            card.style.borderStyle = 'solid';
            card.style.borderColor = 'rgba(0, 0, 0, 0)';
            word.className = 'word';
            english.innerText = currentIndex.english;
            pinyin.innerText = currentIndex.pinyin;
            hanzi.innerText = currentIndex.hanzi;
            hanzi.style.fontSize = '2em';
            select.type = 'checkbox';
            passed.innerText = 'passed';
            passed.style.fontWeight = '900';
            passedCount.innerText = currentIndex.passed;
            correct.innerText = 'correct';
            correct.style.fontWeight = 'bold';
            correctCount.innerText = currentIndex.correct;

            word.appendChild(english);
            word.appendChild(pinyin);
            word.appendChild(hanzi);

            info.appendChild(passed);
            info.appendChild(passedCount);
            info.appendChild(correct);
            info.appendChild(correctCount);

            card.appendChild(select);
            card.appendChild(word);
            card.appendChild(info);

            card.style.backgroundColor = i % 2 == 0 ? 'gray' : 'lightgray';
            elements.push(card);

            let cardSelected = false;
            select.addEventListener('change', selected => {
                cardSelected = !cardSelected;
                if (cardSelected) {
                    card.style.borderColor = 'rgba(255, 255, 255, 1)';
                    selectedCards.push(currentIndex);
                }
                else {
                    card.style.borderColor = 'rgba(0, 0, 0, 0)';
                }
            });
        }
        return elements;
    });
}