export function calculateReadingTime(text) {
    // Assuming an average reading speed of 200 words per minute
    if (text && typeof text === 'string') {
        // Calculate reading time logic here
        const wordsPerMinute = 500; // Adjust this value based on your content
        const wordCount = text.split(/\s/g).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
        return readingTime;
      }
    
      // Return a default value if text is undefined or not a string
      return 0;
    }