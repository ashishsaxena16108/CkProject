export const capitalizeFirstLetter = str => 
  str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

export const giveSpace = str => str.replace(/(?<!^)([A-Z])/g, ' $1');

export const validate = (inputs,data)=>{
       for(let input of inputs){
          if(input.error && input.error(data[input.for]))
            return false;
       }
       return true;
    }
