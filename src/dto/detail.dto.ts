import { IsString } from "class-validator";

export class DetailDto {
  @IsString()
  id: string;
}
