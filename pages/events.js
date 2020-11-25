import { ContentPage } from "components";

export default function Events({ calendarUrl }) {
  return (
    <ContentPage>
      <iframe
        src={calendarUrl}
        style={{ border: "solid 1px #777" }}
        width="800"
        height="600"
        scrolling="no"
      ></iframe>
    </ContentPage>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { calendarUrl: process.env.GOOGLE_CALENDAR_URL },
  };
}
