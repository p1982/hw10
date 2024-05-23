// Custom hash function that takes a string key and a table size, and returns a hash code (integer).
function customHash(key, tableSize) {
    let hash = 0;
    const PRIME = 31; // A prime number to use in the hash function for better distribution.
  
    // Iterate over each character in the key.
    for (let i = 0; i < key.length; i++) {
      // Multiply the current hash value by the prime number and add the character code of the current character.
      // Use modulo operation to keep the hash value within the bounds of the table size.
      hash = (hash * PRIME + key.charCodeAt(i)) % tableSize;
    }
  
    return hash; // Return the computed hash code.
  }
  
  // Class representing a hash table.
  class HashTable {
    constructor(size = 53) {
      this.table = new Array(size); // Initialize the hash table array with the specified size.
      this.size = size; // Store the size of the hash table.
    }
  
    // Method to compute the hash code for a given key using the custom hash function.
    hash(key) {
      return customHash(key, this.size);
    }
  
    // Method to insert a key-value pair into the hash table.
    insert(key, value) {
      const index = this.hash(key); // Compute the hash index for the key.
  
      if (!this.table[index]) {
        this.table[index] = []; // Initialize a new bucket (array) at the computed index if it doesn't exist.
      }
  
      // Check if the key already exists in the bucket to handle updates.
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] === key) {
          this.table[index][i][1] = value; // Update the value for the existing key.
          return;
        }
      }
  
      // If the key does not exist, insert the new key-value pair into the bucket.
      this.table[index].push([key, value]);
    }
  
    // Method to retrieve the value associated with a given key.
    get(key) {
      const index = this.hash(key); // Compute the hash index for the key.
  
      if (this.table[index]) {
        // Iterate over the bucket at the computed index to find the key.
        for (let [k, v] of this.table[index]) {
          if (k === key) {
            return v; // Return the value if the key is found.
          }
        }
      }
  
      return undefined; // Return undefined if the key is not found.
    }
  
    // Method to delete a key-value pair from the hash table.
    delete(key) {
      const index = this.hash(key); // Compute the hash index for the key.
  
      if (this.table[index]) {
        // Iterate over the bucket at the computed index to find the key.
        for (let i = 0; i < this.table[index].length; i++) {
          if (this.table[index][i][0] === key) {
            this.table[index].splice(i, 1); // Remove the key-value pair if the key is found.
            return true; // Return true indicating successful deletion.
          }
        }
      }
  
      return false; // Return false if the key is not found.
    }
  }
  
  // Test cases to demonstrate the usage and functionality of the hash table.
  const hashTable = new HashTable();
  
  hashTable.insert('name', 'Alice');
  hashTable.insert('age', 25);
  hashTable.insert('city', 'Wonderland');
  
  console.log(hashTable.get('name')); // Output: Alice
  console.log(hashTable.get('age'));  // Output: 25
  console.log(hashTable.get('city')); // Output: Wonderland
  
  hashTable.delete('age');
  console.log(hashTable.get('age'));  // Output: undefined
  
  hashTable.insert('name', 'Bob');
  console.log(hashTable.get('name')); // Output: Bob