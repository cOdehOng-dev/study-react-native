export interface BannerModel {
  id: string;
  imageUri: string;
  title: string;
  subtitle: string;
  linkType: 'product' | 'event' | 'brand' | 'url';
  linkId: string;
}
