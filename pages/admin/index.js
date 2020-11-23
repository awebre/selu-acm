import { useState } from "react";
import classNames from "classnames";
import { getSessionUser } from "utils/authn";
import { canUpdateOfficers } from "utils/permissions";
import { AdminLayout, OfficersCard, MembersCard } from "components/admin/";
import { PillNav } from "components";

const cards = {
  Officers: "Officers",
  Members: "Members",
};

export default function Admin({ isReadOnly }) {
  const [activeCard, setActiveCard] = useState(cards.Members);
  return (
    <AdminLayout>
      <PillNav className="max-h-12 w-9/12">
        <PillNav.Pill
          isActive={activeCard === cards.Members}
          setActive={() => setActiveCard(cards.Members)}
        >
          Members
        </PillNav.Pill>
        <PillNav.Pill
          isActive={activeCard === cards.Officers}
          setActive={() => setActiveCard(cards.Officers)}
        >
          Officers
        </PillNav.Pill>
      </PillNav>
      {activeCard === cards.Officers && (
        <OfficersCard isReadOnly={isReadOnly} />
      )}
      {activeCard === cards.Members && <MembersCard />}
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const user = await getSessionUser(context);
  const isReadonly = !canUpdateOfficers(user);
  return { props: { isReadOnly: isReadonly } };
}
