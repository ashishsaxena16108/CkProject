import React, { useState } from 'react'
import { fetchApi } from '../axios/admin/fetch';
import { toast } from 'react-toastify';
import { dateConstant } from '../app/constant';
import { useSelector } from 'react-redux';

const useCostReportHandler = () => {
  const [headers, setHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chartData,setChartData] = useState({});
  const [isLoading,setIsLoading] = useState(true);
  const {id,role} = useSelector(state=>state.auth.user);
  const fetchReports = (groupby = 'Service') => {
    setIsLoading(true);
    const backendgroupby=groupby.toLowerCase().replace(' ','_');
    fetchApi.get(`/${role==='ADMIN' || role==='READ_ONLY' ? 'admin':`user/${id}`}/reports?group_by=${backendgroupby}`)
      .then(response => {
      const { monthWise, groupWise } = response.data;
      transformGroupWiseData(groupby,groupWise,monthWise);
      const transformedGroup = transformMonthWiseData(monthWise);
      setChartData(transformedGroup);
      })
      .catch(() => toast.error('Reports not loaded'))
      .finally(()=>{
        setIsLoading(false);
      })
  }
  const transformGroupWiseData = (groupby,groupWiseReport,monthWise) => {
    const headers = [];
    headers.push({ head: groupby, field: 'groupName' });
    const months = new Set();
    groupWiseReport.forEach((g) => {
      Object.keys(g.monthlyData).forEach((k) => {
        months.add(k);
      })
    })
    months.forEach((m) => {
      const [month, year] = m.split('/');
      headers.push({ head: dateConstant.months[month - 1] + ' ' + year, field: m });
    })
    headers.push({ head: 'Total', field: 'total' });
    const transformedData = [];
    groupWiseReport.forEach((g) => {
      const obj = {};
      obj.groupName = g.groupName;
      months.forEach((m) => {
        obj[m] = g.monthlyData[m] ? g.monthlyData[m] : 0;
      })
      obj['total'] = g.totalCost;
      transformedData.push(obj);
    })
    const lastobj = {};
    let totalwhole=0;
    lastobj.groupName='Total';
    for(let mW in monthWise){
      lastobj[mW]=monthWise[mW].totalCost;
      totalwhole+=monthWise[mW].totalCost;
    }
    lastobj['total']=totalwhole;
    lastobj['isFooter']=true;
    transformedData.push(lastobj);
    setHeaders(headers);
    setTableData(transformedData);
  }
  const transformMonthWiseData = (monthWise) => {
  const monthKeys = Object.keys(monthWise).sort((a, b) => {
    const [ma, ya] = a.split("/").map(Number);
    const [mb, yb] = b.split("/").map(Number);
    return ya === yb ? ma - mb : ya - yb;
  });

  const serviceTotals = {};
  const dataByService = {};

  // Step 1: Collect service totals
  monthKeys.forEach(key => {
    const { groupData } = monthWise[key];
    Object.entries(groupData).forEach(([service, cost]) => {
      serviceTotals[service] = (serviceTotals[service] || 0) + cost;
    });
  });

  // Step 2: Top 5 services
  const sortedServices = Object.entries(serviceTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);

  const topServices = sortedServices.slice(0, 5);

  // Step 3: Init data arrays
  topServices.forEach(s => {
    dataByService[s] = Array(monthKeys.length).fill("0.00");
  });
  dataByService["Others"] = Array(monthKeys.length).fill("0.00");

  // Step 4: Fill values
  monthKeys.forEach((key, idx) => {
    const { groupData } = monthWise[key];

    Object.entries(groupData).forEach(([service, cost]) => {
      const target = topServices.includes(service) ? service : "Others";
      dataByService[target][idx] =
        (Number(dataByService[target][idx]) + cost).toFixed(2);
    });
  });

  // Step 5: Build categories
  const categories = monthKeys.map(key => {
    const [month, year] = key.split("/");
    return {
      label: `${dateConstant.months[month - 1]} ${year}`,
      total: monthWise[key].totalCost
    };
  });

  // Step 6: Build dataset
  const filteredEntries = Object.entries(dataByService).filter(entry => {
    const data = entry[1];
    return data.some(v => Number(v) > 0);
  });

  const dataset = filteredEntries.map((entry, index) => {
    const [service, data] = entry;
    const isFirst = index === 0;
    const isLast = index === filteredEntries.length - 1;

    return {
      seriesName: service,
      data: data.map(v => {
        // 1. HEADER: Only include headingCont if it's the first dataset
        const header = isFirst ? `<div class="headingCont">$label</div>` : '';

        // 2. BODY: The row item (Service Name and Value)
        const body = `
          <span class="row">
            <label>$seriesName</label>
            <b>$dataValue ($percentValue)</b>
          </span>`;

        // 3. FOOTER: Only include totalStyle if it's the last dataset
        const footer = isLast ? `
          <div class="totalStyle">
            <b>Total</b>
            $total
          </div>` : '';

        return {
          value: v,
          // Wrap in your tooltip_wrapper class
          toolText: `
            <div class="tooltip_wrapper cudos_tooltip">
              ${header}
              ${body}
              ${footer}
            </div>`
        };
      })
    };
  });

  return {
    categories: [{ category: categories }],
    dataset
  };

};

  return { fetchReports, headers, tableData, chartData ,isLoading}
}



export default useCostReportHandler