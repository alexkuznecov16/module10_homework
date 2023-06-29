const chat = document.getElementById('chat'); // chat area variable, where you can see messages
const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com'); // websocket

// on refresh save all messages
document.addEventListener('DOMContentLoaded', () => {
    const savedMessages = localStorage.getItem('chatMessages') || ''; // get messages
    if (savedMessages.length > 0){
        chat.innerHTML = savedMessages; // message adding
        chat.scrollTop = chat.scrollHeight; // auto scroll to bottom
    }
})

// user send geolocation button event
document.getElementById('sendLocation').addEventListener('click', () => {
    // get geolocation
    if ('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            const geolocationLink = `https://www.openstreetmap.org/?query=${coords.latitude},${coords.longitude}`;
            const date = getDate();
            chat.innerHTML += `<div class="message sender-msg geolocation-msg">Geolocation: <a href='${geolocationLink}' target='_blank'>link</a> <span class="date">${date}</span></div>`; // message adding

            //! messages saving in local storage
            const savedMessages = localStorage.getItem('chatMessages') || '';
            const newMessage = `<div class="message sender-msg geolocation-msg">Geolocation: <a href='${geolocationLink}' target='_blank'>link</a> <span class="date">${date}</span></div>`;
            chat.scrollTop = chat.scrollHeight; // auto scroll to bottom
            localStorage.setItem('chatMessages', savedMessages + newMessage);  // add message in storage

            // server will send message after 0.1 seconds
            setTimeout(function (){
                chat.innerHTML += `<div class="message server-msg geolocation-msg">Geolocation: <a href='${geolocationLink}' target='_blank'>link</a> <span class="date">${date}</span></div>`; // message adding
                chat.scrollTop = chat.scrollHeight; // auto scroll to bottom

                //! messages saving in local storage
                const savedMessages = localStorage.getItem('chatMessages') || '';
                const newMessage = `<div class="message server-msg geolocation-msg">Geolocation: <a href='${geolocationLink}' target='_blank'>link</a> <span class="date">${date}</span></div>`;
                localStorage.setItem('chatMessages', savedMessages + newMessage);  // add message in storage

            }, 100)
        });
    } else {
        alert(`Error: Your device or browser can't use your geolocation!`);
    }
});

document.getElementById('sendMessage').addEventListener('click', (event) => {
    event.preventDefault();
    let msgText = document.getElementById('msgValue');
    if (msgText.value === ''){
        alert('Error: your message is empty!');
    } else {
        const date = getDate();
        chat.innerHTML += `<div class="message sender-msg">${msgText.value} <span class="date">${date}</span></div>`; // message adding

        //! messages saving in local storage
        const savedMessages = localStorage.getItem('chatMessages') || ''; 
        const newMessage = `<div class="message sender-msg">${msgText.value} <span class="date">${date}</span></div>`;
        localStorage.setItem('chatMessages', savedMessages + newMessage);  // add message in storage


        websocket.send(msgText.value); // we give to websocket a user message value of text
        msgText.value = '';
    }
    chat.scrollTop = chat.scrollHeight; // auto scroll to bottom
})

// server message sending
websocket.onmessage = (event) => {
    const date = getDate();
    const message = event.data;
    chat.innerHTML += `<div class="message server-msg">${message} <span class="date">${date}</span></div>`; // message adding

    //! messages saving in local storage
    const savedMessages = localStorage.getItem('chatMessages') || '';
    const newMessage = `<div class="message server-msg">${message} <span class="date">${date}</span></div>`;
    localStorage.setItem('chatMessages', savedMessages + newMessage); // add message in storage

    chat.scrollTop = chat.scrollHeight; // auto scroll to bottom
}

// function which give message sending date
function getDate(){
    let currentDate = new Date();
    let currentDay = currentDate.getDate();
    if (currentDay < 10){
        currentDay = `0${currentDate.getDate()}`
    } else {
        currentDay;
    }

    let currentMonth = currentDate.getMonth() + 1;
    if (currentMonth < 10){
        currentMonth = `0${currentDate.getMonth() + 1}`
    } else {
        currentMonth;
    }

    let currentYear = currentDate.getFullYear();
    let currentHour = currentDate.getHours();
    let currentMinute = currentDate.getMinutes();
    let date = `${currentDay}.${currentMonth}.${currentYear}  ${currentHour}:${currentMinute}`;
    return date;
}