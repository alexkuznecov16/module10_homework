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
