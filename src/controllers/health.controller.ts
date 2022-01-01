import { Service } from 'typedi';
import { ResponseSchema } from 'routing-controllers-openapi';
import { JsonController, Get } from 'routing-controllers';

import { HealthResponse } from '../models';

@Service()
@JsonController('/health')
export class LivenessController {
    /*
     * Health liveniess API endpoint
     */
    @Get('/live')
    @ResponseSchema(HealthResponse)
    public async live(): Promise<HealthResponse> {
        return new HealthResponse('Health status OK', 200);
    }

    /*
     * Health readiness API endpoint
     */
    @Get('/ready')
    @ResponseSchema(HealthResponse)
    public async ready(): Promise<HealthResponse> {
        return new HealthResponse('Health status OK', 200);
    }
}
