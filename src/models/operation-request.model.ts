import { RequestBase } from '@adhityan/gc-doc';
import { IsInstance, IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { Operation } from '../types';

export class OperationRequest extends RequestBase {
    @IsString()
    @IsNotEmpty()
    fileName: string;

    @ValidateNested()
    @IsNotEmptyObject()
    @IsInstance(Operation)
    @Type(() => Operation)
    operation: Operation;
}
