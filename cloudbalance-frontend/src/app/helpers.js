import { toast } from "react-toastify";

export const capitalizeFirstLetter = str => 
  str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

export const giveSpace = str => str.replace(/(?<!^)([A-Z])/g, ' $1');

export const validate = (inputs,data)=>{
  let flag=true;
       for(let input of inputs){
          if(input.error){
             let error = input.error(data[input.for])
             if(error){
               toast.error(error);
               flag=false;
             }
          }
            
       }
       return flag;
    }
