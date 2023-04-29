enum Status {
  lowImpact,
  highImpact,
  resolved
}

enum DocumentTypeScope {
  organisation,
  location,
  floor,
  space
}

export interface Space {
  spaceName: string
  shortCode: number
  qrCode?: string
  spaceType: string
  occupied: boolean
  capacity: number
  imageUrl: string
  email?: string
  phoneNumber?: string
  article?: Article
  video?: Video
  issues: Issue[]
  typeformId?: Typeform
  spaceFeatures: SpaceFeature[]
  decisionTree?: DecisionTree[]
  devices?: Device[]
  photos?: Photo[]
  beacons?: Beacon[]
  wifiDetails?: WifiDetails
  location?: string
}

export interface Location {
  location: string
}

export interface Article {
  title: string
}

export interface Video {
  url: string
}

export interface Photo {
  path: string
  order: number
  featuredPhoto: boolean
}

export interface Issue {
  title: string
  status: Status
  comment: string
  log: string[]
}

export interface Typeform {
  id: string
}

export interface SpaceFeature {
  name: string,
  category: string
}

export interface DecisionTree {
  articles: Article[]
  videos: Video[]
}

export interface Device {
  name: string
}

export interface Document {
  name: string
  documentType: DocumentType
}

export interface DocumentType {
  documentTypeScopes: DocumentTypeScope[]
}

export interface Beacon {
  uuid: string
}

export interface WifiDetails {
  networkName: string
  password: string
}

export type ToastStatus = 'generic' | 'success' | 'problem' | 'error';

// Admin Types - Api Integration
export interface AdminDocument {
  id: number;
  title: string;
  dateUploaded: string;
}
export interface AdminOrganisation {
  id: string,
  name: string,
  prefix: string,
  logo: string
}
export interface AdminTheme {
  logo: string,
  backgroundImage: string,
  primaryColour: string,
  secondaryColour: string,
  darkmodeEnabled: boolean
}
export interface AdminMetaData {
  spaceTypes: spaceType[],
  spaceFeatures: spaceFeature[]
}
export interface spaceType {
  name: string,
  spaceTypeId: string,
}
export interface spaceFeature {
  name: string,
  spaceFeatureId: string,
}

export interface OrgDetails {
  id: string,
  name: string,
  prefix: string,
  contactName: string,
  email: string,
  phone: string,
  selectedLanguage: 0,
  postCode: string,
  city: string,
  addressLines: string[],
  website: string[]
}

export interface Integration {
  id: string,
  name: string,
  clientId: string,
  clientSecret: string,
  selectedOrgnisation:string,
}
export interface NavSpace {
  spaceId: string,
  spaceName: string,
}
export interface NavFloor {
  floorId: string,
  floorName: string,
  spaces: NavSpace[]
}
export interface NavLocation {
  locationId: string,
  locationName: string,
  floors: NavFloor[]
}
export interface Navigation {
  organisationId: string,
  organisationName: string,
  locations: Location[]
}

export interface Location {
  id: string,
  name: string,
  prefix: string,
  mainContactName: string,
  email: string,
  phone: string,
  sosNumber: string,
  wifiSsid: string,
  wifiPassword: string,
  addressLines: string[],
  city: string,
  postcode: string,
}