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
var affirmMsgs = document.querySelector('#affirmations')
var mantraMsgs = document.querySelector('#mantras')
var addAffirmMsgBtn = document.querySelector('#addafirmbtn')
var addMtraMsgBtn = document.querySelector('#addmtrabtn')
var affirmModal = document.querySelector('#modal-1')
var mantraModal = document.querySelector('#modal-2')
var submitABtn = document.querySelector('.submit1')
var submitMBtn = document.querySelector('.submit2')
var userAMessage = document.querySelector(".user-message")
var userMMessage = document.querySelector(".user-message2")
var modalBody = document.querySelector(".modal-body")
var error1 = document.querySelector('#error1')
var error2 = document.querySelector('#error2')
var error11 = document.querySelector('#error11')
var error22 = document.querySelector('#error22')
var close1Btn = document.querySelector('.close1')
var close2Btn = document.querySelector('.close2')


// EVENT LISTENERS //
msgBtn.addEventListener('click', showMessage)
clearBtn.addEventListener('click', clearMsg)
viewAllBtn.addEventListener('click', showAllMessages)
homeBtn.addEventListener('click', goHome)
addAffirmMsgBtn.addEventListener('click', addAffirmMsg)
addMtraMsgBtn.addEventListener('click', addMantraMsg)
submitABtn.addEventListener('click', function() {
    submitAffirmMsg() 
})
submitMBtn.addEventListener('click', function() {
    submitMantraMsg()
})
close1Btn.addEventListener('click', closeModalA)
close2Btn.addEventListener('click', closeModalM)

// EVENT HANDLERS AND FUNCTIONS //
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function addHidden(elements) {
    elements.forEach((element) => element.classList.add('hidden'))
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
    addHidden([homeBtn, allMessagesView])
}

function showAllMessages() {
    addHidden([homeView, viewAllBtn])
    homeBtn.classList.remove('hidden')
    allMessagesView.classList.remove('hidden')
    resetMessages()
    makeMsgEditable()
}

function resetMessages() {
    affirmMsgs.innerHTML = `<h1><u>Affirmations</u> 🌸</h1>`;
    mantraMsgs.innerHTML = `<h1><u>Mantras</u> 👑</h1>`;
    showLists(affirmations)
    showLists(mantras)
}

function showLists(msgArray) {
    for (var i = 0; i < msgArray.length; i++) {
        if (msgArray === affirmations) {
            affirmMsgs.innerHTML += `<li id="a-${i}" class="editable">${affirmations[i]}</li>`;
        }
        else if (msgArray === mantras) {
            mantraMsgs.innerHTML += `<li id="m-${i}" class="editable">${mantras[i]}</li>`
        }
    }
}
var enabled = false;

function makeMsgEditable() {
    var allMessages = document.querySelectorAll('.editable');
    allMessages.forEach((element) => 
        element.addEventListener('dblclick', function (event) {
            editMessage(event)
    })
 )}


function editMessage(event) {
    if (!enabled) {
        enabled = true;
    } else {
        return;
    }
    var currentMessage = event.target;
    var editForm = document.createElement('form')
    editForm.innerHTML += `
    <form class="editing">
        <input placeholder="${currentMessage.innerText}" class="edit-message"/>
        <p id="hiddenError" class="hidden">✨Please fill out the field.✨</p>
        <p id="hiddenError2" class="hidden">✨This message is already included.✨</p>
        <div class="threebtns">
            <button class="enterMsg">Submit ✔️</button>
            <button class="deleteMsg">Delete ❌</button>
            <button class="cancel">Cancel ✖️</button>
        </div>
    </form>`
    currentMessage.parentNode.replaceChild(editForm, currentMessage)
    submitNewMsg(currentMessage)
    deleteThisMsg(currentMessage)
    cancelThisChange()
}

function submitNewMsg(currentMessage) {
    var submitMsgBtn = document.querySelector('.enterMsg')
    submitMsgBtn.addEventListener('click', function (event) {
        event.preventDefault()
        saveNewMsg(currentMessage)
    })
}

function deleteThisMsg(currentMessage) {
    var deleteMsgBtn = document.querySelector('.deleteMsg')
    deleteMsgBtn.addEventListener('click', function (event) {
        event.preventDefault()
        deleteMsg(currentMessage)
    })
}

function cancelThisChange() {
    var cancelBtn = document.querySelector('.cancel')
    cancelBtn.addEventListener('click', function (event) {
        event.preventDefault()
        cancelChange()
    })
}

function saveNewMsg(currentMessage) {
    var newMsg = document.querySelector('.edit-message')
    var text = currentMessage.innerText;
    if (newMsg.value === '') {
        var fillOutField = document.querySelector('#hiddenError')
        fillOutField.classList.remove('hidden')
        return;
    }
    else if (currentMessage.id.startsWith('a')){
        if (affirmations.includes(newMsg.value)) {
            var alreadyIncluded = document.querySelector('#hiddenError2')
            alreadyIncluded.classList.remove('hidden')
            return;
        } else {
            var index = affirmations.indexOf(text)
            affirmations.splice(index, 1, newMsg.value)
        }
    } else if (currentMessage.id.startsWith('m')){
        if (mantras.includes(newMsg.value)) {
            var alreadyIncluded = document.querySelector('#hiddenError2')
            alreadyIncluded.classList.remove('hidden')
            return;
        } else {
        var index = mantras.indexOf(text)
        mantras.splice(index, 1, newMsg.value)
        }
    }
    enabled = false;
    resetMessages()
    makeMsgEditable()
}

function deleteMsg(currentMessage) {
    var text = currentMessage.innerText;
    if (currentMessage.id.startsWith('a')) {
        var index = affirmations.indexOf(text)
        affirmations.splice(index, 1)
    } else if (currentMessage.id.startsWith('m')) {
        var index = mantras.indexOf(text)
        mantras.splice(index, 1)
    }
    enabled = false;
    resetMessages()
    makeMsgEditable()
}

function cancelChange() {
    enabled = false;
    resetMessages()
    makeMsgEditable()
}

function addAffirmMsg() {
    affirmModal.classList.remove('hidden')
}
function addMantraMsg() {
    mantraModal.classList.remove('hidden')
}
function closeModalA() {
    affirmModal.classList.add('hidden')
}
function closeModalM() {
    mantraModal.classList.add('hidden')
}

function submitAffirmMsg() {
    if(!userAMessage.value){
        error1.classList.remove('hidden')
    } else if (affirmations.includes(userAMessage.value)) {
        error11.classList.remove('hidden')
    } else {
        addHidden([error1, error11, affirmModal])
        affirmations.push(userAMessage.value)
        userAMessage.value = '';
        enabled = false;
        resetMessages()
        makeMsgEditable()
    }
}

function submitMantraMsg() {
    if(!userMMessage.value){
        error2.classList.remove('hidden')
    } else if (mantras.includes(userMMessage.value)) {
        error22.classList.remove('hidden')
    } else {
        addHidden([error2, error22, mantraModal])
        mantras.push(userMMessage.value)
        userMMessage.value = '';
        enabled = false;
        resetMessages()
        makeMsgEditable()
    }
}