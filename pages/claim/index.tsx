import { NextPage } from "next";
const ClaimPage: NextPage = () => {
  return (
    <div className="claim">
      <div className="status"></div>
      <form>
        <input type="text" maxLength={30} />
        <button>Check</button>
      </form>
    </div>
  );
};

export default ClaimPage;
