import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import theme from 'fusioncharts/themes/fusioncharts.theme.fint';

ReactFC.fcRoot(FusionCharts, Charts, theme);

const Chart = ({type,width,data}) => {
    const { categories, dataset } = data;

    if (dataset?.length === 0) {
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
                "showToolTipShadow": "0",
    "toolTipBgAlpha": "0",
    "toolTipBorderAlpha": "0",
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