import { RxEnvelopeClosed } from "react-icons/rx";
function Invites() {
  return (
    <div
      className={`invites  d-xl-block  d-none bg-muted  shadow-sm sticky--position bg-light `}
    >
      <div className="border-bottom w-100 ps-2">
        <p className="p-2 fs-5 fw-bold mt-2 mb-0">Pending Invites</p>
      </div>
      <div className="p-4 text-center mx-auto fs-5">
        <RxEnvelopeClosed />
        <p className="fw-light">No invites</p>
      </div>
    </div>
  );
}

export default Invites;
