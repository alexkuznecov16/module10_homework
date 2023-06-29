# module9_homework

## Exercise 1
# Условие
Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео). При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.
# HTML
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>svg-icons</title>
    <style>
        body{
            background-color: deepskyblue;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            padding: 0;
        }
        .button {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            background-color: #f1f1f1;
            border: none;
            color: #333;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <button class="button" id="myButton">Change
        <svg  id="notFillSvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768l4.096-4.097z"/>
          </svg>

          <svg style="display: none;" id="fillSvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-5.904-2.803a.5.5 0 1 1 .707.707L6.707 10h2.768a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.525a.5.5 0 0 1 1 0v2.768l4.096-4.096z"/>
          </svg>
    </button>

    <script src="script.js"></script>
</body>
</html>
```

# JS
У нас есть переменная с числом 0, при клике на кнопку проверяем какое значение цифры. Если цифра равна 0 то второй __svg__ получает `display: block;` и добавляется единица, чтобы можно было проверить уже второе условие.
```
const fillIcon = document.getElementById('fillSvg');
const notFillIcon = document.getElementById('notFillSvg');
const btn = document.getElementById('myButton');
let num = 0;

btn.addEventListener('click', () => {
    if (num === 0) {
        notFillIcon.setAttribute('style', 'display: none;');
        fillIcon.setAttribute('style', 'display: block;');
        num+=1;
    } else {
        fillIcon.setAttribute('style', 'display: none;');
        notFillIcon.setAttribute('style', 'display: block;');
        num-=1;
    }
    setTimeout(function(){
        console.log('Is clicked!')
    }, 1000)
});
```


## Exercise 2
# Условие
Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 

# JS
При клике на кнопку мы с помощью __alert__ будем выводить размеры экрана.
```
document.getElementById('myButton').addEventListener('click', () => {
    alert(`Width: ${window.innerWidth},\nHeight: ${window.innerHeight}\n\n\n\nClient sizes:\n Width: ${document.documentElement.clientWidth}\n Height: ${document.documentElement.clientHeight}`)
})
```


## Exercise 3
# Условие

    Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.

        Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

        При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

        Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:

    

        Добавить в чат механизм отправки гео-локации:

    

        При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить


# JS
Также я в сообщении добавил такие функции как время, тоесть теперь можно посмотреть когда было отправлено сообщение, а также сообщения все сохраняются даже если перезагрузили страницу.
```
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
```
