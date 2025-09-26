export default function Item({ name, quantity, category }) {
  return (
    <div className="bg-blue-200 p-2 rounded">
      <ul>
        <li>{name}</li>
        <li>Quantity: {quantity}</li>
        <li>Category: {category}</li>
      </ul>
    </div>
  );
}