import { Tag } from "./Tag";

export function TagsList({ items, onClick }) {
  return (
    <ul className={"flex flex-wrap justify-center gap-5"}>
      {items.map((item) => (
        <Tag onClick={() => onClick(item)} key={item.title}>
          {item.title}
        </Tag>
      ))}
    </ul>
  );
}
