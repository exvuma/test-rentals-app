import React, { useState, useEffect } from 'react';
import { API_RESPONSE_EXAMPLE } from './RESPONSE';
const OUTDOORSY_API_ENDPOINT = "https://search.outdoorsy.com/rentals/";

type ApiResponse = typeof API_RESPONSE_EXAMPLE

export const Image: React.FC<{ src: string }> = ({ src }) => {
    return (
        <div>
            {src ? (
                <img src={src} alt="Fetched image" style={{
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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLink = async () => {
            try {
                // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
                const response = await fetch(OUTDOORSY_API_ENDPOINT + rentalId);
                const data: ApiResponse = await response.json();

                const link = data.data.attributes.primary_image_url
                console.log(link)
                // Assuming the API response has a 'url' field
                setLink(link);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch link');
                setLoading(false);
            }
        };

        fetchLink();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {link ? (
                <Image src={link} />
            ) : (
                <div>No link found</div>
            )}
        </div>
    );
};

export default ListingFetcher;
