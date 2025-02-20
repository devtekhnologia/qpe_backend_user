export const generateUsername = (name: string, school_id: string, suffixLength: number = 4): string => {
    // Sanitize the name: Remove non-alphanumeric characters and convert to lowercase
    const sanitizedName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    // Generate a random alphanumeric suffix of the specified length
    const randomSuffix = Math.random().toString(36).substring(2, 2 + suffixLength);  // Get a substring of random alphanumeric characters
    
    // Combine the sanitized name, school ID, and random suffix to generate the final username
    const username = `${sanitizedName}${school_id}${randomSuffix}`;
    
    return username;
};
