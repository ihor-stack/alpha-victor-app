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