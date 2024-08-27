import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { ValidateEnv } from '@utils/validateEnv';
import { RecipeRoute } from './routes/recipe.route';
import { CategoryRoute } from './routes/category.route';
import { DefaultRoute } from './routes/default.route';

ValidateEnv();

const app = new App([new DefaultRoute(), new AuthRoute(), new RecipeRoute(), new CategoryRoute()]);

app.listen();
