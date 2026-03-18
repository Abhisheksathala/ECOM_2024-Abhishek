


const Card = ({ title, value }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
      <h2 className="mb-2 text-sm text-gray-500">{title}</h2>
      <p className="text-2xl font-bold text-green-600">{value}</p>
    </div>
  );
};

export default Card