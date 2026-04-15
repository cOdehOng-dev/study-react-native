export type NotificationType = '거래' | '이벤트' | '시스템' | '찜';

export interface NotificationModel {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  linkId?: string;
}
