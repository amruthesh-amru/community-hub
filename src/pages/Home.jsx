import TweetsContainer from "./TweetsContainer";
import Leftbar from "../components/Leftbar";

function Home() {
  return (
    <>
      <div className="flex items-start justify-center gap-[5rem] p-3">
        <Leftbar />
        {<TweetsContainer />}
      </div>
    </>
  );
}

export default Home;
