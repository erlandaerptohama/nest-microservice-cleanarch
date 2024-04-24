import { ApiProperty } from "@nestjs/swagger";

export class ResponsePattern<T> {
    @ApiProperty()
    isArray: boolean;
    @ApiProperty()
    path: string;
    @ApiProperty()
    duration: string;
    @ApiProperty()
    method: string;

    data: T;
}
