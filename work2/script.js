document.getElementById('myButton').addEventListener('click', () => {
    alert(`Width: ${window.innerWidth},\nHeight: ${window.innerHeight}\n\n\n\nClient sizes:\n Width: ${document.documentElement.clientWidth}\n Height: ${document.documentElement.clientHeight}`)
})