import { AdminLayout, OfficersCard } from "components/admin/";
import roles from "utils/roles";
import dbConnect from "utils/mongoose";
import { UserProfile } from "data/models";

export default function Admin({ officers }) {
  return (
    <AdminLayout>
      <OfficersCard officers={officers} />
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const officers = await UserProfile.find(
    {
      role: { $in: [roles.admin, roles.officer] },
      isActive: true,
    },
    { isActive: false }
  );

  const dtos = officers.map((officer) => ({
    _id: officer._id,
    email: officer.email,
    role: officer.role,
  }));

  return {
    props: { officers: dtos },
  };
}
