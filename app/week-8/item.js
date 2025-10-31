export default function Item({ name, quantity, category, onSelect }) {
  return (
    <div
      onClick={() => onSelect?.(name)}
      className="cursor-pointer rounded bg-blue-200 p-2 transition hover:bg-blue-300 dark:bg-blue-800 dark:hover:bg-blue-700"
    >
      <ul>
        <li className="font-semibold">{name}</li>
        <li>Quantity: {quantity}</li>
        <li>Category: {category}</li>
      </ul>
    </div>
  );
}
