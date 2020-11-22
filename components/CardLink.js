import Link from "./Link";
import Card from "./Card";

export default function CardLink({ headerText, bodyText, href }) {
  return (
    <Link href={href} color="green" className="mx-4 w-5/12">
      <Card>
        <Card.Header>{headerText} &rarr;</Card.Header>
        <p className="p-6 text-xl m-0">{bodyText}</p>
      </Card>
    </Link>
  );
}
