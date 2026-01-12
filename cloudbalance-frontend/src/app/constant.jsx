
import ActionData from '../components/ActionData';


export const loginInputs = [
    {for:"email",
     type:"email",
     placeholder:"Enter your email",
     error:(value)=>{
       if(!value)
         return "Field is required";
       if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          return "Not valid";
       return '';
     }
    },
    {for:"password",
     type:"password",
     placeholder:"Enter your password",
     error:(value)=>{
        if(!value)
          return "Field is required";
        return '';
     }
    }
]
export const addUserInputs = [
    {for:"firstName",
     type:"text",
     placeholder:"Enter Your First Name",
     error:(value)=>{
        if(!value)
          return "Field is required";
        return '';
     }
    },
    {for:"lastName",
     type:"text",
     placeholder:"Enter Your Last Name",
     error:(value)=>{
        if(!value)
          return "Field is required";
        return '';
     }
    },
    {for:"email",
     type:"email",
     placeholder:"Enter Your Email Name",
     error:(value)=>{
       if(!value)
         return "Field is required";
       if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          return "Not valid";
       return '';
     }
    },
    {for:"role",
     type:"select",
     options:["Select role","User","Read-Only","Admin"],
     values:["none","USER","READ_ONLY","ADMIN"],
     error:(value)=>{
        if(value==="none")
          return "Field is required";
        return '';
     }
    },
]
export const accountInputs = [
  {for:"accountArn",
     type:"text",
     placeholder:"Enter Your Account ARN",
     error:(value)=>{
        if(!value)
          return "Field is required";
        if(!/^arn:(aws|aws-cn|aws-us-gov|aws-iso|aws-iso-b):[a-z0-9\\-]+:[a-z0-9\\-]*:([0-9]{12}):(.+)$/.test(value))
          return "Not valid";
        return '';
     }
    },
    {for:"accountId",
     type:"text",
     placeholder:"Enter Your Account Id",
     error:(value)=>{
        if(!value)
          return "Field is required";
        return '';
     }
    },
    {for:"accountName",
     type:"text",
     placeholder:"Enter Your Account Name",
     error:(value)=>{
        if(!value)
          return "Field is required";
        return '';
     }
    }
]
export const adminList = [{img:'/group.svg',imghover:'/group-white.svg',title:'Users'},{img:'/account.svg',imghover:'/account-white.svg',title:'Accounts'},{img:'/cost.svg',imghover:'/cost_white.svg',title:'Cost Explorer'},{img:'/desktop.svg',imghover:'/desktop-white.svg',title:'Resources'}];
export const userList = [{img:'/cost.svg',imghover:'/cost_white.svg',title:'Cost Explorer'},{img:'/desktop.svg',imghover:'/desktop-white.svg',title:'Resources'}]

export const userTableHeaders = [{head:'First Name',field:'firstName'},{head:'Last Name',field:'lastName'},{head:'Email',field:'email'},{head:'Role',field:'role'},{head:'Actions',body:({data})=><ActionData data={data}/>}];

export const adminCredentials = {email:"admin@cloudbalance.com",password:'admin'};

export const pathTitleMap = new Map([['adduser','Add New User'],
                                     ['users','Users'],
                                     ['onboarding','Onboarding Account'],
                                     ['accounts','Accounts'],
                                      ['admin','Admin'],
                                      ['user','User'],
                                    ['costexplorer','Cost Explorer'],
                                    ['resources','Resources']]);

export const resourcesListMap = new Map([['EC2',[{head:'Resource ID',field:'resourceId'},{head:'Resource Name',field:'resourceName'},{head:'Region',field:'region'},{head:'Status',field:'status'}]],['ASG',[{head:'Resource ID',field:'resourceId'},{head:'Resource Name',field:'resourceName'},{head:'Region',field:'region'},{head:'Desired Capacity',field:'desiredCapacity'},{head:'Min Size',field:'minSize'},{head:'Max Size',field:'maxSize'},{head:'Status',field:'status'}]],['RDS',[{head:'Resource ID',field:'resourceId'},{head:'Resource Name',field:'resourceName'},{head:'Engine',field:'engine'},{head:'Region',field:'region'},{head:'Status',field:'status'}]]]);

export const CostExploreList = ['Service','Instance Type','Account ID','Usage Type','Platform','Region','Purchase Option','Usage Type Group','API Operation','Resource','Availability Zone','Tenancy','Legal Entity','Billing Entity'];


export const dateConstant = {
  days:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
  months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
  yearRange:{start:1990,end:(new Date().getFullYear())}
}

export const accountHeaders = [
  {head:'Account ARN',field:'accountArn'},
  {head:'Account Name',field:'accountName'},
  {head:'Account ID',field:'accountId'}
]