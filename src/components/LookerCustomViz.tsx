import React, { useMemo } from 'react';
import { useViz } from './VizContext';
import { BarChart } from './BarChart';
import { ParentSize } from '@visx/responsive';
import { extractBarChartData } from '../utils/data_transforms';

const LookerCustomVizLayout: React.FC = () => {
    const { data, config, queryResponse } = useViz();

    const chartData = useMemo(() => {
        return extractBarChartData(data, queryResponse);
    }, [data, queryResponse]);

    if (!config || !data || chartData.length === 0) {
        return (
            <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                <h3>Waiting for data...</h3>
                <p>Please select at least one dimension and one measure.</p>
            </div>
        );
    }

    return (
        <div
            className="viz-container"
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            {config.title_text && <h2 style={{ textAlign: 'center', margin: '10px 0' }}>{config.title_text}</h2>}

            <div style={{ flex: 1, minHeight: 0 }}>
                <ParentSize>
                    {({ width, height }) => <BarChart width={width} height={height} data={chartData} />}
                </ParentSize>
            </div>
        </div>
    );
};

export { LookerCustomVizLayout };
