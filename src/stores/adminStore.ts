import { defineStore } from "pinia";

interface Document {
  id: number;
  title: string;
  dateUploaded: string;
}

export const adminDocuments = defineStore('adminDocuments', {
  state: () => {
    return {
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
    async remove(newDocument: Document) {
      this.documents = this.documents.filter(function( item ) {
        return item.id !== newDocument.id;
      });
    },
    async edit(index: number, edit: Document) {
      this.documents[index] = edit
    }
  },
  getters: {
    documentsArray: (state) => state.documents,
  },
});
