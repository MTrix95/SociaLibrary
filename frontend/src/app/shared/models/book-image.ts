export interface BookImage {
  id: string,
  urlImage: string,
  type: ImageType
}

export enum ImageType {
  COVER = 'COVER',
  PREVIEW = 'PREVIEW'
}
