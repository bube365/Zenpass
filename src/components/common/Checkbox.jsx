export default function Checkbox({ label, checked, onChange, name, required = false }) {
  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          required={required}
          className="w-4 h-4 border-gray-300 rounded text-red-400 focus:ring-red-400"
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={name} className="text-gray-700">
          {label}
        </label>
      </div>
    </div>
  );
}
