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
    add(newDocument: Document) {
      this.documents.push(newDocument)
    },
    remove(newDocument: Document) {
      this.documents = this.documents.filter(function( item ) {
        return item.id !== newDocument.id;
      });
    },
    edit(newDocument: Document, edit: string) {
      const index = this.documents.findIndex(item => item.id === newDocument.id);
      this.documents[index].title = edit
    }
  }
});
