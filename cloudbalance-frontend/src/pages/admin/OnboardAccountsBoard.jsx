import React, { useState,useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Copy from '../../components/Copy';
import ckScreen1 from '/screenshots/ck_screen1.png'
import Form from '../../components/Form';
import { accountInputs } from '../../app/constant';
import CheckBox from '/checkbox.png'
import Radio from '/radio.png'
import { useAccountHandler } from '../../hooks/useAccountHandler';
const OnboardAccountsBoard = () => {
  const [index, setIndex] = useState(1);
  const {account,handleChange,handleSubmit,validateToContinue} = useAccountHandler();
  const topRef = useRef(null);
  const navigate = useNavigate();
  const handleNext = ()=>{
      if(index===1 && !validateToContinue())
        return;
      setIndex(index + 1);
  };
  const handleBack = ()=>{
    if(index===1)
       navigate(-1);
    setIndex(index-1);
  }
useEffect(() => {
  topRef.current?.scrollIntoView({ behavior: "smooth" });
}, [index]);
  return (
    <div className='m-5 text-sm font-medium ' ref={topRef}>
      {/* <div className='py-10'>
        <div>
          <ol className="flex items-center gap-9">
            <li className={`${index==1&&'text-blue-700'} flex`}>A. Create an IAM Role</li>
            <div className='text-2xl font-bold'>&gt;</div>
            <li className={`${index==2&&'text-blue-700'} flex`}>B. Add Customer Managed Policies</li>
            <div className='text-2xl font-bold'>&gt;</div>
            <li className={`${index==3&&'text-blue-700'} flex`}>C. Create Cost & Usage Report</li>
          </ol>
        </div>
        <div className={`h-1.5 ${index==3?'w-full':index==1?'w-1/3':'w-2/3'} bg-green-800 `}></div>
      </div> */}
      {index === 1 && <Page1 handleChange={handleChange} account={account}/>}
      {index == 2 && <Page2/>}
      {index == 3 && <Page3/>}
      <div className='flex justify-end w-full'>
        {index>=1 && <button className='btn' onClick={() => handleBack()}>Back</button>}
        {index!=3 ? <button className='btn' onClick={() => handleNext()}>Next</button> : <button className='btn' type='submit' onClick={(e)=>handleSubmit(e)}>Submit</button>}
      </div>
    </div>
  )
}

const Page1 = ({handleChange,account}) => {
 
  return (
    <div className='m-3 flex flex-col gap-3'>
      <div className='font-bold text-2xl'>Create an IAM Role</div>
      <div className='text-gray-600'>Create an IAM Role by following these steps</div>
      <div className='bg-white p-10 mt-8'>
        <ol className='order-list gap-6 flex flex-col'>
          <li className='flex'><div>Log into AWS account & <Link className="text-blue-600 underline hover:text-blue-400">Create an IAM Role.</Link>
          </div></li>
          <li className='flex'><div>In the <span className=' italic text-gray-400'>Trusted entity type</span> section, select Custom trust policy.Replace the prefilled policy with the policy provided below -</div></li>
          <Copy valueToCopy={`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::951485052809:role/ck-tuner-nonprod-transitive-role"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "MU1HX0RFRkFVTFQwMzM5NTZlYS1kMDE3LTRjYmQtYjY3ZS1jMGI4NWJjY2U4Yzk="
        }
      }
    },
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`
          }/>
          <li className='flex'><div>Click on <strong>Next</strong> to go to the <i className='text-gray-400'>Add permissions page.</i>We would not be adding any permissions for now because the permission policy content will be dependent on<br/>  the AWS Account ID retrieved from the IAM Role.Click on <strong>Next.</strong></div></li>
          <li className='flex'>
            <div>In the role <i className='text-gray-400'>Role name field.</i>ente the below=mentioned role name,and click on <strong>Create Role -</strong></div>
          </li>
          <Copy valueToCopy={'CK-Tuner-Role-dev2'}/>
          <li className='flex'>
            <div>Go to the newly create IAM Role and copy the Role ARN-</div>
          </li>
          <div><img src={ckScreen1} alt="" /></div>
          <li className='flex'>
            <div>Paste the copied Role ARN below - </div>
          </li>
          <div className='w-3/4'>
          <Form inputs={accountInputs} values={account} handleChange={handleChange}>
          </Form>
          </div>
        </ol>
      </div>
    </div>
  )
}
const Page2 = () => {
  return (
    <div>
      <div className='font-bold text-2xl'>Add Customer Managed Policies</div>
      <div className='text-gray-600'>Create an inline policy for the role by following these steps</div>
      <div className='bg-white p-10 mt-8'>
        <ol className='order-list gap-6 flex flex-col'>
          <li className='flex'><div>Go to the <Link className='text-blue-600 underline hover:text-blue-400'>Create Policy</Link> Page.</div></li>
          <li className="flex"><div>Click on the <strong>JSON</strong> tab and paste the following policy and click on Next:</div></li>
          <Copy valueToCopy={`efefefef
            efe
            eff
            df`}/>
          <li className="flex"><div>In the Name field,enter below-mentioned policy name and Click on Create Policy</div></li>
          <Copy valueToCopy={'cktuner-CostAuditPolicy'}/>
          <li className="flex"><div>Again,go to the <Link className='text-blue-600 underline hover:text-blue-400'>Create Policy</Link> Page.</div></li>
          <li className="flex"><div>Click on the JSON tab and paste the following policy and click on Next.</div></li>
          <Copy valueToCopy={`efegefe`}/>
          <li className="flex"><div>In the <strong>Name</strong> field,enter below mentioned policy name and click on Create Policy.</div></li>
          <Copy valueToCopy={`cktuner-SecAuditPolicy`}/>
          <li className="flex"><div>Again,go to the <Link className='text-blue-600 underline hover:text-blue-400'>Create Policy</Link> Page.</div></li>
          <li className="flex"><div>Click on the JSON tab and paste the following policy and click on Next.</div></li>
          <Copy valueToCopy={'rfefef'}/>
          <li className="flex"><div>In the <strong>Name</strong> field,enter below mentioned policy name and click on Create Policy.</div></li>
          <Copy valueToCopy={`cktuner-TunerReadEssentials`}/>
          <li className="flex"><div>Go to the <Link className='text-blue-600 underline hover:text-blue-400'>CK-Tuner-Rule</Link> </div></li>
          <li className="flex"><div>In Permissions policies,click on <strong>Add permissions &gt; Attach Policy </strong></div></li>
          <li className="flex"><div>Filter by Type &gt; Customer managed then search for <strong>cktuner-CostAuditPolicy,cktuner-SecAuditpolicy,cktuner-TunerReadEssentials</strong> and select them</div></li>
          <li className="flex"><div>Now,click on <strong>Add permissions</strong></div></li>
          <li className="flex">
            <div>In Permission policies, click on <strong>Add permissions &gt; Create Inline Policy</strong></div>
          </li>
          <li className="flex">
            <div>Click on the JSON tab and paste the following policy</div>
          </li>
          <Copy valueToCopy={'dffee'}/>
          <li className="flex">
            <div>Now ,click on <strong>Review</strong> policy</div>
          </li>
          <li className="flex"><div>In the Name field,enter the below mentioned policy name and click on <strong>Create Policy</strong></div></li>
          <Copy valueToCopy={'S3CrossAccountReplication'}/>
        </ol>
      </div>
    </div>
  )
}
const Page3 = () => {
  return (
    <div>
     <div className='font-bold text-2xl'>Create Cost & Usage Report</div>
      <div className='text-gray-600'>Create a Cost & Usage Report by following these steps</div>
      <div className='bg-white p-10 mt-8'>
        <ol className='order-list gap-6 flex flex-col'>
          <li className="flex">
            <div>Go to <Link className='text-blue-600 underline hover:text-blue-400'>Cost and Usage Reports</Link>in the Billing Dashboard and click on <strong>Create report</strong></div>
          </li>
          <li className="flex">
            <div>Name the report as shown below and select the <strong>Include resources IDs</strong> checkbox - </div>
          </li>
          <Copy valueToCopy={'ck-tuner-275595855473-houly-cur'}/>
          <div className='text-xs'>Ensure that the following configuration is checked</div>
          <div className='flex gap-3'><img src={CheckBox} width={20}/><strong>Include Resource Ids</strong></div>
          <div>Click on Next</div>
          <img src="https://pro.dev2.cloudonomic.net/build/assets/E2-C6N9LpCy.png" alt="" />
          <li className="flex">
            <div>In <i className='text-gray-400'>Configure S3 bucket</i>, provide the name of the S3 bucket that was created -</div>
          </li>
          <div className='text-xs'>Ensure that the following configuration is checked</div>
          <p className="form_detail_checkbox_label congfig-label">The following default policy will be applied to your bucket</p>
          <div>Click on Save</div>
          <div className="flex"><img src="https://pro.dev2.cloudonomic.net/build/assets/E3-quBsiSty.png" alt="" /></div>
          <li className='flex'><div>In the <i className='text-gray-400'>Delivery options</i> section, enter the below-mentioned Report path prefix -</div></li>
          <div className="text-xs">Report path prefix</div>
          <Copy valueToCopy={'275595855473'}/>
          <div className="text-xs">Additionally, ensure that the following checks are in place</div>
          <div className="text-xs">Please make sure these checks are Enabled in Enable report data integration for:</div>
          <div className='flex gap-3'><img src={Radio} alt="" width={20}/> <strong>Hourly</strong></div>
          <div className='flex gap-3'><img src={CheckBox} width={20}/> <strong>Amazon Athena</strong></div>
          <img src="https://doe95xkn4xgto.cloudfront.net/5.3.png" width={1000} alt="" />
          <li className='flex'><div>
            Click on <strong>Next</strong>.Now, review the configuration of the Cost and Usage Report. Once satisfied, click on <strong>Create Report</strong>.</div></li>
        </ol>
      </div>
    </div>
  )
}
export default OnboardAccountsBoard