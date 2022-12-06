import { Dayjs } from "dayjs";

export type DatetimePickerProps = {
  value?: Dayjs;
  onChange?: (newValue: any) => void;
};
