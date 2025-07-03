import AccessoryItem from "./AccessoryItem";
import styles from "./Accessory.module.css";

interface IAccessoryProps {
  id: number;
  thumbnail: string;
  title: string;
  addPrice?: string;
  oldPrice?: string;
  sale?: string;
}

const AccessoryList = ({ data }: { data: IAccessoryProps[] }) => {
  return (
    <div style={{ display: "flex", gap: 32 }}>
      {data.length > 0 &&
        data.map((accessory) => {
          return (
            <AccessoryItem
              key={accessory.id}
              thumbnail={accessory.thumbnail}
              title={accessory.title}
              addPrice={accessory.addPrice}
              oldPrice={accessory.oldPrice}
              sale={accessory.sale}
            />
          );
        })}
    </div>
  );
};

export default AccessoryList;
