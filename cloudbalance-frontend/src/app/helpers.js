export const capitalizeFirstLetter = str => 
  str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

export const giveSpace = str => str.replace(/(?<!^)([A-Z])/g, ' $1');
