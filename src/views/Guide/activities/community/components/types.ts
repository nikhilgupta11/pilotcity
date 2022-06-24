export interface MongoDoc {
  data: Record<string, any>;
  update: () => Promise<any>;
  changeStream: any;
}
