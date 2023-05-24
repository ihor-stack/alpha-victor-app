export * from "./decisionTree";
import { DecisionTree } from "./decisionTree";
enum Status {
  lowImpact,
  highImpact,
  resolved,
}

enum DocumentTypeScope {
  organisation,
  location,
  floor,
  space,
}

export interface Space {
  spaceName: string;
  shortCode: number;
  qrCode?: string;
  spaceType: string;
  occupied: boolean;
  capacity: number;
  imageUrl: string;
  email?: string;
  phoneNumber?: string;
  article?: Article;
  video?: Video;
  issues: Issue[];
  typeformId?: Typeform;
  spaceFeatures: SpaceFeature[];
  decisionTree?: DecisionTree[];
  devices?: Device[];
  photos?: Photo[];
  beacons?: Beacon[];
  wifiDetails?: WifiDetails;
  location?: string;
}

export interface Location {
  location: string;
}

export interface Article {
  id: string;
  title: string;
  richText: string;
}

export interface Video {
  id: string;
  title: string;
  url: string;
  vimeoData: {
    total: number;
    data: [];
  };
}

export interface Photo {
  path: string;
  order: number;
  featuredPhoto: boolean;
}

export interface Issue {
  title: string;
  status: Status;
  comment: string;
  log: string[];
}

export interface Typeform {
  id: string;
}

export interface SpaceFeature {
  name: string;
  category: string;
}

export interface Device {
  name: string;
}

export interface Document {
  name: string;
  documentType: DocumentType;
}

export interface DocumentType {
  documentTypeScopes: DocumentTypeScope[];
}

export interface Beacon {
  uuid: string;
}

export interface WifiDetails {
  networkName: string;
  password: string;
}

export type ToastStatus = "generic" | "success" | "problem" | "error";

// Admin Types - Api Integration
export interface AdminDocument {
  id: string;
  name: string;
}
export interface AdminOrganisation {
  id: string;
  organisationId: string;
  name: string;
  prefix: string;
  logo: string;
}
export interface AdminTheme {
  primaryColour: string;
  secondaryColour: string;
  darkmodeEnabled: boolean;
  logoBase64Payload?: string;
  logoFileName?: string;
  logoContentType?: string;
  logo?: string;
  backgroundImage?: string;
}
export interface AdminMetaData {
  spaceTypes: spaceType[];
  spaceFeatures: spaceFeature[];
}
export interface spaceType {
  name: string;
  spaceTypeId: string;
  icon: string;
}
export interface spaceFeature {
  name: string;
  spaceFeatureId: string;
  icon: string;
}

export interface OrgDetails {
  id: string;
  name: string;
  prefix: string;
  contactName: string;
  email: string;
  phone: string;
  selectedLanguage: 0;
  postCode: string;
  city: string;
  addressLines: string[];
  website: string[];
  decisionTrees: DecisionTree[];
}
export interface NewOrgDetails {
  name: string;
  prefix: string;
  contactName: string;
  email: string;
  phone: string;
  selectedLanguage: 0;
  postCode: string;
  city: string;
  addressLines: string[];
  website: string[];
  language: number;
}
export interface Integration {
  id?: string;
  name?: string;
  clientId: string;
  clientSecret: string;
  selectedOrgnisation: string;
}
export interface NavSpace {
  spaceId: string;
  spaceName: string;
  image?: string;
}
export interface NavFloor {
  floorId: string;
  floorName: string;
  spaces: NavSpace[];
}
export interface NavLocation {
  locationId: string;
  id: string;
  locationName: string;
  floors: NavFloor[];
}
export interface Navigation {
  organisationId: string;
  organisationName: string;
  locations: NavLocation[];
}

export interface Location {
  id: string;
  name: string;
  prefix: string;
  mainContactName: string;
  email: string;
  phone: string;
  sosNumber: string;
  wifiSsid: string;
  wifiPassword: string;
  addressLines: string[];
  city: string;
  postcode: string;
}

export interface SelectItem {
  id: number;
  title: string;
  aditionalInfo?: any;
}

export interface SingleLocation {
  id: string;
  name: string;
  prefix: string;
  mainContactName: string;
  email: string;
  phone: string;
  sosNumber: string;
  wifiSsid: string;
  wifiPassword: string;
  addressLines: string[];
  city: string;
  postcode: string;
}

export interface SingleFloor {
  id: string;
  name: string;
  spaces: NavSpace[];
}

export interface SpecificFloor {
  id: string;
  name: string;
  shortName: string;
  spaces: SpecificSpace[];
}
export interface SpecificSpace {
  image?: string;
  name: string;
  spaceId: string;
}
export interface DetailedSpace {
  spaceName: string;
  shortcode: string;
  roomTypeId: string;
  capacity: string;
  typeformId: string;
  decisionTreeId: string;
  qrCode: string;
  roomTypes: SpaceDetailsRooms[];
  spaceFeatures: SpaceDetailsFeatures[];
  photos: SpaceDetailsPhotos[];
  documents: SpaceDetailsDocs[];
}
export interface SpaceDetailsRooms {
  name: string;
  spaceTypeId: string;
  icon: string;
}
export interface SpaceDetailsFeatures {
  name: string;
  spaceFeatureId: string;
  icon: string;
}
export interface SpaceDetailsPhotos {
  id: string;
  name: string;
  order: string;
  path: string;
}
export interface SpaceDetailsDocs {
  id: string;
  name: string;
  documentType: string;
  path: string;
}

export interface SpaceDevices {
  id?: string;
  name: string;
  serialNumber: string;
  installer: string;
  installDate: string;
  warrantyExpiryDate: string;
  description: string;
  photos?: SpaceDetailsPhotos[];
}

export interface SpaceBeacon {
  beaconId: string;
  uuiDs: string;
}

export interface SpaceWifi {
  showWifiPassword: string;
  wifiName: string;
  wifiPassword: string;
}

export interface SpaceNewDocument {
  base64Payload: string;
  contentType: string;
  fileName: string;
  documentTypeId: string;
}

export interface NewPhoto {
  base64Payload: string;
  fileName: string;
  contentType: string;
  order: string;
  featuredPhoto: boolean;
}
