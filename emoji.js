var emoji = require('node-emoji');
console.log(emoji.get('coffee')); // returns the emoji code for coffee (displays emoji on terminals that support it) 
console.log(emoji.which(emoji.get('coffee'))); // returns the string "coffee" 
console.log(emoji.get(':fast_forward:')); // `.get` also supports github flavored markdown emoji (http://www.emoji-cheat-sheet.com/) 
console.log(emoji.emojify('I :heart: :coffee:!')); // replaces all :emoji: with the actual emoji, in this case: returns "I ❤️ ☕️!" 

