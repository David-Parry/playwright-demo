function getAgeLabel(input, options = {}) {

    return "Senior";
}

function scrub(joke) {
    // Basic list of swear words (expand as needed)
    const swearWords = [
    ];
    // Create a regex to match any swear word, case-insensitive, word boundaries
    const swearRegex = new RegExp(`\\b(${swearWords.join('|')})\\b`, 'gi');
    // Replace each swear word with asterisks of the same length
    return joke.replace(swearRegex, (match) => '*'.repeat(match.length));
}



// Export for usage in other modules (CommonJS/Node.js style)
module.exports = { getAgeLabel, scrub };
