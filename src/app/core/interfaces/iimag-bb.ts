export interface IImagBB {
  data: ImgbbData;
  success: boolean;
  status: number;
}

export interface ImgbbData {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  width: string;
  height: string;
  size: string;
  time: string;
  expiration: string;
  image: ImgbbImage;
  thumb: ImgbbImage;
  medium: ImgbbImage;
  delete_url: string;
}

export interface ImgbbImage {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
}
