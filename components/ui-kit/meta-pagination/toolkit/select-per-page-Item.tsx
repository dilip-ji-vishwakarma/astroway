import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectPageItemProps = {
  placeholder?: string;
  value: number;
  onChange: (prop: number) => void;
  itemList?: number[];
};

const PER_PAGE_ITEMS = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200,
];
export const SelectPerPageItem = ({
  placeholder = "Select Per Page Record",
  value = 10,
  onChange,
  itemList = PER_PAGE_ITEMS,
}: SelectPageItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-block min-w-max">Per page</span>
      <Select
        value={"" + value}
        defaultValue="10"
        onValueChange={(prop) => onChange(+prop)}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {itemList.map((item) => (
            <SelectItem key={item} value={"" + item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};