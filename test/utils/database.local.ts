import {IDatabase, Document, Filter, Sort} from 'lib/data';
import {Collections} from 'lib/firebase';

// Simulated database using local arrays
class LocalDatabase implements IDatabase {
  private collections: Record<string, Document[]> = {};

  async getDocument<T extends Document>(
    collection: string,
    id: string
  ): Promise<T> {
    const documents = this.collections[collection];
    if (!documents) {
      return Promise.reject(
        new Error(`Collection ${collection} doesn't exist in the database`)
      );
    }

    const document = documents.find(doc => doc.id === id);
    if (!document) {
      return Promise.reject(
        new Error(
          `Document with ${id} doesn't exist in the collection ${collection}`
        )
      );
    }
    return document as T;
  }

  async getDocuments<T extends Document>(
    collection: Collections,
    filters: Filter[],
    sort?: Sort,
    howMany = 25
  ): Promise<T[]> {
    let documents = this.collections[collection] || [];

    if (filters.length > 0) {
      // Apply filters
      for (const filter of filters) {
        documents = documents.filter(doc => {
          const fieldValue = doc[filter.field] as string | number;
          switch (filter.operator) {
            case '==':
              return fieldValue === filter.value;
            case '<':
              return fieldValue < filter.value;
            case '>':
              return fieldValue > filter.value;
            case '<=':
              return fieldValue <= filter.value;
            case '>=':
              return fieldValue >= filter.value;
            default:
              return true;
          }
        });
      }
    }

    // Apply sorting
    if (sort) {
      documents.sort((a, b) => {
        const fieldA = a[sort.field] as string | number;
        const fieldB = b[sort.field] as string | number;
        if (sort.isAscending) {
          return fieldA > fieldB ? 1 : -1;
        } else {
          return fieldA < fieldB ? 1 : -1;
        }
      });
    }

    // Return up to `howMany` documents
    return documents.slice(0, howMany) as T[];
  }

  async addDocument(collection: Collections, doc: Document): Promise<void> {
    const documents = this.collections[collection] || [];
    // I tried using array.includes() here but it didn't work...
    if (documents.find(d => d.id === doc.id) === undefined) {
      this.collections[collection] = [...documents, doc];
    } else {
      documents[documents.findIndex(d => d.id === doc.id)] = doc;
      this.collections[collection] = documents;
    }
  }

  async addManyDocuments(
    collection: Collections,
    newDocs: Document[]
  ): Promise<void> {
    const documents = this.collections[collection] || [];
    this.collections[collection] = [...documents, ...newDocs];
  }

  async deleteDocument(collection: Collections, doc: Document): Promise<void> {
    const documents = this.collections[collection] || [];
    const filteredDocuments = documents.filter(d => d.id !== doc.id);
    if (filteredDocuments.length === documents.length) {
      return Promise.reject(
        new Error(`document with ${doc.id} not found in ${collection}`)
      ); // Document not found
    }
    this.collections[collection] = filteredDocuments;
  }

  async emptyCollection(collection: Collections): Promise<void> {
    this.collections[collection] = [];
  }

  async setCollection(collection: Collections, items: Document[]) {
    this.collections[collection] = items;
  }
}

export {LocalDatabase};
