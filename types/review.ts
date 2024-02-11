export interface Review {
  id?: number;
  authorId: number;
  authorName: string;
  rating: number;
  comment?: string | null | undefined;
  created: Date;
}
