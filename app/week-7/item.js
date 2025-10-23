export default function Item({ name, quantity, category }) {
  return (
    <div className="rounded bg-blue-200 p-2 dark:bg-blue-800">
      <ul>
        <li>{name}</li>
        <li>Quantity: {quantity}</li>
        <li>Category: {category}</li>
      </ul>
    </div>
  );
}
