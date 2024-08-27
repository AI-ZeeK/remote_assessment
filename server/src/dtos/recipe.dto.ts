import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  file: string;

  @IsString()
  @IsNotEmpty()
  ingredients: string;

  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category_id: string;
}
export class UpdateRecipeDto {
  @IsString()
  title: string;

  @IsString()
  ingredients: string;

  file: string;

  @IsString()
  instructions: string;

  @IsString()
  description: string;

  @IsString()
  category_id: string;
}

export class FetchRecipesDto {
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  page_size: number;

  // @IsNumber()
  // @IsNotEmpty()
  // current_page: number;
}
