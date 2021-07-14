import { Module, HttpModule, Global } from '@nestjs/common';
import { NetworkService } from './network.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [NetworkService],
  exports: [NetworkService]
})
export class NetworkModule {}
