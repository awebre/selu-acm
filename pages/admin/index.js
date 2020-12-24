import { useState } from "react";
import classNames from "classnames";
import { getSessionUser } from "utils/authn";
import { canUpdateOfficers } from "utils/permissions";
import {
  AdminLayout,
  OfficersCard,
  MembersCard,
  TreasuryCard,
} from "components/admin/";
import { PillNav } from "components";

const cards = {
  Officers: "Officers",
  Members: "Members",
  Treasury: "Treasury",
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
          Find a Member
        </PillNav.Pill>
        <PillNav.Pill
          isActive={activeCard === cards.Officers}
          setActive={() => setActiveCard(cards.Officers)}
        >
          Officers
        </PillNav.Pill>
        <PillNav.Pill
          isActive={activeCard === cards.Treasury}
          setActive={() => setActiveCard(cards.Treasury)}
        >
          Treasury
        </PillNav.Pill>
      </PillNav>
      <OfficersCard
        isReadOnly={isReadOnly}
        isVisible={activeCard === cards.Officers}
      />
      <MembersCard isVisible={activeCard === cards.Members} />
      <TreasuryCard isVisible={activeCard === cards.Treasury} />
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const user = await getSessionUser(context);
  const isReadonly = !canUpdateOfficers(user);
  return { props: { isReadOnly: isReadonly } };
}
