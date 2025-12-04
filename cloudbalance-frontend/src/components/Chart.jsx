import React, { useMemo } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import theme from 'fusioncharts/themes/fusioncharts.theme.fint';

ReactFC.fcRoot(FusionCharts, Charts, theme);

// --- DUMMY DATA ALIGNED TO YOUR IMAGE STRUCTURE ---
// We define the data as it would look if processed into an array for easy manipulation.
const rawCostExplorerData = [
  { month: 'May 2025', service: 'Amazon EC2', cost: 34819.56 },
  { month: 'May 2025', service: 'Savings Plans', cost: 25000.00 },
  { month: 'May 2025', service: 'Amazon RDS', cost: 24944.93 },

  { month: 'Jun 2025', service: 'Amazon EC2', cost: 36596.88 },
  { month: 'Jun 2025', service: 'Savings Plans', cost: 25000.00 },
  { month: 'Jun 2025', service: 'Amazon RDS', cost: 25434.85 },

  { month: 'Jul 2025', service: 'Amazon EC2', cost: 42441.19 },
  { month: 'Jul 2025', service: 'Savings Plans', cost: 25000.00 },
  { month: 'Jul 2025', service: 'Amazon RDS', cost: 25296.00 },

  { month: 'Aug 2025', service: 'Amazon EC2', cost: 42441.19 },
  { month: 'Aug 2025', service: 'Savings Plans', cost: 25000.00 },
  { month: 'Aug 2025', service: 'Amazon RDS', cost: 25296.00 },
  
  
  // Add data for more months/services as needed to match your image...
  // For brevity, we'll stop here, but the processing logic handles all months/services.
];
// -----------------------------------------------------------------

/**
 * Transforms flat array data into FusionCharts Multi-Series JSON structure.
 * @param {Array} data - The raw cost data array.
 * @returns {Object} - Object containing categories and datasets.
 */
const transformData = (data) => {
    const categoriesSet = new Set();
    const serviceSet = new Set();
    const dataByService = new Map();

    // 1. Collect all unique months (categories) and services
    data.forEach(item => {
        categoriesSet.add(item.month);
        serviceSet.add(item.service);
    });

    const categories = Array.from(categoriesSet).map(month => ({ label: month.split(' ')[0] }));
    const services = Array.from(serviceSet);

    // 2. Initialize Map for each service series
    services.forEach(service => {
        dataByService.set(service, Array(categories.length).fill({ value: '0' }));
    });

    // 3. Populate data series
    data.forEach(item => {
        const monthIndex = Array.from(categoriesSet).indexOf(item.month);
        const series = dataByService.get(item.service);
        
        if (series) {
            series[monthIndex] = { value: item.cost.toFixed(2) };
            dataByService.set(item.service, series);
        }
    });

    // 4. Create the final 'dataset' array
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
        type: `${type}`, // Multi-Series Column 2D
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
            // The X-axis categories (Months)
            categories: categories, 
            
            // The data series (one for each Service)
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