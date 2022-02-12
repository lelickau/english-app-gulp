export const playAudio = (src) => {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = `${src}`; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}