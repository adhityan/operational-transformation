import { ResponseBase } from '@adhityan/gc-doc';
import { IsNumber, IsObject } from 'class-validator';
import { Operation } from '../types';

export class OperationResponse extends ResponseBase {
    @IsNumber()
    serialNumber: number;

    @IsObject()
    operation: Operation;

    constructor({ serialNumber, operation }: { serialNumber: number; operation: Operation }) {
        super();

        this.operation = operation;
        this.serialNumber = serialNumber;
    }
}
