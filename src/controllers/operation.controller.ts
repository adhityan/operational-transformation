import { Inject, Service } from 'typedi';
import { ResponseSchema } from 'routing-controllers-openapi';
import { JsonController, Post, Body } from 'routing-controllers';

import { OperationRequest as OperateRequest, OperationResponse } from '../models';
import { DocumentService } from '../services/document.service';

@Service()
@JsonController('/operation')
export class OperationController {
    @Inject()
    private documentService: DocumentService;

    @Post('/record')
    @ResponseSchema(OperationResponse)
    public async record(@Body() body: OperateRequest): Promise<OperationResponse> {
        return new OperationResponse(this.documentService.recordOperation(body.fileName, body.operation));
    }
}
