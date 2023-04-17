import { defineStore } from "pinia";

interface Document {
  id: number;
  title: string;
  dateUploaded: string;
}

export const adminDocuments = defineStore('adminDocuments', {
  state: () => {
    return {
      // testing with hard coded info
      documents: [
      { id: 1, title: 'User Manual', dateUploaded: '' },
      { id: 2, title: 'Quick Start Guide', dateUploaded: '' },
      { id: 3, title: 'Schematics', dateUploaded: '' },
    ] as Document[]
  }
  },
  actions: {
    async add(newDocument: Document) {
      this.documents.push(newDocument)
    },
    async remove(id: number) {
      this.documents = this.documents.filter(function( item ) {
        return item.id !== id;
      });
    },
    async edit(index: number, edit: string) {
      this.documents[index].title = edit
      this.documents[index].dateUploaded = new Date().toDateString()
    },
    async reset(index: number, edit: Document) {
      this.documents[index] = edit
    }
  },
  getters: {
    documentsArray: (state) => state.documents,
  },
});

export const Organisation = defineStore('adminDocuments', {
  state: () => {
    return {
      // testing with hard coded info
      id: 123
  }
  },
  actions: {
    setId(newId: number) {
      this.id = newId
    },
  },
  getters: {
    getId: (state) => state.id,
  },
});
