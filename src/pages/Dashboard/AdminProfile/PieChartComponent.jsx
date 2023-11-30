import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import PropTypes from 'prop-types';

const PieChartComponent = ({ data }) => {

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8">

          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
          ))}
        </Pie>
        <Tooltip/>
        <Legend/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;

PieChartComponent.propTypes = {
  data: PropTypes.array,

}