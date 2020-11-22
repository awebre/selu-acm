import { getSessionUser } from "utils/authn";
import { canUpdateOfficers } from "utils/permissions";
import { AdminLayout, OfficersCard } from "components/admin/";

export default function Admin({ isReadOnly }) {
  return (
    <AdminLayout>
      <OfficersCard isReadOnly={isReadOnly} />
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const user = await getSessionUser(context);
  const isReadonly = !canUpdateOfficers(user);
  return { props: { isReadOnly: isReadonly } };
}
