import React from 'react'
import { useViz } from './VizContext';
import { DrillableCell } from './DrillableCell';
import { Cell } from '../types';

const LookerCustomVizLayout: React.FC = () => {
  const { data, config } = useViz();

  if(!config || !data) {
    return <div>Loading...</div>
  }

  // Extract headers from the first row for the table
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  
  return (
    <div className="viz-container">
        <h1>{config.title_text}</h1>
        <div className="info-box">
            <p><strong>Row Count:</strong> {data.length}</p>
            <p>This is a minimal React template for Looker Custom Visualizations.</p>
            <p>Click on blue values to test the <strong>openDrillMenu</strong> functionality.</p>
        </div>
        {data.length > 0 ? (
            <div className="data-preview" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #eee' }}>
                            {headers.map(header => (
                                <th key={header} style={{ padding: '8px', textAlign: 'left' }}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                {headers.map(header => (
                                    <td key={header} style={{ padding: '8px' }}>
                                        <DrillableCell cell={row[header] as Cell} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <div className="data-preview">No data available</div>
        )}
    </div>
  );
};

export { LookerCustomVizLayout };