export const baseURL = location.hostname === "localhost" ? "http://localhost:3000":"http://56.228.14.67/api"
export const dummy = "https://www.citypng.com/public/uploads/preview/png-round-blue-contact-user-profile-icon-701751694975293fcgzulxp2k.png"
export const membershipPlans = {
  bronze: {
    name: "Bronze",
    price: "₹500/-",
    features: {
      limitedSwipes: "Limited daily swipes",
      basicVisibility: "Basic profile visibility",
      likeAndMatch: "Yes",
      rewind: "Once a day",
      matchSuggestions: "Standard",
      ads: "Included",
    },
  },
  silver: {
    name: "Silver",
    price: "₹800/-",
    features: {
      limitedSwipes: "Unlimited daily swipes",
      basicVisibility: "Enhanced profile visibility",
      likeAndMatch: "Yes",
      rewind: "Unlimited",
      matchSuggestions: "Priority",
      ads: "No ads",
    },
  },
  gold: {
    name: "Gold",
    price: "₹1000/-",
    features: {
      limitedSwipes: "Unlimited daily swipes",
      basicVisibility: "Top profile visibility",
      likeAndMatch: "Yes + Super Likes",
      rewind: "Unlimited",
      matchSuggestions: "Top priority",
      ads: "No ads",
    },
  },
};
