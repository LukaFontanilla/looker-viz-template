import { VisData, VisQueryResponse, Link } from '../types';

export interface ChartDataPoint {
    label: string;
    value: number;
    links: Link[];
    rendered?: string;
}

export const extractBarChartData = (data: VisData, queryResponse: VisQueryResponse): ChartDataPoint[] => {
    if (!data || data.length === 0) return [];

    // Identify the first dimension (x-axis) and first measure (y-axis)
    const dimensions = queryResponse.fields?.dimensions || [];
    const measures = queryResponse.fields?.measures || [];

    if (dimensions.length === 0 || measures.length === 0) {
        return [];
    }

    const dimensionName = dimensions[0].name;
    const measureName = measures[0].name;

    return data.map((row) => {
        const dimCell = row[dimensionName];
        const measureCell = row[measureName];

        let label = '';
        if (dimCell.value !== undefined && dimCell.value !== null) {
            label = String(dimCell.value);
        }

        let value = 0;
        if (measureCell.value !== undefined && measureCell.value !== null) {
            value = Number(measureCell.value);
        }

        return {
            label,
            value,
            links: (measureCell.links || []) as Link[],
            rendered: measureCell.rendered ? String(measureCell.rendered) : undefined,
        };
    });
};
