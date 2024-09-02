import React from "react";
import { DatePicker } from "@nextui-org/react";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";

export default function InputDate() {
  const [value, setValue] = React.useState(today(getLocalTimeZone()));

  return (
    <div className="w-full flex flex-col gap-y-2">
      <input type="date" />
    </div>
  );
}
