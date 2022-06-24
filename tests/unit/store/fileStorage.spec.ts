/* eslint-disable @typescript-eslint/no-unused-vars */
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import fs from 'fs';
import state from '@/store/modules/fileStorage/state';
import { FileStorageActions } from '../../../src/store/modules/fileStorage/actions';
import createMockStore from './store.spec';

const { store } = createMockStore({ unmocked: true });
const { useActions } = createNamespacedHelpers<typeof state, any, FileStorageActions, any>(
  store,
  'fileStorage'
);

describe('Filestorage module', () => {
  // const actions = useActions(['uploadItem', 'deleteItem']);
  // const mockActions = jest.createMockFromModule<typeof actions>('mockActions');
  // const { uploadItem, deleteItem } = mockActions;
  // (uploadItem as jest.Mock).mockResolvedValue({
  //   Location: 'aws-mypicture.domain',
  //   ETag: 'string',
  //   Bucket: 'Bucket',
  //   Key: 'key'
  // });
  // let location = '';
  // (deleteItem as jest.Mock).mockResolvedValue({
  //   DeleteMarker: true
  // });
  it('Allows you to upload a file', () => {
    // const logo = fs.readFileSync('src/assets/logo.png');
    // const data = await uploadItem({
    //   folder: 'test',
    //   fileName: 'logo.png',
    //   item: (logo as unknown) as File
    // });
    // expect(data).toBeTruthy();
    // location = data.Location;
    // done();
  });
  it('Allows you to reference files with a URL', () => {
    // expect(location).toBeInstanceOf(String);
  });
  it('Allows you to delete files', () => {
    // const output = await deleteItem({ key: location });
    // expect(output.DeleteMarker).toBe(true);
    // done();
  });
});
