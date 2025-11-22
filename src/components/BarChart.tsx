import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { ChartDataPoint } from '../utils/data_transforms';
import { LookerChartUtils } from '../types';

// Declare global LookerCharts for use within this component
declare let LookerCharts: LookerChartUtils;

interface BarChartProps {
    data: ChartDataPoint[];
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
}

export const BarChart: React.FC<BarChartProps> = ({
    data,
    width,
    height,
    margin = { top: 40, right: 30, bottom: 50, left: 60 },
}) => {
    // Bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // Accessors
    const getLabel = (d: ChartDataPoint) => d.label;
    const getValue = (d: ChartDataPoint) => d.value;

    // Scales
    const xScale = useMemo(
        () =>
            scaleBand<string>({
                range: [0, xMax],
                round: true,
                domain: data.map(getLabel),
                padding: 0.4,
            }),
        [xMax, data],
    );

    const yScale = useMemo(
        () =>
            scaleLinear<number>({
                range: [yMax, 0],
                round: true,
                domain: [0, Math.max(...data.map(getValue))],
            }),
        [yMax, data],
    );

    if (width < 10) return null;

    return (
        <svg width={width} height={height}>
            <rect width={width} height={height} fill="url(#teal)" rx={14} />
            <Group left={margin.left} top={margin.top}>
                <AxisLeft scale={yScale} />
                {data.map((d) => {
                    const label = getLabel(d);
                    const barWidth = xScale.bandwidth();
                    const barHeight = yMax - (yScale(getValue(d)) ?? 0);
                    const barX = xScale(label);
                    const barY = yMax - barHeight;

                    return (
                        <Bar
                            key={`bar-${label}`}
                            x={barX}
                            y={barY}
                            width={barWidth}
                            height={barHeight}
                            fill="#6c5ce7"
                            onClick={(event) => {
                                if (d.links && d.links.length > 0) {
                                    LookerCharts.Utils.openDrillMenu({
                                        links: d.links,
                                        event: event.nativeEvent,
                                    });
                                }
                            }}
                            style={{ cursor: d.links && d.links.length > 0 ? 'pointer' : 'default' }}
                        />
                    );
                })}
                <AxisBottom
                    top={yMax}
                    scale={xScale}
                    tickLabelProps={() => ({
                        fill: '#333',
                        fontSize: 11,
                        textAnchor: 'middle',
                    })}
                />
            </Group>
        </svg>
    );
};
