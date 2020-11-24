import { ContentPage, Link } from "components";

export default function Contact({ contactEmail }) {
  return (
    <ContentPage>
      <div className="bg-yellow-200 rounded-xl shadow-inner max-w-2xl">
        <h1 className="text-2xl px-5 pt-5 pb-2 bg-yellow-100 rounded-t-xl">
          Contact Us
        </h1>
        <div className="p-5">
          <p>Want information on how to join or submit a talk?</p>
          <p>Have a quetion for one of our officers?</p>
          <p>
            We'd love to hear from you. Please email{" "}
            <Link color="gray" href={`mailto:${contactEmail}`}>
              {contactEmail}.
            </Link>
          </p>
        </div>
      </div>
    </ContentPage>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { contactEmail: process.env.CONTACT_EMAIL },
  };
}
