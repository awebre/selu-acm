import classNames from "classnames";
import PillNav from "components/PillNav";
import useTreasuryLog from "data/api/useTreasuryLog";
import { useState } from "react";

export default function TreasuryLog() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const { log, isLoading, hasError, mutate, isValidating } = useTreasuryLog({
    year: year,
  });
  return (
    <>
      <Timeline
        min={2000} //TODO: set from server based on first year with entries?
        max={new Date().getFullYear()}
        year={year}
        onChange={(y) => setYear(y)}
      />
      {!isLoading && log?.transactions?.map((t) => <div>{t.amount}</div>)}
    </>
  );
}

//TODO: this belongs in its own file
const Timeline = ({ min, max, onChange, year }) => {
  const yearPlus5 = year + 5;
  const maxYear = yearPlus5 >= max ? max : yearPlus5;

  const yearMinus5 = year - 5;
  const minYear = yearMinus5 <= min ? min : yearMinus5;

  const length = maxYear - minYear + 1;
  const years = Array.from({ length: length }, (_, idx) => idx + minYear);
  return (
    <PillNav>
      {years.map((y) => (
        <PillNav.Pill
          key={y}
          isActive={y === year}
          setActive={() => onChange(y)}
        >
          {y}
        </PillNav.Pill>
      ))}
    </PillNav>
    // <div className="flex justify-between">
    //   {years.map((y) => (
    //     <div key={y} className={classNames({ "font-bold": y === year })}>
    //       {y}
    //     </div>
    //   ))}
    // </div>
  );
};
