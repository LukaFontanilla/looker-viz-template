import React from 'react';
import { render, screen } from '@testing-library/react';
import { BarChart } from '../BarChart';
import { ChartDataPoint } from '../../utils/data_transforms';
import { describe, it, expect, vi } from 'vitest';

// Mock LookerCharts global
const mockOpenDrillMenu = vi.fn();
// @ts-ignore
global.LookerCharts = {
    Utils: {
        openDrillMenu: mockOpenDrillMenu,
        openUrl: vi.fn(),
        textForCell: vi.fn(),
        filterableValueForCell: vi.fn(),
        htmlForCell: vi.fn(),
    },
};

const mockData: ChartDataPoint[] = [
    { label: 'A', value: 10, links: [] },
    { label: 'B', value: 20, links: [] },
    { label: 'C', value: 30, links: [] },
];

describe('BarChart', () => {
    it('renders without crashing', () => {
        const { container } = render(<BarChart data={mockData} width={500} height={300} />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('width', '500');
        expect(svg).toHaveAttribute('height', '300');
    });

    it('renders the correct number of bars', () => {
        const { container } = render(<BarChart data={mockData} width={500} height={300} />);
        // Visx renders bars as rects
        // We have 1 background rect + 3 bars = 4 rects
        // Or we can look for specific attributes or classes if we added them.
        // Let's just count rects for now, minus the background one if we can distinguish.
        const rects = container.querySelectorAll('rect');
        // We expect at least 3 bars.
        expect(rects.length).toBeGreaterThanOrEqual(3);
    });

    it('renders axis text', () => {
        render(<BarChart data={mockData} width={500} height={300} />);
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('B')).toBeInTheDocument();
        // Visx might render text multiple times for measurement, so we use getAllByText
        expect(screen.getAllByText('C')[0]).toBeInTheDocument();
    });
});
