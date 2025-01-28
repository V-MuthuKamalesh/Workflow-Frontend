export default function GroupHeader({ fields }) {
  const formatFieldName = (field) => {
    return field.replace(/([A-Z])/g, " $1").toLowerCase();
  };

  return (
    <tr className="bg-gray-100">
      {fields.map((field) => (
        <th key={field} className="border border-gray-300 px-4 py-2 capitalize">
          {formatFieldName(field)}
        </th>
      ))}
    </tr>
  );
}
