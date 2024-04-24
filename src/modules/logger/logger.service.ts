import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from '../../core/common/logger.interface';

@Injectable()
export class LoggerService extends Logger implements ILogger {

    debug(message: string) {
        super.debug(`[DEBUG] ${message}`);
    }
    log(message: string) {
        super.log(`[INFO] ${message}`);
    }
    error(message: string, trace?: string) {
        super.error(`[ERROR] ${message}`, trace);
    }
    warn(message: string) {
        super.warn(`[WARN] ${message}`);
    }
    verbose(message: string) {
        super.verbose(`[VERBOSE] ${message}`);
    }
}
