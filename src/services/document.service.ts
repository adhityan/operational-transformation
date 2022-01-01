import { Service } from 'typedi';
import { Logger } from '@adhityan/gc-logger';

import { Operation, OperationLog } from '../types';

@Service()
export class DocumentService {
    private readonly map: Record<string, OperationLog>;

    public constructor() {
        this.map = {};
    }

    public recordOperation(fileName: string, operation: Operation): number {
        if (!this.map[fileName]) {
            this.map[fileName] = {
                currentState: '',
                operations: [],
            };
        }

        this.applyOperation(fileName, operation);
        return this.map[fileName].operations.length;
    }

    private applyOperation(fileName: string, operation: Operation): string {
        Logger.debug(operation);
        return fileName;
    }
}
