import React, { useState, useEffect } from 'react';
import { API_RESPONSE_EXAMPLE } from './RESPONSE';
import { render } from '@testing-library/react';
const OUTDOORSY_API_ENDPOINT = "https://search.outdoorsy.com/rentals/";
const OUTDOORSY_UI_ENDPOINT = "https://www.outdoorsy.com/";

type Listing = typeof API_RESPONSE_EXAMPLE

export const Image: React.FC<{ src: string }> = ({ src }) => {
    return (
        <div>
            {src ? (
                <img src={src} alt="Fetched listing hero" style={{
                    // maxWidth: "100%",
                    height: "auto",
                    maxHeight: "300px",
                    objectFit: "contain"
                }} />
            ) : (
                <div>No image source found</div>
            )}
        </div>
    );
}


const ListingFetcher: React.FC<{ rentalId: number }> = ({ rentalId = 410504 }) => {
    const [link, setLink] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [listing, setListing] = useState<Listing>(API_RESPONSE_EXAMPLE);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLink = async () => {
            try {
                // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
                const response = await fetch(OUTDOORSY_API_ENDPOINT + rentalId);
                const data: Listing = await response.json();

                const link = data.data.attributes.primary_image_url
                const listing: Listing = data
                console.log(link)
                // Assuming the API response has a 'url' field
                setLink(link);
                setListing(listing);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch listing for rental id ' + rentalId);
                setLoading(false);
            }
        };

        fetchLink();
    }, [rentalId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {link && listing ? (
                <a href={OUTDOORSY_UI_ENDPOINT + listing.data.attributes.slug}>
                    <Image src={link} />

                    <div>
                        Prep Fee: ${listing.data.attributes.prep_fee ? (listing.data.attributes.prep_fee.amount / 100) : 'N/A'}
                    </div>
                    <div>
                        Nightly Rate: ${listing.data.attributes.price_per_day / 100}
                    </div>
                    {/* <div>location: {listing.data.attributes.location.state}</div> */}
                    <div>
                        Pet Friendly: {listing.data.attributes.features.pet_friendly ? 'Yes' : 'No'}
                    </div>
                    {/* <div>Slug: {listing.data.attributes.slug}</div> */}
                    <h2>Scores</h2>
                    {/* <div>Reviews: {listing.data.attributes.average_reviews}</div> */}
                    {/* <div>Rental Score: {listing.data.attributes.rental_score}</div> */}
                    {/* <div>Avg Reviews: {listing.data.attributes.average_reviews}</div> */}
                </a>
            ) : (
                <div>No link found</div>
            )}
        </div>
    );
};

export default ListingFetcher;
