const accentCharacters = ['Á','É','Í','Ó','Ú','Ñ','á','é','í','ó','ú','ñ','¿','¡'], 
      nonAccentCharacters = ['A','E','I','O','U','N','a','e','i','o','u','n','?','!'];

var inputElem, isAccentOn = false;

window.addEventListener("keydown", function(event) {
  if ((event.ctrlKey || event.altKey || event.key === 'Tab') || (event.shiftKey && !nonAccentCharacters.includes(event.key))) return;

  inputElem = getFirstInputTypeSelector();
  
  if (nonAccentCharacters.includes(event.key) && this.window.getSelection().toString().length === 0) {
    event.preventDefault();

    if (isAccentOn) return;

    if(event.repeat) {
      isAccentOn = true;
      inputElem.value = inputElem.value.substring(0, inputElem.value.length - 1) + accentCharacters[nonAccentCharacters.indexOf(event.key)];
    } else {
      inputElem.value += event.key;
      inputElem.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
});

window.addEventListener("keyup", (event) => isAccentOn = false, true);

function getFirstInputTypeSelector() {
  if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return document.activeElement;
  
  const inputSelector = document.querySelector('INPUT');
  return inputSelector === null ? document.querySelector('TEXTAREA') : inputSelector;
}