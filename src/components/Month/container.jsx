import { monthStore } from "../../stores/month-store";
import { Month } from "./component";
import { observer } from "mobx-react";

export const MonthContainter = observer(() => {
  const getDate = (weekIndex, dayIndex) =>
    monthStore.getDate(weekIndex, dayIndex);

  return <Month weeksNumber={monthStore.weeksNumber} getDate={getDate} />;
});
