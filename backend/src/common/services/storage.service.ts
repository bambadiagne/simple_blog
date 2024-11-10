export interface IStorageService {
  uploadFile(file: Express.Multer.File): Promise<string>;
  deleteFile(key: string): Promise<any>;
}
