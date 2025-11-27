import Edit from '/edit.svg'
import Delete from '/delete.svg'
import { Link } from 'react-router-dom';


export const loginInputs = [
    {for:"email",
     type:"email",
     placeholder:"Enter your email"
    },
    {for:"password",
     type:"password",
     placeholder:"Enter your password"
    }
]
export const addUserInputs = [
    {for:"firstName",
     type:"text",
     placeholder:"Enter Your First Name"
    },
    {for:"lastName",
     type:"text",
     placeholder:"Enter Your Last Name"
    },
    {for:"email",
     type:"email",
     placeholder:"Enter Your Email Name"
    },
    {for:"role",
     type:"select",
     options:["User","Read-Only","Admin"],
     initial:"User"
    },
]
export const adminList = [{img:'/group.svg',imghover:'/group-white.svg',title:'Users'},{img:'/account.svg',imghover:'/account-white.svg',title:'Accounts'},{img:'/cost.svg',imghover:'/cost_white.svg',title:'Cost Explorer'},{img:'/desktop.svg',imghover:'/desktop-white.svg',title:'Resources'}];
export const userList = [{img:'/cost.svg',imghover:'/cost_white.svg',title:'Cost Explorer'},{img:'/desktop.svg',imghover:'/desktop-white.svg',title:'Resources'}]

export const userTableHeaders = [{head:'First Name',field:'firstName'},{head:'Last Name',field:'lastName'},{head:'Email',field:'email'},{head:'Role',field:'role'},{head:'Actions',body:({data}) => {

  return (
    <div className='flex justify-center gap-10'>
    <Link to='/admin/adduser' state={{data:data}}><img src={Edit} alt="edit"/></Link><img src={Delete} alt="delete" />
    </div>
  )
}}];

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

export const CostExploreList = ['Service','Instance Type','Account ID','Usage Type','Platform','Region','Usage Type Group','Tags','More'];