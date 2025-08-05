import React from 'react';
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

const Chart = React.memo(({
  data,
  message
}) => {
  return (
    <div style={{ width: 250, height: 250 }}
      className='bg-gradient-to-br from-violet-900/30 to-gray-800 p-2 rounded-2xl shadow-xl/30'
    >
      {
        message && <p className='absolute w-[220px] text-center text-gray-500'>{message}</p>
      }
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="percent"
            nameKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            innerRadius={30}
            label
          >
            {data.map((entry) => (
              <Cell key={entry.value} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

export default Chart;
