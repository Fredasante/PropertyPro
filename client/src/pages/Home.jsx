import { Button, Carousel, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import PropertyOne from "../assets/new5.jpg";
import PropertyTwo from "../assets/new3.jpg";
import PropertyThree from "../assets/Property1.jpg";
import PropertyFour from "../assets/new1.jpg";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const [offerRes, saleRes, rentRes] = await Promise.all([
          fetch("/api/listing/get?offer=true&limit=4"),
          fetch("/api/listing/get?type=sale&limit=4"),
          fetch("/api/listing/get?type=rent&limit=4"),
        ]);

        const [offerData, saleData, rentData] = await Promise.all([
          offerRes.json(),
          saleRes.json(),
          rentRes.json(),
        ]);

        setOfferListings(offerData);
        setSaleListings(saleData);
        setRentListings(rentData);
      } catch (error) {
        console.error("Failed to fetch listings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center justify-center mt-10 lg:mt-20 xl:min-h-[40vh] text-center">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl">
            Find Your Next{" "}
            <span className="text-slate-500">
              Perfect
              <br />
            </span>{" "}
            place with ease
          </h1>
          <p className="max-w-[500px] mt-10">
            Explore top listings, get personalized recommendations, and make
            your real estate journey seamless. Start your search today!
          </p>
          <div className="flex gap-3 mt-10">
            <Link to="/learn">
              <Button color="dark">Get Started Now!</Button>
            </Link>
            <Link to="/search">
              <Button color="dark" outline>
                Explore Listings
              </Button>
            </Link>
          </div>
        </div>

        <div>
          <div className="h-56 sm:h-64 xl:h-[400px] 2xl:h-[500px]">
            {offerListings && offerListings.length > 0 && (
              <Carousel
                slide={false}
                className="max-w-screen-xl mx-auto p-5 mt-5"
              >
                <img src={PropertyOne} alt="Real Estate Apartment" />
                <img src={PropertyTwo} alt="Real Estate Apartment" />
                <img src={PropertyThree} alt="Real Estate Apartment" />
                <img src={PropertyFour} alt="Real Estate Apartment" />
              </Carousel>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center min-h-[30vh]">
            <Spinner />
          </div>
        )}

        <div>
          {offerListings && offerListings.length > 0 && (
            <div className="max-w-screen-xl mx-auto px-5 md:px-10 my-10">
              <h2 className="text-2xl font-semibold text-slate-700 mb-5">
                Recent Offers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                {offerListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )}

          {saleListings && saleListings.length > 0 && (
            <div className="max-w-screen-xl mx-auto px-5 md:px-10 my-10 lg:my-20">
              <h2 className="text-2xl font-semibold text-slate-700 mb-5">
                Recent Places for Sale
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                {saleListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )}

          {rentListings && rentListings.length > 0 && (
            <div className="max-w-screen-xl mx-auto px-5 md:px-10 my-10 lg:my-20">
              <h2 className="text-2xl font-semibold text-slate-700 mb-5">
                Recent Places for Rent
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                {rentListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
