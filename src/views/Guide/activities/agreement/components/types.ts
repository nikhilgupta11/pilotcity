export interface MongoDoc {
  data: {
    adks: Record<string, any>[];
    programDesc: string;
    programName: string;
  };
  update: (shouldMarkAsComplete?: any) => Promise<any>;
  changeStream: any;
}
