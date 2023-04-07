// DECLARE VARIABLES //
var msgBtn = document.querySelector('#msgbtn')
var msgBox = document.querySelector('.message-box')
var messages = document.querySelectorAll('input[name="message"]')
var clearBtn = document.querySelector('#clearbtn')
var homeBtn = document.querySelector('#homebtn')
var viewAllBtn = document.querySelector('#viewall')
var viewFaveBtn = document.querySelector('#faves')
var homeView = document.querySelector('.home-view')
var allMessagesView = document.querySelector('.all-messages')



// EVENT LISTENERS //
msgBtn.addEventListener('click', showMessage)
clearBtn.addEventListener('click', clearMsg)
viewAllBtn.addEventListener('click', showAllMessages)
homeBtn.addEventListener('click', goHome)



// EVENT HANDLERS AND FUNCTIONS //
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }
function clearMsg() {
    msgBox.innerHTML = `<img src="assets/meditate.svg" alt="Bell Icon">`
    clearBtn.classList.add('hidden');
    for (var message of messages) {
        message.checked = false;
    }
}

function getRandomMsg(msgArray) {
    var randomMsg = msgArray[getRandomIndex(msgArray)];
    return randomMsg;
}

function showMessage() {
    var selectedMsgType;
    for (var message of messages) {
        if (message.checked) {
            selectedMsgType = message.value;
            break;
        }
    }
    if (selectedMsgType === 'mantra'){
        var randomMessage = getRandomMsg(mantras)
        msgBox.innerHTML = `<p> ${randomMessage} </p>`
        clearBtn.classList.remove('hidden');
    } else if (selectedMsgType === 'affirmation') {
        var randomMessage = getRandomMsg(affirmations)
        msgBox.innerHTML = `<p> ${randomMessage} </p>`
        clearBtn.classList.remove('hidden');
    } else {
        msgBox.innerHTML = `<p> ✨Please select a message type✨ </p>` 
    }
}

function goHome() {
    homeView.classList.remove('hidden')
    viewAllBtn.classList.remove('hidden')
    homeBtn.classList.add('hidden')
    allMessagesView.classList.add('hidden')
}

function showAllMessages() {
    homeView.classList.add('hidden')
    viewAllBtn.classList.add('hidden')
    homeBtn.classList.remove('hidden')
    allMessagesView.classList.remove('hidden')
}
