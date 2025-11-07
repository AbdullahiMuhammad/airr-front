// InputField.jsx
export default function InputField({ label, type, name, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}           // <-- very important for object state
        value={value}         // <-- controlled input
        onChange={onChange}   // <-- must call parent handler
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}


export function InputTextarea({ label, type, name, value, onChange, cNmae }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        type={type}
        name={name}           // <-- very important for object state
        value={value}         // <-- controlled input
        onChange={onChange}   // <-- must call parent handler
        className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${cNmae} `}
      />
    </div>
  );
}
