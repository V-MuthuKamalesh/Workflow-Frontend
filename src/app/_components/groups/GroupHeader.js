export default function GroupHeader({ fields }) {
  return (
    <tr className="bg-gray-100">
      {fields.map((field) => (
        <th key={field} className="border border-gray-300 px-4 py-2 capitalize">
          {field.replace(/([A-Z])/g, " $1").toLowerCase()}
        </th>
      ))}
    </tr>
  );
}
