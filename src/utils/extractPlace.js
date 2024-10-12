// utils/extractPlace.js
export const extractFirstPlace = (htmlString) => {
        // Decode HTML entities
        const decodedString = htmlString.replace(/&#x27;/g, "'");
    // Use regular expression to extract the first place
    const regex = /'([^']+)'/; // Match the first occurrence of a string inside single quotes
    const match = decodedString.match(regex);
    alert(`${match}---${htmlString}`)
    return match && match[1] ? match[1] : null; // Return the extracted place or null
};
