const variations = {
    english_pinyin: 'english_pinyin',
    english_hanzi: 'english_hanzi',
    pinyin_hanzi: 'pinyin_hanzi',
    pinyin_english: 'pinyin_english',
    hanzi_english: 'hanzi_english',
    hanzi_pinyin: 'hanzi_pinyin'
};

const order = {
    random: 'random',
    difficult: 'difficult',
    easy: 'easy'
};

const orderOptions = [];

export class PracticeSession {
    wordSelection = [];
    sessionOrder = order.random;

    sessionVariations = {
        english_pinyin: true,
        english_hanzi: false,
        pinyin_hanzi: false,
        pinyin_english: false,
        hanzi_english: false,
        hanzi_pinyin: false
    };

    setVariation(variations) {
        switch (variations) {
            case 'english_pinyin':
                this.sessionVariations.english_pinyin = !this.sessionVariations.english_pinyin;
                break;
            case 'english_hanzi':
                this.sessionVariations.english_hanzi = !this.sessionVariations.english_hanzi;
                break;
            case 'pinyin_hanzi':
                this.sessionVariations.pinyin_hanzi = !this.sessionVariations.pinyin_hanzi;
                break;
            case 'pinyin_english':
                this.sessionVariations.pinyin_english = !this.sessionVariations.pinyin_english;
                break;
            case 'hanzi_english':
                this.sessionVariations.hanzi_english = !this.sessionVariations.hanzi_english;
                break;
            case 'hanzi_pinyin':
                this.sessionVariations.hanzi_pinyin = !this.sessionVariations.hanzi_pinyin;
        }
    }
}

export const practiceSession = new PracticeSession();

//TODO: DELETE!
// document.addEventListener('keydown', function (event) {
//     console.log(practiceSession);
// });

function CreateVariationOption(titleName, variation, enabled = false) {
    let practiceOption = document.createElement('div');
    let title = document.createElement('p');
    let select = document.createElement('input');

    title.innerText = titleName;
    select.type = 'checkbox';
    select.checked = enabled;
    practiceOption.className = 'option';

    select.addEventListener('change', selected => {
        practiceSession.setVariation(variation);
    });

    practiceOption.appendChild(title);
    practiceOption.appendChild(select);

    return practiceOption;
}

function CreateDifficultyOption(titleName, setOrder) {
    let practiceOption = document.createElement('div');
    let title = document.createElement('p');
    let select = document.createElement('input');

    title.innerText = titleName;
    select.type = 'checkbox';
    select.checked = (setOrder === practiceSession.sessionOrder);
    practiceOption.className = 'option';

    select.addEventListener('change', selected => {
        disableAllCheckbox(select, setOrder);
    });

    practiceOption.appendChild(title);
    practiceOption.appendChild(select);

    return practiceOption;
}

function disableAllCheckbox(clickedCheckbox, setOrder) {
    for (let index = 0; index < orderOptions.length; index++) {
        const option = orderOptions[index];
        const checkbox = option.querySelector('input[type="checkbox"]');

        if (checkbox === clickedCheckbox) {
            practiceSession.sessionOrder = setOrder;
            continue;
        }

        checkbox.checked = false;
    }
}

export function CreateOptions() {

    const english_pinyin = CreateVariationOption("english to pinyin", variations.english_pinyin, practiceSession.sessionVariations.english_pinyin);
    const english_hanzi = CreateVariationOption("english to hanzi", variations.english_hanzi, practiceSession.sessionVariations.english_hanzi);
    const pinyin_hanzi = CreateVariationOption("pinyin to hanzi", variations.pinyin_hanzi, practiceSession.sessionVariations.pinyin_hanzi);
    const pinyin_english = CreateVariationOption("pinyin to english", variations.pinyin_english, practiceSession.sessionVariations.pinyin_english);
    const hanzi_english = CreateVariationOption("hanzi to english", variations.hanzi_english, practiceSession.sessionVariations.hanzi_english);
    const hanzi_pinyin = CreateVariationOption("hanzi to pinyin", variations.hanzi_pinyin, practiceSession.sessionVariations.hanzi_pinyin);

    const easy = CreateDifficultyOption("easy", order.easy);
    const difficult = CreateDifficultyOption("difficult", order.difficult);
    const random = CreateDifficultyOption("random", order.random);

    orderOptions.push(easy);
    orderOptions.push(difficult);
    orderOptions.push(random);

    const body = document.createElement('div');
    body.id = 'settingswindow';

    const variationsTitle = document.createElement('p');
    variationsTitle.innerText = 'Variations';
    variationsTitle.style.fontWeight = 400;
    const orderTitle = document.createElement('p');
    orderTitle.style.fontWeight = 400;
    orderTitle.innerText = 'order';
    body.appendChild(variationsTitle);
    body.appendChild(english_pinyin);
    body.appendChild(english_hanzi);
    body.appendChild(pinyin_hanzi);
    body.appendChild(pinyin_english);
    body.appendChild(hanzi_english);
    body.appendChild(hanzi_pinyin);
    body.appendChild(orderTitle);
    body.appendChild(easy);
    body.appendChild(difficult);
    body.appendChild(random);

    return body;
}