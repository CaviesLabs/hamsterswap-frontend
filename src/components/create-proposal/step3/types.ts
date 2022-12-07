import { Dayjs } from "dayjs";

export type DatetimePickerProps = {
  value?: Dayjs;
  onChange?: (expiredData: Date) => void;
};
