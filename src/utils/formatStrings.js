const capitalizedCase = (words) => {
    const word = words.split(' ');
    const capitalizedWord = word.map(word => word[0].toUpperCase() + word.slice(1));
    return capitalizedWord.join(' ');
}  

const lowerCase = (words) => {
    const word = words.split(' ').map(word => word.toLowerCase().trim());
    return word.join(' ');
};

const formatUrl = (url) => url.toLowerCase().replace(/ +/g, '')

const formatDate = (dateInputValue) => {
    const date = new Date(dateInputValue)
    const locale = navigator.language; // <- get the current locale of the browser (e.g. en-US, fr-FR, etc)
    const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    };
    return new Intl.DateTimeFormat(locale, options).format(date);

}

export { capitalizedCase, lowerCase, formatUrl, formatDate }