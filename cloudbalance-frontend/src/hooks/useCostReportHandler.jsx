import React, { useState } from 'react'
import { fetchApi } from '../axios/admin/fetch';
import { toast } from 'react-toastify';
import { dateConstant } from '../app/constant';
import { useSelector } from 'react-redux';

const useCostReportHandler = () => {
  const [headers, setHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { role } = useSelector(state => state.auth.user);
  const { accounts, startDate, endDate } = useSelector(state => state.accounts);
  const fetchReports = (groupby = 'Service', filters = []) => {
    setIsLoading(true);
    const backendgroupby = groupby.toLowerCase().replace(' ', '_');
    fetchApi.get(`/${role === 'ADMIN' || role === 'READ_ONLY' ? 'admin' : 'user'}/reports?group_by=${backendgroupby}${accounts.length === 0 ? '' : `&accountIds=${accounts.join(',')}`}${filters.length === 0 ? '' : `&filters=${filters.join(',')}`}${startDate ? `&start_date=${startDate}` : ''}${endDate ? `&end_date=${endDate}` : ''}`)
      .then(response => {
        const { monthWise, groupWise } = response.data;
        transformGroupWiseData(groupby, groupWise, monthWise);
        const transformedGroup = transformMonthWiseData(monthWise);
        setChartData(transformedGroup);
      })
      .catch((error) => toast.error(error.response.data.message))
      .finally(() => {
        setIsLoading(false);
      })
  }
  const transformGroupWiseData = (groupby, groupWiseReport, monthWise) => {
    const headers = [];
    headers.push({ head: groupby, field: 'groupName' });
    const months = new Set();
    groupWiseReport.forEach((g) => {
      Object.keys(g.monthlyData).forEach((k) => {
        months.add(k);
      })
    })
    const monthArray = [...months].sort((a, b) => {
      const [ma, ya] = a.split('/').map(Number);
      const [mb, yb] = b.split('/').map(Number);
      if (ya !== yb) return ya - yb;
      return ma - mb;
    })
    monthArray.forEach((m) => {
      const [month, year] = m.split('/');
      headers.push({ head: dateConstant.months[month - 1] + ' ' + year, field: m });
    })
    headers.push({ head: 'Total', field: 'total' });
    const transformedData = [];
    groupWiseReport.forEach((g) => {
      const obj = {};
      obj.groupName = g.groupName;
      monthArray.forEach((m) => {
        obj[m] = g.monthlyData[m] ? g.monthlyData[m] : 0;
      })
      obj['total'] = g.totalCost;
      transformedData.push(obj);
    })
    const lastobj = {};
    let totalwhole = 0;
    lastobj.groupName = 'Total';
    for (let mW in monthWise) {
      lastobj[mW] = monthWise[mW].totalCost;
      totalwhole += monthWise[mW].totalCost;
    }
    lastobj['total'] = totalwhole;
    lastobj['isFooter'] = true;
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

    const topServices = sortedServices.slice(0, 4);

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
        data: data.map((v, monthIdx) => {
          const header = isFirst ? `<div class="headingCont">$label</div>` : '';
          const currentTotal = categories[monthIdx].total;
          // This "body" now handles every row, including "Others"
          const body = `
        <span class="row">
          <div style="display: flex; align-items: center;">
            <label>$seriesName</label>
          </div>
          <b>$dataValue (${Number(v * 100 / currentTotal).toFixed(2)}%)</b>
        </span>`;

          // The footer should only contain the text "Total" and the value
          // We remove the color box from here to keep it distinct

          const footer = isLast ? `
        <div class="totalStyle">
          <span>Total</span>
          <b>$${Number(currentTotal).toLocaleString()}</b>
        </div>` : '';

          return {
            value: v,
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

  return { fetchReports, headers, tableData, chartData, isLoading }
}



export default useCostReportHandler