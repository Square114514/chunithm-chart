import Title from "./Title";
import Profile from "./Profile";
import B30 from "./B30";
import N20 from "./N20";

export default function ChuB30() {
  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6">
      <Title />
      <Profile />
      <B30 />
      <N20 />
    </div>
  );
}
