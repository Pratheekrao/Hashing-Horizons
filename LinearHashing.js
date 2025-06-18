 
class LinearHashing {
    
    constructor(tableSize = 10,choice,hash) {
        this.tableSize = tableSize
        this.choice = choice;
        this.hash = hash;
        this.hashTable = new Array(tableSize)
    }
    
    hashFunction(key, order) {
        if(this.hash == 'Division Method '){
            return (key + order) % this.tableSize
        }
        else if(this.hash == 'Folding Method ')
            return this.foldingHash(key,order,this.tableSize)
    }
    //foldinghash
    foldingHash(key,order=0, tableSize=this.tableSize) {
        key = String(key);
      
        if (tableSize <= 0 || key.length === 0) {
          throw new Error("Invalid table size or key length");
        }
      
        const folds = Math.ceil(key.length / 2);
      
        let sum = 0;
        let remainder = 0;
      
        for (let i = 0; i < folds; i++) {
          const fold = parseInt(key.substring(i * 2, (i + 1) * 2), 10);
      
          sum += fold;
      
          remainder = sum % 10;
          sum = Math.floor(sum / 10);
        }  
           sum += remainder;
        return (sum+order) % tableSize;
      }

    insert(key) {
        key = parseInt(key)
       
        if (isNaN(key))
            throw "Invalid Key!"
        for (let i = 0; i < this.tableSize; ++i) {
            let hashedKey;
            if(this.choice=='Linear Probing ')
                 hashedKey = this.hashFunction(key, i)
            else if(this.choice=='Quadratic Probing '){
                hashedKey = this.hashFunction(key,i**2)
                console.log('eee')
            }
            switch (this.hashTable[hashedKey]) {
                case undefined:
                case null:
                    this.hashTable[hashedKey] = key
                    return hashedKey
                case key:
                    throw "Duplicate Key!"
                default: 
                    console.log("col")
            }
        }
        throw "Overflow!"
}
    search(key) {
        key = parseInt(key)
        if (isNaN(key))
            throw "Invalid Key!"
        for (let i = 0; i < this.tableSize; ++i) {
            let hashedKey = this.hashFunction(key, i)
            switch (this.hashTable[hashedKey]) {
                case undefined:
                    throw "Key Not Found!"
                case key:
                    return hashedKey
            }
        }
    }
    delete(key) {
        let hashedKey = this.search(key)
        this.hashTable[hashedKey] = null
        return hashedKey
    }
}