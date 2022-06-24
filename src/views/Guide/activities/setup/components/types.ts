export default interface MongoDoc {
  data: {
    adks: Record<string, any>[];
    [x: string]: any;
  };
  update: () => Promise<any>;
  changeStream: any;
}
