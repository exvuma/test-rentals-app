import React, { useState, useEffect } from 'react';
import { API_RESPONSE_EXAMPLE } from './RESPONSE';
const OUTDOORSY_API_ENDPOINT = "https://search.outdoorsy.com/rentals/410504";

type ApiResponse = typeof API_RESPONSE_EXAMPLE


const LinkFetcher: React.FC = () => {
    const [link, setLink] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLink = async () => {
            try {
                // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
                const response = await fetch(OUTDOORSY_API_ENDPOINT);
                const data: ApiResponse = await response.json();

                const link = data.data.attributes.primary_image_url
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
                <a href={link} target="_blank" rel="noopener noreferrer">
                    Click here to visit the link
                </a>
            ) : (
                <div>No link found</div>
            )}
        </div>
    );
};

export default LinkFetcher;
