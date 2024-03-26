import Invites from "../components/Design/Space/Invites";
import SpaceDisplay from "../components/Design/Space/SpaceDisplay";

function Space() {
  return (
    <>
      <main className="main">
        <section className="body--width home-flex">
          <SpaceDisplay />
          <Invites/>
        </section>
      </main>
    </>
  )
}

export default Space;
