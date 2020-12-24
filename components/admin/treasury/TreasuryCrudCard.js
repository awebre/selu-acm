import classNames from "classnames";
import { Button, Card } from "components";
import TreasuryLog from "./TreasuryLog";

export default function TreasuryCrudCard({ isVisible }) {
  return (
    <Card className={classNames({ hidden: !isVisible }, "w-9/12")}>
      <Card.Header>Treasury</Card.Header>
      <TreasuryLog />
    </Card>
  );
}
