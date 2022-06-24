import { OperationMode } from '../constants/operationMode';

export type OperationModeType = typeof OperationMode[keyof typeof OperationMode];
