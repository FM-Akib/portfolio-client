import path from "path"

// Path to the data directory
const dataDirectory = path.join(process.cwd(), "lib/data")

/**
 * Save data to a JSON file
 * @param fileName The name of the JSON file (without extension)
 * @param data The data to save
 */
export async function saveData(fileName: string, data: any): Promise<void> {
  try {
    const filePath = path.join(dataDirectory, `${fileName}.json`)
    const jsonData = JSON.stringify(data, null, 2)

    // In a real application, this would be an API call
    // For demo purposes, we're simulating the file write
    console.log(`Saving data to ${filePath}:`, jsonData)

    // In a real Next.js app with a backend API, you would:
    // 1. Create an API route in pages/api or app/api
    // 2. Make a fetch request to that API route
    // 3. The API route would handle writing to the file

    return Promise.resolve()
  } catch (error) {
    console.error(`Error saving data to ${fileName}.json:`, error)
    return Promise.reject(error)
  }
}

/**
 * Load data from a JSON file
 * @param fileName The name of the JSON file (without extension)
 * @returns The parsed JSON data
 */
export async function loadData(fileName: string): Promise<any> {
  try {
    const filePath = path.join(dataDirectory, `${fileName}.json`)

    // In a real application, this would be an API call
    // For demo purposes, we're simulating the file read
    console.log(`Loading data from ${filePath}`)

    // In a real Next.js app, you would:
    // 1. Create an API route in pages/api or app/api
    // 2. Make a fetch request to that API route
    // 3. The API route would handle reading from the file

    // For now, we'll just return the imported data
    const data = require(`./data/${fileName}.json`)
    return Promise.resolve(data)
  } catch (error) {
    console.error(`Error loading data from ${fileName}.json:`, error)
    return Promise.reject(error)
  }
}
