import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Copy from '../../components/Copy';
import ckScreen1 from '/screenshots/ck_screen1.png'
import Form from '../../components/Form';
import { accountInputs } from '../../app/constant';
const OnboardAccountsBoard = () => {
  const [index, setIndex] = useState(1);
  const handleSubmit = () => {

  }
  return (
    <div className='m-5 text-sm font-medium '>
      {index === 1 && <Page1 index={index} setIndex={setIndex} />}
      {index == 2 && <Page2 index={index} setIndex={setIndex} />}
      {index == 3 && <Page3 index={index} setIndex={setIndex} handleSubmit={handleSubmit} />}
    </div>
  )
}

const Page1 = ({ setIndex, index }) => {
 
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
          <Form inputs={accountInputs}>
          </Form>
          </div>
        </ol>
      </div>
      <div className='flex justify-end w-full'>
        <button className='btn' onClick={() => setIndex(index - 1)}>Back</button>
        <button className='btn' onClick={() => setIndex(index + 1)}>Next</button>
      </div>
    </div>
  )
}
const Page2 = ({ setIndex, index }) => {
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
            <div>Click on the JSOn tab and paste the following policy</div>
          </li>
          <Copy valueToCopy={'dffee'}/>
          <li className="flex">
            <div>Now ,click on <strong>Review</strong> policy</div>
          </li>
          <li className="flex"><div>In the Name field,enter the below mentioned policy name and click on <strong>Create Policy</strong></div></li>
          <Copy valueToCopy={'S3CrossAccountReplication'}/>
        </ol>
      </div>
      <div className='flex items-end justify-end w-full'>
        <button className='btn' onClick={() => setIndex(index - 1)}>Back</button>
        <button className='btn' onClick={() => setIndex(index + 1)}>Next</button>
      </div>
    </div>
  )
}
const Page3 = ({ setIndex, index, handleSubmit }) => {
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
            <div>Name the report as shown below and select the include resources IDs checkbox - </div>
          </li>
          <Copy ck-tuner-275595855473-houly-cur/>
          <div className='text-xs'>Ensure that the following configuration is checked</div>
          <div>Click on Next</div>
          <li className="flex">
            <div>In <i className='text-gray-400'>Configure S3 bucket</i>, provide the name of the S3 bucket that was created -</div>
          </li>
          <div className='text-xs'>Ensure that the following configuration is checked</div>
          <div>Click on Save</div>
        </ol>
      </div>
      <div className='flex items-end justify-end w-full'>
        <button className='btn'onClick={() => setIndex(index - 1)}>Back</button>
        <button className='btn' onClick={() => handleSubmit()}>Submit</button>
      </div>
    </div>
  )
}
export default OnboardAccountsBoard