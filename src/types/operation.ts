import { ArrayMinSize, IsArray } from 'class-validator';

export class Operation {
    @ArrayMinSize(1)
    @IsArray({ each: true })
    coordinates: number[];

    @IsArray()
    @ArrayMinSize(1)
    parameters: Record<string, unknown>[];
}

export type DocumentState = string;

export type OperationLog = {
    operations: Operation[];
    currentState: DocumentState;
};
