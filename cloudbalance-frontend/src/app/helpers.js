import { toast } from "react-toastify";

export const capitalizeFirstLetter = str => 
  str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

export const giveSpace = str => str.replace(/(?<!^)([A-Z])/g, ' $1');

export const validate = (inputs,data)=>{
  let flag=true;
  let message = '';
       for(let input of inputs){
          if(input.error){
             let error = input.error(data[input.for])
             if(error){
               message+=giveSpace(capitalizeFirstLetter(input.for))+":"+error+"\n";
               flag=false;
             }
          }
            
       }
       if(!flag)
          toast.error(message);
       return flag;
    }
