/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import LocationsController from 'App/Controllers/Http/LocationsController'
import UsersController from 'App/Controllers/Http/UsersController';

Route.post('/login', UsersController.login)
Route.group(() => {
    Route.get('/location', LocationsController.getLocationById);
    Route.get('/locations', LocationsController.getLocations);
})
.middleware('auth')


