import React, { useMemo } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import theme from 'fusioncharts/themes/fusioncharts.theme.fint';

ReactFC.fcRoot(FusionCharts, Charts, theme);

const rawCostExplorerData = [
    {
      "TimePeriod": {
        "Start": "2024-11-01",
        "End": "2024-12-01"
      },
      "Total": {},
      "Groups": [
        {
          "Keys": [
            "Amazon Elastic Compute Cloud - Compute"
          ],
          "Metrics": {
            "AmortizedCost": {
              "Amount": "800.00",
              "Unit": "USD"
            },
            "UnblendedCost": {
              "Amount": "800.00",
              "Unit": "USD"
            },
            "UsageQuantity": {
              "Amount": "5000000.00",
              "Unit": "Hrs"
            }
          }
        },
        {
          "Keys": [
            "Amazon Simple Storage Service"
          ],
          "Metrics": {
            "AmortizedCost": {
              "Amount": "434.56",
              "Unit": "USD"
            },
            "UnblendedCost": {
              "Amount": "434.56",
              "Unit": "USD"
            },
            "UsageQuantity": {
              "Amount": "4876543.21",
              "Unit": "Hrs"
            }
          }
        }
      ],
      "Estimated": true
    }
  ];

const transformData = (rawData) => {
  const categoriesSet = new Set();
  const serviceSet = new Set();
  const dataByService = new Map();

  // Step 1: Extract month and services
  rawData.forEach(item => {
    const month = item.TimePeriod.Start; // e.g., "2024-11-01"
    categoriesSet.add(month);

    item.Groups.forEach(group => {
      const service = group.Keys[0];
      serviceSet.add(service);
    });
  });

  const categoriesArray = Array.from(categoriesSet).sort(); // sorted by date
  const categories = categoriesArray.map(month => ({ label: month.split('-')[1] + '/' + month.split('-')[0] })); // "MM/YYYY"
  const services = Array.from(serviceSet);

  // Step 2: Initialize series data
  services.forEach(service => {
    dataByService.set(service, Array(categories.length).fill({ value: '0' }));
  });

  // Step 3: Fill series data
  rawData.forEach(item => {
    const month = item.TimePeriod.Start;
    const monthIndex = categoriesArray.indexOf(month);

    item.Groups.forEach(group => {
      const service = group.Keys[0];
      const cost = parseFloat(group.Metrics.AmortizedCost.Amount || 0).toFixed(2);
      const series = dataByService.get(service);
      if (series) {
        series[monthIndex] = { value: cost };
        dataByService.set(service, series);
      }
    });
  });

  // Step 4: Build dataset
  const dataset = services.map(service => ({
    seriesName: service,
    data: dataByService.get(service)
  }));

  return { categories: [{ category: categories }], dataset };
};



const Chart = ({type,width}) => {
    const { categories, dataset } = useMemo(() => transformData(rawCostExplorerData), []);

    if (dataset.length === 0) {
        return <div>No data available to render the chart.</div>;
    }

    const chartConfigs = {
        type: `${type}`,
        width: `100%`,
        height: '400',
        dataFormat: 'json',
        dataSource: {
            chart: {
                xAxisName: 'Months',
                yAxisName: 'Cost (USD)',
                numberPrefix: '$',
                theme: 'fint',
                showHoverEffect: '1',
                showValues: '0',
                labelDisplay: 'AUTO',
            },
            categories: categories, 
            dataset: dataset, 
        },
    };

    return (
        <div className="chart-container" style={{ maxWidth: `${width}`, margin: '20px auto' }}>
            <ReactFC {...chartConfigs} key={width}/>
        </div>
    );
};

export default Chart;