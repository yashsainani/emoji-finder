const search = document.getElementById('search');
const btns = document.querySelectorAll('ul');
const emojiDiv = document.querySelector('.dynamic-container');
const myBody = document.body;

function addEmoji(toFind) {
    let searchedEmojis = emojiList.filter(emoji => {
        if (toFind === '' || toFind === 'all') return true;
        else if (emoji.description.includes(toFind)) return true;
        else if (emoji.category.includes(toFind)) return true;
        else if (emoji.aliases.includes(toFind)) return true;
        else if (emoji.tags.includes(toFind)) return true;
        else if (emoji.unicode_version.includes(toFind)) return true;
        else if (emoji.ios_version.includes(toFind)) return true;
    });

    emojiDiv.innerHTML = "";

    searchedEmojis.forEach(emoji => {
        let span = document.createElement('span');
        span.innerText = emoji.emoji;
        emojiDiv.appendChild(span);
        
        span.addEventListener('click', () => {
            navigator.clipboard.writeText(emoji.emoji);
            alert(`${emoji.emoji} Copied this emoji!!!`)
            let copiedDiv = '';
            copiedDiv += `
                <div class="copied-div">
                <span class="emoji">${emoji.emoji}</span>
                <span class="emoji-info">Description -: ${emoji.description}</span>
                <span class="emoji-info">Category -: ${emoji.category}</span>
                <span class="emoji-info">Aliases -: ${emoji.aliases}</span>
                <span class="emoji-info">Tags -: ${emoji.tags}</span>
                <span class="emoji-info">Unicode -: ${emoji.unicode_version}</span>
                <span class="emoji-info">IOS -: ${emoji.ios_version}</span>
                <span class="emoji-info">"COPIED THE EMOJI"</span>
                <button class="close-btn">x</button>
                </div>
            `;
            myBody.insertAdjacentHTML('afterbegin', copiedDiv);
            myBody.classList.add('blur');
            document.querySelector('.close-btn').addEventListener('click', () => {
                document.querySelector('.close-btn').parentNode.remove();
                // document.querySelector('.copied-div').remove();
                myBody.classList.remove('blur');
            });
        });
    });
}

window.addEventListener('load', () =>  addEmoji(''));

search.addEventListener('keydown', () => {
    addEmoji(search.value.toLowerCase());
});

btns.forEach(ele => {
    ele.childNodes.forEach((li, idx) => {
        if (idx % 2 !== 0) {
            li.addEventListener('click', () => addEmoji(li.innerText.toLowerCase()));
        }
    });
});