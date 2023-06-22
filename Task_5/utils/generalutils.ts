async function generateRandomAmount() {
    const randomPages = Math.floor(Math.random() * 100) + 1;
    return randomPages;
  }

export {generateRandomAmount}