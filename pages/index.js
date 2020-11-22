import { useState } from "react";
import dbConnect from "utils/mongoose";
import { UserProfile } from "data/models";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { MainLayout, CardLink, Alert, Link } from "components";

export default function Home({ membershipCount }) {
  const [isMemberCountVisible, setMemberCountVisible] = useState(true);
  const router = useRouter();
  const [session] = useSession();
  return (
    <div>
      <MainLayout>
        {session && (
          <MainLayout.Banner
            bubbleText="Welcome back!"
            onClick={() => router.push("/admin")}
          >
            <p>
              You can view the ACM Officer Portal{" "}
              <Link color="green" href="/admin" background="dark">
                here.
              </Link>
            </p>
          </MainLayout.Banner>
        )}
        {isMemberCountVisible && (
          <Alert
            light
            className="w-full"
            color="yellow"
            rounded={false}
            onClose={() => setMemberCountVisible(false)}
          >
            <h2 className="text-lg">
              Become one of our <b>{membershipCount}</b> Active Members!{" "}
              <Link color="yellow" href="contact">
                <span>Contact Us</span>
              </Link>
            </h2>
          </Alert>
        )}
        <div className="bg-green-600 h-full w-full pt-24 pb-24 shadow-inner">
          <h1 className="text-7xl text-white text-center">SELU ACM</h1>
          <p className="text-2xl text-white text-center mt-3">
            Welcome to the official home of Southeastern's Association of
            Computing Machinery!
          </p>
        </div>
        <MainLayout.Main>
          <div className="bg-yellow-200 rounded-xl shadow-inner max-w-2xl">
            <h1 className="text-2xl px-5 pt-5 pb-2 bg-yellow-100 rounded-t-xl">
              About the ACM
            </h1>
            <p className="p-5">
              The Association of Computing Machinery is a student-led,
              member-driven organization that seeks to bring together students,
              researches, and industry professionals within the fields of
              Computer Science and Information Technology. The ACM provides
              students with unique opportunities to network among themselves,
              their professors, and other professionals, by hosting regular
              meetings, presentations, and social events.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center max-w-screen-md mt-12">
            <CardLink
              href="/events"
              headerText="Events"
              bodyText="Check out the ACM's official calendar for upcoming events and talks."
            />

            <CardLink
              href="/contact"
              headerText="Contact"
              bodyText="Want to become a member, submit a talk, or ask a question? Contact us!"
            />
          </div>
        </MainLayout.Main>
        <MainLayout.Drawer />
      </MainLayout>

      <style jsx>{`
        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  //TODO: switch this out with "active members" once that is a thing
  const userProfiles = (await UserProfile.find({})).length;
  return {
    props: { membershipCount: userProfiles },
  };
}
