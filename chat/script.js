
const chat = document.getElementById('chat'); // chat area variable, where you can see messages
const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com'); // websocket

// on refresh save all messages
document.addEventListener('DOMContentLoaded', () => {
    const savedMessages = localStorage.getItem('chatMessages') || ''; // get messages
    if (savedMessages.length > 0){
        chat.innerHTML = savedMessages;
        chat.scrollTop = chat.scrollHeight; // auto scroll to bottom
    }
})

document.getElementById('sendLocation').addEventListener('click', () => {
    if ('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position;
            const geolocationLink = `https://www.openstreetmap.org/?query=${coords.latitude},${coords.longitude}`
            const date = getDate();
            chat.innerHTML += `<div class="message sender-msg geolocation-msg">Местоположение: <a href='${geolocationLink}' target='_blank'>ссылка</a> <span class="date">${date}</span></div>`

            //! messages storage
            const savedMessages = localStorage.getItem('chatMessages') || '';
            const newMessage = `<div class="message sender-msg geolocation-msg">Местоположение: <a href='${geolocationLink}' target='_blank'>ссылка</a> <span class="date">${date}</span></div>`;
            chat.scrollTop = chat.scrollHeight; // auto scroll to bottom
            localStorage.setItem('chatMessages', savedMessages + newMessage);

            setTimeout(function (){
                chat.innerHTML += `<div class="message server-msg geolocation-msg">Местоположение: <a href='${geolocationLink}' target='_blank'>ссылка</a> <span class="date">${date}</span></div>`
                chat.scrollTop = chat.scrollHeight; // auto scroll to bottom

                //! messages storage
                const savedMessages = localStorage.getItem('chatMessages') || '';
                const newMessage = `<div class="message server-msg geolocation-msg">Местоположение: <a href='${geolocationLink}' target='_blank'>ссылка</a> <span class="date">${date}</span></div>`;
                localStorage.setItem('chatMessages', savedMessages + newMessage);

            }, 100)
        });
    };
});

document.getElementById('sendMessage').addEventListener('click', (event) => {
    event.preventDefault();
    let msgText = document.getElementById('msgValue');
    if (msgText.value === ''){
        alert('Ошибка: сообщение должно содержать как минимум 1 символ!')
    } else {
        const date = getDate();
        chat.innerHTML += `<div class="message sender-msg">${msgText.value} <span class="date">${date}</span></div>`;

        //! messages storage
        const savedMessages = localStorage.getItem('chatMessages') || ''; 
        const newMessage = `<div class="message sender-msg">${msgText.value} <span class="date">${date}</span></div>`;
        localStorage.setItem('chatMessages', savedMessages + newMessage);


        websocket.send(msgText.value);
        msgText.value = '';
    }
    chat.scrollTop = chat.scrollHeight; // auto scroll to bottom
})

// message server text
websocket.onmessage = (event) => {
    const date = getDate();
    const message = event.data;
    chat.innerHTML += `<div class="message server-msg">${message} <span class="date">${date}</span></div>`;

    //! messages storage
    const savedMessages = localStorage.getItem('chatMessages') || '';
    const newMessage = `<div class="message server-msg">${message} <span class="date">${date}</span></div>`;
    localStorage.setItem('chatMessages', savedMessages + newMessage);

    chat.scrollTop = chat.scrollHeight; // auto scroll to bottom
}


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