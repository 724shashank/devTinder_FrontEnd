import SubscribeCard from "./SubscriptionCard";
import { membershipPlans } from "../utils/constants";

const Subscription = () => {
  return (
    <>
      <div className="flex justify-center my-20">
        <SubscribeCard details={membershipPlans.gold} />
        <SubscribeCard details={membershipPlans.silver} />
        <SubscribeCard details={membershipPlans.bronze} />
      </div>
    </>
  );
};

export default Subscription;
