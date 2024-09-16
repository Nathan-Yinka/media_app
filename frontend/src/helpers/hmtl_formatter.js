export function extractTextFromHTML(html) {
    // Create a temporary DOM element to hold the HTML content
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    // Use the innerText property to extract only the text content
    const text = tempElement.innerText || tempElement.textContent;

    return text;
}

export function trimText(text, maxLength) {
    // Trim the text to the specified length and add "..."
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    
    return text;
}
