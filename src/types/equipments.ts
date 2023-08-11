import { Document, Photo } from ".";
export interface EquipmentList {
  manufacturers: {
    manufacturerId: string;
    name: string;
  }[];
  assetTypes: {
    assetId: string;
    name: string;
    icon: string;
  }[];
  equipments: {
    equipmentName: string;
    typeName: string;
    assetTypeName: string | null;
    manufacturerName: string | null;
    assetTypeId: string;
    icon: string;
    equipmentId: string;
    manufacturerId: string;
  }[];
}

export interface NewEquipment {
  name: string;
  assetTypeId: string;
  serialNumber: string;
  manufacturerId: string;
}

export interface EquipmentDetails {
  name: string;
  assetTypeId: string;
  serialNumber: string;
  manufacturerId: string;
  documents: Document[];
  photo: Photo;
}
