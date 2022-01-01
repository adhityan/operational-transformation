import { ResponseBase } from '@adhityan/gc-doc';
import { IsNumber } from 'class-validator';

export class OperationResponse extends ResponseBase {
    @IsNumber()
    serialNumber: number;

    constructor(serialNumber: number) {
        super();
        this.serialNumber = serialNumber;
    }
}
