export * from "./decisionTree";
export * from "./equipments";
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
  id?: string;
  path: string;
  name?: string;
  order: number;
  featuredPhoto?: boolean;
}

export interface Issue {
  title: string;
  status: Status;
  comments: { comment: string }[];
  description: string;
  actionHistory: { comment: string; updated: string }[];
}

export interface IssueListItem {
  title: string;
  status: Status;
  id: string;
}

export interface Typeform {
  id: string;
}

export interface SpaceFeature {
  name: string;
  icon: string;
  id: string;
  selected: boolean;
}

export interface Device {
  id: string;
  name: string;
  manufacturer?: string;
  serialNumber?: string;
  installer?: string;
  installDate?: string;
  warrantyExpiryDate: string;
  description: string;
  photos?: Photo[];
  icon?: string;
  equipmentId?: string;
  documents?: Document[];
}

export interface Document {
  id?: string;
  manufacturerId?: string | null;
  assetTypeId?: string;
  equipmentId?: string;
  title: string;
  name?: string;
  path?: string;
  documentType?: DocumentType;
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
  global: boolean;
}
export interface AdminOrganisation {
  id: string;
  organisationId: string;
  name: string;
  prefix: string;
  logo: string;
}
export interface AdminTheme {
  darkmodeEnabled: boolean;
  primaryColour: string;
  secondaryColour: string;
  backgroundBase64Payload?: string;
  backgroundFileName?: string;
  backgroundContentType?: string;
  logoBase64Payload?: string;
  logoFileName?: string;
  logoContentType?: string;
  logo?: string;
  backgroundImage?: string;
}

export interface Theme {
  backgroundImage: string;
  darkmodeEnabled: boolean;
  logo: string;
  primaryColour: string;
  secondaryColour: string;
}
export interface PublicAccount {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
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
  addressLine0: string;
  addressLine1: string;
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
  addressLine0: string;
  addressLine1: string;
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
  name: string;
  image?: string;
  shortCode: string;
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
export interface NewLocDetails {
  name: string;
  prefix: string;
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
  addressLine0: string;
  addressLine1: string;
  city: string;
  postcode: string;
  floors?: SingleFloor[];
}

export interface SelectItem {
  [key: string]: any;
  id: number;
  title: string;
  additionalInfo?: any;
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
  addressLine0: string;
  addressLine1: string;
  city: string;
  postcode: string;
}

export interface SingleFloor {
  id: string;
  name: string;
  shortName?: string;
  spaces: NavSpace[];
  spaceCount?: number;
}

export interface NewFloorDetails {
  longName: string;
  shortName: string;
}

export interface SpecificFloor {
  id: string;
  name: string;
  shortName: string;
  spaces: SpecificSpace[];
}
export interface NewSpaceDetails {
  spaceName: string;
  shortCode: string;
}
export interface SpecificSpace {
  image?: string;
  name: string;
  spaceId: string;
}
export interface Space {
  id?: string;
  spaceName: string;
  name?: string;
  roomType?: string;
  shortCode: number;
  qrCode?: string;
  spaceType: string;
  occupied: boolean;
  capacity: number;
  imagePath: string;
  email?: string;
  floorName?: string;
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
export interface DetailedSpace {
  id: string;
  spaceName: string;
  name: string;
  shortcode: string;
  roomTypeId: string;
  capacity: string;
  typeformId: string;
  decisionTreeId: string;
  floorName: string;
  qrCode: string;
  roomTypes: SpaceDetailsRooms[];
  spaceFeatures: SpaceFeature[];
  photos?: Photo[];
  imagePath?: string;
  featuredImagePath?: string;
  documents: SpaceDetailsDocs[];
  occupied: boolean;
  location?: string;
  issueCount?: number;
  title?: string[];
  announcementText?: string[];
  showWifiPassword: boolean;
  wifiPassword?: string;
  wifiNetwork?: string;
  panorama?: Panorama;
  wifiSecurityType?: number;
}
export interface SpaceDetailsRooms {
  name: string;
  spaceTypeId: string;
  icon: string;
}
export interface SpaceDetailsFeatures {
  name: string;
  spaceFeatureId?: string;
  id?: string;
  icon: string;
}
export interface SpaceDetailsDocs {
  id: string;
  name: string;
  documentType: string;
  path: string;
}

export interface SpaceBeacon {
  beaconId?: string;
  minor?: number;
  major?: number;
}

export interface SpaceBeaconAvailableResponse {
  available: boolean;
  current: boolean;
  minor: number;
  major: number;
}

export interface SpaceAnnouncement {
  title: string;
  text: string;
}

export interface SpaceWifi {
  showWifiPassword: boolean;
  wifiName: string;
  wifiPassword?: string;
  wifiSecurityType: string;
}

export interface NewDocument {
  base64Payload: string;
  contentType: string;
  fileName: string;
  documentTypeId: string;
}

export interface NewPhoto {
  base64Payload: string;
  fileName: string;
  contentType: string;
  order: number;
  featuredPhoto: boolean;
}

export interface Panorama {
  spaceId: string;
  path: string;
  initialViewHfov: number;
  initialViewPitch: number;
  initialViewYaw: number;
  hotspots: Hotspot[];
}

export interface Hotspot {
  hotspotId: string;
  text: string;
  pitch: number;
  yaw: number;
  type?: string;
  deviceId?: string;
}

export interface NewPanorama {
  fileName: string;
  contentType: string;
  base64ImagePayload: string;
  initialViewPitch: number;
  initialViewYaw: number;
  initialViewHfov: number;
}

export interface Permission {
  organisationId: string;
  name: string;
}

export interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
