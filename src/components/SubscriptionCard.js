import axios from "axios";
import { baseURL } from "../utils/constants";

const SubscribeCard = ({details}) => {
  console.log(details)
  const handlePayment = async (type) => {
    const order = await axios.post(
      baseURL+`/createOrder/${type}`,{},
      { withCredentials: true }
    );
    const {amount,currency,order_id,notes,}= order?.data?.message;
    const options = {
      key: order.data.key_Id, 
      amount:amount,
      currency: currency,
      name: "Tinder",
      description: "Test Transaction",
      order_id: order_id, 
      prefill: {
        name: notes.firstName+" "+notes.lastname,
        email: notes.email,
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-2xl m-auto ">
        <div className="card-body">
          <span className="badge badge-xs badge-warning text-white">Most Popular</span>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">{details.name}</h2>
            <span className="text-xl">{details.price}</span>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-xs">
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{details.features.limitedSwipes}</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{details.features.basicVisibility}</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{details.features.likeAndMatch}</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{details.features.rewind}</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                 className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{details.features.matchSuggestions}</span>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                 className="size-4 me-2 inline-block text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                {details.features.ads}
              </span>
            </li>
          </ul>
          <div className="mt-6">
            <button
              className="btn btn-secondary btn-block"
              onClick={()=>{handlePayment(details.name)}}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscribeCard;
